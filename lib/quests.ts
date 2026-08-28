import { localDateKey, type LearningEvent } from './learning.ts';

export type QuestAction = 'daily'|'review'|'games'|'stories';
export type QuestProgress = {
  id:string;
  label:string;
  detail:string;
  current:number;
  target:number;
  done:boolean;
  rewardXp:number;
  rewardDiamonds:number;
  action:QuestAction;
};

export type WeeklyQuestBoard = {
  id:string;
  startDate:string;
  endDate:string;
  tasks:{label:string;current:number;target:number;done:boolean}[];
  progress:number;
  done:boolean;
  rewardXp:number;
  rewardDiamonds:number;
};

export type QuestBoard = { dayKey:string; daily:QuestProgress[]; weekly:WeeklyQuestBoard };

function atLocalNoon(key:string){return new Date(`${key}T12:00:00`)}
function addLocalDays(key:string,days:number){const date=atLocalNoon(key);date.setDate(date.getDate()+days);return localDateKey(date)}

export function weekStartKey(now=new Date()){
  const date=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);
  const mondayOffset=(date.getDay()+6)%7;
  date.setDate(date.getDate()-mondayOffset);
  return localDateKey(date);
}

export function playerTitle(level:number){
  if(level>=50)return 'Mandarin Expert';
  if(level>=30)return 'Hanzi Master';
  if(level>=20)return 'Chinese Speaker';
  if(level>=10)return 'Mandarin Adventurer';
  if(level>=5)return 'Word Hunter';
  return 'New Learner';
}

export function buildQuestBoard({events,xpKeys,activityDates,dailyMinutes,now=new Date()}:{events:LearningEvent[];xpKeys:string[];activityDates:string[];dailyMinutes:number;now?:Date}):QuestBoard{
  const dayKey=localDateKey(now);const startDate=weekStartKey(now);const endDate=addLocalDays(startDate,6);
  const todayEvents=events.filter(event=>localDateKey(new Date(event.createdAt))===dayKey);
  const weekEvents=events.filter(event=>{const key=localDateKey(new Date(event.createdAt));return key>=startDate&&key<=endDate});
  const reviewTarget=dailyMinutes<=5?3:dailyMinutes<=10?5:dailyMinutes<=20?8:10;
  const weeklyReviewTarget=dailyMinutes<=5?15:dailyMinutes<=10?25:dailyMinutes<=20?40:50;
  const reviewCount=todayEvents.filter(event=>event.type==='review').length;
  const pathCount=todayEvents.filter(event=>event.type==='game'||event.type==='story'||event.type==='speaking').length;
  const daily:QuestProgress[]=[
    {id:`${dayKey}:quest:daily-session`,label:'Complete today’s learning mix',detail:'One personalized, interleaved session',current:Number(xpKeys.includes(`${dayKey}:daily-session`)),target:1,done:xpKeys.includes(`${dayKey}:daily-session`),rewardXp:20,rewardDiamonds:2,action:'daily'},
    {id:`${dayKey}:quest:reviews`,label:`Review ${reviewTarget} words`,detail:'Strengthen memory instead of grinding easy cards',current:Math.min(reviewTarget,reviewCount),target:reviewTarget,done:reviewCount>=reviewTarget,rewardXp:15,rewardDiamonds:1,action:'review'},
    {id:`${dayKey}:quest:path`,label:'Practice Chinese in context',detail:'Complete a game, story, or speaking activity',current:Math.min(1,pathCount),target:1,done:pathCount>=1,rewardXp:15,rewardDiamonds:1,action:'games'},
  ];
  const activeDays=new Set([...activityDates,...weekEvents.map(event=>localDateKey(new Date(event.createdAt)))].filter(key=>key>=startDate&&key<=endDate)).size;
  const tasks=[
    {label:'Study on 4 different days',current:Math.min(4,activeDays),target:4},
    {label:`Complete ${weeklyReviewTarget} reviews`,current:Math.min(weeklyReviewTarget,weekEvents.filter(event=>event.type==='review').length),target:weeklyReviewTarget},
    {label:'Finish 3 lesson sessions',current:Math.min(3,new Set(weekEvents.filter(event=>event.type==='lesson').map(event=>localDateKey(new Date(event.createdAt)))).size),target:3},
    {label:'Play 2 learning games',current:Math.min(2,weekEvents.filter(event=>event.type==='game').length),target:2},
    {label:'Complete 1 story',current:Math.min(1,weekEvents.filter(event=>event.type==='story').length),target:1},
  ].map(task=>({...task,done:task.current>=task.target}));
  const progress=Math.round(tasks.reduce((sum,task)=>sum+task.current/task.target,0)/tasks.length*100);
  return {dayKey,daily,weekly:{id:`${startDate}:weekly-challenge`,startDate,endDate,tasks,progress,done:tasks.every(task=>task.done),rewardXp:90,rewardDiamonds:15}};
}
