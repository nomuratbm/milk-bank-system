create extension if not exists pgcrypto;

-- ============ Reference data ============
create table programs (
  program_id smallint primary key,
  name text not null
);
insert into programs (program_id, name) values
  (1, 'Supsup Todo'),
  (2, 'Milky Way'),
  (3, 'Mom''s Act');

-- ============ Auth Routing Table ============
-- Every logged-in user (staff or beneficiary) gets exactly one row here.
-- AuthContext reads this immediately after login to decide where to redirect.
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  account_type text not null check (account_type in ('staff', 'beneficiary')),
  created_at timestamptz not null default now()
);

-- Auto-create a profiles row whenever someone signs up via Supabase Auth.
-- account_type comes from signUp() metadata, e.g. { data: { account_type: 'beneficiary' } }
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, account_type)
  values (new.id, coalesce(new.raw_user_meta_data->>'account_type', 'beneficiary'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper used in RLS policies below. SECURITY DEFINER avoids recursive RLS
-- (it checks profiles without being subject to profiles' own policies).
create function public.is_staff()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and account_type = 'staff'
  );
$$;

-- ============ Staff (extends profiles) ============
create table staff (
  id uuid primary key references profiles(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  staff_role text not null check (staff_role in ('Administrator', 'Midwife/Field Staff')),
  created_at timestamptz not null default now()
);

-- ============ Beneficiaries (extends profiles) ============
create table beneficiaries (
  id uuid primary key references profiles(id) on delete cascade,
  program_id smallint not null references programs(program_id),
  first_name text not null,
  last_name text not null,
  email text,
  contact_num text,
  registered_at timestamptz not null default now()
);

-- ============ Donors ============
create table donors (
  donor_id uuid primary key default gen_random_uuid(),
  program_id smallint not null references programs(program_id),
  registered_by uuid references staff(id),
  first_name text not null,
  last_name text not null,
  contact_num text,
  prescreening_notes text,
  consent_doc_url text,
  created_at timestamptz not null default now()
);

-- ============ Collection -> Batch -> Inventory -> Transaction lifecycle ============
create table collection_logs (
  collection_id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references staff(id),
  donor_id uuid not null references donors(donor_id),
  program_id smallint not null references programs(program_id),
  collection_date date not null,
  volume_ml numeric not null check (volume_ml between 30 and 240),
  counseling_notes text,
  lactation_massage_min integer,
  bottle_label text,
  created_at timestamptz not null default now()
);

create table milk_batches (
  batch_id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references collection_logs(collection_id),
  pre_pasteurization_ml numeric,
  post_pasteurization_ml numeric,
  submitted_date date,
  result_date date,
  lab_result text,
  status text not null default 'pending' check (status in ('pending', 'ready_for_dispensing', 'discarded')),
  updated_at timestamptz not null default now()
);

create table inventory (
  inventory_id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references milk_batches(batch_id),
  volume_available_ml numeric not null default 0,
  last_updated timestamptz not null default now()
);

create table transactions (
  transaction_id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references beneficiaries(id),
  staff_id uuid not null references staff(id),
  inventory_id uuid not null references inventory(inventory_id),
  volume_dispensed_ml numeric not null,
  deposit_amount numeric,
  status text not null default 'completed' check (status in ('completed', 'cancelled')),
  transaction_date timestamptz not null default now()
);

-- ============ Row Level Security ============
alter table programs enable row level security;
alter table profiles enable row level security;
alter table staff enable row level security;
alter table beneficiaries enable row level security;
alter table donors enable row level security;
alter table collection_logs enable row level security;
alter table milk_batches enable row level security;
alter table inventory enable row level security;
alter table transactions enable row level security;

-- Anyone logged in (staff or beneficiary) can read the program list.
create policy "read_programs" on programs for select using (auth.role() = 'authenticated');

-- Profiles: see your own row, or any row if you're staff.
create policy "profiles_self_select" on profiles for select using (id = auth.uid());
create policy "profiles_staff_select" on profiles for select using (public.is_staff());

-- Staff directory: staff only.
create policy "staff_select" on staff for select using (public.is_staff());

-- Beneficiaries: self-access to your own record, full access for staff.
create policy "beneficiaries_self_select" on beneficiaries for select using (id = auth.uid());
create policy "beneficiaries_self_insert" on beneficiaries for insert with check (id = auth.uid());
create policy "beneficiaries_self_update" on beneficiaries for update using (id = auth.uid());
create policy "beneficiaries_staff_all" on beneficiaries for all using (public.is_staff()) with check (public.is_staff());

-- Donors: staff only. Beneficiaries have no business reason to see donor PII.
create policy "donors_staff_all" on donors for all using (public.is_staff()) with check (public.is_staff());

-- Collection + lab data: staff only (operational/sensitive).
create policy "collection_logs_staff_all" on collection_logs for all using (public.is_staff()) with check (public.is_staff());
create policy "milk_batches_staff_all" on milk_batches for all using (public.is_staff()) with check (public.is_staff());

-- Inventory: staff manage it; beneficiaries can read it (for availability checks).
create policy "inventory_staff_all" on inventory for all using (public.is_staff()) with check (public.is_staff());
create policy "inventory_beneficiary_select" on inventory for select using (auth.role() = 'authenticated');

-- Transactions: staff manage everything; beneficiaries see only their own (their "transaction logs" tab).
create policy "transactions_staff_all" on transactions for all using (public.is_staff()) with check (public.is_staff());
create policy "transactions_beneficiary_select" on transactions for select using (beneficiary_id = auth.uid());