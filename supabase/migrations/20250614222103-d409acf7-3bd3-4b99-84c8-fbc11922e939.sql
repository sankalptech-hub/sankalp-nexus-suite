
-- Create a table for published blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT DEFAULT 'AI Blog Writer',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - for now, allow all users to read published posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published blog posts (public access)
CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (status = 'published');

-- Only allow authenticated users to insert blog posts (for API security)
CREATE POLICY "Authenticated users can create blog posts" 
  ON public.blog_posts 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create an index for better performance when querying by published_at
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts (published_at DESC);
