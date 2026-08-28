export const CHECK_IN_MILESTONES = [7, 20, 40, 80] as const;

const DAY = 86_400_000;
function localDateKey(now = new Date()): string { return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
function calendarDayDifference(fromDate:string,toDate:string):number{return Math.round((Date.parse(`${toDate}T12:00:00`)-Date.parse(`${fromDate}T12:00:00`))/DAY)}

export type CheckInResult = {
  dates: string[];
  claimedMilestones: number[];
  added: boolean;
  day: number;
  rewardDiamonds: number;
  unlockedMilestone: number | null;
  multiplier: number;
};

const MILESTONE_REWARDS: Record<number, number> = { 7: 20, 20: 30, 40: 50, 80: 100 };

export function consecutiveCheckInDays(dates: string[], today = localDateKey()): number {
  const unique = [...new Set(dates)].filter(date => date <= today).sort().reverse();
  if (!unique.length || calendarDayDifference(unique[0], today) > 1) return 0;
  let count = 1;
  for (let index = 1; index < unique.length; index += 1) {
    if (calendarDayDifference(unique[index], unique[index - 1]) !== 1) break;
    count += 1;
  }
  return count;
}

export function gameGemMultiplier(day: number): number {
  if (day >= 80) return 2.5;
  if (day >= 40) return 2;
  if (day >= 20) return 1.5;
  return 1;
}

export function recordDailyCheckIn(dates: string[], claimedMilestones: number[], now = new Date()): CheckInResult {
  const today = localDateKey(now);
  const added = !dates.includes(today);
  const nextDates = added ? [...new Set([...dates, today])].sort() : [...new Set(dates)].sort();
  const day = consecutiveCheckInDays(nextDates, today);
  const unlockedMilestone = added
    ? CHECK_IN_MILESTONES.find(milestone => milestone === day && !claimedMilestones.includes(milestone)) ?? null
    : null;
  const claimed = unlockedMilestone ? [...claimedMilestones, unlockedMilestone] : claimedMilestones;
  return {
    dates: nextDates,
    claimedMilestones: claimed,
    added,
    day,
    rewardDiamonds: unlockedMilestone ? MILESTONE_REWARDS[unlockedMilestone] : added ? 2 : 0,
    unlockedMilestone,
    multiplier: gameGemMultiplier(day),
  };
}

export function checkInMilestoneProgress(day: number): { next: number | null; remaining: number; progress: number } {
  const next = CHECK_IN_MILESTONES.find(milestone => milestone > day) ?? null;
  const previous = [...CHECK_IN_MILESTONES].reverse().find(milestone => milestone <= day) ?? 0;
  if (!next) return { next: null, remaining: 0, progress: 100 };
  return {
    next,
    remaining: next - day,
    progress: Math.round((day - previous) / (next - previous) * 100),
  };
}
