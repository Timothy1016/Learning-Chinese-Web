export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export type ReviewCard = {
  wordId: string;
  dueAt: string;
  intervalDays: number;
  ease: number;
  repetitions: number;
  mastery: number;
};

export type LearningEvent = {
  id: string;
  type: 'lesson' | 'review' | 'game' | 'story' | 'speaking' | 'placement';
  skill: 'Vocabulary' | 'Listening' | 'Reading' | 'Grammar' | 'Hanzi' | 'Speaking';
  correct: boolean;
  xp: number;
  createdAt: string;
};

export type SkillEvidence = {
  score: number;
  attempts: number;
  correct: number;
  accuracy: number;
  activeDays: number;
  spanDays: number;
  activityTypes: number;
  evidencePercent: number;
  status: 'Unassessed' | 'Foundation' | 'Developing' | 'Emerging' | 'Consistent' | 'Strong' | 'Reliable';
  nextMilestone: string;
  daysSincePractice: number;
};

const DAY = 86_400_000;

export function localDateKey(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calendarDayDifference(fromDate: string, toDate: string): number {
  return Math.round((Date.parse(`${toDate}T12:00:00`) - Date.parse(`${fromDate}T12:00:00`)) / DAY);
}

export function scheduleReview(card: ReviewCard, rating: ReviewRating, now = new Date()): ReviewCard {
  let intervalDays = card.intervalDays;
  let ease = card.ease;
  let mastery = card.mastery;
  let delayMs = DAY;
  if (rating === 'again') { intervalDays = 0; ease = Math.max(1.3, ease - .2); mastery = Math.max(0, mastery - 12); delayMs = 10 * 60_000; }
  if (rating === 'hard') { intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2)); ease = Math.max(1.3, ease - .08); mastery = Math.min(100, mastery + 3); delayMs = intervalDays * DAY; }
  if (rating === 'good') { intervalDays = intervalDays ? Math.max(2, Math.round(intervalDays * ease)) : 2; mastery = Math.min(100, mastery + 9); delayMs = intervalDays * DAY; }
  if (rating === 'easy') { intervalDays = intervalDays ? Math.max(4, Math.round(intervalDays * (ease + 1))) : 4; ease = Math.min(3, ease + .12); mastery = Math.min(100, mastery + 15); delayMs = intervalDays * DAY; }
  return { ...card, dueAt: new Date(now.getTime() + delayMs).toISOString(), intervalDays, ease, mastery, repetitions: card.repetitions + 1 };
}

export function createReviewCards(wordIds: string[], now = new Date()): Record<string, ReviewCard> {
  return Object.fromEntries(wordIds.map((wordId, index) => [wordId, { wordId, dueAt: new Date(now.getTime() - (index + 1) * 60_000).toISOString(), intervalDays: 0, ease: 2.5, repetitions: 0, mastery: 10 }]));
}

export function dueReviewIds(cards: Record<string, ReviewCard>, now = new Date()): string[] {
  return Object.values(cards).filter(card => new Date(card.dueAt).getTime() <= now.getTime()).sort((a, b) => a.dueAt.localeCompare(b.dueAt)).map(card => card.wordId);
}

export function awardXpOnce(existingKeys: string[], activityId: string, baseXp: number, now = new Date()): { xp: number; key: string } {
  const day = localDateKey(now);
  const key = `${day}:${activityId}`;
  return { xp: existingKeys.includes(key) ? 0 : baseXp, key };
}

export function updateStreak(lastActiveDate: string, currentStreak: number, now = new Date()): { streak: number; lastActiveDate: string } {
  const today = now.toISOString().slice(0, 10);
  if (!lastActiveDate) return { streak: 1, lastActiveDate: today };
  if (lastActiveDate === today) return { streak: currentStreak, lastActiveDate };
  const difference = Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${lastActiveDate}T00:00:00Z`)) / DAY);
  return { streak: difference === 1 ? currentStreak + 1 : 1, lastActiveDate: today };
}

export function streakGapStatus(lastActiveDate: string, now = new Date()): { missedDays: number; needsRescue: boolean } {
  if (!lastActiveDate) return { missedDays: 0, needsRescue: false };
  const missedDays = Math.max(0, calendarDayDifference(lastActiveDate, localDateKey(now)) - 1);
  return { missedDays, needsRescue: missedDays >= 3 };
}

export function updateStreakWithGrace(lastActiveDate: string, currentStreak: number, now = new Date()): { streak: number; lastActiveDate: string; protectedByGrace: boolean } {
  const today = localDateKey(now);
  if (!lastActiveDate) return { streak: 1, lastActiveDate: today, protectedByGrace: false };
  if (lastActiveDate === today) return { streak: currentStreak, lastActiveDate, protectedByGrace: false };
  const difference = calendarDayDifference(lastActiveDate, today);
  if (difference <= 3) return { streak: currentStreak + 1, lastActiveDate: today, protectedByGrace: difference > 1 };
  return { streak: 1, lastActiveDate: today, protectedByGrace: false };
}

export function getLevelProgress(totalXp: number): { level: number; levelStartXp: number; nextLevelXp: number; earnedThisLevel: number; requiredThisLevel: number; remainingXp: number; progress: number } {
  let level = 1;
  let levelStartXp = 0;
  let requiredThisLevel = 400;
  while (totalXp >= levelStartXp + requiredThisLevel) {
    levelStartXp += requiredThisLevel;
    level += 1;
    requiredThisLevel = 400 + (level - 1) * 150;
  }
  const earnedThisLevel = Math.max(0, totalXp - levelStartXp);
  return { level, levelStartXp, nextLevelXp: levelStartXp + requiredThisLevel, earnedThisLevel, requiredThisLevel, remainingXp: Math.max(0, requiredThisLevel - earnedThisLevel), progress: Math.min(100, Math.round(earnedThisLevel / requiredThisLevel * 100)) };
}

const SKILLS: LearningEvent['skill'][] = ['Vocabulary', 'Listening', 'Reading', 'Grammar', 'Hanzi', 'Speaking'];

function skillStatus(score: number, attempts: number): SkillEvidence['status'] {
  if (!attempts) return 'Unassessed';
  if (score < 20) return 'Foundation';
  if (score < 40) return 'Developing';
  if (score < 60) return 'Emerging';
  if (score < 75) return 'Consistent';
  if (score < 88) return 'Strong';
  return 'Reliable';
}

function nextSkillMilestone(attempts: number, activeDays: number, spanDays: number, activityTypes: number, accuracy: number): string {
  if (attempts < 20) return `Complete ${20 - attempts} more scored attempts`;
  if (activeDays < 7) return `Practice on ${7 - activeDays} more different days`;
  if (spanDays < 14) return `Keep practicing across ${14 - spanDays} more days`;
  if (activityTypes < 3) return `Use ${3 - activityTypes} more activity ${3 - activityTypes === 1 ? 'type' : 'types'}`;
  if (accuracy < 75) return 'Raise sustained accuracy above 75%';
  if (attempts < 50) return `Reach 50 attempts (${50 - attempts} to go)`;
  if (activeDays < 21) return `Practice on ${21 - activeDays} more different days`;
  if (spanDays < 45) return `Sustain this skill across ${45 - spanDays} more days`;
  return 'Maintain accuracy with spaced weekly practice';
}

export function calculateSkillEvidence(events: LearningEvent[], referenceDate?: Date | string): Record<LearningEvent['skill'], SkillEvidence> {
  const validTimes = events.map(event => Date.parse(event.createdAt)).filter(Number.isFinite);
  const suppliedReference = referenceDate instanceof Date ? referenceDate.getTime() : referenceDate ? Date.parse(referenceDate) : Number.NaN;
  const referenceTime = Number.isFinite(suppliedReference) ? suppliedReference : validTimes.length ? Math.max(...validTimes) : 0;

  return Object.fromEntries(SKILLS.map(skill => {
    const skillEvents = events.filter(event => event.skill === skill && Number.isFinite(Date.parse(event.createdAt)));
    const attempts = skillEvents.length;
    if (!attempts) {
      return [skill, { score: 0, attempts: 0, correct: 0, accuracy: 0, activeDays: 0, spanDays: 0, activityTypes: 0, evidencePercent: 0, status: 'Unassessed', nextMilestone: 'Complete 20 scored attempts', daysSincePractice: 0 } satisfies SkillEvidence];
    }

    const correct = skillEvents.filter(event => event.correct).length;
    const accuracy = Math.round(correct / attempts * 100);
    const activeDays = new Set(skillEvents.map(event => event.createdAt.slice(0, 10))).size;
    const activityTypes = new Set(skillEvents.map(event => event.type)).size;
    const eventTimes = skillEvents.map(event => Date.parse(event.createdAt));
    const firstPractice = Math.min(...eventTimes);
    const lastPractice = Math.max(...eventTimes);
    const spanDays = Math.max(1, Math.floor((lastPractice - firstPractice) / DAY) + 1);
    const daysSincePractice = Math.max(0, Math.floor((referenceTime - lastPractice) / DAY));

    // A moderate prior and four separate evidence dimensions prevent short bursts
    // from being mistaken for durable language ability.
    const adjustedAccuracy = (correct + 7.2) / (attempts + 12);
    const evidenceFactor = Math.min(1, attempts / 100) * .35
      + Math.min(1, activeDays / 30) * .30
      + Math.min(1, spanDays / 60) * .20
      + Math.min(1, activityTypes / 4) * .15;
    const recencyFactor = daysSincePractice <= 14 ? 1 : Math.max(.72, 1 - (daysSincePractice - 14) * .006);
    const score = Math.max(0, Math.min(96, Math.round((5 + 92 * adjustedAccuracy * evidenceFactor) * recencyFactor)));

    return [skill, {
      score,
      attempts,
      correct,
      accuracy,
      activeDays,
      spanDays,
      activityTypes,
      evidencePercent: Math.round(evidenceFactor * 100),
      status: skillStatus(score, attempts),
      nextMilestone: nextSkillMilestone(attempts, activeDays, spanDays, activityTypes, accuracy),
      daysSincePractice,
    } satisfies SkillEvidence];
  })) as Record<LearningEvent['skill'], SkillEvidence>;
}

export function calculateSkillScores(events: LearningEvent[], referenceDate?: Date | string): Record<LearningEvent['skill'], number> {
  const evidence = calculateSkillEvidence(events, referenceDate);
  return Object.fromEntries(SKILLS.map(skill => [skill, evidence[skill].score])) as Record<LearningEvent['skill'], number>;
}

export function recommendHsk(results: { level: number; correct: boolean }[]): number {
  const highestSolid = results.filter(result => result.correct).reduce((highest, result) => Math.max(highest, result.level), 1);
  const accuracy = results.filter(result => result.correct).length / Math.max(1, results.length);
  return Math.max(1, Math.min(6, accuracy >= .8 ? highestSolid + 1 : highestSolid));
}
