export type VocabularyItem = {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example: { hanzi: string; pinyin: string; english: string };
};

export type Chapter = {
  id: string;
  icon: string;
  title: string;
  chinese: string;
  description: string;
  mission: string;
  vocabulary: VocabularyItem[];
  question: {
    prompt: string;
    chinesePrompt: string;
    choices: { id: string; text: string; pinyin: string }[];
    answer: string;
    explanation: string;
  };
};

export const adventureChapters: Chapter[] = [
  {
    id: 'arrival', icon: '✈', title: 'Arriving in China', chinese: '抵达中国', description: 'Immigration, greetings, and finding your way.', mission: 'Make your first arrival',
    vocabulary: [
      { id: 'passport', hanzi: '护照', pinyin: 'hùzhào', english: 'passport', example: { hanzi: '这是我的护照。', pinyin: 'Zhè shì wǒ de hùzhào.', english: 'This is my passport.' } },
      { id: 'luggage', hanzi: '行李', pinyin: 'xíngli', english: 'luggage', example: { hanzi: '我的行李在哪里？', pinyin: 'Wǒ de xíngli zài nǎli?', english: 'Where is my luggage?' } },
      { id: 'exit', hanzi: '出口', pinyin: 'chūkǒu', english: 'exit', example: { hanzi: '出口在前面。', pinyin: 'Chūkǒu zài qiánmiàn.', english: 'The exit is ahead.' } },
    ],
    question: { prompt: 'How do you tell the officer “This is my passport”?', chinesePrompt: '这是我的护照。', choices: [
      { id: 'a', text: '这是我的护照。', pinyin: 'Zhè shì wǒ de hùzhào.' }, { id: 'b', text: '我的房间很大。', pinyin: 'Wǒ de fángjiān hěn dà.' }, { id: 'c', text: '我要一杯水。', pinyin: 'Wǒ yào yì bēi shuǐ.' },
    ], answer: 'a', explanation: '这是 means “this is,” and 我的护照 means “my passport.” It is direct, polite, and natural at immigration.' },
  },
  {
    id: 'hotel', icon: '▣', title: 'Hotel Check-in', chinese: '酒店入住', description: 'Reservations, rooms, and simple requests.', mission: 'Check in with confidence',
    vocabulary: [
      { id: 'reservation', hanzi: '预订', pinyin: 'yùdìng', english: 'reservation', example: { hanzi: '我有预订。', pinyin: 'Wǒ yǒu yùdìng.', english: 'I have a reservation.' } },
      { id: 'room', hanzi: '房间', pinyin: 'fángjiān', english: 'room', example: { hanzi: '我的房间在哪里？', pinyin: 'Wǒ de fángjiān zài nǎli?', english: 'Where is my room?' } },
      { id: 'keycard', hanzi: '房卡', pinyin: 'fángkǎ', english: 'room key card', example: { hanzi: '这是您的房卡。', pinyin: 'Zhè shì nín de fángkǎ.', english: 'This is your room key.' } },
    ],
    question: { prompt: 'You reach reception. How do you say “I have a reservation”?', chinesePrompt: '我有预订。', choices: [
      { id: 'a', text: '我有预订。', pinyin: 'Wǒ yǒu yùdìng.' }, { id: 'b', text: '我要坐地铁。', pinyin: 'Wǒ yào zuò dìtiě.' }, { id: 'c', text: '这个多少钱？', pinyin: 'Zhège duōshao qián?' },
    ], answer: 'a', explanation: '我有 means “I have,” followed by 预订, “a reservation.” This is the standard concise check-in phrase.' },
  },
  {
    id: 'restaurant', icon: '♨', title: 'Restaurant', chinese: '餐厅', description: 'Get a table, read a menu, and order naturally.', mission: 'Find your table',
    vocabulary: [
      { id: 'table', hanzi: '桌子', pinyin: 'zhuōzi', english: 'table', example: { hanzi: '我们要一张桌子。', pinyin: 'Wǒmen yào yì zhāng zhuōzi.', english: 'We would like a table.' } },
      { id: 'menu', hanzi: '菜单', pinyin: 'càidān', english: 'menu', example: { hanzi: '请给我看一下菜单。', pinyin: 'Qǐng gěi wǒ kàn yíxià càidān.', english: 'Please let me see the menu.' } },
      { id: 'recommend', hanzi: '推荐', pinyin: 'tuījiàn', english: 'to recommend', example: { hanzi: '你有什么推荐？', pinyin: 'Nǐ yǒu shénme tuījiàn?', english: 'What do you recommend?' } },
    ],
    question: { prompt: 'You arrive with a friend. How do you ask for a table for two?', chinesePrompt: '两位，请给我们一张桌子。', choices: [
      { id: 'a', text: '两位，请给我们一张桌子。', pinyin: 'Liǎng wèi, qǐng gěi wǒmen yì zhāng zhuōzi.' }, { id: 'b', text: '我要买两张票。', pinyin: 'Wǒ yào mǎi liǎng zhāng piào.' }, { id: 'c', text: '我的房间在哪里？', pinyin: 'Wǒ de fángjiān zài nǎli?' },
    ], answer: 'a', explanation: '位 politely counts people, while 张 is the measure word for flat objects such as tables. This sentence is natural and clear in a restaurant.' },
  },
  {
    id: 'transport', icon: '◆', title: 'Transportation', chinese: '交通', description: 'Metro, taxis, directions, and tickets.', mission: 'Navigate the metro',
    vocabulary: [
      { id: 'metro', hanzi: '地铁', pinyin: 'dìtiě', english: 'metro', example: { hanzi: '我坐地铁去学校。', pinyin: 'Wǒ zuò dìtiě qù xuéxiào.', english: 'I take the metro to school.' } },
      { id: 'station', hanzi: '车站', pinyin: 'chēzhàn', english: 'station', example: { hanzi: '车站离这里远吗？', pinyin: 'Chēzhàn lí zhèlǐ yuǎn ma?', english: 'Is the station far from here?' } },
      { id: 'ticket', hanzi: '票', pinyin: 'piào', english: 'ticket', example: { hanzi: '我要买一张票。', pinyin: 'Wǒ yào mǎi yì zhāng piào.', english: 'I want to buy a ticket.' } },
    ],
    question: { prompt: 'How do you ask “Is the station far from here”?', chinesePrompt: '车站离这里远吗？', choices: [
      { id: 'a', text: '车站离这里远吗？', pinyin: 'Chēzhàn lí zhèlǐ yuǎn ma?' }, { id: 'b', text: '请给我看菜单。', pinyin: 'Qǐng gěi wǒ kàn càidān.' }, { id: 'c', text: '我没有预订。', pinyin: 'Wǒ méiyǒu yùdìng.' },
    ], answer: 'a', explanation: '离 marks distance from a place: 车站离这里 means “the station from here,” followed by 远吗, “is it far?”' },
  },
  {
    id: 'shopping', icon: '◒', title: 'Shopping', chinese: '购物', description: 'Prices, sizes, preferences, and payment.', mission: 'Shop at a local market',
    vocabulary: [
      { id: 'price', hanzi: '多少钱', pinyin: 'duōshao qián', english: 'how much', example: { hanzi: '这个多少钱？', pinyin: 'Zhège duōshao qián?', english: 'How much is this?' } },
      { id: 'expensive', hanzi: '贵', pinyin: 'guì', english: 'expensive', example: { hanzi: '有一点贵。', pinyin: 'Yǒu yìdiǎn guì.', english: 'It is a little expensive.' } },
      { id: 'card', hanzi: '刷卡', pinyin: 'shuākǎ', english: 'pay by card', example: { hanzi: '可以刷卡吗？', pinyin: 'Kěyǐ shuākǎ ma?', english: 'Can I pay by card?' } },
    ],
    question: { prompt: 'At the market, how do you ask “How much is this”?', chinesePrompt: '这个多少钱？', choices: [
      { id: 'a', text: '这个多少钱？', pinyin: 'Zhège duōshao qián?' }, { id: 'b', text: '出口在哪里？', pinyin: 'Chūkǒu zài nǎli?' }, { id: 'c', text: '我有一个房间。', pinyin: 'Wǒ yǒu yí ge fángjiān.' },
    ], answer: 'a', explanation: '这个 means “this one,” and 多少钱 asks the price. It is the most useful basic shopping question.' },
  },
  {
    id: 'campus', icon: '学', title: 'Campus Life', chinese: '校园生活', description: 'Classes, assignments, libraries, and classmates.', mission: 'Handle your first day on campus',
    vocabulary: [
      { id: 'classroom', hanzi: '教室', pinyin: 'jiàoshì', english: 'classroom', example: { hanzi: '我们的教室在三楼。', pinyin: 'Wǒmen de jiàoshì zài sān lóu.', english: 'Our classroom is on the third floor.' } },
      { id: 'library', hanzi: '图书馆', pinyin: 'túshūguǎn', english: 'library', example: { hanzi: '我下午去图书馆。', pinyin: 'Wǒ xiàwǔ qù túshūguǎn.', english: 'I am going to the library this afternoon.' } },
      { id: 'homework', hanzi: '作业', pinyin: 'zuòyè', english: 'homework', example: { hanzi: '今天的作业不太难。', pinyin: 'Jīntiān de zuòyè bú tài nán.', english: 'Today’s homework is not too difficult.' } },
    ],
    question: { prompt: 'How do you say “I am going to the library this afternoon”?', chinesePrompt: '我下午去图书馆。', choices: [
      { id: 'a', text: '我下午去图书馆。', pinyin: 'Wǒ xiàwǔ qù túshūguǎn.' }, { id: 'b', text: '我晚上住酒店。', pinyin: 'Wǒ wǎnshang zhù jiǔdiàn.' }, { id: 'c', text: '请给我一张菜单。', pinyin: 'Qǐng gěi wǒ yì zhāng càidān.' },
    ], answer: 'a', explanation: '下午 gives the time, 去 gives the action, and 图书馆 is the destination.' },
  },
  {
    id: 'health', icon: '医', title: 'Health & Pharmacy', chinese: '看病买药', description: 'Describe symptoms and ask for simple help.', mission: 'Ask for help when you feel unwell',
    vocabulary: [
      { id: 'hospital', hanzi: '医院', pinyin: 'yīyuàn', english: 'hospital', example: { hanzi: '附近有医院吗？', pinyin: 'Fùjìn yǒu yīyuàn ma?', english: 'Is there a hospital nearby?' } },
      { id: 'headache', hanzi: '头疼', pinyin: 'tóuténg', english: 'headache', example: { hanzi: '我有一点头疼。', pinyin: 'Wǒ yǒu yìdiǎn tóuténg.', english: 'I have a slight headache.' } },
      { id: 'medicine', hanzi: '药', pinyin: 'yào', english: 'medicine', example: { hanzi: '这个药一天吃两次。', pinyin: 'Zhège yào yì tiān chī liǎng cì.', english: 'Take this medicine twice a day.' } },
    ],
    question: { prompt: 'At a clinic, how do you say “I have a slight headache”?', chinesePrompt: '我有一点头疼。', choices: [
      { id: 'a', text: '我有一点头疼。', pinyin: 'Wǒ yǒu yìdiǎn tóuténg.' }, { id: 'b', text: '我要一张房卡。', pinyin: 'Wǒ yào yì zhāng fángkǎ.' }, { id: 'c', text: '图书馆在三楼。', pinyin: 'Túshūguǎn zài sān lóu.' },
    ], answer: 'a', explanation: '有一点 softens the symptom description, followed by 头疼, “to have a headache.”' },
  },
  {
    id: 'coffee', icon: '咖', title: 'Coffee Shop', chinese: '咖啡店', description: 'Choose a drink, customize it, and order for here or takeaway.', mission: 'Order your coffee naturally',
    vocabulary: [
      { id: 'coffee', hanzi: '咖啡', pinyin: 'kāfēi', english: 'coffee', example: { hanzi: '我想喝一杯咖啡。', pinyin: 'Wǒ xiǎng hē yì bēi kāfēi.', english: 'I would like a cup of coffee.' } },
      { id: 'latte', hanzi: '拿铁', pinyin: 'nátiě', english: 'latte', example: { hanzi: '请给我一杯热拿铁。', pinyin: 'Qǐng gěi wǒ yì bēi rè nátiě.', english: 'Please give me a hot latte.' } },
      { id: 'less-sugar', hanzi: '少糖', pinyin: 'shǎo táng', english: 'less sugar', example: { hanzi: '这杯拿铁请少糖。', pinyin: 'Zhè bēi nátiě qǐng shǎo táng.', english: 'Please make this latte with less sugar.' } },
    ],
    question: { prompt: 'At the counter, how do you order one hot latte with less sugar?', chinesePrompt: '我要一杯热拿铁，少糖。', choices: [
      { id: 'a', text: '我要一杯热拿铁，少糖。', pinyin: 'Wǒ yào yì bēi rè nátiě, shǎo táng.' }, { id: 'b', text: '我要一张地铁票。', pinyin: 'Wǒ yào yì zhāng dìtiě piào.' }, { id: 'c', text: '我的房间要退房。', pinyin: 'Wǒ de fángjiān yào tuìfáng.' },
    ], answer: 'a', explanation: '一杯 counts a cup, 热 describes the drink, and 少糖 clearly requests less sugar.' },
  },
  {
    id: 'social', icon: '友', title: 'Friends & WeChat', chinese: '朋友和微信', description: 'Make plans, exchange contact details, and socialize.', mission: 'Make plans with a new friend',
    vocabulary: [
      { id: 'wechat', hanzi: '微信', pinyin: 'Wēixìn', english: 'WeChat', example: { hanzi: '我们可以加微信吗？', pinyin: 'Wǒmen kěyǐ jiā Wēixìn ma?', english: 'Can we add each other on WeChat?' } },
      { id: 'free-time', hanzi: '有空', pinyin: 'yǒu kòng', english: 'to be free', example: { hanzi: '你周末有空吗？', pinyin: 'Nǐ zhōumò yǒu kòng ma?', english: 'Are you free this weekend?' } },
      { id: 'together', hanzi: '一起', pinyin: 'yìqǐ', english: 'together', example: { hanzi: '我们一起吃饭吧。', pinyin: 'Wǒmen yìqǐ chīfàn ba.', english: 'Let’s eat together.' } },
    ],
    question: { prompt: 'How do you naturally suggest eating together?', chinesePrompt: '我们一起吃饭吧。', choices: [
      { id: 'a', text: '我们一起吃饭吧。', pinyin: 'Wǒmen yìqǐ chīfàn ba.' }, { id: 'b', text: '我要去医院。', pinyin: 'Wǒ yào qù yīyuàn.' }, { id: 'c', text: '这个多少钱？', pinyin: 'Zhège duōshao qián?' },
    ], answer: 'a', explanation: '一起 means “together,” and sentence-final 吧 makes the suggestion friendly and natural.' },
  },
];

export const allVocabulary = adventureChapters.flatMap(chapter => chapter.vocabulary.map(word => ({ ...word, chapterId: chapter.id, chapter: chapter.title })));

export const specializationContent = {
  'Computer Science': { label: 'Computer Science', chinese: '计算机科学', words: ['程序', '数据库', '算法'], next: 'Developer stand-up listening' },
  'International Business': { label: 'International Business', chinese: '国际商务', words: ['合同', '供应商', '谈判'], next: 'Supplier negotiation practice' },
  'General': { label: 'Everyday Chinese', chinese: '日常中文', words: ['习惯', '计划', '交流'], next: 'Natural daily conversation' },
  'Medicine & Health': { label: 'Medicine & Health', chinese: '医学与健康', words: ['症状', '诊断', '治疗'], next: 'Patient and clinic communication' },
  'Engineering': { label: 'Engineering', chinese: '工程技术', words: ['设计', '材料', '设备'], next: 'Technical review practice' },
  'Academic Research': { label: 'Academic Research', chinese: '学术研究', words: ['研究', '论文', '文献'], next: 'Supervisor and seminar Chinese' },
  'Tourism & Hospitality': { label: 'Tourism & Hospitality', chinese: '旅游与酒店', words: ['预订', '行程', '接待'], next: 'Guest service scenarios' },
} as const;
