-- Game records: one row per round won (user made 24).
-- user_id = NextAuth user id (stable per account).

create table if not exists public.game_records (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  time_in_sec int not null,
  numbers int[] not null,
  expression text not null,
  completed_at timestamptz not null default now()
);

create index if not exists idx_game_records_user_id on public.game_records (user_id);
create index if not exists idx_game_records_completed_at on public.game_records (user_id, completed_at desc);

comment on table public.game_records is '24 game wins per user for stats';
