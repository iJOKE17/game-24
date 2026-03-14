/**
 * Game history cache in localStorage.
 * Each finished game stores: timeInSec, numbers (for that turn), expression (user's solution).
 */

const STORAGE_KEY = "game24_history";

export interface GameRecord {
  timeInSec: number;
  numbers: number[];
  expression: string;
  /** ISO date string when the game was completed */
  completedAt: string;
}

export function getGameHistory(): GameRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGameRecord(record: Omit<GameRecord, "completedAt">): void {
  const full: GameRecord = {
    ...record,
    completedAt: new Date().toISOString(),
  };
  const history = getGameHistory();
  history.push(full);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // quota exceeded or disabled; ignore
  }
}

export function clearGameHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
