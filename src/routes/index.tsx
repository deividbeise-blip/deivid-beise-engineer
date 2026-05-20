import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Layers,
  Zap,
  ShieldCheck,
  Cpu,
  Instagram,
  MessageCircle,
  ChevronDown,
  Quote,
} from "lucide-react";
import heroVideo from "/hero.mp4?url";
import deividPortrait from "@/assets/deivid.jpg";
import project1 from "@/assets/project-code-1.jpg";
import project2 from "@/assets/project-code-2.jpg";
import project3 from "@/assets/project-code-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "https://wa.me/5551985610152?text=Ol%C3%A1%20Deivid%2C%20vim%20do%20seu%20site.";
const INSTAGRAM = "https://www.instagram.com/beisedeivid/";

const easeOut = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-700 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[oklch(0.95_0.06_90)] via-gold to-[oklch(0.55_0.12_50)] flex items-center justify-center text-[10px] font-bold text-background tracking-tight">
              DB
            </div>
            <span className="text-sm tracking-[0.2em] uppercase font-medium text-foreground/90">
              Deivid Beise
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-9 text-[13px] text-foreground/70">
            {[
              ["Sobre", "#about"],
              ["Serviços", "#services"],
              ["Diferenciais", "#benefits"],
              ["Projetos", "#work"],
              ["Depoimentos", "#testimonials"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="hover:text-foreground transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-[13px] font-medium hover:bg-gold hover:text-background transition-all duration-500"
          >
            Conversar
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden noise"
    >
      {/* Cinematic video */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          className="h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.11_0.008_270/0.7)_100%)]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 flex h-full flex-col justify-end pb-24 md:pb-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-foreground/80">
              Engenharia de Software · Freelance Premium
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: easeOut }}
            className="font-serif text-[14vw] leading-[0.95] tracking-[-0.03em] md:text-[8.5vw] lg:text-[7rem] max-w-6xl"
          >
            <span className="gradient-text-luxe block">Código que parece</span>
            <span className="gradient-text-gold italic block">cinema.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: easeOut }}
            className="mt-8 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed"
          >
            Sou Deivid Beise. Engenheiro de software construindo interfaces e
            sistemas com obsessão por detalhe, performance e estética de alto nível.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: easeOut }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-medium overflow-hidden hover-glow"
            >
              <span className="relative z-10">Iniciar projeto no WhatsApp</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 bg-gradient-to-r from-gold via-[oklch(0.9_0.1_90)] to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-medium text-foreground hover:bg-white/10 transition-all duration-500"
            >
              Ver projetos
              <ChevronDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/40"
      >
        <span>Role</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <Reveal className="md:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass-strong">
            <img
              src={deividPortrait}
              alt="Deivid Beise — engenheiro de software"
              className="h-full w-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s] ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/90">
                  Engenheiro
                </div>
                <div className="font-serif text-2xl mt-1">Deivid Beise</div>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/60 text-right">
                Alegrete · RS<br/>Brasil
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-3xl opacity-60" />
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              · Sobre
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Construindo o digital com a <span className="italic gradient-text-gold">precisão</span> de um relojoeiro.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 text-lg text-foreground/70 leading-relaxed max-w-2xl">
              Bacharelando em Engenharia de Software pela Unipampa e desenvolvedor
              freelancer. Trabalho na interseção entre código limpo e design
              cinematográfico — entregando experiências digitais que parecem caras,
              calmas e impecavelmente acabadas.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden">
              {[
                ["HTML", "Semântico"],
                ["CSS / Tailwind", "Refinado"],
                ["JavaScript", "Moderno"],
                ["Python", "Performante"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-card p-6 hover:bg-accent transition-colors duration-500"
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                    {v}
                  </div>
                  <div className="mt-2 font-serif text-2xl">{k}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Layers,
    title: "Landing Pages Premium",
    desc: "Sites cinematográficos de alta conversão com estética de marca de luxo.",
  },
  {
    icon: Code2,
    title: "Aplicações Web Sob Medida",
    desc: "Sistemas em React, Next.js e arquiteturas modernas com qualidade de produção.",
  },
  {
    icon: Cpu,
    title: "Automação com Python",
    desc: "Scripts, bots e integrações que economizam horas e reduzem erros do seu time.",
  },
  {
    icon: Sparkles,
    title: "UI/UX Refinada",
    desc: "Interfaces sofisticadas com tipografia, espaçamento e micro-interações milimétricas.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <Reveal>
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                · Serviços
              </div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] max-w-3xl">
                Um portfólio de
                <span className="italic gradient-text-gold"> capacidades</span> raras.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-foreground/60">
              Cada entrega passa por uma curadoria obsessiva — do primeiro pixel ao
              último deploy.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative h-full glass rounded-3xl p-10 hover-glow overflow-hidden">
                <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gold/0 group-hover:bg-gold/10 blur-3xl transition-all duration-1000" />
                <div className="relative flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl glass-strong flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-700">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="relative mt-12 font-serif text-3xl md:text-4xl tracking-tight">
                  {title}
                </h3>
                <p className="relative mt-4 text-foreground/60 leading-relaxed max-w-md">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Zap,
    label: "Velocidade absurda",
    desc: "Performance de 90+ no Lighthouse, sem comprometer a estética.",
  },
  {
    icon: ShieldCheck,
    label: "Código confiável",
    desc: "Padrões modernos, tipagem forte e arquitetura escalável desde o dia 1.",
  },
  {
    icon: Sparkles,
    label: "Acabamento premium",
    desc: "Micro-interações, tipografia e detalhes que elevam a percepção de valor.",
  },
];

function Benefits() {
  return (
    <section id="benefits" className="relative py-32 md:py-44 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full bg-gradient-to-br from-gold/10 via-transparent to-transparent blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              · Diferenciais
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Não entrego só código.<br/>
              <span className="italic gradient-text-gold">Entrego sensação.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-24 grid md:grid-cols-3 gap-px bg-border/40 rounded-3xl overflow-hidden glass-strong">
          {benefits.map(({ icon: Icon, label, desc }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="group bg-card/40 p-10 md:p-14 h-full hover:bg-accent/40 transition-all duration-700">
                <Icon className="h-7 w-7 text-gold mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-3xl tracking-tight">{label}</h3>
                <p className="mt-4 text-foreground/60 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const works = [
  {
    img: project1,
    title: "Carteira Digital",
    tag: "Frontend · Produto",
    desc: "Interface de carteira financeira com foco em clareza e usabilidade.",
    link: "https://deividbeise-blip.github.io/Carteira/",
  },
  {
    img: project2,
    title: "Plataforma Pessoal",
    tag: "Site · Identidade",
    desc: "Site portfólio construído do zero — tipografia, ritmo e composição.",
    link: "https://deividbeise-blip.github.io/meusite/",
  },
  {
    img: project3,
    title: "Sistema Blog ECU-DEV",
    tag: "Next.js · GraphQL",
    desc: "Stack moderna com Apollo, Material UI e tema dinâmico.",
    link: "#",
  },
];

function Work() {
  return (
    <section id="work" className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <Reveal>
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                · Projetos selecionados
              </div>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] max-w-3xl">
                Antes e depois.<br/>
                <span className="italic gradient-text-gold">Sempre adiante.</span>
              </h2>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1}>
              <a
                href={w.link}
                target="_blank"
                rel="noreferrer"
                className="group block relative rounded-3xl overflow-hidden glass hover-glow"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute top-5 right-5 h-10 w-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-gold/90 mb-3">
                    {w.tag}
                  </div>
                  <h3 className="font-serif text-3xl tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "Deivid entregou um site que parece feito por um estúdio premium. Atenção a cada detalhe, prazo cumprido e resultado muito acima do esperado.",
    name: "Cliente — Pequeno Negócio",
    role: "Marca local · RS",
  },
  {
    quote:
      "Profissional raríssimo. Mistura sensibilidade visual com solidez técnica. Recomendo de olhos fechados para qualquer projeto digital sério.",
    name: "Parceiro de Projeto",
    role: "Tech · Brasil",
  },
  {
    quote:
      "Trabalhar com o Deivid foi como contratar um arquiteto digital. Cada elemento tem propósito, cada animação tem ritmo. Resultado: percepção de marca elevadíssima.",
    name: "Cliente — Serviço Profissional",
    role: "Consultoria",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 md:py-44 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              · Depoimentos
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Quem confia,<br/>
              <span className="italic gradient-text-gold">volta.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative h-full glass rounded-3xl p-10 hover-glow">
                <Quote className="h-8 w-8 text-gold/60 mb-6" />
                <p className="text-lg leading-relaxed text-foreground/85 font-serif">
                  "{t.quote}"
                </p>
                <div className="mt-10 pt-6 border-t border-border/50">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-foreground/50 mt-1 tracking-wide uppercase">
                    {t.role}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-32 md:py-44 px-6 overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="relative rounded-[2rem] md:rounded-[3rem] glass-strong p-12 md:p-20 lg:p-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
            <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[oklch(0.5_0.2_300)]/15 blur-[120px]" />

            <div className="relative text-center max-w-3xl mx-auto">
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">
                · Vamos construir algo notável
              </div>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
                Sua próxima<br/>
                <span className="italic gradient-text-gold">obra digital</span><br/>
                começa aqui.
              </h2>
              <p className="mt-10 text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
                Conversa direta no WhatsApp. Sem formulário, sem fricção. Você fala,
                eu respondo, e desenhamos juntos o próximo passo.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[oklch(0.95_0.06_90)] via-gold to-[oklch(0.6_0.15_55)] text-background px-9 py-5 text-base font-medium overflow-hidden glow-gold transition-all duration-500 hover:scale-[1.02]"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Falar no WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full glass px-9 py-5 text-base font-medium hover:bg-white/10 transition-all duration-500"
                >
                  <Instagram className="h-5 w-5" />
                  <span>@beisedeivid</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/40 px-6 py-16">
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[oklch(0.95_0.06_90)] via-gold to-[oklch(0.55_0.12_50)] flex items-center justify-center text-xs font-bold text-background">
              DB
            </div>
            <div>
              <div className="font-serif text-xl">Deivid Beise</div>
              <div className="text-xs text-foreground/50 tracking-wide">
                Engenharia de Software · Freelance
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-foreground/55 leading-relaxed max-w-sm">
            Alegrete, Rio Grande do Sul · Brasil. Atendendo clientes em todo o país
            de forma remota.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
            Navegação
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["Sobre", "#about"],
              ["Serviços", "#services"],
              ["Projetos", "#work"],
              ["Depoimentos", "#testimonials"],
            ].map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  className="text-foreground/70 hover:text-gold transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
            Contato
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-gold transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                +55 51 98561 0152
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-gold transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @beisedeivid
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/40">
        <div>© {new Date().getFullYear()} Deivid Beise. Todos os direitos reservados.</div>
        <div className="tracking-[0.2em] uppercase">Crafted in Alegrete · RS</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Work />
      <Testimonials />
      <CTA />
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-gold/40 blur-xl group-hover:bg-gold/60 transition-all" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.95_0.06_90)] via-gold to-[oklch(0.55_0.12_50)] text-background shadow-2xl hover:scale-110 transition-transform duration-500">
          <MessageCircle className="h-6 w-6" />
        </span>
      </a>
    </main>
  );
}
