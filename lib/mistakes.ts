import type { LearningEvent } from './learning.ts';

export type Mistake = {
  id:string;
  chapterId:string;
  prompt:string;
  answer:string;
  correction:string;
  explanation?:string;
  skill:LearningEvent['skill'];
  source:'lesson'|'daily'|'game';
  errorCount:number;
  attempts:number;
  successfulReviews:number;
  mastery:number;
  reviewIntervalDays:number;
  reviewDueAt:string;
  createdAt:string;
  lastAttemptedAt:string;
};

function stableHash(value:string){let hash=2166136261;for(const character of value){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return (hash>>>0).toString(36)}
function addDays(now:Date,days:number){const due=new Date(now);due.setDate(due.getDate()+days);return due.toISOString()}

export function createMistake(input:{chapterId:string;prompt:string;answer:string;correction:string;explanation?:string;skill:LearningEvent['skill'];source:'lesson'|'daily'|'game';sourceKey?:string},now=new Date()):Mistake{
  const createdAt=now.toISOString();const identity=input.sourceKey??`${input.chapterId}:${input.skill}:${input.prompt}:${input.correction}`;
  return {...input,id:`mistake-${stableHash(identity)}`,errorCount:1,attempts:1,successfulReviews:0,mastery:5,reviewIntervalDays:0,reviewDueAt:createdAt,createdAt,lastAttemptedAt:createdAt};
}

export function mergeMistakes(existing:Mistake[],incoming:Mistake[]):Mistake[]{
  const merged=[...existing];
  for(const mistake of incoming){const index=merged.findIndex(item=>item.id===mistake.id);if(index<0){merged.unshift(mistake);continue}const current=merged[index];merged[index]={...current,answer:mistake.answer,correction:mistake.correction,explanation:mistake.explanation??current.explanation,skill:mistake.skill,errorCount:(current.errorCount??1)+1,attempts:(current.attempts??1)+1,mastery:Math.max(0,(current.mastery??5)-12),reviewIntervalDays:0,reviewDueAt:mistake.reviewDueAt,lastAttemptedAt:mistake.lastAttemptedAt}}
  return merged.sort((left,right)=>right.lastAttemptedAt.localeCompare(left.lastAttemptedAt));
}

export function reviewMistake(mistake:Mistake,correct:boolean,now=new Date()):Mistake{
  const previousInterval=mistake.reviewIntervalDays??0;const interval=correct?(previousInterval?Math.min(30,Math.max(2,previousInterval*2)):1):0;
  return {...mistake,errorCount:(mistake.errorCount??1)+(correct?0:1),attempts:(mistake.attempts??1)+1,successfulReviews:(mistake.successfulReviews??0)+(correct?1:0),mastery:Math.max(0,Math.min(100,(mistake.mastery??5)+(correct?22:-10))),reviewIntervalDays:interval,reviewDueAt:correct?addDays(now,interval):new Date(now.getTime()+10*60_000).toISOString(),lastAttemptedAt:now.toISOString()};
}

export function dueMistakes(mistakes:Mistake[],now=new Date()){return mistakes.filter(mistake=>new Date(mistake.reviewDueAt??mistake.createdAt).getTime()<=now.getTime()&&(mistake.mastery??5)<100).sort((left,right)=>(left.reviewDueAt??left.createdAt).localeCompare(right.reviewDueAt??right.createdAt))}

export function mistakeMasteryLabel(mastery:number){if(mastery>=85)return 'Mastered';if(mastery>=65)return 'Strong';if(mastery>=40)return 'Learned';if(mastery>=20)return 'Familiar';return 'New'}
export function mistakeMasteryStars(mastery:number){return Math.max(1,Math.min(5,Math.ceil(mastery/20)))}
