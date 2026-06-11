insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'meal-homework-photos',
  'meal-homework-photos',
  false,
  2500000,
  array['image/webp', 'image/jpeg', 'image/png']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists meal_homework_submissions (
  id uuid primary key default gen_random_uuid(),
  member_user_id text not null,
  member_name text,
  meal_label text not null,
  note text,
  storage_bucket text not null default 'meal-homework-photos',
  storage_path text not null,
  original_file_name text,
  mime_type text not null,
  file_size integer not null,
  image_width integer,
  image_height integer,
  submitted_at timestamptz not null default now(),
  product_timezone text not null default 'Asia/Bangkok',
  status text not null default 'submitted' check (status in ('submitted', 'queued_for_review', 'reviewed'))
);

create index if not exists meal_homework_submissions_member_submitted_idx
  on meal_homework_submissions (member_user_id, submitted_at desc);

alter table meal_homework_submissions enable row level security;

drop policy if exists "Service role can manage meal homework submissions" on meal_homework_submissions;

create policy "Service role can manage meal homework submissions"
  on meal_homework_submissions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "Service role can manage meal homework photos" on storage.objects;

create policy "Service role can manage meal homework photos"
  on storage.objects
  for all
  using (bucket_id = 'meal-homework-photos' and auth.role() = 'service_role')
  with check (bucket_id = 'meal-homework-photos' and auth.role() = 'service_role');
