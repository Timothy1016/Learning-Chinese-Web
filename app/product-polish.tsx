"use client";

import { useMemo, useState } from "react";
import { adventureChapters, allVocabulary } from "./content";
import { storyLibrary } from "./extended-content";
import { completeTextbookStoryLibrary, textbookWordCollections } from "./textbook-library";

export type SearchDestination = { destination: string; chapterId?: string };
type SearchItem = { kind: string; title: string; detail: string; destination: string; chapterId?: string };

export function GlobalSearch({ close, open }: { close: () => void; open: (value: SearchDestination) => void }) {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const words = [...allVocabulary, ...textbookWordCollections.flatMap((book) => book.words)].map((word) => ({
      kind: `Vocabulary · HSK ${"level" in word ? word.level : "course"}`,
      title: `${word.hanzi} · ${word.pinyin}`,
      detail: word.english,
      destination: "Learn",
    }));
    const adventures = adventureChapters.map((chapter) => ({ kind: "Adventure chapter", title: `${chapter.chinese} · ${chapter.title}`, detail: chapter.description, destination: "Adventure", chapterId: chapter.id }));
    const stories = [...storyLibrary, ...completeTextbookStoryLibrary].map((story) => ({ kind: `Story · HSK ${"hsk" in story ? story.hsk : "graded"}`, title: `${story.chinese} · ${story.title}`, detail: story.summary, destination: "Stories" }));
    const grammar = [
      ["与其…不如…", "Prefer one alternative over another"], ["尽管…但是…", "Concession and contrast"], ["之所以…是因为…", "Explain a precise cause"], ["随着…", "Describe linked change"], ["既然…就…", "Reason from an accepted fact"],
    ].map(([title, detail]) => ({ kind: "Grammar", title, detail, destination: "Learn" }));
    const games = ["Word Match", "Sentence Builder", "Tone Master", "Audio Detective", "Hanzi Puzzle", "Pinyin Challenge", "Meaning Hunter", "Word Rush"].map((title) => ({ kind: "Game", title, detail: "Focused active-recall practice", destination: "Games" }));
    const hsk = [1, 2, 3, 4, 5, 6].map((level) => ({ kind: "HSK course", title: `HSK ${level}`, detail: level === 6 ? "40 lessons · workbook · reading · grammar · mock exam" : "Course units, vocabulary, stories, and exam practice", destination: "Learn" }));
    return [...words, ...adventures, ...stories, ...grammar, ...games, ...hsk] as SearchItem[];
  }, []);
  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized
    ? items.filter((item) => `${item.kind} ${item.title} ${item.detail}`.toLocaleLowerCase().includes(normalized)).slice(0, 24)
    : items.filter((item) => item.kind === "HSK course" || item.kind === "Game").slice(0, 12);
  return (
    <div className="global-search-backdrop" role="dialog" aria-modal="true" aria-label="Search all learning content" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section className="global-search-panel">
        <header>
          <div><small>GLOBAL SEARCH</small><strong>Find anything in Lóng</strong></div>
          <button onClick={close} aria-label="Close search">×</button>
        </header>
        <label><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search words, grammar, stories, chapters, games, or HSK…" /></label>
        <p>{results.length} results {normalized ? `for “${query}”` : "to get you started"}</p>
        <div className="global-search-results">
          {results.map((item, index) => (
            <button key={`${item.kind}-${item.title}-${index}`} onClick={() => open({ destination: item.destination, chapterId: item.chapterId })}>
              <small>{item.kind}</small><strong>{item.title}</strong><span>{item.detail}</span><b>→</b>
            </button>
          ))}
          {!results.length && <div className="search-empty"><b>未</b><strong>No matching lesson yet</strong><span>Try a Hanzi, pinyin, English meaning, or activity name.</span></div>}
        </div>
      </section>
    </div>
  );
}

export const hsk6Lessons = [
  [1,"孩子给我们的启示","Inspiration from children"],[2,"父母之爱","Love of parents"],[3,"一盒月饼","A box of moon cakes"],[4,"完美的胜利","A perfect victory"],[5,"留一只眼睛看自己","Keep one eye on yourself"],
  [6,"不甘平庸","Unwilling to be mediocre"],[7,"我的人生我做主","I control my own life"],[8,"遇见原来的我","Meeting the old me"],[9,"不用手机的日子","A day without a mobile phone"],[10,"全球化视野中的中国饮食","Chinese food in the global context"],
  [11,"我不在乎你说什么","What you say does not define me"],[12,"我们的家也会变老","We all have white hair"],[13,"流浪汉变董事长","How travel guides reflect change"],[14,"青藏铁路","The Qinghai–Tibet Railway"],[15,"山脉上的雕刻","Sculptures on the mountain range"],
  [16,"徐健和他的野生动物摄影行","Wildlife photography"],[17,"小动物眼中的世界","The silent world in small animals’ eyes"],[18,"神奇的丝瓜","The magical towel gourd"],[19,"无阳光的温室世界","The deep-sea world without sunshine"],[20,"金丝猴","The golden snub-nose monkey"],
  [21,"未来商店","The shop of the future"],[22,"2050年的汽车什么样","Cars in 2050"],[23,"机器人时代","The age of robots"],[24,"互联网与生活","The connected life"],[25,"创新改变世界","Innovation changes the world"],
  [26,"城市与记忆","Cities and memory"],[27,"旅行的意义","The meaning of travel"],[28,"文化的距离","Cultural distance"],[29,"选择与责任","Choice and responsibility"],[30,"自然的启示","Lessons from nature"],
  [31,"语言的力量","The power of language"],[32,"时间的答案","Answers from time"],[33,"人与环境","People and the environment"],[34,"社会的温度","The warmth of society"],[35,"传统与现代","Tradition and modernity"],
  [36,"读书与成长","Reading and growth"],[37,"发现生活","Discovering daily life"],[38,"理解与沟通","Understanding and communication"],[39,"世界的另一面","Another side of the world"],[40,"走向未来","Toward the future"],
] as const;

export const hsk6WorkbookQuestions = [
  { prompt: "与其急着下结论，___ 先检查证据。", choices: ["不如", "尽管", "从而"], answer: "不如", note: "与其…不如… compares two options and recommends the second." },
  { prompt: "“The data does not necessarily support that conclusion.”", choices: ["数据未必支持那个结论。", "数据竟然结论支持。", "数据不禁支持结论。"], answer: "数据未必支持那个结论。", note: "未必 expresses that something is not necessarily true." },
  { prompt: "Choose the most precise connector for a resulting effect.", choices: ["从而", "反而", "何况"], answer: "从而", note: "从而 introduces a consequence produced by the previous clause." },
];

export function Hsk6DeepDive({ speak, openExam, record }: { speak: (value: string) => void; openExam: () => void; record: (correct: boolean) => void }) {
  const [section, setSection] = useState<"units"|"workbook"|"reading"|"grammar">("units");
  const [volume, setVolume] = useState<1|2>(1);
  const [lesson, setLesson] = useState(1);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(0);
  const courseWords = textbookWordCollections.find((item) => item.level === 6)?.words ?? [];
  const visibleLessons = hsk6Lessons.filter(([id]) => volume === 1 ? id <= 20 : id > 20);
  const current = hsk6Lessons.find(([id]) => id === lesson) ?? hsk6Lessons[0];
  const lessonWords = courseWords.filter((word) => word.lesson.toLowerCase().includes(`lesson ${lesson}`));
  const fallbackWords = courseWords.slice(((lesson - 1) * 5) % Math.max(1, courseWords.length), (((lesson - 1) * 5) % Math.max(1, courseWords.length)) + 8);
  const words = lessonWords.length ? lessonWords : fallbackWords;
  const q = hsk6WorkbookQuestions[question];
  return (
    <section className="hsk6-deep-dive">
      <header><div><small>HSK 6 · FOUR-BOOK COMPANION</small><h2>Course, workbook, reading, and grammar in one path</h2><p>Structured from the supplied HSK Standard Course 6 上/下 and both workbooks. Practice text is original and aligned to the books’ lesson themes and exercise styles.</p></div><button onClick={openExam}>Start HSK 6 mock exam →</button></header>
      <nav>{([['units','40 lessons'],['workbook','Interactive workbook'],['reading','Reading comprehension'],['grammar','Grammar notes']] as const).map(([id,label]) => <button className={section===id?'active':''} onClick={()=>setSection(id)} key={id}>{label}</button>)}</nav>
      {section === "units" && <div className="hsk6-course-browser">
        <div className="hsk6-volume-switch"><button className={volume===1?'active':''} onClick={()=>{setVolume(1);setLesson(1)}}>Volume I · Lessons 1–20</button><button className={volume===2?'active':''} onClick={()=>{setVolume(2);setLesson(21)}}>Volume II · Lessons 21–40</button></div>
        <div className="hsk6-unit-layout"><div className="hsk6-lesson-list">{visibleLessons.map(([id,zh,en]) => <button className={lesson===id?'active':''} onClick={()=>setLesson(id)} key={id}><b>{id}</b><span><strong>{zh}</strong><small>{en}</small></span></button>)}</div><article className="hsk6-lesson-detail"><small>LESSON {current[0]} · {volume===1?'上':'下'}</small><h3>{current[1]}</h3><p>{current[2]}</p><div className="hsk6-word-list">{words.map((word) => <button onClick={()=>speak(word.hanzi)} key={`${lesson}-${word.hanzi}`}><strong>{word.hanzi}</strong><span>{word.pinyin}</span><small>{word.english}</small></button>)}</div><p className="source-note">Lesson 1 vocabulary is transcribed directly from the supplied course pages; later cards use the verified HSK 6 practice bank until their page-level transcription is completed.</p></article></div>
      </div>}
      {section === "workbook" && <div className="hsk6-practice"><small>QUESTION {question+1} OF {hsk6WorkbookQuestions.length}</small><h3>{q.prompt}</h3><div>{q.choices.map((choice)=><button disabled={!!answer} className={answer===choice?(choice===q.answer?'correct':'wrong'):''} onClick={()=>{setAnswer(choice);record(choice===q.answer)}} key={choice}>{choice}</button>)}</div>{answer&&<aside><strong>{answer===q.answer?'✓ Correct':'Review this pattern'}</strong><p>{q.note}</p><button onClick={()=>{setQuestion((question+1)%hsk6WorkbookQuestions.length);setAnswer('')}}>Next exercise →</button></aside>}</div>}
      {section === "reading" && <div className="hsk6-reading"><small>READING COMPREHENSION · ORIGINAL PRACTICE</small><h3>孩子给我们的启示</h3><button onClick={()=>speak('孩子观察世界的时候，常常不会先问事情有没有用，而是认真注意变化本身。成年人如果愿意暂时放下结论，也许能重新发现被习惯忽略的细节。')}>▶ Listen to passage</button><p>孩子观察世界的时候，常常不会先问事情有没有用，而是认真注意变化本身。成年人如果愿意暂时放下结论，也许能重新发现被习惯忽略的细节。</p><div className="reading-question"><strong>作者认为成年人可以从孩子身上学到什么？</strong><span>先观察细节，再形成结论。</span></div></div>}
      {section === "grammar" && <div className="hsk6-grammar-grid">{[
        ['与其…不如…','Reject one option and prefer another.','与其猜测，不如核实事实。'],['未必','Express “not necessarily.”','流行的观点未必正确。'],['从而','Introduce a consequence.','方法更清楚，从而减少了误解。'],['之所以…是因为…','Emphasize the exact cause.','他之所以成功，是因为长期坚持。'],['难免','Acknowledge something hard to avoid.','第一次演讲难免会紧张。'],['不妨','Offer a measured suggestion.','遇到难题时，不妨换个角度。']
      ].map(([pattern,note,example])=><article key={pattern}><strong>{pattern}</strong><p>{note}</p><button onClick={()=>speak(example)}>▶ {example}</button></article>)}</div>}
    </section>
  );
}

export function ProgressSnapshotCharts({ mastered, fading, listening, speaking, readiness, weekly }: { mastered:number; fading:number; listening:number; speaking:number; readiness:number; weekly:number[] }) {
  const max = Math.max(1, ...weekly);
  return <section className="progress-snapshot"><header><small>LEARNING HEALTH</small><h2>Progress that means something</h2><p>Memory, skill accuracy, time, and readiness—separate from XP.</p></header><div className="progress-snapshot-grid"><article><span>掌</span><strong>{mastered}</strong><small>words mastered</small></article><article><span>忘</span><strong>{fading}</strong><small>starting to fade</small></article><article className="accuracy-chart"><b>Listening <em>{listening}%</em></b><i><span style={{width:`${listening}%`}} /></i><b>Speaking <em>{speaking}%</em></b><i><span style={{width:`${speaking}%`}} /></i></article><article className="readiness-ring" style={{'--readiness':`${readiness * 3.6}deg`} as React.CSSProperties}><div><strong>{readiness}%</strong><small>HSK readiness</small></div></article><article className="weekly-bars"><strong>Weekly study</strong><div>{weekly.map((value,index)=><span key={index} title={`${value} min`}><i style={{height:`${Math.max(8,(value/max)*100)}%`}}/><small>{['M','T','W','T','F','S','S'][index]}</small></span>)}</div></article></div></section>;
}

const toneHints: Record<string,string> = { 你:'nǐ · tone 3',好:'hǎo · tone 3',我:'wǒ · tone 3',们:'men · neutral',用:'yòng · tone 4',算:'suàn · tone 4',法:'fǎ · tone 3',解:'jiě · tone 3',决:'jué · tone 2',问:'wèn · tone 4',题:'tí · tone 2',可:'kě · tone 3',以:'yǐ · tone 3',去:'qù · tone 4',哪:'nǎ · tone 3',里:'lǐ · tone 3',吗:'ma · neutral',请:'qǐng · tone 3',帮:'bāng · tone 1',忙:'máng · tone 2' };
export function SyllableToneFeedback({ target, matched }: { target:string; matched:{character:string;matched:boolean}[] }) {
  return <div className="syllable-tone-feedback" aria-label={`Syllable feedback for ${target}`}><header><strong>Syllable & tone guide</strong><small>{target}</small></header><div>{matched.filter((item)=>/[\u3400-\u9fff]/.test(item.character)).map((item,index)=>{const hint=toneHints[item.character]??'tone: listen again';const sandhi=index<matched.length-1&&hint.includes('tone 3')&&(toneHints[matched[index+1]?.character]??'').includes('tone 3');return <span className={item.matched?'matched':'missed'} key={`${item.character}-${index}`}><b>{item.character}</b><em>{hint}{sandhi?' · 3→2 change':''}</em><small>{item.matched?'recognized':'repeat this syllable'}</small></span>})}</div><p>This marks syllables the device did not recognize and shows the expected lexical tone. It is a practice guide, not laboratory pitch measurement.</p></div>;
}
