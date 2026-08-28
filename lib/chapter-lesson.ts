import type { LearningEvent } from './learning';

export type ChapterLessonResult = {
  stage: 'grammar' | 'listening' | 'production' | 'application';
  skill: LearningEvent['skill'];
  correct: boolean;
  prompt: string;
  answer: string;
  correction: string;
  explanation: string;
};

export function chapterStageProgress(step: number, totalStages = 6): number {
  return Math.max(0, Math.min(100, Math.round((step + 1) / totalStages * 100)));
}

export function createChapterLessonEvents(chapterId: string, results: ChapterLessonResult[], createdAt: Date, awardedXp: number): LearningEvent[] {
  const vocabularyEvent: LearningEvent = {
    id: `chapter:${chapterId}:vocabulary:${createdAt.getTime()}`,
    type: 'lesson',
    skill: 'Vocabulary',
    correct: true,
    xp: awardedXp,
    createdAt: createdAt.toISOString(),
  };
  return [vocabularyEvent, ...results.map((result, index) => ({
    id: `chapter:${chapterId}:${result.stage}:${createdAt.getTime() + index + 1}`,
    type: 'lesson' as const,
    skill: result.skill,
    correct: result.correct,
    xp: 0,
    createdAt: new Date(createdAt.getTime() + index + 1).toISOString(),
  }))];
}

export function chapterAccuracy(results: ChapterLessonResult[]): number {
  return Math.round(results.filter(result => result.correct).length / Math.max(1, results.length) * 100);
}
