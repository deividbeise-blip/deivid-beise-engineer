CREATE POLICY "public can upload videos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'videos');
CREATE POLICY "public can read videos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'videos');
CREATE POLICY "public can delete videos" ON storage.objects FOR DELETE TO anon, authenticated USING (bucket_id = 'videos');