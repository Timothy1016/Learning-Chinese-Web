import type { LearningEvent, ReviewCard } from "./learning.ts";
import type { Mistake } from "./mistakes.ts";
import { masteryStatus, type MasteryStatus } from "./learning-path.ts";

export type MistakePattern = {
  skill: LearningEvent["skill"];
  count: number;
  repeated: number;
  label: string;
  action: string;
};

export function analyzeMistakePatterns(mistakes: Mistake[]): MistakePattern[] {
  const skills: LearningEvent["skill"][] = [
    "Vocabulary",
    "Grammar",
    "Listening",
    "Reading",
    "Hanzi",
    "Speaking",
  ];
  return skills
    .map((skill) => {
      const related = mistakes.filter((mistake) => mistake.skill === skill);
      const repeated = related.reduce(
        (total, mistake) => total + Math.max(0, (mistake.errorCount ?? 1) - 1),
        0,
      );
      return {
        skill,
        count: related.length,
        repeated,
        label:
          skill === "Vocabulary"
            ? "Meaning and word choice"
            : skill === "Grammar"
              ? "Sentence order and patterns"
              : skill === "Listening"
                ? "Sound-to-meaning recognition"
                : skill === "Reading"
                  ? "Context and inference"
                  : skill === "Hanzi"
                    ? "Similar characters and radicals"
                    : "Recall while speaking",
        action: `Practice ${skill.toLowerCase()}`,
      };
    })
    .filter((pattern) => pattern.count > 0)
    .sort((left, right) => right.count + right.repeated - left.count - left.repeated);
}

export function masteryDetail(card: ReviewCard | undefined, now = new Date()) {
  const status = masteryStatus(card, now);
  const dueAt = card?.dueAt ? new Date(card.dueAt) : null;
  const nextReview =
    !dueAt || status === "New"
      ? "After your first recall"
      : dueAt.getTime() <= now.getTime()
        ? "Due now"
        : dueAt.toLocaleDateString("en", { month: "short", day: "numeric" });
  return {
    status,
    mastery: card?.mastery ?? 0,
    repetitions: card?.repetitions ?? 0,
    intervalDays: card?.intervalDays ?? 0,
    nextReview,
  };
}

export function weeklyLearningReport(input: {
  events: LearningEvent[];
  cards: Record<string, ReviewCard>;
  mistakes: Mistake[];
  now?: Date;
}) {
  const now = input.now ?? new Date();
  const start = now.getTime() - 7 * 86_400_000;
  const events = input.events.filter(
    (event) => new Date(event.createdAt).getTime() >= start,
  );
  const statuses = Object.values(input.cards).reduce<Record<MasteryStatus, number>>(
    (summary, card) => {
      summary[masteryStatus(card, now)]++;
      return summary;
    },
    { New: 0, Learning: 0, Familiar: 0, Mastered: 0, "Needs review": 0 },
  );
  const patterns = analyzeMistakePatterns(input.mistakes);
  return {
    activities: events.length,
    accuracy: Math.round(
      (events.filter((event) => event.correct).length / Math.max(1, events.length)) *
        100,
    ),
    activeDays: new Set(events.map((event) => event.createdAt.slice(0, 10))).size,
    mastered: statuses.Mastered,
    needsReview: statuses["Needs review"],
    topPattern: patterns[0] ?? null,
  };
}

export function speakingFeedback(
  phraseCoverage: number,
  recognizerConfidence: number,
  matchedCharacters: number,
  totalCharacters: number,
) {
  const completeness = Math.round(
    (matchedCharacters / Math.max(1, totalCharacters)) * 100,
  );
  const clarity = Math.round((phraseCoverage * 0.65 + recognizerConfidence * 0.35));
  const fluency = Math.round((phraseCoverage + completeness) / 2);
  return {
    pronunciation: Math.max(0, Math.min(100, clarity)),
    completeness: Math.max(0, Math.min(100, completeness)),
    fluency: Math.max(0, Math.min(100, fluency)),
    toneCue:
      phraseCoverage >= 80
        ? "Shadow once more and copy the model’s tone movement."
        : "Slow down and repeat each tone group after the model.",
  };
}

export function placementDecision(
  results: { level: number; correct: boolean }[],
  currentLevel: number,
) {
  if (!results.length)
    return { nextLevel: currentLevel, stop: false, confidence: 0 };
  const latest = results.at(-1)!;
  const nextLevel = latest.correct
    ? Math.min(6, latest.level + 1)
    : Math.max(1, latest.level - 1);
  const recent = results.slice(-3);
  const stable =
    recent.length === 3 &&
    (recent.every((result) => result.correct) ||
      recent.every((result) => !result.correct));
  const testedLevels = new Set(results.map((result) => result.level)).size;
  return {
    nextLevel,
    stop: results.length >= 7 || (results.length >= 4 && stable),
    confidence: Math.min(95, 40 + results.length * 7 + testedLevels * 4),
  };
}
