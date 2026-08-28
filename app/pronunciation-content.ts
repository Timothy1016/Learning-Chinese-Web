import type { GameQuestion } from './game-content.ts';

export type TonePair = { id:string; first:1|2|3|4; second:1|2|3|4; hanzi:string; pinyin:string; meaning:string; note:string };

export const tonePairs:TonePair[]=[
  {id:'1-1',first:1,second:1,hanzi:'今天',pinyin:'jīntiān',meaning:'today',note:'Keep both syllables high and level.'},
  {id:'1-2',first:1,second:2,hanzi:'中国',pinyin:'Zhōngguó',meaning:'China',note:'Hold the first tone steady, then let the second rise.'},
  {id:'1-3',first:1,second:3,hanzi:'机场',pinyin:'jīchǎng',meaning:'airport',note:'Stay high, then make a clear third-tone dip.'},
  {id:'1-4',first:1,second:4,hanzi:'工作',pinyin:'gōngzuò',meaning:'work',note:'Move from level pitch into a decisive fall.'},
  {id:'2-1',first:2,second:1,hanzi:'明天',pinyin:'míngtiān',meaning:'tomorrow',note:'Rise first, then settle into a high level tone.'},
  {id:'2-2',first:2,second:2,hanzi:'学习',pinyin:'xuéxí',meaning:'study',note:'Reset slightly before starting the second rise.'},
  {id:'2-3',first:2,second:3,hanzi:'牛奶',pinyin:'niúnǎi',meaning:'milk',note:'Let the first syllable rise before the low third tone.'},
  {id:'2-4',first:2,second:4,hanzi:'文化',pinyin:'wénhuà',meaning:'culture',note:'Rise into the first syllable, then fall firmly.'},
  {id:'3-1',first:3,second:1,hanzi:'北京',pinyin:'Běijīng',meaning:'Beijing',note:'A low third tone is followed by a high level tone.'},
  {id:'3-2',first:3,second:2,hanzi:'旅游',pinyin:'lǚyóu',meaning:'travel',note:'Keep the first syllable low, then rise on the second.'},
  {id:'3-3',first:3,second:3,hanzi:'你好',pinyin:'nǐ hǎo',meaning:'hello',note:'Tone sandhi: the first third tone is normally pronounced like a rising second tone.'},
  {id:'3-4',first:3,second:4,hanzi:'考试',pinyin:'kǎoshì',meaning:'exam',note:'Move from low pitch into a strong falling tone.'},
  {id:'4-1',first:4,second:1,hanzi:'大家',pinyin:'dàjiā',meaning:'everyone',note:'After the fall, reset high for the level first tone.'},
  {id:'4-2',first:4,second:2,hanzi:'大学',pinyin:'dàxué',meaning:'university',note:'Fall first, then reset and rise clearly.'},
  {id:'4-3',first:4,second:3,hanzi:'电脑',pinyin:'diànnǎo',meaning:'computer',note:'A sharp fall is followed by a low third tone.'},
  {id:'4-4',first:4,second:4,hanzi:'见面',pinyin:'jiànmiàn',meaning:'meet',note:'Reset between two separate falling movements.'},
];

export const tonePairQuestions:GameQuestion[]=tonePairs.filter((_,index)=>index%2===0).map((pair,index)=>({
  id:`tone-pair-${pair.id}`,
  prompt:`Which tone pair does ${pair.hanzi} (${pair.meaning}) use?`,
  choices:[pair.id,tonePairs[(index*2+3)%tonePairs.length].id,tonePairs[(index*2+6)%tonePairs.length].id,tonePairs[(index*2+9)%tonePairs.length].id],
  answer:pair.id,
  explanation:`${pair.pinyin} uses tone pair ${pair.id}. ${pair.note}`,
  audioText:pair.hanzi,
}));
