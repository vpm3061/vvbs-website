-- Run this once in: Supabase Dashboard → SQL Editor → New query.
-- It upgrades the existing `enquiries` table without deleting any previous leads.

alter table public.enquiries
  add column if not exists email text,
  add column if not exists business_name text,
  add column if not exists lead_source text default 'website',
  add column if not exists status text default 'new',
  add column if not exists metadata jsonb default '{}'::jsonb,
  add column if not exists created_at timestamptz default now();

-- Useful for an upcoming CRM/admin dashboard.
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Keep front-end submissions working only if Row Level Security is enabled.
-- This policy permits anonymous visitors to create leads, but not read/update them.
alter table public.enquiries enable row level security;

drop policy if exists "Public can create website enquiries" on public.enquiries;
create policy "Public can create website enquiries"
on public.enquiries
for insert
to anon
with check (
  name is not null
  and phone is not null
  and project_type is not null
  and budget_range is not null
);

-- Intentionally do not create SELECT / UPDATE / DELETE policies for anon.
-- Leads remain visible only to authenticated Supabase dashboard users.
