import type { HskDictionaryWord } from './hsk-dictionary.ts';

export function extractChineseSegments(text:string):string[]{
  return text.match(/[\u3400-\u4dbf\u4e00-\u9fff]+/g)??[];
}

export function normalizedChineseText(text:string){
  return extractChineseSegments(text).join('');
}

export function imageDictionaryMatches(text:string,words:HskDictionaryWord[],limit=24){
  const segments=extractChineseSegments(text);const normalized=segments.join('');
  if(!normalized)return [];
  return words
    .filter(word=>word.h&&normalized.includes(word.h))
    .map(word=>({word,score:(segments.includes(word.h)?1000:0)+word.h.length*100-Math.min(word.q||99999,99999)/100000}))
    .sort((left,right)=>right.score-left.score||left.word.q-right.word.q||left.word.l-right.word.l)
    .filter((item,index,items)=>items.findIndex(candidate=>candidate.word.h===item.word.h)===index)
    .slice(0,Math.max(1,limit))
    .map(item=>item.word);
}
