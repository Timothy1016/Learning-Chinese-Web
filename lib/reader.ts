import type { HskDictionaryWord } from './hsk-dictionary.ts';

export type ReaderToken = {
  text:string;
  word?:HskDictionaryWord;
  chinese:boolean;
};

const CHINESE=/[\u3400-\u9fff]/;

export function segmentChineseText(text:string,words:HskDictionaryWord[],maxWordLength=6):ReaderToken[]{
  const dictionary=new Map<string,HskDictionaryWord>();
  for(const word of words)if(word.h&&!dictionary.has(word.h))dictionary.set(word.h,word);
  const tokens:ReaderToken[]=[];
  let index=0;
  while(index<text.length){
    const character=text[index];
    if(!CHINESE.test(character)){
      let end=index+1;
      while(end<text.length&&!CHINESE.test(text[end]))end++;
      tokens.push({text:text.slice(index,end),chinese:false});index=end;continue;
    }
    let match:HskDictionaryWord|undefined;
    let matchedText='';
    const remaining=Math.min(maxWordLength,text.length-index);
    for(let length=remaining;length>=1;length--){
      const candidate=text.slice(index,index+length);
      if([...candidate].every(item=>CHINESE.test(item))&&dictionary.has(candidate)){match=dictionary.get(candidate);matchedText=candidate;break}
    }
    if(match){tokens.push({text:matchedText,word:match,chinese:true});index+=matchedText.length}
    else{tokens.push({text:character,chinese:true});index++}
  }
  return tokens;
}

export function readerCoverage(tokens:ReaderToken[]){
  const chinese=tokens.filter(token=>token.chinese).reduce((sum,token)=>sum+[...token.text].length,0);
  const known=tokens.filter(token=>token.word).reduce((sum,token)=>sum+[...token.text].length,0);
  return {known,chinese,percent:Math.round(known/Math.max(1,chinese)*100)};
}
