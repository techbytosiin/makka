-- SQL Script for Supabase (PostgreSQL)

-- Create a table for gallery images
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Uncategorized',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.gallery_images;
-- Create policy to allow anonymous read access (everyone can view gallery)
CREATE POLICY "Allow public read access"
    ON public.gallery_images
    FOR SELECT
    USING (true);

-- Since we are using a simple password ('tech123') in the app instead of full Supabase Auth,
-- we need to allow public inserts, updates, and deletes for the gallery images to work.
-- WARNING: In a production app, you should use Supabase Auth to secure these operations.
DROP POLICY IF EXISTS "Allow public insert" ON public.gallery_images;
CREATE POLICY "Allow public insert"
    ON public.gallery_images
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON public.gallery_images;
CREATE POLICY "Allow public update"
    ON public.gallery_images
    FOR UPDATE
    USING (true);

DROP POLICY IF EXISTS "Allow public delete" ON public.gallery_images;
CREATE POLICY "Allow public delete"
    ON public.gallery_images
    FOR DELETE
    USING (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
-- Allow public access to read files in the bucket
CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING ( bucket_id = 'gallery' );

DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
-- Allow public uploads to the bucket (for the admin interface using anon key)
-- WARNING: In production, restrict this to authenticated admins
CREATE POLICY "Public Upload"
    ON storage.objects FOR INSERT
    WITH CHECK ( bucket_id = 'gallery' );

DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
-- Allow public deletes from the bucket
CREATE POLICY "Public Delete"
    ON storage.objects FOR DELETE
    USING ( bucket_id = 'gallery' );

-- Create an admin user table (optional, if not using Supabase's built-in Auth for simple cases)
-- However, it is highly recommended to use Supabase Auth instead of a custom table.

-- Create a table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON public.contact_submissions;
-- Create policy to allow anonymous inserts (anyone can submit the contact form)
CREATE POLICY "Allow public insert"
    ON public.contact_submissions
    FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read" ON public.contact_submissions;
-- Create policy to allow authenticated users to view submissions (admin only)
CREATE POLICY "Allow authenticated read"
    ON public.contact_submissions
    FOR SELECT
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated update" ON public.contact_submissions;
-- Create policy to allow authenticated users to update submissions (admin only)
CREATE POLICY "Allow authenticated update"
    ON public.contact_submissions
    FOR UPDATE
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated delete" ON public.contact_submissions;
-- Create policy to allow authenticated users to delete submissions (admin only)
CREATE POLICY "Allow authenticated delete"
    ON public.contact_submissions
    FOR DELETE
    USING (auth.role() = 'authenticated');
