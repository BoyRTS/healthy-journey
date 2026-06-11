create table if not exists public.member_profiles (
  user_id text primary key,
  display_name text not null,
  phone text,
  avatar_url text,
  avatar_variant integer not null default 1,
  role text not null default 'member' check (role in ('member', 'coach')),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists member_profiles_role_status_idx
  on public.member_profiles (role, status);

alter table public.member_profiles enable row level security;

create policy "member_profiles_service_role_all"
  on public.member_profiles
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
