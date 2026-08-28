export type FlashcardStat = {
  seen: number;
  known: number;
  again: number;
  lastSeenAt: string;
  intervalDays?: number;
  dueAt?: string;
  ease?: number;
};

export type FlashcardStatus = 'unseen' | 'learning' | 'mastered';
export type FlashcardRating = 'again'|'hard'|'good'|'easy';

function addDays(now:Date,days:number){const due=new Date(now);due.setDate(due.getDate()+days);return due.toISOString()}

export function updateFlashcardStat(current: FlashcardStat | undefined, rating:FlashcardRating, now = new Date()): FlashcardStat {
  const previousInterval=current?.intervalDays??0;const previousEase=current?.ease??2.5;let intervalDays=0;let dueAt='';let ease=previousEase;
  if(rating==='again'){dueAt=new Date(now.getTime()+10*60_000).toISOString();ease=Math.max(1.3,previousEase-.2)}
  if(rating==='hard'){intervalDays=Math.max(1,Math.round(previousInterval*1.2)||1);dueAt=addDays(now,intervalDays);ease=Math.max(1.3,previousEase-.15)}
  if(rating==='good'){intervalDays=previousInterval?Math.max(2,Math.round(previousInterval*previousEase)):1;dueAt=addDays(now,intervalDays)}
  if(rating==='easy'){intervalDays=previousInterval?Math.max(4,Math.round(previousInterval*(previousEase+.8))):4;dueAt=addDays(now,intervalDays);ease=Math.min(3.2,previousEase+.15)}
  const known=rating!=='again';
  return {
    seen: (current?.seen ?? 0) + 1,
    known: (current?.known ?? 0) + (known ? 1 : 0),
    again: (current?.again ?? 0) + (known ? 0 : 1),
    lastSeenAt: now.toISOString(),
    intervalDays,
    dueAt,
    ease,
  };
}

export function flashcardStatus(stat: FlashcardStat | undefined): FlashcardStatus {
  if (!stat?.seen) return 'unseen';
  if (stat.known >= 3 && stat.known / stat.seen >= .75 && (stat.intervalDays??0)>=7) return 'mastered';
  return 'learning';
}

export function isFlashcardDue(stat:FlashcardStat|undefined,now=new Date()){
  return !stat?.seen||!stat.dueAt||new Date(stat.dueAt).getTime()<=now.getTime();
}

export function flashcardRatingPreview(stat:FlashcardStat|undefined,rating:FlashcardRating){
  const next=updateFlashcardStat(stat,rating,new Date('2026-01-01T00:00:00.000Z'));
  return rating==='again'?'10 min':`${next.intervalDays} day${next.intervalDays===1?'':'s'}`;
}

export function buildFlashcardRound<T extends { id: string }>(words: T[], stats: Record<string, FlashcardStat>, size = 10): T[] {
  return [...words]
    .sort((left, right) => {
      const statusOrder: Record<FlashcardStatus, number> = { learning: 0, unseen: 1, mastered: 2 };
      const dueDifference=Number(isFlashcardDue(stats[right.id]))-Number(isFlashcardDue(stats[left.id]));
      if(dueDifference)return dueDifference;
      const statusDifference = statusOrder[flashcardStatus(stats[left.id])] - statusOrder[flashcardStatus(stats[right.id])];
      if (statusDifference) return statusDifference;
      const leftSeen = stats[left.id]?.lastSeenAt ?? '';
      const rightSeen = stats[right.id]?.lastSeenAt ?? '';
      return leftSeen.localeCompare(rightSeen) || left.id.localeCompare(right.id);
    })
    .slice(0, Math.max(1, size));
}
