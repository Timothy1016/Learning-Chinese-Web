create table if not exists public.learning_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.learning_snapshots enable row level security;
revoke all on table public.learning_snapshots from anon, authenticated;
grant select, insert, update, delete on table public.learning_snapshots to authenticated;

drop policy if exists "Learners can read their own snapshot" on public.learning_snapshots;
create policy "Learners can read their own snapshot" on public.learning_snapshots for select to authenticated
using (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Learners can create their own snapshot" on public.learning_snapshots;
create policy "Learners can create their own snapshot" on public.learning_snapshots for insert to authenticated
with check (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Learners can update their own snapshot" on public.learning_snapshots;
create policy "Learners can update their own snapshot" on public.learning_snapshots for update to authenticated
using (auth.uid() is not null and auth.uid() = user_id)
with check (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Learners can delete their own snapshot" on public.learning_snapshots;
create policy "Learners can delete their own snapshot" on public.learning_snapshots for delete to authenticated
using (auth.uid() is not null and auth.uid() = user_id);

create or replace function public.touch_learning_snapshot_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists learning_snapshots_touch_updated_at on public.learning_snapshots;
create trigger learning_snapshots_touch_updated_at before update on public.learning_snapshots
for each row execute function public.touch_learning_snapshot_updated_at();
