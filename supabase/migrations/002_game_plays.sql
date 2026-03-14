-- Total games played: one row per "New Game" click (round started).
-- user_id = NextAuth user id (stable per account).

create table if not exists public.game_plays (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  played int8 not null
);

create index if not exists idx_game_plays_user_id on public.game_plays (user_id);

comment on table public.game_plays is 'Count of rounds started (New Game clicks) per user';
