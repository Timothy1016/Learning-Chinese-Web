import { completeCourseStoryCatalog } from './course-story-catalog.ts';

export type CourseExerciseKind = 'Vocabulary' | 'Listening' | 'Grammar' | 'Sentence order' | 'Reading' | 'Context';

export type CourseExercise = {
  id: string;
  lessonId: string;
  level: number;
  volume: '全' | '上' | '下';
  lesson: number;
  kind: CourseExerciseKind;
  skill: 'Vocabulary' | 'Listening' | 'Grammar' | 'Reading';
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
  audio?: string;
};

export type CourseExerciseLesson = {
  id: string;
  level: number;
  volume: '全' | '上' | '下';
  lesson: number;
  chinese: string;
  english: string;
  questions: CourseExercise[];
};

type LessonSeed = Omit<CourseExerciseLesson, 'id' | 'questions'>;

const introductorySeeds: LessonSeed[] = [
  ...[
    ['你好', 'Hello'],
    ['谢谢你', 'Thank you'],
    ['你叫什么名字', "What's your name"],
    ['她是我的汉语老师', 'She is my Chinese teacher'],
    ['她女儿今年二十岁', 'Her daughter is 20 years old this year'],
    ['我会说汉语', 'I can speak Chinese'],
    ['今天几号', "What's the date today"],
    ['我想喝茶', "I'd like some tea"],
    ['你儿子在哪儿工作', 'Where does your son work'],
    ['我能坐这儿吗', 'Can I sit here'],
    ['现在几点', "What's the time now"],
    ['明天天气怎么样', 'What will the weather be like tomorrow'],
    ['他在学做中国菜呢', 'He is learning to cook Chinese food'],
    ['她买了不少衣服', 'She has bought quite a few clothes'],
    ['我是坐飞机来的', 'I came here by air'],
  ].map(([chinese, english], index) => ({ level: 1, volume: '全' as const, lesson: index + 1, chinese, english })),
  ...[
    ['九月去北京旅游最好', 'September is the best time to visit Beijing'],
    ['我每天六点起床', 'I get up at six every day'],
    ['左边那个红色的是我的', 'The red one on the left is mine'],
    ['这个工作是他帮我介绍的', 'He recommended me for this job'],
    ['就买这件吧', 'Take this one'],
    ['你怎么不吃了', "Why don't you eat more"],
    ['你家离公司远吗', 'Do you live far from your company'],
    ['让我想想再告诉你', 'Let me think about it and I will tell you later'],
    ['题太多，我没做完', "There were too many questions; I didn't finish all of them"],
    ['别找了，手机在桌子上呢', "Stop looking; the cell phone is on the desk"],
    ['他比我大三岁', 'He is three years older than me'],
    ['你穿得太少了', 'You wear too little'],
    ['门开着呢', 'The door is open'],
    ['你看过那个电影吗', 'Have you seen that movie'],
    ['新年就要到了', 'The New Year is coming'],
  ].map(([chinese, english], index) => ({ level: 2, volume: '全' as const, lesson: index + 1, chinese, english })),
  ...[
    ['周末你有什么打算', "What's your plan for the weekend"],
    ['他什么时候回来', 'When will he come back'],
    ['桌子上放着很多饮料', 'There are plenty of drinks on the table'],
    ['她总是笑着跟客人说话', 'She always smiles when talking to customers'],
    ['我最近越来越胖了', 'I am getting fatter and fatter lately'],
    ['怎么突然找不到了', 'Why are they suddenly missing'],
    ['我跟她都认识五年了', "I've known her for five years"],
    ['你去哪儿我就去哪儿', "I'll go wherever you go"],
    ['她的汉语说得跟中国人一样好', 'She speaks Chinese like a native'],
    ['数学比历史难多了', 'Maths is much harder than history'],
    ['别忘了把空调关了', "Don't forget to turn off the air conditioner"],
    ['把重要的东西放在我这儿吧', 'Leave the important items with me'],
    ['我是走回来的', 'I walked back'],
    ['你把水果拿过来', 'Please bring the fruit here'],
    ['其他都没什么问题', 'The rest of them are all OK'],
    ['我现在累得下班就想睡觉', 'I am so tired that I want to sleep after work'],
    ['谁都有办法治好你的“病”', 'Everybody is able to cure your “disease”'],
    ['我相信他们会同意的', "I believe they'll agree"],
    ['你没看出来吗', "Didn't you recognise him"],
    ['我被他影响了', "I've been influenced by him"],
  ].map(([chinese, english], index) => ({ level: 3, volume: '全' as const, lesson: index + 1, chinese, english })),
];

const advancedSeeds: LessonSeed[] = completeCourseStoryCatalog.map(item => ({
  level: item.level,
  volume: item.volume,
  lesson: item.lesson,
  chinese: item.chinese,
  english: item.english,
}));

export const courseLessonCatalog: LessonSeed[] = [...introductorySeeds, ...advancedSeeds];

type GrammarFrame = { prompt: string; choices: string[]; answer: string; explanation: string; sentence: string; sentenceChoices: string[] };

const grammarFrames: Record<number, GrammarFrame[]> = {
  1: [
    { prompt: 'Complete: 我 ___ 学生。', choices: ['是', '有', '在'], answer: '是', explanation: '是 links a person or thing with an identity.', sentence: '我是学生。', sentenceChoices: ['我是学生。', '我学生是。', '是我学生。'] },
    { prompt: 'Complete: 我 ___ 喝茶。', choices: ['想', '叫', '哪'], answer: '想', explanation: '想 before a verb expresses what someone wants to do.', sentence: '我想喝茶。', sentenceChoices: ['我想喝茶。', '我喝想茶。', '茶想我喝。'] },
    { prompt: 'Complete the question: 你叫什么 ___？', choices: ['名字', '天气', '飞机'], answer: '名字', explanation: '叫什么名字 asks a person’s name.', sentence: '你叫什么名字？', sentenceChoices: ['你叫什么名字？', '什么你名字叫？', '名字你叫什么。'] },
  ],
  2: [
    { prompt: 'Complete: 我 ___ 吃早饭，然后去上班。', choices: ['先', '比', '过'], answer: '先', explanation: '先 introduces the first action before 然后.', sentence: '我先吃早饭，然后去上班。', sentenceChoices: ['我先吃早饭，然后去上班。', '我然后吃早饭，先去上班。', '先我然后上班吃早饭。'] },
    { prompt: 'Complete: 他 ___ 我大三岁。', choices: ['比', '离', '把'], answer: '比', explanation: 'A + 比 + B + difference compares two people or things.', sentence: '他比我大三岁。', sentenceChoices: ['他比我大三岁。', '他我比三岁大。', '比他大我三岁。'] },
    { prompt: 'Complete: 门 ___ 着呢。', choices: ['开', '让', '给'], answer: '开', explanation: 'Verb + 着 describes a continuing state.', sentence: '门开着呢。', sentenceChoices: ['门开着呢。', '开门呢着。', '着呢门开。'] },
  ],
  3: [
    { prompt: 'Complete: 她汉语说 ___ 很流利。', choices: ['得', '地', '的'], answer: '得', explanation: '得 links a verb with a degree complement.', sentence: '她汉语说得很流利。', sentenceChoices: ['她汉语说得很流利。', '她得汉语很流利说。', '说她汉语流利得很。'] },
    { prompt: 'Complete: 请 ___ 空调关了。', choices: ['把', '被', '比'], answer: '把', explanation: '把 brings the affected object before the verb.', sentence: '请把空调关了。', sentenceChoices: ['请把空调关了。', '请空调把了关。', '把请关空调了。'] },
    { prompt: 'Complete: 我 ___ 他影响了。', choices: ['被', '把', '跟'], answer: '被', explanation: '被 introduces the agent in a passive sentence.', sentence: '我被他影响了。', sentenceChoices: ['我被他影响了。', '我他被了影响。', '被我影响他了。'] },
  ],
  4: [
    { prompt: 'Complete: ___ 大家参加，环境就会改善。', choices: ['只要', '尽管', '与其'], answer: '只要', explanation: '只要…就… expresses a sufficient condition.', sentence: '只要大家参加，环境就会改善。', sentenceChoices: ['只要大家参加，环境就会改善。', '大家只要就会参加环境改善。', '环境参加，只要大家就会改善。'] },
    { prompt: 'Complete: 她一边听，___ 做笔记。', choices: ['一边', '只要', '不但'], answer: '一边', explanation: '一边…一边… links simultaneous actions.', sentence: '她一边听，一边做笔记。', sentenceChoices: ['她一边听，一边做笔记。', '她一边一边听做笔记。', '一边她做听，一边笔记。'] },
    { prompt: 'Complete: ___ 下雨，但是活动没有取消。', choices: ['虽然', '只要', '由于'], answer: '虽然', explanation: '虽然…但是… presents a concession and contrast.', sentence: '虽然下雨，但是活动没有取消。', sentenceChoices: ['虽然下雨，但是活动没有取消。', '但是虽然活动下雨没有取消。', '活动虽然但是取消没有下雨。'] },
  ],
  5: [
    { prompt: 'Complete: ___ 成本较高，但是长期效果更好。', choices: ['尽管', '只要', '与其'], answer: '尽管', explanation: '尽管…但是… concedes one fact before the main contrast.', sentence: '尽管成本较高，但是长期效果更好。', sentenceChoices: ['尽管成本较高，但是长期效果更好。', '成本尽管但是长期效果较高。', '但是效果成本尽管更好。'] },
    { prompt: 'Complete: ___ 技术发展，工作方式也在改变。', choices: ['随着', '否则', '何况'], answer: '随着', explanation: '随着 introduces a development occurring alongside another change.', sentence: '随着技术发展，工作方式也在改变。', sentenceChoices: ['随着技术发展，工作方式也在改变。', '技术随着工作方式发展改变也。', '工作技术随着也发展方式。'] },
    { prompt: 'Complete: 他没有抱怨，___ 主动寻找办法。', choices: ['而是', '尽管', '除非'], answer: '而是', explanation: '不是/没有…而是… replaces one interpretation with another.', sentence: '他没有抱怨，而是主动寻找办法。', sentenceChoices: ['他没有抱怨，而是主动寻找办法。', '而是他没有主动抱怨寻找办法。', '寻找办法没有他抱怨主动而是。'] },
  ],
  6: [
    { prompt: 'Complete: ___ 急着下结论，不如先检查证据。', choices: ['与其', '尽管', '只要'], answer: '与其', explanation: '与其…不如… rejects one option in favour of another.', sentence: '与其急着下结论，不如先检查证据。', sentenceChoices: ['与其急着下结论，不如先检查证据。', '不如与其证据先结论检查。', '急着不如下结论与其检查证据。'] },
    { prompt: 'Complete: 先核实资料，___ 忽视重要条件。', choices: ['以免', '以便', '既然'], answer: '以免', explanation: '以免 introduces an unwanted outcome to avoid.', sentence: '先核实资料，以免忽视重要条件。', sentenceChoices: ['先核实资料，以免忽视重要条件。', '以免先重要条件核实资料。', '忽视资料，以免先核实条件。'] },
    { prompt: 'Complete: 结果并非没有价值，___ 需要谨慎解释。', choices: ['只是', '除非', '一旦'], answer: '只是', explanation: '只是 narrows or qualifies the preceding statement.', sentence: '结果并非没有价值，只是需要谨慎解释。', sentenceChoices: ['结果并非没有价值，只是需要谨慎解释。', '只是结果价值并非谨慎没有解释。', '需要结果只是解释没有价值。'] },
  ],
};

function rotate<T>(values: T[], amount: number): T[] {
  if (!values.length) return values;
  const shift = amount % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
}

function choicesFor(seed: LessonSeed, field: 'chinese' | 'english'): string[] {
  const peers = courseLessonCatalog.filter(item => item.level === seed.level);
  const index = peers.findIndex(item => item.lesson === seed.lesson && item.volume === seed.volume);
  const values = [seed[field], peers[(index + 3) % peers.length][field], peers[(index + 7) % peers.length][field]];
  return rotate([...new Set(values)], seed.lesson % 3);
}

function makeQuestions(seed: LessonSeed): CourseExercise[] {
  const lessonId = `hsk${seed.level}-${seed.volume}-lesson-${seed.lesson}`;
  const grammar = grammarFrames[seed.level][(seed.lesson - 1) % grammarFrames[seed.level].length];
  const base = { lessonId, level: seed.level, volume: seed.volume, lesson: seed.lesson };
  const topicChoices = choicesFor(seed, 'chinese');
  const meaningChoices = choicesFor(seed, 'english');
  const depth = seed.level <= 2 ? 'recognise the key expression' : seed.level <= 4 ? 'connect the title with its communicative theme' : 'infer the topic before analysing supporting evidence';
  return [
    { ...base, id: `${lessonId}-vocabulary`, kind: 'Vocabulary', skill: 'Vocabulary', prompt: `Which course topic means “${seed.english}”?`, choices: topicChoices, answer: seed.chinese, explanation: `${seed.chinese} is the verified title of HSK ${seed.level}${seed.volume === '全' ? '' : ` ${seed.volume}`} Lesson ${seed.lesson}.` },
    { ...base, id: `${lessonId}-listening`, kind: 'Listening', skill: 'Listening', prompt: 'Listen, then choose the phrase you heard.', choices: topicChoices, answer: seed.chinese, explanation: `The recording says ${seed.chinese}. Replay it and compare the complete phrase.`, audio: seed.chinese },
    { ...base, id: `${lessonId}-grammar`, kind: 'Grammar', skill: 'Grammar', prompt: grammar.prompt, choices: grammar.choices, answer: grammar.answer, explanation: grammar.explanation },
    { ...base, id: `${lessonId}-order`, kind: 'Sentence order', skill: 'Grammar', prompt: 'Choose the sentence with natural Chinese word order.', choices: rotate(grammar.sentenceChoices, seed.lesson % 3), answer: grammar.sentence, explanation: `${grammar.sentence} follows the HSK ${seed.level} pattern practised in this workbook-style activity.` },
    { ...base, id: `${lessonId}-reading`, kind: 'Reading', skill: 'Reading', prompt: `本课围绕“${seed.chinese}”展开。Which English summary matches the reading topic?`, choices: meaningChoices, answer: seed.english, explanation: `The passage topic is “${seed.chinese}” — ${seed.english}. At this level, learners ${depth}.` },
    { ...base, id: `${lessonId}-context`, kind: 'Context', skill: 'Reading', prompt: `You are preparing HSK ${seed.level} Lesson ${seed.lesson}: “${seed.chinese}”. Which activity best checks understanding rather than memorising the title?`, choices: rotate(['Explain the theme with one supporting example.', 'Copy the title five times without reading.', 'Choose an unrelated sentence at random.'], seed.lesson % 3), answer: 'Explain the theme with one supporting example.', explanation: 'Workbook practice should connect vocabulary and grammar with meaning in context, not reward copying or guessing.' },
  ];
}

export const courseExerciseLessons: CourseExerciseLesson[] = courseLessonCatalog.map(seed => ({
  ...seed,
  id: `hsk${seed.level}-${seed.volume}-lesson-${seed.lesson}`,
  questions: makeQuestions(seed),
}));

export const completeCourseExerciseBank = courseExerciseLessons.flatMap(lesson => lesson.questions);

export function courseExerciseCoverage() {
  return [1, 2, 3, 4, 5, 6].map(level => ({
    level,
    lessons: courseExerciseLessons.filter(lesson => lesson.level === level).length,
    questions: completeCourseExerciseBank.filter(question => question.level === level).length,
  }));
}
