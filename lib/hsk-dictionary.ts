export type HskDictionaryWord = { id:string; h:string; py:string; m:string; pos:string; r:string; q:number; l:number };
export type HskDictionaryData = {
  meta: {
    standard:string;
    label:string;
    officialSource:string;
    datasetSource:string;
    datasetLicense:string;
    officialNewCounts:Record<string,number>;
    officialCumulativeCounts:Record<string,number>;
    note:string;
  };
  levels:{ level:number; words:HskDictionaryWord[] }[];
};

export type HskDictionaryMode = 'new'|'cumulative';

export function selectHskWords(data:HskDictionaryData,level:number,mode:HskDictionaryMode){
  return data.levels
    .filter(group=>mode==='cumulative'?group.level<=level:group.level===level)
    .flatMap(group=>group.words);
}

export function searchHskWords(words:HskDictionaryWord[],query:string,savedOnly=false,savedIds:string[]=[]){
  const needle=query.trim().toLowerCase();
  return words.filter(word=>(!savedOnly||savedIds.includes(word.id))&&(!needle||`${word.h} ${word.py} ${word.m} ${word.pos}`.toLowerCase().includes(needle)));
}

export function hskCoverage(words:HskDictionaryWord[],savedIds:string[]){
  const saved=new Set(savedIds);
  const count=words.filter(word=>saved.has(word.id)).length;
  return {count,total:words.length,percent:Math.round(count/Math.max(1,words.length)*100)};
}
