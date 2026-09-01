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
  {
    id: 'sightseeing', icon: '景', title: 'Sightseeing & Museums', chinese: '景点和博物馆', description: 'Tickets, opening hours, guided visits, and cultural sites.', mission: 'Explore a museum like a local',
    vocabulary: [
      { id: 'museum', hanzi: '博物馆', pinyin: 'bówùguǎn', english: 'museum', example: { hanzi: '博物馆几点开门？', pinyin: 'Bówùguǎn jǐ diǎn kāimén?', english: 'What time does the museum open?' } },
      { id: 'entrance-ticket', hanzi: '门票', pinyin: 'ménpiào', english: 'entrance ticket', example: { hanzi: '我已经买好门票了。', pinyin: 'Wǒ yǐjīng mǎi hǎo ménpiào le.', english: 'I have already bought the entrance ticket.' } },
      { id: 'guided-tour', hanzi: '讲解', pinyin: 'jiǎngjiě', english: 'guided explanation', example: { hanzi: '这里有中文讲解吗？', pinyin: 'Zhèlǐ yǒu Zhōngwén jiǎngjiě ma?', english: 'Is there a Chinese guided explanation here?' } },
    ],
    question: { prompt: 'At the entrance, how do you ask what time the museum opens?', chinesePrompt: '博物馆几点开门？', choices: [
      { id: 'a', text: '博物馆几点开门？', pinyin: 'Bówùguǎn jǐ diǎn kāimén?' }, { id: 'b', text: '地铁在哪里换乘？', pinyin: 'Dìtiě zài nǎli huànchéng?' }, { id: 'c', text: '我想要一杯咖啡。', pinyin: 'Wǒ xiǎng yào yì bēi kāfēi.' },
    ], answer: 'a', explanation: '几点 asks “what time,” and 开门 means a place opens to visitors.' },
  },
  {
    id: 'payments', icon: '付', title: 'Banking & Mobile Payments', chinese: '银行和移动支付', description: 'QR payments, bank counters, cash, and payment problems.', mission: 'Pay confidently in China',
    vocabulary: [
      { id: 'mobile-payment', hanzi: '移动支付', pinyin: 'yídòng zhīfù', english: 'mobile payment', example: { hanzi: '这里可以用移动支付吗？', pinyin: 'Zhèlǐ kěyǐ yòng yídòng zhīfù ma?', english: 'Can I use mobile payment here?' } },
      { id: 'qr-code', hanzi: '二维码', pinyin: 'èrwéimǎ', english: 'QR code', example: { hanzi: '请扫这个二维码。', pinyin: 'Qǐng sǎo zhège èrwéimǎ.', english: 'Please scan this QR code.' } },
      { id: 'bank-counter', hanzi: '银行柜台', pinyin: 'yínháng guìtái', english: 'bank counter', example: { hanzi: '请去三号柜台办理。', pinyin: 'Qǐng qù sān hào guìtái bànlǐ.', english: 'Please go to counter number three.' } },
    ],
    question: { prompt: 'How do you ask whether mobile payment is accepted?', chinesePrompt: '这里可以用移动支付吗？', choices: [
      { id: 'a', text: '这里可以用移动支付吗？', pinyin: 'Zhèlǐ kěyǐ yòng yídòng zhīfù ma?' }, { id: 'b', text: '这里可以寄行李吗？', pinyin: 'Zhèlǐ kěyǐ jì xíngli ma?' }, { id: 'c', text: '这里可以点咖啡吗？', pinyin: 'Zhèlǐ kěyǐ diǎn kāfēi ma?' },
    ], answer: 'a', explanation: '可以用 asks whether something can be used, followed by 移动支付, “mobile payment.”' },
  },
  {
    id:'apartment',icon:'家',title:'Renting an Apartment',chinese:'租房生活',description:'Viewings, rent, utilities, repairs, and neighbors.',mission:'Find a place to call home',
    vocabulary:[
      {id:'rent',hanzi:'房租',pinyin:'fángzū',english:'rent',example:{hanzi:'房租一个月多少钱？',pinyin:'Fángzū yí ge yuè duōshao qián?',english:'How much is the monthly rent?'}},
      {id:'landlord',hanzi:'房东',pinyin:'fángdōng',english:'landlord',example:{hanzi:'我需要联系房东。',pinyin:'Wǒ xūyào liánxì fángdōng.',english:'I need to contact the landlord.'}},
      {id:'repair',hanzi:'维修',pinyin:'wéixiū',english:'repair',example:{hanzi:'空调需要维修。',pinyin:'Kōngtiáo xūyào wéixiū.',english:'The air conditioner needs repair.'}},
    ],question:{prompt:'How do you ask the monthly rent?',chinesePrompt:'房租一个月多少钱？',choices:[{id:'a',text:'房租一个月多少钱？',pinyin:'Fángzū yí ge yuè duōshao qián?'},{id:'b',text:'地铁几点关门？',pinyin:'Dìtiě jǐ diǎn guānmén?'},{id:'c',text:'我要点一杯咖啡。',pinyin:'Wǒ yào diǎn yì bēi kāfēi.'}],answer:'a',explanation:'房租 names the rent, 一个月 sets the monthly period, and 多少钱 asks the price.'}
  },
  {
    id:'delivery',icon:'包',title:'Delivery & Couriers',chinese:'外卖和快递',description:'Addresses, pickup codes, delivery notes, and missing parcels.',mission:'Receive a delivery smoothly',
    vocabulary:[
      {id:'courier',hanzi:'快递员',pinyin:'kuàidìyuán',english:'courier',example:{hanzi:'快递员已经到楼下了。',pinyin:'Kuàidìyuán yǐjīng dào lóuxià le.',english:'The courier is already downstairs.'}},
      {id:'pickup-code',hanzi:'取件码',pinyin:'qǔjiànmǎ',english:'pickup code',example:{hanzi:'请告诉我取件码。',pinyin:'Qǐng gàosu wǒ qǔjiànmǎ.',english:'Please tell me the pickup code.'}},
      {id:'address',hanzi:'收货地址',pinyin:'shōuhuò dìzhǐ',english:'delivery address',example:{hanzi:'请确认收货地址。',pinyin:'Qǐng quèrèn shōuhuò dìzhǐ.',english:'Please confirm the delivery address.'}},
    ],question:{prompt:'The courier is downstairs. What do you ask for?',chinesePrompt:'请告诉我取件码。',choices:[{id:'a',text:'请告诉我取件码。',pinyin:'Qǐng gàosu wǒ qǔjiànmǎ.'},{id:'b',text:'请给我看菜单。',pinyin:'Qǐng gěi wǒ kàn càidān.'},{id:'c',text:'我的课在三楼。',pinyin:'Wǒ de kè zài sān lóu.'}],answer:'a',explanation:'取件码 is the pickup code used to identify and collect a parcel.'}
  },
  {
    id:'workplace',icon:'职',title:'Workplace & Meetings',chinese:'职场沟通',description:'Meetings, deadlines, updates, feedback, and teamwork.',mission:'Join your first Chinese meeting',
    vocabulary:[
      {id:'meeting',hanzi:'会议',pinyin:'huìyì',english:'meeting',example:{hanzi:'会议十点开始。',pinyin:'Huìyì shí diǎn kāishǐ.',english:'The meeting starts at ten.'}},
      {id:'deadline',hanzi:'截止日期',pinyin:'jiézhǐ rìqī',english:'deadline',example:{hanzi:'截止日期是星期五。',pinyin:'Jiézhǐ rìqī shì xīngqīwǔ.',english:'The deadline is Friday.'}},
      {id:'progress-update',hanzi:'进度汇报',pinyin:'jìndù huìbào',english:'progress update',example:{hanzi:'我来做进度汇报。',pinyin:'Wǒ lái zuò jìndù huìbào.',english:'I will give the progress update.'}},
    ],question:{prompt:'How do you say the meeting starts at ten?',chinesePrompt:'会议十点开始。',choices:[{id:'a',text:'会议十点开始。',pinyin:'Huìyì shí diǎn kāishǐ.'},{id:'b',text:'十点买两张票。',pinyin:'Shí diǎn mǎi liǎng zhāng piào.'},{id:'c',text:'会议在房间贵。',pinyin:'Huìyì zài fángjiān guì.'}],answer:'a',explanation:'Chinese puts the time before the verb: 会议 + 十点 + 开始.'}
  },
  {
    id:'rail',icon:'铁',title:'High-Speed Rail',chinese:'高铁出行',description:'Stations, train numbers, platforms, seats, and connections.',mission:'Catch the right high-speed train',
    vocabulary:[
      {id:'high-speed-rail',hanzi:'高铁',pinyin:'gāotiě',english:'high-speed rail',example:{hanzi:'我们坐高铁去南京。',pinyin:'Wǒmen zuò gāotiě qù Nánjīng.',english:'We take high-speed rail to Nanjing.'}},
      {id:'platform',hanzi:'站台',pinyin:'zhàntái',english:'platform',example:{hanzi:'请去八号站台。',pinyin:'Qǐng qù bā hào zhàntái.',english:'Please go to platform eight.'}},
      {id:'carriage',hanzi:'车厢',pinyin:'chēxiāng',english:'train carriage',example:{hanzi:'我的座位在五号车厢。',pinyin:'Wǒ de zuòwèi zài wǔ hào chēxiāng.',english:'My seat is in carriage five.'}},
    ],question:{prompt:'Where is your seat?',chinesePrompt:'我的座位在五号车厢。',choices:[{id:'a',text:'我的座位在五号车厢。',pinyin:'Wǒ de zuòwèi zài wǔ hào chēxiāng.'},{id:'b',text:'我的房租一个月。',pinyin:'Wǒ de fángzū yí ge yuè.'},{id:'c',text:'我的药一天两次。',pinyin:'Wǒ de yào yì tiān liǎng cì.'}],answer:'a',explanation:'五号车厢 means carriage number five; 在 marks the location.'}
  },
  {
    id:'emergency',icon:'急',title:'Emergencies & Safety',chinese:'紧急情况',description:'Ask for urgent help, report loss, and understand warnings.',mission:'Get help in an emergency',
    vocabulary:[
      {id:'emergency-number',hanzi:'报警电话',pinyin:'bàojǐng diànhuà',english:'emergency police number',example:{hanzi:'报警电话是110。',pinyin:'Bàojǐng diànhuà shì yāo-yāo-líng.',english:'The police emergency number is 110.'}},
      {id:'lost',hanzi:'丢了',pinyin:'diū le',english:'lost',example:{hanzi:'我的钱包丢了。',pinyin:'Wǒ de qiánbāo diū le.',english:'My wallet is lost.'}},
      {id:'help',hanzi:'求助',pinyin:'qiúzhù',english:'seek help',example:{hanzi:'我需要向警察求助。',pinyin:'Wǒ xūyào xiàng jǐngchá qiúzhù.',english:'I need to ask the police for help.'}},
    ],question:{prompt:'How do you report a lost wallet?',chinesePrompt:'我的钱包丢了。',choices:[{id:'a',text:'我的钱包丢了。',pinyin:'Wǒ de qiánbāo diū le.'},{id:'b',text:'我的咖啡少糖。',pinyin:'Wǒ de kāfēi shǎo táng.'},{id:'c',text:'我的会议十点。',pinyin:'Wǒ de huìyì shí diǎn.'}],answer:'a',explanation:'丢了 marks that an item has been lost; place the item before it.'}
  },
  {
    id:'public-services',icon:'办',title:'Public Services',chinese:'办事大厅',description:'Forms, documents, queues, certificates, and official counters.',mission:'Complete an official process',
    vocabulary:[
      {id:'form',hanzi:'申请表',pinyin:'shēnqǐngbiǎo',english:'application form',example:{hanzi:'请先填写申请表。',pinyin:'Qǐng xiān tiánxiě shēnqǐngbiǎo.',english:'Please fill in the application form first.'}},
      {id:'certificate',hanzi:'证明',pinyin:'zhèngmíng',english:'certificate / proof',example:{hanzi:'我需要一份在读证明。',pinyin:'Wǒ xūyào yí fèn zàidú zhèngmíng.',english:'I need a proof of enrollment.'}},
      {id:'queue-number',hanzi:'排队号码',pinyin:'páiduì hàomǎ',english:'queue number',example:{hanzi:'请先取排队号码。',pinyin:'Qǐng xiān qǔ páiduì hàomǎ.',english:'Please take a queue number first.'}},
    ],question:{prompt:'What must you fill in first?',chinesePrompt:'请先填写申请表。',choices:[{id:'a',text:'请先填写申请表。',pinyin:'Qǐng xiān tiánxiě shēnqǐngbiǎo.'},{id:'b',text:'请先打开菜单。',pinyin:'Qǐng xiān dǎkāi càidān.'},{id:'c',text:'请先喝热拿铁。',pinyin:'Qǐng xiān hē rè nátiě.'}],answer:'a',explanation:'填写 means fill in, and 申请表 is an application form.'}
  },
  {
    id:'fitness',icon:'动',title:'Fitness & Sports',chinese:'运动健身',description:'Gym memberships, equipment, training, and healthy routines.',mission:'Join a fitness class',
    vocabulary:[
      {id:'gym',hanzi:'健身房',pinyin:'jiànshēnfáng',english:'gym',example:{hanzi:'健身房几点关门？',pinyin:'Jiànshēnfáng jǐ diǎn guānmén?',english:'What time does the gym close?'}},
      {id:'membership',hanzi:'会员卡',pinyin:'huìyuánkǎ',english:'membership card',example:{hanzi:'我想办一张会员卡。',pinyin:'Wǒ xiǎng bàn yì zhāng huìyuánkǎ.',english:'I would like to get a membership card.'}},
      {id:'warm-up',hanzi:'热身',pinyin:'rèshēn',english:'warm up',example:{hanzi:'运动前要先热身。',pinyin:'Yùndòng qián yào xiān rèshēn.',english:'Warm up before exercising.'}},
    ],question:{prompt:'What should you do before exercising?',chinesePrompt:'运动前要先热身。',choices:[{id:'a',text:'运动前要先热身。',pinyin:'Yùndòng qián yào xiān rèshēn.'},{id:'b',text:'运动前要先退房。',pinyin:'Yùndòng qián yào xiān tuìfáng.'},{id:'c',text:'运动前要先取票。',pinyin:'Yùndòng qián yào xiān qǔpiào.'}],answer:'a',explanation:'运动前 means before exercise; 先热身 means warm up first.'}
  },
  {
    id:'festivals',icon:'节',title:'Festivals & Traditions',chinese:'节日文化',description:'Greetings, customs, family gatherings, and traditional food.',mission:'Celebrate a Chinese festival',
    vocabulary:[
      {id:'spring-festival',hanzi:'春节',pinyin:'Chūnjié',english:'Spring Festival',example:{hanzi:'春节我们回家团聚。',pinyin:'Chūnjié wǒmen huí jiā tuánjù.',english:'We go home for a reunion at Spring Festival.'}},
      {id:'red-envelope',hanzi:'红包',pinyin:'hóngbāo',english:'red envelope',example:{hanzi:'孩子们收到红包。',pinyin:'Háizimen shōudào hóngbāo.',english:'The children receive red envelopes.'}},
      {id:'reunion-dinner',hanzi:'年夜饭',pinyin:'niányèfàn',english:'New Year reunion dinner',example:{hanzi:'全家一起吃年夜饭。',pinyin:'Quánjiā yìqǐ chī niányèfàn.',english:'The whole family eats reunion dinner together.'}},
    ],question:{prompt:'What does the whole family eat together?',chinesePrompt:'全家一起吃年夜饭。',choices:[{id:'a',text:'全家一起吃年夜饭。',pinyin:'Quánjiā yìqǐ chī niányèfàn.'},{id:'b',text:'全家一起坐地铁。',pinyin:'Quánjiā yìqǐ zuò dìtiě.'},{id:'c',text:'全家一起填表。',pinyin:'Quánjiā yìqǐ tián biǎo.'}],answer:'a',explanation:'年夜饭 is the reunion dinner traditionally shared on New Year’s Eve.'}
  },
  {
    id:'technology',icon:'数',title:'Technology & Repairs',chinese:'数码生活',description:'Devices, connectivity, accounts, repairs, and technical support.',mission:'Solve a device problem',
    vocabulary:[
      {id:'network',hanzi:'网络',pinyin:'wǎngluò',english:'network / internet',example:{hanzi:'这里的网络不稳定。',pinyin:'Zhèlǐ de wǎngluò bù wěndìng.',english:'The internet here is unstable.'}},
      {id:'charge',hanzi:'充电',pinyin:'chōngdiàn',english:'charge a device',example:{hanzi:'我的手机需要充电。',pinyin:'Wǒ de shǒujī xūyào chōngdiàn.',english:'My phone needs charging.'}},
      {id:'technical-support',hanzi:'技术支持',pinyin:'jìshù zhīchí',english:'technical support',example:{hanzi:'请联系技术支持。',pinyin:'Qǐng liánxì jìshù zhīchí.',english:'Please contact technical support.'}},
    ],question:{prompt:'The internet is unstable. Who should you contact?',chinesePrompt:'请联系技术支持。',choices:[{id:'a',text:'请联系技术支持。',pinyin:'Qǐng liánxì jìshù zhīchí.'},{id:'b',text:'请联系餐厅服务员。',pinyin:'Qǐng liánxì cāntīng fúwùyuán.'},{id:'c',text:'请联系博物馆导游。',pinyin:'Qǐng liánxì bówùguǎn dǎoyóu.'}],answer:'a',explanation:'技术支持 is technical support, the correct help channel for a device or network issue.'}
  },
  {
    id:'gym',icon:'健',title:'Build Your Strength',chinese:'力量训练',description:'Memberships, equipment, sets, rest, and asking a trainer for help.',mission:'Complete a guided strength session',
    vocabulary:[
      {id:'trainer',hanzi:'健身教练',pinyin:'jiànshēn jiàoliàn',english:'fitness trainer',example:{hanzi:'我想请教一下健身教练。',pinyin:'Wǒ xiǎng qǐngjiào yíxià jiànshēn jiàoliàn.',english:'I would like to ask the trainer for advice.'}},
      {id:'equipment',hanzi:'健身器材',pinyin:'jiànshēn qìcái',english:'gym equipment',example:{hanzi:'这个健身器材怎么用？',pinyin:'Zhège jiànshēn qìcái zěnme yòng?',english:'How do I use this gym equipment?'}},
      {id:'set',hanzi:'一组',pinyin:'yì zǔ',english:'one set',example:{hanzi:'每个动作做三组。',pinyin:'Měi ge dòngzuò zuò sān zǔ.',english:'Do three sets of each movement.'}},
    ],question:{prompt:'How do you ask how to use the equipment?',chinesePrompt:'这个健身器材怎么用？',choices:[{id:'a',text:'这个健身器材怎么用？',pinyin:'Zhège jiànshēn qìcái zěnme yòng?'},{id:'b',text:'这个车厢在哪里？',pinyin:'Zhège chēxiāng zài nǎli?'},{id:'c',text:'这个红包多少钱？',pinyin:'Zhège hóngbāo duōshao qián?'}],answer:'a',explanation:'怎么用 asks “how is it used,” following the equipment being discussed.'}
  },
  {
    id:'basketball',icon:'篮',title:'Own the Basketball Court',chinese:'篮球场上',description:'Join a team, understand positions, pass, shoot, and talk about the score.',mission:'Communicate through a full basketball game',
    vocabulary:[
      {id:'basketball-court',hanzi:'篮球场',pinyin:'lánqiúchǎng',english:'basketball court',example:{hanzi:'我们在篮球场见。',pinyin:'Wǒmen zài lánqiúchǎng jiàn.',english:'Let us meet at the basketball court.'}},
      {id:'pass-ball',hanzi:'传球',pinyin:'chuánqiú',english:'pass the ball',example:{hanzi:'快传球给我！',pinyin:'Kuài chuánqiú gěi wǒ!',english:'Pass me the ball quickly!'}},
      {id:'shoot',hanzi:'投篮',pinyin:'tóulán',english:'shoot a basket',example:{hanzi:'他投篮得分了。',pinyin:'Tā tóulán défēn le.',english:'He scored with a shot.'}},
    ],question:{prompt:'How do you tell a teammate to pass you the ball?',chinesePrompt:'快传球给我！',choices:[{id:'a',text:'快传球给我！',pinyin:'Kuài chuánqiú gěi wǒ!'},{id:'b',text:'快扫码付款！',pinyin:'Kuài sǎomǎ fùkuǎn!'},{id:'c',text:'快填写申请表！',pinyin:'Kuài tiánxiě shēnqǐngbiǎo!'}],answer:'a',explanation:'传球 means pass the ball, and 给我 means to me.'}
  },
  {
    id:'badminton',icon:'羽',title:'Master the Badminton Rally',chinese:'羽毛球对练',description:'Book a court, borrow rackets, serve, rally, and keep score.',mission:'Complete a badminton rally and score the match',
    vocabulary:[
      {id:'badminton-court',hanzi:'羽毛球场',pinyin:'yǔmáoqiúchǎng',english:'badminton court',example:{hanzi:'我预订了羽毛球场。',pinyin:'Wǒ yùdìng le yǔmáoqiúchǎng.',english:'I booked a badminton court.'}},
      {id:'racket',hanzi:'球拍',pinyin:'qiúpāi',english:'racket',example:{hanzi:'可以借一个球拍吗？',pinyin:'Kěyǐ jiè yí ge qiúpāi ma?',english:'May I borrow a racket?'}},
      {id:'serve',hanzi:'发球',pinyin:'fāqiú',english:'serve',example:{hanzi:'这次轮到你发球。',pinyin:'Zhè cì lúndào nǐ fāqiú.',english:'It is your turn to serve.'}},
    ],question:{prompt:'How do you ask to borrow a racket?',chinesePrompt:'可以借一个球拍吗？',choices:[{id:'a',text:'可以借一个球拍吗？',pinyin:'Kěyǐ jiè yí ge qiúpāi ma?'},{id:'b',text:'可以借一张房卡吗？',pinyin:'Kěyǐ jiè yì zhāng fángkǎ ma?'},{id:'c',text:'可以借一个红包吗？',pinyin:'Kěyǐ jiè yí ge hóngbāo ma?'}],answer:'a',explanation:'借 means borrow, and 球拍 is a racket.'}
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
