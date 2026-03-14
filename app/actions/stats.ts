"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getSupabaseServer } from "@/lib/supabase/server";

export type UserStats = {
  gamesPlayed: number;
  roundsWon: number;
  bestTimeSec: number | null;
  currentStreak: number;
};

/** Record that the user started a new game (clicked "New Game"). No-op if not logged in. */
export async function recordGamePlay() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email;
  if (!userId) return { ok: false, error: "Not logged in" };

  try {
    const supabase = getSupabaseServer();
    if (!supabase) return { ok: false, error: "Supabase not configured" };
    // Fetch current played value for userId and increment by 1 (or set to 1 if not found)
    const { data: current, error: fetchError } = await supabase
      .from("game_plays")
      .select("played")
      .eq("user_id", userId)
      .single();

    let newPlayed = 1;
    if (current && typeof current.played === "number") {
      newPlayed = current.played + 1;
    }

    let error;
    if (current) {
      // Update existing row
      ({ error } = await supabase
        .from("game_plays")
        .update({ played: newPlayed })
        .eq("user_id", userId));
    } else {
      // Insert new row
      ({ error } = await supabase
        .from("game_plays")
        .insert({ user_id: userId, played: newPlayed }));
    }
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to save";
    return { ok: false, error: message };
  }
}

/** Record a win (user made 24). No-op if not logged in. */
export async function recordGameWin(payload: {
  timeInSec: number;
  numbers: number[];
  expression: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email;
  if (!userId) return { ok: false, error: "Not logged in" };

  try {
    const supabase = getSupabaseServer();
    if (!supabase) return { ok: false, error: "Supabase not configured" };
    const { error } = await supabase.from("game_records").insert({
      user_id: userId,
      time_in_sec: payload.timeInSec,
      numbers: payload.numbers,
      expression: payload.expression,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to save";
    return { ok: false, error: message };
  }
}

/** Get aggregated stats for the current user. */
export async function getUserStats(): Promise<{
  stats: UserStats | null;
  error?: string;
}> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email;
  if (!userId) return { stats: null };

  try {
    const supabase = getSupabaseServer();
    if (!supabase) return { stats: null, error: "Supabase not configured" };

    // Total games played (sum of "played" in game_plays for user)
    const { data: playsRows, error: playsError } = await supabase
      .from("game_plays")
      .select("played")
      .eq("user_id", userId);

    if (playsError) return { stats: null, error: playsError.message };
    const gamesPlayed = Array.isArray(playsRows)
      ? playsRows.reduce((sum, row) => sum + (row.played ?? 0), 0)
      : 0;

    // Wins and best time from game_records
    const { data: rows, error } = await supabase
      .from("game_records")
      .select("time_in_sec, completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false });

    if (error) return { stats: null, error: error.message };

    const roundsWon = rows?.length ?? 0;
    const bestTimeSec =
      roundsWon > 0 && rows?.length
        ? Math.min(...rows.map((r) => r.time_in_sec))
        : null;

    const completedDates = (rows ?? []).map((r) =>
      new Date(r.completed_at).toDateString(),
    );
    const uniqueDaysDesc: string[] = [];
    const seen = new Set<string>();
    for (const d of completedDates) {
      if (!seen.has(d)) {
        seen.add(d);
        uniqueDaysDesc.push(d);
      }
    }
    const today = new Date().toDateString();
    let currentStreak = 0;
    for (let i = 0; i < uniqueDaysDesc.length; i++) {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      if (uniqueDaysDesc[i] === expected.toDateString()) currentStreak++;
      else break;
    }

    return {
      stats: {
        gamesPlayed,
        roundsWon,
        bestTimeSec,
        currentStreak,
      },
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load stats";
    return { stats: null, error: message };
  }
}
