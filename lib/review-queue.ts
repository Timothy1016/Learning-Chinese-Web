const FILLER_WORDS = new Set(['a', 'an', 'the', 'to', 'of', 'be', 'is', 'are']);

export function normalizeRecall(value: string): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\u3400-\u9fff]+/g, ' ')
    .split(/\s+/)
    .filter(token => token && !FILLER_WORDS.has(token))
    .join(' ')
    .trim();
}

export function recallMatches(answer: string, meaning: string): boolean {
  const attempt = normalizeRecall(answer);
  if (!attempt) return false;
  const accepted = meaning
    .split(/[;/,]|\bor\b/i)
    .map(normalizeRecall)
    .filter(Boolean);
  return accepted.some(candidate => candidate === attempt || (attempt.length >= 4 && candidate.includes(attempt)) || (candidate.length >= 4 && attempt.includes(candidate)));
}

export function advanceRecallQueue(queue: string[], wordId: string, correct: boolean): string[] {
  const remaining = queue.filter(id => id !== wordId);
  return correct ? remaining : [...remaining, wordId];
}
