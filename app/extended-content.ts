import { courseQuestionsByLevel } from './hsk-course-content.ts';

export type PathId = 'General' | 'Computer Science' | 'International Business';

export type PracticeQuestion = { prompt: string; choices: string[]; answer: string; explanation: string };

export const hskStyleBanks: Record<number, PracticeQuestion[]> = {
  1: [
    { prompt: 'Choose “She is my teacher.”', choices: ['她是我的老师。','她有一本书。','她去学校吗？'], answer: '她是我的老师。', explanation: '她 is “she,” and 老师 means “teacher.”' },
    { prompt: 'What does 今天 mean?', choices: ['today','tomorrow','yesterday'], answer: 'today', explanation: '今天 refers to the current day.' },
    { prompt: 'Complete: 我 ___ 喝茶。', choices: ['想','很','在'], answer: '想', explanation: '想 + verb expresses what someone wants to do.' },
    ...courseQuestionsByLevel[1],
  ],
  2: [
    { prompt: 'Choose “The station is not far from here.”', choices: ['车站离这里不远。','车站没有人。','这里不是车站。'], answer: '车站离这里不远。', explanation: '离 marks distance, and 不远 means “not far.”' },
    { prompt: 'What does 已经 mean?', choices: ['already','still','again'], answer: 'already', explanation: '已经 marks that something has already happened.' },
    { prompt: 'Complete: 因为下雨，___ 我坐地铁。', choices: ['所以','但是','或者'], answer: '所以', explanation: '因为…所以… expresses cause and result.' },
    ...courseQuestionsByLevel[2],
  ],
  3: [
    { prompt: 'Choose the natural sentence.', choices: ['我把作业放在桌子上了。','我作业把了桌子上。','桌子作业我放把。'], answer: '我把作业放在桌子上了。', explanation: 'The 把 pattern places the handled object before the action.' },
    { prompt: '“除了中文以外，我还学日语。” means…', choices: ['Besides Chinese, I also study Japanese.','I stopped studying Chinese.','Chinese is easier than Japanese.'], answer: 'Besides Chinese, I also study Japanese.', explanation: '除了…以外…还… means “besides…, also…”.' },
    { prompt: 'Complete: 他跑得 ___ 快。', choices: ['很','的','了'], answer: '很', explanation: '得 introduces a complement describing how an action is performed.' },
    ...courseQuestionsByLevel[3],
  ],
  4: [
    { prompt: '“只要努力，就会进步。” expresses…', choices: ['a sufficient condition','a past habit','an uncertain rumor'], answer: 'a sufficient condition', explanation: '只要…就… means “as long as…, then…”.' },
    { prompt: 'Choose the closest meaning of 适应.', choices: ['to adapt','to refuse','to translate'], answer: 'to adapt', explanation: '适应 describes adjusting to a situation or environment.' },
    { prompt: 'Complete: 这个问题值得我们认真 ___。', choices: ['考虑','忘记','离开'], answer: '考虑', explanation: '值得考虑 means “worth considering.”' },
    ...courseQuestionsByLevel[4],
  ],
  5: [
    { prompt: '“他的解释很有说服力。” means his explanation is…', choices: ['convincing','confusing','unnecessary'], answer: 'convincing', explanation: '有说服力 literally means “having persuasive power.”' },
    { prompt: 'Choose the closest meaning of 逐渐.', choices: ['gradually','suddenly','personally'], answer: 'gradually', explanation: '逐渐 describes a change happening little by little.' },
    { prompt: 'Complete: 即使遇到困难，我们也不能轻易 ___。', choices: ['放弃','庆祝','同意'], answer: '放弃', explanation: '即使…也… means “even if…, still…”.' },
    ...courseQuestionsByLevel[5],
  ],
  6: [
    { prompt: '“这项方案仍有待完善。” suggests the plan…', choices: ['still needs improvement','has been rejected','is already perfect'], answer: 'still needs improvement', explanation: '有待完善 means “remains to be improved.”' },
    { prompt: 'Choose the closest meaning of 权衡.', choices: ['to weigh competing factors','to announce publicly','to copy exactly'], answer: 'to weigh competing factors', explanation: '权衡 is used when balancing advantages, risks, or interests.' },
    { prompt: '“他的观点并非毫无根据。” means the view is…', choices: ['not entirely groundless','universally accepted','impossible to explain'], answer: 'not entirely groundless', explanation: '并非毫无根据 is a measured double-negative: “not without basis.”' },
    ...courseQuestionsByLevel[6],
  ],
};

export const pathPacks = {
  General: {
    careers: ['China Life Explorer','University Student','Community Connector'],
    words: [
      ['交流','jiāoliú','to communicate'],['习惯','xíguàn','habit'],['计划','jìhuà','plan'],['经验','jīngyàn','experience'],['适应','shìyìng','to adapt'],['机会','jīhuì','opportunity'],['联系','liánxì','to contact'],['参加','cānjiā','to participate'],
    ],
    mission: 'Plan a week of real Chinese interactions',
    gameTitle: 'City Challenge',
    gameQuestions: [
      { prompt:'A friend asks 你周末有空吗？',choices:['有空，我们一起吃饭吧。','我有一个房间。','请给我护照。'],answer:'有空，我们一起吃饭吧。',explanation:'Answer availability, then make a friendly plan.' },
      { prompt:'You want to exchange contact details.',choices:['我们可以加微信吗？','我要买一张票。','附近有医院吗？'],answer:'我们可以加微信吗？',explanation:'加微信 is the natural way to suggest connecting on WeChat.' },
      { prompt:'A classmate invites you to an activity.',choices:['好啊，我想参加。','这个药很贵。','出口在前面。'],answer:'好啊，我想参加。',explanation:'想参加 expresses interest in joining.' },
    ],
  },
  'Computer Science': {
    careers: ['Software Developer','AI Engineer','Data Analyst'],
    words: [
      ['程序','chéngxù','program'],['数据库','shùjùkù','database'],['算法','suànfǎ','algorithm'],['接口','jiēkǒu','interface / API'],['部署','bùshǔ','deployment'],['漏洞','lòudòng','vulnerability'],['调试','tiáoshì','debugging'],['需求','xūqiú','requirement'],
    ],
    mission: 'Explain a bug during a Chinese stand-up',
    gameTitle: 'Bug Hunt',
    gameQuestions: [
      { prompt:'The API returns an error. What do you report?',choices:['接口返回了一个错误。','菜单没有房间。','我要买算法。'],answer:'接口返回了一个错误。',explanation:'接口 means interface or API in this software context.' },
      { prompt:'The team needs to debug before deployment.',choices:['部署前我们需要调试。','我们在餐厅部署。','这个护照有漏洞。'],answer:'部署前我们需要调试。',explanation:'部署前 means “before deployment”; 调试 means debugging.' },
      { prompt:'Ask whether the requirement has changed.',choices:['需求变了吗？','数据库吃饭了吗？','算法多少钱？'],answer:'需求变了吗？',explanation:'需求 refers to a product or software requirement.' },
    ],
  },
  'International Business': {
    careers: ['Entrepreneur','Trade Specialist','Business Analyst'],
    words: [
      ['合同','hétong','contract'],['供应商','gōngyìngshāng','supplier'],['谈判','tánpàn','negotiation'],['报价','bàojià','quotation'],['交货期','jiāohuòqī','delivery date'],['市场','shìchǎng','market'],['利润','lìrùn','profit'],['合作','hézuò','cooperation'],
    ],
    mission: 'Negotiate delivery terms with a supplier',
    gameTitle: 'Negotiation Challenge',
    gameQuestions: [
      { prompt:'Ask the supplier for a new quotation.',choices:['请给我们一份新的报价。','请给我一张地铁票。','我想调试合同。'],answer:'请给我们一份新的报价。',explanation:'一份报价 is the measure-word phrase for a quotation.' },
      { prompt:'The delivery date is too late.',choices:['交货期太晚了。','市场在三楼。','供应商有头疼。'],answer:'交货期太晚了。',explanation:'交货期 is the agreed delivery date or delivery period.' },
      { prompt:'Propose long-term cooperation.',choices:['我们希望长期合作。','我们想买一张菜单。','这个利润是教室。'],answer:'我们希望长期合作。',explanation:'长期合作 means long-term cooperation.' },
    ],
  },
} satisfies Record<PathId, { careers:string[]; words:string[][]; mission:string; gameTitle:string; gameQuestions:PracticeQuestion[] }>;

export type StoryPack = { id:string; path:PathId|'All'; title:string; chinese:string; hsk:number; summary:string; scenes:{zh:string;py:string;en:string}[]; question:PracticeQuestion };
export const storyLibrary:StoryPack[] = [
  { id:'rain-shanghai',path:'All',title:'Rain in Shanghai',chinese:'上海的雨',hsk:2,summary:'Find a warm table on a rainy arrival.',scenes:[{zh:'你刚到上海，外面下着大雨。',py:'Nǐ gāng dào Shànghǎi, wàimiàn xiàzhe dàyǔ.',en:'You just arrived in Shanghai and it is raining.'},{zh:'你走进一家小餐厅，店员微笑着欢迎你。',py:'Nǐ zǒu jìn yì jiā xiǎo cāntīng, diànyuán wēixiàozhe huānyíng nǐ.',en:'You enter a small restaurant and the server welcomes you.'},{zh:'窗边正好有一张空桌子。',py:'Chuāngbiān zhènghǎo yǒu yì zhāng kōng zhuōzi.',en:'There happens to be an empty table by the window.'}],question:{prompt:'The server asks 请问几位？',choices:['一位，谢谢。','我要一张票。','我有一点头疼。'],answer:'一位，谢谢。',explanation:'位 is the polite measure word for people.'}},
  { id:'first-class',path:'All',title:'The First Lecture',chinese:'第一节课',hsk:3,summary:'Navigate a first day at a Chinese university.',scenes:[{zh:'你提前十分钟来到教室。',py:'Nǐ tíqián shí fēnzhōng láidào jiàoshì.',en:'You arrive at the classroom ten minutes early.'},{zh:'老师请大家做一个简单的自我介绍。',py:'Lǎoshī qǐng dàjiā zuò yí ge jiǎndān de zìwǒ jièshào.',en:'The teacher asks everyone to introduce themselves.'},{zh:'下课后，一个同学邀请你一起去图书馆。',py:'Xiàkè hòu, yí ge tóngxué yāoqǐng nǐ yìqǐ qù túshūguǎn.',en:'After class, a classmate invites you to the library.'}],question:{prompt:'How do you accept the invitation naturally?',choices:['好啊，我们一起去吧。','我没有房卡。','这个药一天两次。'],answer:'好啊，我们一起去吧。',explanation:'好啊 accepts warmly, while 吧 makes the shared plan natural.'}},
  { id:'debug-night',path:'Computer Science',title:'The Midnight Bug',chinese:'深夜的漏洞',hsk:4,summary:'Help a software team fix a release blocker.',scenes:[{zh:'明天要发布新版本，但是测试突然失败了。',py:'Míngtiān yào fābù xīn bǎnběn, dànshì cèshì tūrán shībài le.',en:'A new version ships tomorrow, but tests suddenly fail.'},{zh:'你发现数据库接口返回了错误的数据。',py:'Nǐ fāxiàn shùjùkù jiēkǒu fǎnhuí le cuòwù de shùjù.',en:'You discover the database API returns incorrect data.'},{zh:'团队一起调试，终于找到了漏洞。',py:'Tuánduì yìqǐ tiáoshì, zhōngyú zhǎodào le lòudòng.',en:'The team debugs together and finds the flaw.'}],question:{prompt:'What should the team do before deployment?',choices:['再运行一次测试。','重新谈判价格。','去医院买药。'],answer:'再运行一次测试。',explanation:'Running the tests again verifies the fix before deployment.'}},
  { id:'internship-demo',path:'Computer Science',title:'Internship Demo Day',chinese:'实习展示日',hsk:4,summary:'Present a feature to a Chinese engineering team.',scenes:[{zh:'今天你要介绍实习期间完成的功能。',py:'Jīntiān nǐ yào jièshào shíxí qījiān wánchéng de gōngnéng.',en:'Today you present the feature completed during your internship.'},{zh:'你先说明用户需求，然后演示程序。',py:'Nǐ xiān shuōmíng yònghù xūqiú, ránhòu yǎnshì chéngxù.',en:'You explain the user requirement, then demo the program.'},{zh:'经理问这个功能什么时候可以部署。',py:'Jīnglǐ wèn zhège gōngnéng shénme shíhou kěyǐ bùshǔ.',en:'The manager asks when the feature can deploy.'}],question:{prompt:'Choose a careful professional response.',choices:['测试通过以后就可以部署。','我不知道，随便吧。','这个菜单不太贵。'],answer:'测试通过以后就可以部署。',explanation:'The answer gives a clear deployment condition without overpromising.'}},
  { id:'supplier-call',path:'International Business',title:'The Supplier Call',chinese:'供应商来电',hsk:4,summary:'Respond when a delivery date suddenly changes.',scenes:[{zh:'供应商打电话说交货期要推迟一周。',py:'Gōngyìngshāng dǎ diànhuà shuō jiāohuòqī yào tuīchí yì zhōu.',en:'The supplier says delivery will be delayed one week.'},{zh:'这个变化会影响客户的计划。',py:'Zhège biànhuà huì yǐngxiǎng kèhù de jìhuà.',en:'The change will affect the customer’s plan.'},{zh:'你需要提出一个双方都能接受的方案。',py:"Nǐ xūyào tíchū yí ge shuāngfāng dōu néng jiēshòu de fāng'àn.",en:'You need a plan both sides can accept.'}],question:{prompt:'Choose the most constructive response.',choices:['我们能不能分两批交货？','那就取消所有合作。','这个教室在哪里？'],answer:'我们能不能分两批交货？',explanation:'Splitting delivery into two batches offers a practical compromise.'}},
  { id:'negotiation-table',path:'International Business',title:'Across the Negotiation Table',chinese:'谈判桌对面',hsk:5,summary:'Balance price, quality, and long-term cooperation.',scenes:[{zh:'对方的报价比预算高百分之十五。',py:'Duìfāng de bàojià bǐ yùsuàn gāo bǎifēnzhī shíwǔ.',en:'Their quotation is fifteen percent over budget.'},{zh:'不过，他们的质量和交货速度都很好。',py:'Búguò, tāmen de zhìliàng hé jiāohuò sùdù dōu hěn hǎo.',en:'However, their quality and delivery speed are good.'},{zh:'你决定讨论长期合作的价格。',py:'Nǐ juédìng tǎolùn chángqī hézuò de jiàgé.',en:'You decide to discuss long-term partnership pricing.'}],question:{prompt:'Choose a diplomatic negotiation sentence.',choices:['如果长期合作，价格方面还有商量的空间吗？','你们的价格完全不合理。','我要一张地铁票。'],answer:'如果长期合作，价格方面还有商量的空间吗？',explanation:'This frames the request around mutual long-term value and leaves room for discussion.'}},
];

export const workbookPrompts = [
  {category:'Everyday',prompt:'Write a short message asking a friend if they are free this weekend.',keywords:['周末','有空'],model:'你周末有空吗？我们一起吃饭吧。'},
  {category:'Campus',prompt:'Tell a classmate where your classroom is.',keywords:['教室','在'],model:'我们的教室在三楼。'},
  {category:'Computer Science',prompt:'Report that an API returned an error.',keywords:['接口','错误'],model:'这个接口返回了一个错误。'},
  {category:'Business',prompt:'Ask a supplier to confirm the delivery date.',keywords:['确认','交货期'],model:'请确认一下交货期。'},
  {category:'Reflection',prompt:'Write one sentence about how your Chinese is improving.',keywords:['中文','进步'],model:'我的中文正在慢慢进步。'},
];

export const curatedResources = [
  {category:'Dictionary',title:'MDBG Chinese Dictionary',description:'Search characters, pinyin, meanings, and example usage.',url:'https://www.mdbg.net/chinese/dictionary'},
  {category:'Grammar',title:'Chinese Grammar Wiki',description:'Structured explanations and examples organized by level.',url:'https://resources.allsetlearning.com/chinese/grammar/'},
  {category:'Tools',title:'Pleco',description:'Official reference for dictionary, OCR, handwriting, audio, and flashcard workflows.',url:'https://www.pleco.com/'},
  {category:'Reading',title:'Du Chinese',description:'Official graded-reader service with tap lookup, native audio, and review tools.',url:'https://duchinese.net/'},
  {category:'Course',title:'HelloChinese',description:'Official bite-sized course with speaking, handwriting, video, and spaced review.',url:'https://www.hellochinese.cc/'},
  {category:'Hanzi',title:'Skritter',description:'Official handwriting and spaced-repetition practice for Chinese characters.',url:'https://skritter.com/about'},
  {category:'Listening',title:'ChinesePod',description:'Official dialogue library with line-by-line audio, vocabulary, and exercises.',url:'https://www.chinesepod.com/'},
  {category:'Open data',title:'CC-CEDICT',description:'Open Chinese–English dictionary source licensed CC BY-SA 4.0; linked for attribution and manual access.',url:'https://cc-cedict.org/editor/editor.php?handler=Download'},
  {category:'Listening',title:'Mandarin Corner',description:'Long-form listening practice and street conversations.',url:'https://mandarincorner.org/'},
];
