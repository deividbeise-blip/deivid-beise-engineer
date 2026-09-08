import { useCallback, useEffect, useRef, useState } from "react";
import * as tus from "tus-js-client";
import { UploadCloud, Film, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "videos";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type Item = {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "enviando" | "pronto" | "erro";
  url?: string;
  error?: string;
};

function formatSize(bytes: number) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function VideoDrop() {
  const [items, setItems] = useState<Item[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.storage
        .from(BUCKET)
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
      if (!data) return;
      const files = data.filter((f) => f.id);
      const signed = await Promise.all(
        files.map(async (f) => {
          const { data: s } = await supabase.storage.from(BUCKET).createSignedUrl(f.name, 60 * 60 * 8);
          return {
            id: f.name,
            name: f.name.replace(/^\d+-/, ""),
            size: (f.metadata?.size as number) ?? 0,
            progress: 100,
            status: "pronto" as const,
            url: s?.signedUrl,
          };
        }),
      );
      setItems((prev) => [...prev, ...signed.filter((s) => !prev.some((p) => p.id === s.id))]);
    })();
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const objectName = `${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
    const id = objectName;
    setItems((prev) => [
      { id, name: file.name, size: file.size, progress: 0, status: "enviando" },
      ...prev,
    ]);

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token ?? SUPABASE_KEY;

    const upload = new tus.Upload(file, {
      endpoint: `${SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 6000, 12000, 24000],
      headers: { authorization: `Bearer ${token}`, apikey: SUPABASE_KEY, "x-upsert": "true" },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      chunkSize: 6 * 1024 * 1024,
      metadata: {
        bucketName: BUCKET,
        objectName,
        contentType: file.type || "video/mp4",
        cacheControl: "3600",
      },
      onError: (error) => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, status: "erro", error: error.message } : i,
          ),
        );
      },
      onProgress: (sent, total) => {
        const pct = Math.round((sent / total) * 100);
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, progress: pct } : i)));
      },
      onSuccess: async () => {
        const { data: s } = await supabase.storage
          .from(BUCKET)
          .createSignedUrl(objectName, 60 * 60 * 8);
        setItems((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, progress: 100, status: "pronto", url: s?.signedUrl } : i,
          ),
        );
      },
    });

    upload.start();
  }, []);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files)
        .filter((f) => f.type.startsWith("video/") || /\.(mp4|mov|mkv|webm|avi|m4v)$/i.test(f.name))
        .forEach(uploadFile);
    },
    [uploadFile],
  );

  return (
    <div className="flex flex-col gap-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Arraste vídeos aqui para enviar"
        className={`group relative rounded-3xl glass cursor-pointer overflow-hidden transition-all duration-500 ${
          dragging ? "glow-gold scale-[1.01]" : "hover-glow"
        }`}
      >
        <div className="aspect-[4/5] flex flex-col items-center justify-center text-center px-8">
          <div className="h-16 w-16 rounded-full glass-strong flex items-center justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-1">
            <UploadCloud className="h-7 w-7 text-gold" />
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold/90 mb-3">
            · Enviar material
          </div>
          <h3 className="font-serif text-3xl tracking-tight">Arraste seus vídeos</h3>
          <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
            Suporta arquivos longos e pesados. O envio continua de onde parou se a conexão cair.
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <div className="flex flex-col gap-3">
          {items.map((i) => (
            <div key={i.id} className="glass rounded-2xl px-5 py-4">
              <div className="flex items-center gap-4">
                <Film className="h-4 w-4 text-gold shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="truncate text-sm text-foreground/85">{i.name}</span>
                    <span className="shrink-0 text-[11px] tracking-wide text-foreground/45">
                      {i.size ? formatSize(i.size) : ""}
                    </span>
                  </div>
                  <div className="mt-2 h-px w-full bg-border/70 overflow-hidden">
                    <div
                      className="h-px bg-gold transition-all duration-300"
                      style={{ width: `${i.progress}%` }}
                    />
                  </div>
                </div>
                <div className="shrink-0">
                  {i.status === "enviando" && (
                    <span className="flex items-center gap-2 text-[11px] text-foreground/60">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      {i.progress}%
                    </span>
                  )}
                  {i.status === "pronto" &&
                    (i.url ? (
                      <a
                        href={i.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-[11px] text-gold hover:underline"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Ver
                      </a>
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                    ))}
                  {i.status === "erro" && (
                    <span className="flex items-center gap-2 text-[11px] text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" /> Falhou
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
