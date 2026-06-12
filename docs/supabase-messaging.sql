create table if not exists coach_member_messages (
  id uuid primary key default gen_random_uuid(),
  member_slug text not null,
  member_name text not null,
  coach_user_id text not null,
  message text not null,
  graph_snapshot jsonb,
  status text not null default 'sent' check (status in ('sent', 'read')),
  created_at timestamptz not null default now()
);

create index if not exists coach_member_messages_member_slug_created_idx
  on coach_member_messages (member_slug, created_at desc);

alter table coach_member_messages enable row level security;

drop policy if exists "Service role can manage coach member messages" on coach_member_messages;

create policy "Service role can manage coach member messages"
  on coach_member_messages
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
