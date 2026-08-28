import { completeCourseStoryCatalog } from './course-story-catalog.ts';

export type TextbookWord = { hanzi:string; pinyin:string; english:string; lesson:string };
export type TextbookWordCollection = { level:number; book:string; note:string; words:TextbookWord[] };

export const textbookWordCollections:TextbookWordCollection[] = [
  {level:1,book:'HSK Standard Course 1',note:'Introductions, family, dates, food, weather, and travel',words:[
    {hanzi:'你好',pinyin:'nǐ hǎo',english:'hello',lesson:'你好'},{hanzi:'谢谢',pinyin:'xièxie',english:'thank you',lesson:'谢谢你'},{hanzi:'名字',pinyin:'míngzi',english:'name',lesson:'你叫什么名字'},{hanzi:'老师',pinyin:'lǎoshī',english:'teacher',lesson:'她是我的汉语老师'},{hanzi:'女儿',pinyin:'nǚ’ér',english:'daughter',lesson:'她女儿今年二十岁'},{hanzi:'汉语',pinyin:'Hànyǔ',english:'Chinese language',lesson:'我会说汉语'},{hanzi:'茶',pinyin:'chá',english:'tea',lesson:'我想喝茶'},{hanzi:'天气',pinyin:'tiānqì',english:'weather',lesson:'明天天气怎么样'},{hanzi:'衣服',pinyin:'yīfu',english:'clothes',lesson:'她买了不少衣服'},{hanzi:'飞机',pinyin:'fēijī',english:'airplane',lesson:'我是坐飞机来的'}]},
  {level:2,book:'HSK Standard Course 2',note:'Daily routine, travel, colors, work, shopping, and location',words:[
    {hanzi:'旅游',pinyin:'lǚyóu',english:'travel',lesson:'九月去北京旅游最好'},{hanzi:'起床',pinyin:'qǐchuáng',english:'get up',lesson:'我每天六点起床'},{hanzi:'红色',pinyin:'hóngsè',english:'red',lesson:'左边那个红色的是我的'},{hanzi:'左边',pinyin:'zuǒbian',english:'left side',lesson:'左边那个红色的是我的'},{hanzi:'工作',pinyin:'gōngzuò',english:'work / job',lesson:'这个工作是他帮我介绍的'},{hanzi:'帮助',pinyin:'bāngzhù',english:'help',lesson:'这个工作是他帮我介绍的'},{hanzi:'介绍',pinyin:'jièshào',english:'introduce',lesson:'这个工作是他帮我介绍的'},{hanzi:'件',pinyin:'jiàn',english:'measure word for clothes',lesson:'就买这件吧'},{hanzi:'每天',pinyin:'měitiān',english:'every day',lesson:'我每天六点起床'},{hanzi:'最好',pinyin:'zuìhǎo',english:'best / had better',lesson:'九月去北京旅游最好'}]},
  {level:3,book:'HSK Standard Course 3',note:'Plans, changes, comparisons, complements, and 把/被 sentences',words:[
    {hanzi:'打算',pinyin:'dǎsuàn',english:'plan / intend',lesson:'周末你有什么打算'},{hanzi:'突然',pinyin:'tūrán',english:'suddenly',lesson:'怎么突然找不到了'},{hanzi:'越来越',pinyin:'yuèláiyuè',english:'more and more',lesson:'我最近越来越胖了'},{hanzi:'复习',pinyin:'fùxí',english:'review',lesson:'学习安排'},{hanzi:'空调',pinyin:'kōngtiáo',english:'air conditioner',lesson:'别忘了把空调关了'},{hanzi:'重要',pinyin:'zhòngyào',english:'important',lesson:'把重要的东西放在我这儿吧'},{hanzi:'影响',pinyin:'yǐngxiǎng',english:'influence',lesson:'我被他影响了'},{hanzi:'相信',pinyin:'xiāngxìn',english:'believe',lesson:'我相信他们会同意的'},{hanzi:'同意',pinyin:'tóngyì',english:'agree',lesson:'我相信他们会同意的'},{hanzi:'周末',pinyin:'zhōumò',english:'weekend',lesson:'周末你有什么打算'}]},
  {level:4,book:'HSK Standard Course 4 · Volumes I–II',note:'Relationships, choices, quality, health, happiness, reading, and the wider world',words:[
    {hanzi:'爱情',pinyin:'àiqíng',english:'romantic love',lesson:'简单的爱情'},{hanzi:'真正',pinyin:'zhēnzhèng',english:'genuine / real',lesson:'真正的朋友'},{hanzi:'印象',pinyin:'yìnxiàng',english:'impression',lesson:'经理对我印象不错'},{hanzi:'赚钱',pinyin:'zhuànqián',english:'earn money',lesson:'不要太着急赚钱'},{hanzi:'适合',pinyin:'shìhé',english:'suit / fit',lesson:'只买对的，不买贵的'},{hanzi:'质量',pinyin:'zhìliàng',english:'quality',lesson:'一分钱一分货'},{hanzi:'健康',pinyin:'jiànkāng',english:'health',lesson:'最好的医生是自己'},{hanzi:'幸福',pinyin:'xìngfú',english:'happiness',lesson:'幸福的标准'},{hanzi:'读书',pinyin:'dúshū',english:'read / study',lesson:'读书好，读好书，好读书'},{hanzi:'发现',pinyin:'fāxiàn',english:'discover',lesson:'用心发现世界'}]},
  {level:5,book:'HSK Standard Course 5 · Volumes I–II',note:'Life choices, culture, reading, reflection, society, and the environment',words:[
    {hanzi:'细节',pinyin:'xìjié',english:'detail',lesson:'爱的细节'},{hanzi:'选择',pinyin:'xuǎnzé',english:'choice / choose',lesson:'人生有选择，一切可改变'},{hanzi:'改变',pinyin:'gǎibiàn',english:'change',lesson:'人生有选择，一切可改变'},{hanzi:'成语',pinyin:'chéngyǔ',english:'idiom',lesson:'成语故事两则'},{hanzi:'争论',pinyin:'zhēnglùn',english:'argue / debate',lesson:'争论的奇迹'},{hanzi:'阅读',pinyin:'yuèdú',english:'read',lesson:'阅读与思考'},{hanzi:'环保',pinyin:'huánbǎo',english:'environmental protection',lesson:'身边的环保'},{hanzi:'竞争',pinyin:'jìngzhēng',english:'competition',lesson:'竞争让市场更高效'},{hanzi:'家乡',pinyin:'jiāxiāng',english:'hometown',lesson:'家乡的萝卜饼'},{hanzi:'成长',pinyin:'chéngzhǎng',english:'grow / mature',lesson:'谢谢你们让我成长'}]},
  {level:6,book:'HSK Standard Course 6 · Volumes I–II',note:'Life lessons, global issues, science, culture, memory, and future society',words:[
    {hanzi:'启示',pinyin:'qǐshì',english:'insight / inspiration',lesson:'孩子给我们的启示'},{hanzi:'完美',pinyin:'wánměi',english:'perfect',lesson:'完美的胜利'},{hanzi:'胜利',pinyin:'shènglì',english:'victory',lesson:'完美的胜利'},{hanzi:'外语',pinyin:'wàiyǔ',english:'foreign language',lesson:'学一门外语需要理由吗'},{hanzi:'全球',pinyin:'quánqiú',english:'global',lesson:'全球变暖中的小企鹅'},{hanzi:'变暖',pinyin:'biànnuǎn',english:'become warmer',lesson:'全球变暖中的小企鹅'},{hanzi:'启发',pinyin:'qǐfā',english:'inspire / enlighten',lesson:'生活点滴'},{hanzi:'商店',pinyin:'shāngdiàn',english:'shop',lesson:'未来商店'},{hanzi:'记忆',pinyin:'jìyì',english:'memory',lesson:'你能让爷爷的记忆延续吗'},{hanzi:'未来',pinyin:'wèilái',english:'future',lesson:'未来商店'}]},
];

const story = (id:string,hsk:number,title:string,chinese:string,summary:string,scenes:{zh:string;py:string;en:string}[],prompt:string,choices:string[],answer:string,explanation:string,meta?:{volume?:string;lesson?:number}) => ({id,path:'All' as const,title,chinese,hsk,summary,scenes,question:{prompt,choices,answer,explanation},source:'HSK Standard Course topic · original practice',volume:meta?.volume??'精选',lesson:meta?.lesson??0});

export const textbookStoryLibrary = [
  story('textbook-hsk1-name',1,'A New Classmate','你叫什么名字','Practice a first meeting using the introduction topics in Standard Course 1.',[
    {zh:'今天，你第一次来汉语课。',py:'Jīntiān, nǐ dì-yī cì lái Hànyǔ kè.',en:'Today is your first Chinese class.'},{zh:'旁边的学生说：“你好，我叫林月。”',py:'Pángbiān de xuésheng shuō: “Nǐ hǎo, wǒ jiào Lín Yuè.”',en:'The student beside you says, “Hello, I am Lin Yue.”'},{zh:'你笑着问：“你叫什么名字？”',py:'Nǐ xiàozhe wèn: “Nǐ jiào shénme míngzi?”',en:'You smile and ask, “What is your name?”'}], 'Which question asks someone’s name?',['你叫什么名字？','你想喝什么？','今天几号？'],'你叫什么名字？','叫什么名字 is the Standard Course 1 pattern for asking a name.'),
  story('textbook-hsk1-tea',1,'Tea After Class','我想喝茶','Use 想 and simple food vocabulary after class.',[
    {zh:'下课了，你和朋友去饭店。',py:'Xiàkè le, nǐ hé péngyou qù fàndiàn.',en:'Class ends, and you go to a restaurant with a friend.'},{zh:'朋友想喝水，你想喝茶。',py:'Péngyou xiǎng hē shuǐ, nǐ xiǎng hē chá.',en:'Your friend wants water; you want tea.'},{zh:'你对服务员说：“我想喝茶，谢谢。”',py:'Nǐ duì fúwùyuán shuō: “Wǒ xiǎng hē chá, xièxie.”',en:'You tell the server, “I would like tea, thank you.”'}], 'What does the learner order?',['茶','咖啡','牛奶'],'茶','The learner says 我想喝茶.'),
  story('textbook-hsk2-morning',2,'The Six O’Clock Habit','我每天六点起床','Follow the daily-routine theme from Standard Course 2.',[
    {zh:'李明每天六点起床。',py:'Lǐ Míng měitiān liù diǎn qǐchuáng.',en:'Li Ming gets up at six every day.'},{zh:'他先跑步，然后吃早饭。',py:'Tā xiān pǎobù, ránhòu chī zǎofàn.',en:'He runs first, then eats breakfast.'},{zh:'七点半，他已经准备好去上班了。',py:'Qī diǎn bàn, tā yǐjīng zhǔnbèi hǎo qù shàngbān le.',en:'At 7:30, he is ready to go to work.'}], 'What does Li Ming do first after getting up?',['跑步','看电影','买衣服'],'跑步','The story uses 先 to mark running as the first action.'),
  story('textbook-hsk2-beijing',2,'September in Beijing','九月去北京旅游最好','Plan a trip using time, weather, and travel vocabulary.',[
    {zh:'安娜想去北京旅游。',py:'Ānnà xiǎng qù Běijīng lǚyóu.',en:'Anna wants to travel to Beijing.'},{zh:'朋友说九月天气不冷也不热。',py:'Péngyou shuō jiǔyuè tiānqì bù lěng yě bú rè.',en:'Her friend says September is neither cold nor hot.'},{zh:'安娜决定九月去，还想看看长城。',py:'Ānnà juédìng jiǔyuè qù, hái xiǎng kànkan Chángchéng.',en:'Anna chooses September and wants to see the Great Wall.'}], 'Why does Anna choose September?',['天气很舒服','机票一定免费','北京没有人'],'天气很舒服','The description 不冷也不热 indicates comfortable weather.'),
  story('textbook-hsk3-weekend',3,'A Weekend Plan','周末你有什么打算','Practice plans and reasons at an HSK 3 sentence length.',[
    {zh:'周末你本来打算和同学去爬山。',py:'Zhōumò nǐ běnlái dǎsuàn hé tóngxué qù páshān.',en:'You originally plan to hike with classmates.'},{zh:'因为天气预报说会下大雨，大家只好改变计划。',py:'Yīnwèi tiānqì yùbào shuō huì xià dàyǔ, dàjiā zhǐhǎo gǎibiàn jìhuà.',en:'Heavy rain is forecast, so everyone must change plans.'},{zh:'最后，你们决定去博物馆，还约好下午两点见。',py:'Zuìhòu, nǐmen juédìng qù bówùguǎn, hái yuēhǎo xiàwǔ liǎng diǎn jiàn.',en:'You decide on a museum and agree to meet at two.'}], 'What changes the group’s plan?',['天气预报','考试成绩','新的工作'],'天气预报','The rain forecast causes the change.'),
  story('textbook-hsk3-phone',3,'The Missing Phone','怎么突然找不到了','Use result complements and 把 while solving a small problem.',[
    {zh:'小雨准备出门的时候，突然找不到手机了。',py:'Xiǎoyǔ zhǔnbèi chūmén de shíhou, tūrán zhǎobudào shǒujī le.',en:'As Xiaoyu prepares to leave, she suddenly cannot find her phone.'},{zh:'她把书包和桌子都检查了一遍，还是没看见。',py:'Tā bǎ shūbāo hé zhuōzi dōu jiǎnchá le yí biàn, háishi méi kànjiàn.',en:'She checks her bag and desk, but still cannot see it.'},{zh:'妈妈打了电话，沙发下面马上响了起来。',py:'Māma dǎ le diànhuà, shāfā xiàmiàn mǎshàng xiǎng le qǐlái.',en:'Her mother calls it, and it rings under the sofa.'}], 'Where is the phone?',['沙发下面','书包里面','桌子上面'],'沙发下面','The sound comes from under the sofa.'),
  story('textbook-hsk4-love',4,'Simple Love','简单的爱情','Reflect on relationships using a topic from Standard Course 4 I.',[
    {zh:'陈雪一直觉得浪漫需要昂贵的礼物。',py:'Chén Xuě yìzhí juéde làngmàn xūyào ángguì de lǐwù.',en:'Chen Xue used to think romance required expensive gifts.'},{zh:'可是她生病时，男朋友每天给她做饭，还陪她去医院。',py:'Kěshì tā shēngbìng shí, nánpéngyou měitiān gěi tā zuòfàn, hái péi tā qù yīyuàn.',en:'When she is ill, her boyfriend cooks and accompanies her to hospital.'},{zh:'她慢慢明白，真正的关心往往表现在简单的小事里。',py:'Tā mànmàn míngbai, zhēnzhèng de guānxīn wǎngwǎng biǎoxiàn zài jiǎndān de xiǎoshì lǐ.',en:'She realizes genuine care often appears in simple actions.'}], 'What changes Chen Xue’s view?',['每天的照顾','一件贵礼物','一次旅行'],'每天的照顾','Repeated care, not price, changes her understanding.'),
  story('textbook-hsk4-happiness',4,'A Standard for Happiness','幸福的标准','Compare personal definitions of happiness.',[
    {zh:'老师请大家写下自己对幸福的理解。',py:'Lǎoshī qǐng dàjiā xiěxia zìjǐ duì xìngfú de lǐjiě.',en:'The teacher asks everyone to write their understanding of happiness.'},{zh:'有人认为成功最重要，也有人更看重健康和家人的陪伴。',py:'Yǒurén rènwéi chénggōng zuì zhòngyào, yě yǒurén gèng kànzhòng jiànkāng hé jiārén de péibàn.',en:'Some value success; others health and family.'},{zh:'大家最后发现，幸福没有完全相同的标准。',py:'Dàjiā zuìhòu fāxiàn, xìngfú méiyǒu wánquán xiāngtóng de biāozhǔn.',en:'They discover happiness has no single identical standard.'}], 'What does the class discover?',['幸福的标准因人而异','钱完全不重要','成功只有一个意思'],'幸福的标准因人而异','Different priorities create different standards.'),
  story('textbook-hsk5-details',5,'Details of Love','爱的细节','Infer feelings from everyday details, following a Standard Course 5 I topic.',[
    {zh:'父亲很少直接说想念女儿，却总在她回家前修好房间的灯。',py:'Fùqin hěn shǎo zhíjiē shuō xiǎngniàn nǚ’ér, què zǒng zài tā huíjiā qián xiūhǎo fángjiān de dēng.',en:'A father rarely says he misses his daughter, but repairs her room light before she returns.'},{zh:'母亲记得她不吃辣，桌上永远有一盘清淡的菜。',py:'Mǔqin jìde tā bù chī là, zhuō shàng yǒngyuǎn yǒu yì pán qīngdàn de cài.',en:'Her mother remembers she avoids spicy food and prepares a mild dish.'},{zh:'这些普通的细节让她明白，爱不一定需要被大声说出来。',py:'Zhèxiē pǔtōng de xìjié ràng tā míngbai, ài bú yídìng xūyào bèi dàshēng shuō chūlái.',en:'These ordinary details show that love need not be spoken loudly.'}], 'How is love mainly expressed?',['通过日常细节','通过公开演讲','通过比赛结果'],'通过日常细节','Care appears in remembered preferences and preparation.'),
  story('textbook-hsk5-hometown',5,'The Hometown Radish Pancake','家乡的萝卜饼','Connect food, memory, and hometown culture from Standard Course 5 II.',[
    {zh:'离开家乡多年以后，周然在一条小街上闻到了熟悉的香味。',py:'Líkāi jiāxiāng duōnián yǐhòu, Zhōu Rán zài yì tiáo xiǎojiē shàng wéndào le shúxī de xiāngwèi.',en:'Years after leaving home, Zhou Ran smells a familiar aroma.'},{zh:'摊主做的萝卜饼虽然不是家里的味道，却让他想起小时候。',py:'Tānzhǔ zuò de luóbo bǐng suīrán bú shì jiālǐ de wèidao, què ràng tā xiǎngqǐ xiǎoshíhou.',en:'The pancake is not exactly home’s taste, but recalls childhood.'},{zh:'他把做法记下来，决定周末和孩子一起试一试。',py:'Tā bǎ zuòfǎ jìxialai, juédìng zhōumò hé háizi yìqǐ shìyíshì.',en:'He notes the recipe and decides to try it with his child.'}], 'What does the food awaken?',['对童年的记忆','对工作的担心','对天气的研究'],'对童年的记忆','The familiar smell reconnects him with childhood.'),
  story('textbook-hsk6-children',6,'What Children Teach Us','孩子给我们的启示','Interpret a reflective Standard Course 6 I theme using nuanced language.',[
    {zh:'大人常常急着告诉孩子正确答案，却忘了认真听他们的问题。',py:'Dàrén chángcháng jízhe gàosu háizi zhèngquè dá’àn, què wàng le rènzhēn tīng tāmen de wèntí.',en:'Adults rush to give answers and forget to hear children’s questions.'},{zh:'孩子对普通事物保持好奇，也不怕承认自己不知道。',py:'Háizi duì pǔtōng shìwù bǎochí hàoqí, yě bú pà chéngrèn zìjǐ bù zhīdào.',en:'Children stay curious and are unafraid to admit uncertainty.'},{zh:'这种诚实提醒我们，真正的学习也许正是从提问开始的。',py:'Zhè zhǒng chéngshí tíxǐng wǒmen, zhēnzhèng de xuéxí yěxǔ zhèng shì cóng tíwèn kāishǐ de.',en:'Their honesty suggests genuine learning may begin with questions.'}], 'What lesson do the adults receive?',['保持好奇并敢于提问','永远不要给答案','只学习简单的事'],'保持好奇并敢于提问','Curiosity and honest questioning are the central insight.'),
  story('textbook-hsk6-future-shop',6,'The Future Shop','未来商店','Evaluate convenience and privacy through a Standard Course 6 II topic.',[
    {zh:'未来商店没有收银台，系统会根据顾客拿走的商品自动结账。',py:'Wèilái shāngdiàn méiyǒu shōuyíntái, xìtǒng huì gēnjù gùkè ná zǒu de shāngpǐn zìdòng jiézhàng.',en:'The future shop has no checkout; the system bills selected goods.'},{zh:'这种方式固然方便，却需要记录大量个人行为。',py:'Zhè zhǒng fāngshì gùrán fāngbiàn, què xūyào jìlù dàliàng gèrén xíngwéi.',en:'It is convenient, but records extensive personal behavior.'},{zh:'设计者因此增加了离线付款，并让顾客自己决定保存哪些数据。',py:'Shèjìzhě yīncǐ zēngjiā le líxiàn fùkuǎn, bìng ràng gùkè zìjǐ juédìng bǎocún nǎxiē shùjù.',en:'Designers add offline payment and let customers choose saved data.'}], 'What tradeoff does the shop address?',['便利与隐私','价格与天气','交通与颜色'],'便利与隐私','The design balances automated convenience with data privacy.'),
];

const extensionFrames:Record<number,{title:string;chinese:string;summary:string;scenes:(words:TextbookWord[])=>{zh:string;py:string;en:string}[];prompt:string}>={
  1:{title:'A Small Daily Choice',chinese:'今天的小选择',summary:'Use core HSK 1 words in a short, concrete daily scene.',scenes:words=>[
    {zh:`今天老师问：“你喜欢${words[0].hanzi}吗？”`,py:`Jīntiān lǎoshī wèn: “Nǐ xǐhuan ${words[0].pinyin} ma?”`,en:`Today the teacher asks whether you like ${words[0].english}.`},
    {zh:`你说：“喜欢，谢谢老师。”`,py:'Nǐ shuō: “Xǐhuan, xièxie lǎoshī.”',en:'You say, “I like it, thank you teacher.”'},
    {zh:`下课以后，你把${words[1].hanzi}告诉朋友。`,py:`Xiàkè yǐhòu, nǐ bǎ ${words[1].pinyin} gàosu péngyou.`,en:`After class, you tell your friend about ${words[1].english}.`}],prompt:'Who asks the first question?'},
  2:{title:'A Plan for Tomorrow',chinese:'明天的安排',summary:'Connect routine, time, and a simple plan at HSK 2.',scenes:words=>[
    {zh:`明天你想和朋友一起${words[0].hanzi}。`,py:`Míngtiān nǐ xiǎng hé péngyou yìqǐ ${words[0].pinyin}.`,en:`Tomorrow you want to ${words[0].english} with a friend.`},
    {zh:`你们先谈时间，然后准备需要的东西。`,py:'Nǐmen xiān tán shíjiān, ránhòu zhǔnbèi xūyào de dōngxi.',en:'You discuss the time first, then prepare what you need.'},
    {zh:`朋友说：“这个${words[1].hanzi}很好，我们就这样安排吧。”`,py:`Péngyou shuō: “Zhège ${words[1].pinyin} hěn hǎo, wǒmen jiù zhèyàng ānpái ba.”`,en:`Your friend says this ${words[1].english} works well and confirms the plan.`}],prompt:'What do the friends do before preparing?'},
  3:{title:'The Changed Schedule',chinese:'改变的安排',summary:'Follow a cause, a change, and a solution using HSK 3 structures.',scenes:words=>[
    {zh:`你本来打算今天${words[0].hanzi}，但是情况突然变了。`,py:`Nǐ běnlái dǎsuàn jīntiān ${words[0].pinyin}, dànshì qíngkuàng tūrán biàn le.`,en:`You originally planned to ${words[0].english}, but the situation suddenly changes.`},
    {zh:`你把新的安排告诉同学，也认真听了他的意见。`,py:'Nǐ bǎ xīn de ānpái gàosu tóngxué, yě rènzhēn tīng le tā de yìjiàn.',en:'You tell a classmate the new arrangement and listen to their opinion.'},
    {zh:`最后，你们都${words[1].hanzi}这个办法比较合适。`,py:`Zuìhòu, nǐmen dōu ${words[1].pinyin} zhège bànfǎ bǐjiào héshì.`,en:`Finally, you both find this solution more suitable.`}],prompt:'Why does the original plan change?'},
  4:{title:'A Thoughtful Decision',chinese:'认真做决定',summary:'Compare priorities and explain a considered HSK 4 decision.',scenes:words=>[
    {zh:`大家对${words[0].hanzi}有不同的看法，因此先交换意见。`,py:`Dàjiā duì ${words[0].pinyin} yǒu bùtóng de kànfǎ, yīncǐ xiān jiāohuàn yìjiàn.`,en:`Everyone has different views about ${words[0].english}, so they exchange opinions first.`},
    {zh:`虽然选择不容易，但是每个人都认真说明了理由。`,py:'Suīrán xuǎnzé bù róngyì, dànshì měi ge rén dōu rènzhēn shuōmíng le lǐyóu.',en:'Although the choice is difficult, everyone carefully explains their reasons.'},
    {zh:`只要继续沟通，就能找到更${words[1].hanzi}的方案。`,py:`Zhǐyào jìxù gōutōng, jiù néng zhǎodào gèng ${words[1].pinyin} de fāng'àn.`,en:`As long as communication continues, they can find a more ${words[1].english} solution.`}],prompt:'What helps the group find a solution?'},
  5:{title:'Evidence and Perspective',chinese:'证据与观点',summary:'Infer a viewpoint from detail and contrast at HSK 5.',scenes:words=>[
    {zh:`讨论开始时，大家对${words[0].hanzi}的理解并不一致。`,py:`Tǎolùn kāishǐ shí, dàjiā duì ${words[0].pinyin} de lǐjiě bìng bù yízhì.`,en:`At the beginning, people do not share the same understanding of ${words[0].english}.`},
    {zh:`一位同学没有急着争论，而是先用具体事实支持自己的观点。`,py:'Yí wèi tóngxué méiyǒu jízhe zhēnglùn, érshì xiān yòng jùtǐ shìshí zhīchí zìjǐ de guāndiǎn.',en:'One student avoids rushing into debate and first supports a view with facts.'},
    {zh:`随着更多${words[1].hanzi}被发现，大家逐渐改变了结论。`,py:`Suízhe gèng duō ${words[1].pinyin} bèi fāxiàn, dàjiā zhújiàn gǎibiàn le jiélùn.`,en:`As more ${words[1].english} is discovered, the group gradually changes its conclusion.`}],prompt:'What supports the student’s viewpoint?'},
  6:{title:'A Nuanced Conclusion',chinese:'谨慎的结论',summary:'Evaluate evidence, limitations, and consequences at HSK 6.',scenes:words=>[
    {zh:`研究结果似乎说明${words[0].hanzi}非常重要，但现有证据仍然有限。`,py:`Yánjiū jiéguǒ sìhū shuōmíng ${words[0].pinyin} fēicháng zhòngyào, dàn xiànyǒu zhèngjù réngrán yǒuxiàn.`,en:`The results suggest ${words[0].english} matters, but the available evidence remains limited.`},
    {zh:`与其马上公布结论，不如先检查样本是否存在偏差。`,py:'Yǔqí mǎshàng gōngbù jiélùn, bùrú xiān jiǎnchá yàngběn shìfǒu cúnzài piānchā.',en:'Rather than publish immediately, it is better to inspect the sample for bias.'},
    {zh:`团队决定进一步验证，以免忽视${words[1].hanzi}带来的影响。`,py:`Tuánduì juédìng jìnyíbù yànzhèng, yǐmiǎn hūshì ${words[1].pinyin} dàilái de yǐngxiǎng.`,en:`The team verifies further to avoid overlooking the impact of ${words[1].english}.`}],prompt:'Why does the team postpone its conclusion?'},
};

export const expandedTextbookStoryLibrary=textbookWordCollections.flatMap(collection=>[0,1,2].map((offset)=>{
  const words=[collection.words[offset],collection.words[offset+3],collection.words[offset+6]].filter(Boolean);
  const frame=extensionFrames[collection.level];
  const correct=collection.level<=2?'They discuss the time first.':collection.level===3?'The situation suddenly changes.':collection.level===4?'Continued communication.':collection.level===5?'Specific facts.':'The evidence and sample still need checking.';
  const distractors=collection.level<=2?['They cancel every plan.','They take an exam first.']:collection.level<=4?['They avoid every discussion.','They choose without a reason.']:['A louder speaking voice.','An unrelated travel plan.'];
  return story(`textbook-hsk${collection.level}-extension-${offset+1}`,collection.level,`${frame.title} ${offset+1}`,frame.chinese,`${frame.summary} Topic focus: ${words.map(word=>word.lesson).join(' · ')}.`,frame.scenes(words),frame.prompt,[correct,...distractors],correct,'The answer follows the sequence, reason, or evidence stated in the passage.');
}));

const courseFrames={
  4:[
    {zh:'读完课文以后，小林想起自己最近遇到的一件事。',py:'Dúwán kèwén yǐhòu, Xiǎo Lín xiǎngqǐ zìjǐ zuìjìn yùdào de yí jiàn shì.',en:'After reading, Xiao Lin remembers a recent experience.'},
    {zh:'他没有马上判断，而是先观察细节，再听听朋友的意见。',py:'Tā méiyǒu mǎshàng pànduàn, érshì xiān guānchá xìjié, zài tīngting péngyou de yìjiàn.',en:'He does not judge immediately; he observes details and listens to a friend.'},
    {zh:'最后，他发现换一个角度，原来的问题也能有新的答案。',py:'Zuìhòu, tā fāxiàn huàn yí ge jiǎodù, yuánlái de wèntí yě néng yǒu xīn de dá’àn.',en:'He discovers that a different perspective can produce a new answer.'},
  ],
  5:[
    {zh:'讨论开始时，大家对这个主题的理解并不完全一样。',py:'Tǎolùn kāishǐ shí, dàjiā duì zhège zhǔtí de lǐjiě bìng bù wánquán yíyàng.',en:'At the start, the group does not understand the theme in exactly the same way.'},
    {zh:'一位同学用具体经历说明观点，另一位同学补充了不同的证据。',py:'Yí wèi tóngxué yòng jùtǐ jīnglì shuōmíng guāndiǎn, lìng yí wèi tóngxué bǔchōng le bùtóng de zhèngjù.',en:'One student explains a view through experience; another adds different evidence.'},
    {zh:'他们不再急着争论，而是比较信息以后重新整理了结论。',py:'Tāmen bú zài jízhe zhēnglùn, érshì bǐjiào xìnxī yǐhòu chóngxīn zhěnglǐ le jiélùn.',en:'Instead of rushing to argue, they compare information and revise the conclusion.'},
  ],
  6:[
    {zh:'研究小组发现，表面上简单的现象背后往往有复杂的原因。',py:'Yánjiū xiǎozǔ fāxiàn, biǎomiàn shàng jiǎndān de xiànxiàng bèihòu wǎngwǎng yǒu fùzá de yuányīn.',en:'A research group finds that a simple-looking phenomenon often has complex causes.'},
    {zh:'与其根据第一印象下结论，不如检查资料、条件和可能存在的偏差。',py:'Yǔqí gēnjù dì-yī yìnxiàng xià jiélùn, bùrú jiǎnchá zīliào, tiáojiàn hé kěnéng cúnzài de piānchā.',en:'Rather than conclude from a first impression, they inspect evidence, conditions, and possible bias.'},
    {zh:'经过验证，他们提出了更谨慎的解释，也说明了结论的局限。',py:'Jīngguò yànzhèng, tāmen tíchū le gèng jǐnshèn de jiěshì, yě shuōmíng le jiélùn de júxiàn.',en:'After verification, they offer a more cautious explanation and state its limits.'},
  ],
} as const;

export const completeCourseStoryLibrary=completeCourseStoryCatalog.map(lesson=>{
  const answer=lesson.level===4?'先观察细节并听取意见':lesson.level===5?'比较经历和证据':'检查证据、条件和偏差';
  const choices=lesson.level===4?[answer,'马上作出判断','完全忽略问题']:lesson.level===5?[answer,'只重复自己的观点','拒绝阅读资料']:[answer,'只相信第一印象','省略验证过程'];
  return story(
    `textbook-hsk${lesson.level}-${lesson.volume}-lesson-${lesson.lesson}`,
    lesson.level,
    lesson.english,
    lesson.chinese,
    `HSK ${lesson.level} ${lesson.volume} · Lesson ${lesson.lesson}. Original companion reader aligned to the supplied course-book topic “${lesson.chinese}”.`,
    [...courseFrames[lesson.level]],
    lesson.level===4?'What does Xiao Lin do before reaching an answer?':lesson.level===5?'How does the group revise its conclusion?':'What does the research group inspect before concluding?',
    choices,
    answer,
    'The reader models evidence-based understanding at the grammar and reasoning depth of this HSK level.',
    {volume:lesson.volume,lesson:lesson.lesson},
  );
});

const introductoryReaders=[...textbookStoryLibrary,...expandedTextbookStoryLibrary].filter(item=>item.hsk<=3);
export const completeTextbookStoryLibrary=[...introductoryReaders,...completeCourseStoryLibrary];
