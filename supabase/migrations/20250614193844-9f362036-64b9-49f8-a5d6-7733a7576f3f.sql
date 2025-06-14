
-- Create an enum for user roles
create type public.app_role as enum ('Admin', 'Client');

-- Create a table to store user roles
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);
alter table public.user_roles enable row level security;

-- Create a table for user profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  primary key (id)
);
alter table public.profiles enable row level security;

-- Create enums for project and ticket statuses/priorities
create type public.project_status as enum ('Planning', 'In Progress', 'Completed', 'On Hold');
create type public.ticket_status as enum ('Open', 'In Progress', 'Closed');
create type public.ticket_priority as enum ('Low', 'Medium', 'High');

-- Create a table for projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  status project_status not null default 'Planning',
  client_id uuid references auth.users(id) on delete set null
);
alter table public.projects enable row level security;

-- Create a table for support tickets
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  status ticket_status not null default 'Open',
  priority ticket_priority not null default 'Medium',
  project_id uuid references public.projects(id) on delete cascade,
  created_by uuid references auth.users(id) on delete cascade not null
);
alter table public.tickets enable row level security;

-- This trigger automatically creates a profile for new users.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  -- Also assign a default 'Client' role to new users
  insert into public.user_roles (user_id, role)
  values (new.id, 'Client');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Security definer function to check for a user's role
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies for profiles
create policy "Users can view all profiles." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- RLS Policies for user_roles
create policy "Admins can manage all roles." on public.user_roles for all using (public.has_role(auth.uid(), 'Admin'));
create policy "Users can view their own roles." on public.user_roles for select using (auth.uid() = user_id);

-- RLS Policies for projects
create policy "Admins can manage all projects." on public.projects for all using (public.has_role(auth.uid(), 'Admin'));
create policy "Clients can view their own projects." on public.projects for select using (auth.uid() = client_id);

-- Helper function for ticket policies
create or replace function public.is_project_client(_project_id uuid)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.projects
    where id = _project_id and client_id = auth.uid()
  )
$$;

-- RLS Policies for tickets
create policy "Admins can manage all tickets." on public.tickets for all using (public.has_role(auth.uid(), 'Admin'));
create policy "Users can manage tickets they created." on public.tickets for all using (auth.uid() = created_by);
create policy "Clients can view tickets for their projects." on public.tickets for select using (public.is_project_client(project_id));
