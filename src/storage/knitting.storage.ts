import type { KnitSession } from '@/models/knit';

const knittingKey = 'stitch-patterns-knitting-session';

export function getKnittingSession(): KnitSession | null {
  const result = localStorage.getItem(knittingKey);
  if (!result) return null;
  return JSON.parse(result!);
}

export function saveKnittingSession(session: KnitSession | null): void {
  localStorage.setItem(knittingKey, JSON.stringify(session));
}
