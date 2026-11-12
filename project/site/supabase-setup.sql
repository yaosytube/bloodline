-- Run once in Supabase > SQL Editor (replaces bloodline.sql)
create table if not exists public.fan_registrations (
  id bigint generated always as identity primary key,
  fan_name text not null check (char_length(fan_name) between 2 and 60),
  email text not null unique check (char_length(email) <= 120),
  favorite_member text not null check (favorite_member in
    ('Roman Reigns','Jey Uso','Jimmy Uso','Solo Sikoa','Paul Heyman')),
  acknowledged boolean not null default true check (acknowledged = true),
  created_at timestamptz not null default now()
);

alter table public.fan_registrations enable row level security;

-- Visitors may INSERT only. No SELECT policy = nobody can read the emails from the website.
grant insert on public.fan_registrations to anon;
create policy "anyone can register"
  on public.fan_registrations for insert to anon
  with check (acknowledged = true);
