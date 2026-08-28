import type { LearningEvent } from './learning';

type VocabularySeed = {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example: { hanzi: string; pinyin: string; english: string };
};

type PracticeSeed = { prompt: string; choices: string[]; answer: string; explanation: string };

export type DailySessionQuestion = PracticeSeed & {
  id: string;
  skill: LearningEvent['skill'];
  kind: 'warmup' | 'listening' | 'hsk' | 'hanzi' | 'specialization';
  eyebrow: string;
  audio?: string;
  reviewWordId?: string;
};

export type DailySessionPlan = {
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  weakestSkill: LearningEvent['skill'];
  questions: DailySessionQuestion[];
  skillMix: LearningEvent['skill'][];
};

export type DailySessionAnswer = { question: DailySessionQuestion; selected: string; correct: boolean };

export type DailySessionInput = {
  dayKey: string;
  dailyMinutes: number;
  hsk: number;
  path: string;
  career: string;
  weakestSkill: LearningEvent['skill'];
  chapter: {
    id: string;
    title: string;
    chinese: string;
    vocabulary: VocabularySeed[];
    question: {
      prompt: string;
      chinesePrompt: string;
      choices: { id: string; text: string; pinyin: string }[];
      answer: string;
      explanation: string;
    };
  };
  hskQuestions: PracticeSeed[];
  specializationQuestions: PracticeSeed[];
};

export function dailySessionQuestionCount(dailyMinutes: number): number {
  if (dailyMinutes <= 5) return 5;
  if (dailyMinutes <= 10) return 7;
  if (dailyMinutes <= 20) return 9;
  return 10;
}

function dayOffset(dayKey: string, length: number): number {
  const hash = [...dayKey].reduce((total, character) => total + character.charCodeAt(0), 0);
  return length ? hash % length : 0;
}

function rotate<T>(items: T[], offset: number): T[] {
  if (!items.length) return [];
  const normalized = offset % items.length;
  return [...items.slice(normalized), ...items.slice(0, normalized)];
}

export function buildDailySession(input: DailySessionInput): DailySessionPlan {
  const { chapter } = input;
  const offset = dayOffset(input.dayKey, chapter.vocabulary.length);
  const words = rotate(chapter.vocabulary, offset);
  const correctChoice = chapter.question.choices.find(choice => choice.id === chapter.question.answer);
  const chapterChoices = chapter.question.choices.map(choice => choice.text);

  const vocabularyQuestions: DailySessionQuestion[] = words.map((word, index) => ({
    id: `daily-${input.dayKey}-vocabulary-${word.id}`,
    kind: 'warmup',
    eyebrow: index ? 'ACTIVE RECALL' : 'EASY START',
    skill: 'Vocabulary',
    prompt: `Which word means “${word.english}”?`,
    choices: rotate(words.map(item => item.hanzi), index),
    answer: word.hanzi,
    explanation: `${word.hanzi} · ${word.pinyin} means “${word.english}.” ${word.example.hanzi}`,
    reviewWordId: word.id,
  }));

  const listeningQuestion: DailySessionQuestion = {
    id: `daily-${input.dayKey}-listening-${chapter.id}`,
    kind: 'listening',
    eyebrow: 'LISTEN FIRST · NO TRANSCRIPT',
    skill: 'Listening',
    prompt: chapter.question.prompt,
    choices: chapterChoices,
    answer: correctChoice?.text ?? chapterChoices[0],
    explanation: chapter.question.explanation,
    audio: chapter.question.chinesePrompt,
  };

  const hskQuestions: DailySessionQuestion[] = rotate(input.hskQuestions, offset).map((question, index) => ({
    ...question,
    id: `daily-${input.dayKey}-hsk-${input.hsk}-${index}`,
    kind: 'hsk',
    eyebrow: `HSK ${input.hsk} · ${index % 2 ? 'READING' : 'GRAMMAR'}`,
    skill: index % 2 ? 'Reading' : 'Grammar',
  }));

  const hanziWord = words[0];
  const hanziQuestion: DailySessionQuestion = {
    id: `daily-${input.dayKey}-hanzi-${hanziWord.id}`,
    kind: 'hanzi',
    eyebrow: 'HANZI RECOGNITION',
    skill: 'Hanzi',
    prompt: `Choose the Hanzi written as “${hanziWord.pinyin}”.`,
    choices: words.map(word => word.hanzi),
    answer: hanziWord.hanzi,
    explanation: `${hanziWord.hanzi} is written ${hanziWord.pinyin} and means “${hanziWord.english}.”`,
    reviewWordId: hanziWord.id,
  };

  const specializationQuestions: DailySessionQuestion[] = rotate(input.specializationQuestions, offset).map((question, index) => ({
    ...question,
    id: `daily-${input.dayKey}-specialization-${index}`,
    kind: 'specialization',
    eyebrow: `${input.career.toUpperCase()} · REAL-LIFE CHOICE`,
    skill: input.path === 'Computer Science' ? 'Grammar' : 'Speaking',
  }));

  const pool = [
    vocabularyQuestions[0],
    listeningQuestion,
    hskQuestions[0],
    specializationQuestions[0],
    hanziQuestion,
    vocabularyQuestions[1],
    hskQuestions[1],
    specializationQuestions[1],
    vocabularyQuestions[2],
    hskQuestions[2],
    specializationQuestions[2],
  ].filter((question): question is DailySessionQuestion => Boolean(question));

  const weakestIndex = pool.findIndex((question, index) => index > 0 && question.skill === input.weakestSkill);
  if (weakestIndex > 1) {
    const [weakestQuestion] = pool.splice(weakestIndex, 1);
    pool.splice(1, 0, weakestQuestion);
  }

  const questionCount = Math.min(dailySessionQuestionCount(input.dailyMinutes), pool.length);
  const questions = pool.slice(0, questionCount);
  return {
    title: `${chapter.chinese} · Today’s learning mix`,
    subtitle: `HSK ${input.hsk} · ${input.career} · extra ${input.weakestSkill.toLowerCase()} evidence`,
    estimatedMinutes: Math.max(5, Math.min(input.dailyMinutes, Math.ceil(questions.length * 1.4))),
    weakestSkill: input.weakestSkill,
    questions,
    skillMix: [...new Set(questions.map(question => question.skill))],
  };
}

export function createDailySessionEvents(results: DailySessionAnswer[], createdAt: Date, awardedXp: number): LearningEvent[] {
  return results.map((result, index) => ({
    id: `daily:${createdAt.toISOString().slice(0, 10)}:${result.question.id}:${index}`,
    type: result.question.kind === 'specialization' ? 'game' : 'lesson',
    skill: result.question.skill,
    correct: result.correct,
    xp: index === 0 ? awardedXp : 0,
    createdAt: new Date(createdAt.getTime() + index).toISOString(),
  }));
}

export function dailySessionReviewWordIds(results: DailySessionAnswer[]): string[] {
  return [...new Set(results.filter(result => !result.correct).map(result => result.question.reviewWordId).filter((wordId): wordId is string => Boolean(wordId)))];
}
