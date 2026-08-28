import type { HskDictionaryWord } from './hsk-dictionary.ts';

export type LibraryBankWord = {
  id:string;
  hanzi:string;
  pinyin:string;
  meaning:string;
  source:'hsk'|'adventure'|'personal';
  hsk?:number;
  detail?:string;
  savedOrder:number;
  createdAt?:string;
};

type AdventureWord = { id:string;hanzi:string;pinyin:string;english:string;chapter?:string };
type PersonalLibraryWord = { id:string;hanzi:string;pinyin:string;english:string;createdAt:string };

export function buildLibraryBank(input:{favoriteIds:string[];hskWords:HskDictionaryWord[];adventureWords:AdventureWord[];personalWords:PersonalLibraryWord[]}):LibraryBankWord[]{
  const hsk=new Map(input.hskWords.map(word=>[word.id,word]));
  const adventure=new Map(input.adventureWords.map(word=>[word.id,word]));
  const saved=input.favoriteIds.flatMap<LibraryBankWord>((id,index)=>{
    const hskWord=hsk.get(id);
    if(hskWord)return [{id,hanzi:hskWord.h,pinyin:hskWord.py,meaning:hskWord.m,source:'hsk' as const,hsk:hskWord.l,detail:hskWord.r?`Radical ${hskWord.r}`:hskWord.pos,savedOrder:index}];
    const adventureWord=adventure.get(id);
    if(adventureWord)return [{id,hanzi:adventureWord.hanzi,pinyin:adventureWord.pinyin,meaning:adventureWord.english,source:'adventure' as const,detail:adventureWord.chapter,savedOrder:index}];
    return [];
  });
  const personal=input.personalWords.map((word,index)=>({id:word.id,hanzi:word.hanzi,pinyin:word.pinyin,meaning:word.english,source:'personal' as const,detail:'My own word',savedOrder:input.favoriteIds.length+index,createdAt:word.createdAt}));
  return [...saved,...personal].sort((left,right)=>right.savedOrder-left.savedOrder);
}

export function filterLibraryBank(words:LibraryBankWord[],options:{query?:string;source?:'all'|LibraryBankWord['source'];hsk?:number|'all'}){
  const needle=options.query?.trim().toLowerCase()??'';
  return words.filter(word=>(!options.source||options.source==='all'||word.source===options.source)&&(options.hsk===undefined||options.hsk==='all'||word.hsk===options.hsk)&&(!needle||`${word.hanzi} ${word.pinyin} ${word.meaning} ${word.detail??''}`.toLowerCase().includes(needle)));
}

export function libraryBankCounts(words:LibraryBankWord[]){
  return {total:words.length,hsk:words.filter(word=>word.source==='hsk').length,adventure:words.filter(word=>word.source==='adventure').length,personal:words.filter(word=>word.source==='personal').length};
}
