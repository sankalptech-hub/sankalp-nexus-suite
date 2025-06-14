
-- Add RLS policies for updating and deleting projects
-- (The policies for UPDATE and DELETE should already exist based on the current schema,
-- but let's ensure they're properly configured)

-- Update policy for projects (allow clients to update their own projects)
DROP POLICY IF EXISTS "Clients can update their own projects" ON public.projects;
CREATE POLICY "Clients can update their own projects" 
  ON public.projects 
  FOR UPDATE 
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- Delete policy for projects (allow clients to delete their own projects)
DROP POLICY IF EXISTS "Clients can delete their own projects" ON public.projects;
CREATE POLICY "Clients can delete their own projects" 
  ON public.projects 
  FOR DELETE 
  USING (client_id = auth.uid());

-- Add an index for better performance when filtering/sorting
CREATE INDEX IF NOT EXISTS idx_projects_client_status ON public.projects(client_id, status);
CREATE INDEX IF NOT EXISTS idx_projects_client_created_at ON public.projects(client_id, created_at);
CREATE INDEX IF NOT EXISTS idx_projects_client_name ON public.projects(client_id, name);
