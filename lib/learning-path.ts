import type { LearningEvent, ReviewCard } from './learning.ts';

export const dailyJourneyStages = [
  { id: 'vocabulary', icon: '词', title: 'Vocabulary warm-up', copy: 'Recall useful words from your current level.' },
  { id: 'listening', icon: '听', title: 'Listening check', copy: 'Hear Mandarin before looking for meaning.' },
  { id: 'sentence', icon: '句', title: 'Sentence building', copy: 'Choose natural grammar and word order.' },
  { id: 'game', icon: '游', title: 'Mini-game challenge', copy: 'Apply the weakest skill in a short challenge.' },
  { id: 'review', icon: '复', title: 'Review & wrap-up', copy: 'Strengthen misses and save today’s evidence.' },
] as const;

export type DailyJourneyStage = (typeof dailyJourneyStages)[number];
export type MasteryStatus = 'New' | 'Learning' | 'Familiar' | 'Mastered' | 'Needs review';

export function dailyJourneyStageIndex(questionIndex: number, questionCount: number): number {
  if (questionCount <= 1) return 0;
  return Math.min(4, Math.floor((Math.max(0, questionIndex) / questionCount) * 5));
}

export function masteryStatus(card: ReviewCard | undefined, now = new Date()): MasteryStatus {
  if (!card || card.repetitions === 0) return 'New';
  if (Date.parse(card.dueAt) <= now.getTime()) return 'Needs review';
  if (card.mastery < 40) return 'Learning';
  if (card.mastery < 75) return 'Familiar';
  return 'Mastered';
}

export function masterySummary(wordIds: string[], cards: Record<string, ReviewCard>, now = new Date()): Record<MasteryStatus, number> {
  const summary: Record<MasteryStatus, number> = {
    New: 0,
    Learning: 0,
    Familiar: 0,
    Mastered: 0,
    'Needs review': 0,
  };
  for (const id of wordIds) summary[masteryStatus(cards[id], now)] += 1;
  return summary;
}

export type LearningRecommendation = {
  id: 'mistakes' | 'reviews' | 'listening' | 'grammar' | 'hanzi' | 'speaking' | 'adventure';
  title: string;
  reason: string;
  destination: 'Review' | 'Games' | 'Learn' | 'Adventure';
  action: string;
  icon: string;
};

export function smartLearningRecommendation(input: {
  dueReviews: number;
  dueMistakes: number;
  weakestSkill: LearningEvent['skill'];
  currentChapterTitle: string;
  chapterProgress: number;
}): LearningRecommendation {
  if (input.dueMistakes > 0) return { id: 'mistakes', icon: '错', title: 'Repair recent mistakes', reason: `${input.dueMistakes} mistake${input.dueMistakes === 1 ? '' : 's'} can be corrected before they settle into memory.`, destination: 'Review', action: 'Review mistakes' };
  if (input.dueReviews >= 10) return { id: 'reviews', icon: '复', title: 'Recover words before they fade', reason: `${input.dueReviews} spaced reviews are due now, so recall gives the highest learning return.`, destination: 'Review', action: 'Start smart review' };
  if (input.weakestSkill === 'Listening') return { id: 'listening', icon: '听', title: 'Train listening next', reason: 'Listening has the least recent evidence. A short audio game will rebalance today’s practice.', destination: 'Games', action: 'Open listening game' };
  if (input.weakestSkill === 'Grammar' || input.weakestSkill === 'Reading') return { id: 'grammar', icon: '句', title: `Strengthen ${input.weakestSkill.toLowerCase()}`, reason: 'A contextual HSK lesson targets the skill with the weakest evidence.', destination: 'Learn', action: 'Open guided lesson' };
  if (input.weakestSkill === 'Hanzi') return { id: 'hanzi', icon: '字', title: 'Strengthen Hanzi recognition', reason: 'Character evidence is behind your other skills. Practice components and recall next.', destination: 'Learn', action: 'Open Hanzi practice' };
  if (input.weakestSkill === 'Speaking') return { id: 'speaking', icon: '说', title: 'Use Mandarin out loud', reason: 'Speaking has the least evidence. A production activity is the best next step.', destination: 'Learn', action: 'Open speaking practice' };
  return { id: 'adventure', icon: '游', title: `Continue ${input.currentChapterTitle}`, reason: input.chapterProgress ? `You are ${input.chapterProgress}% through this chapter. Continue from the exact saved stage.` : 'Your next real-life chapter is ready to begin.', destination: 'Adventure', action: input.chapterProgress ? 'Continue chapter' : 'Start chapter' };
}
