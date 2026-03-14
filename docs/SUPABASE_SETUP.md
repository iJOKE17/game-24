# Supabase setup for game stats

User stats (games played, rounds won, best time, streak) are stored in Supabase when users are logged in.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. In **Project Settings → API** copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`

Never expose the service role key to the client; it is only used in Server Actions.

## 2. Environment variables

Add to `.env` (see `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## 3. Create the tables

In the Supabase dashboard open **SQL Editor** and run both migrations.

**Wins (when user makes 24):** `supabase/migrations/001_game_records.sql`

```sql
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
```

**Total games played (each "New Game" click):** `supabase/migrations/002_game_plays.sql`

```sql
create table if not exists public.game_plays (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  played int8 not null
);
create index if not exists idx_game_plays_user_id on public.game_plays (user_id);
```

Or run the contents of both migration files.

- **`game_plays`** — one row per "New Game" click (total games started per user).
- **`game_records`** — one row per win (user made 24); used for rounds won, best time, and streak.

## 4. Optional: RLS (Row Level Security)

The app uses the **service role** key in Server Actions, which bypasses RLS. If you prefer to use the anon key and RLS instead, add a policy so users can only read/write rows where `user_id` matches their session (e.g. JWT claim or passed from NextAuth).

## Without Supabase

If you leave the Supabase env vars unset, the app still runs: plays and wins are not saved to the cloud, and the stats page shows "—" for all values (and may show "Supabase not configured").
