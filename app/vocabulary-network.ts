import { adventureChapters, type VocabularyItem } from './content.ts';

export type VocabularyNetworkCategory = {
  id: string;
  icon: string;
  title: string;
  chinese: string;
  words: VocabularyItem[];
};

const extendedWords: Record<string, VocabularyItem[]> = {
  arrival: [
    { id:'network-arrival-customs', hanzi:'海关', pinyin:'hǎiguān', english:'customs', example:{hanzi:'我们先去海关。',pinyin:'Wǒmen xiān qù hǎiguān.',english:'We will go to customs first.'}},
    { id:'network-arrival-boarding-pass', hanzi:'登机牌', pinyin:'dēngjīpái', english:'boarding pass', example:{hanzi:'请出示您的登机牌。',pinyin:'Qǐng chūshì nín de dēngjīpái.',english:'Please show your boarding pass.'}},
    { id:'network-arrival-flight', hanzi:'航班', pinyin:'hángbān', english:'flight', example:{hanzi:'我的航班晚点了。',pinyin:'Wǒ de hángbān wǎndiǎn le.',english:'My flight is delayed.'}},
    { id:'network-arrival-arrive', hanzi:'到达', pinyin:'dàodá', english:'to arrive', example:{hanzi:'我们下午三点到达。',pinyin:'Wǒmen xiàwǔ sān diǎn dàodá.',english:'We arrive at three in the afternoon.'}},
    { id:'network-arrival-information', hanzi:'问讯处', pinyin:'wènxùnchù', english:'information desk', example:{hanzi:'问讯处在哪里？',pinyin:'Wènxùnchù zài nǎli?',english:'Where is the information desk?'}},
    { id:'network-arrival-entry', hanzi:'入境', pinyin:'rùjìng', english:'to enter a country', example:{hanzi:'入境前请准备好护照。',pinyin:'Rùjìng qián qǐng zhǔnbèi hǎo hùzhào.',english:'Please prepare your passport before entering the country.'}},
    { id:'network-arrival-baggage-claim', hanzi:'行李领取处', pinyin:'xíngli lǐngqǔchù', english:'baggage claim', example:{hanzi:'行李领取处在一楼。',pinyin:'Xíngli lǐngqǔchù zài yì lóu.',english:'Baggage claim is on the first floor.'}},
    { id:'network-arrival-delay', hanzi:'延误', pinyin:'yánwù', english:'delay', example:{hanzi:'航班因为天气延误了。',pinyin:'Hángbān yīnwèi tiānqì yánwù le.',english:'The flight was delayed because of the weather.'}},
    { id:'network-arrival-shuttle', hanzi:'机场巴士', pinyin:'jīchǎng bāshì', english:'airport shuttle bus', example:{hanzi:'我们坐机场巴士去市中心。',pinyin:'Wǒmen zuò jīchǎng bāshì qù shì zhōngxīn.',english:'We will take the airport shuttle to the city center.'}},
  ],
  hotel: [
    { id:'network-hotel-reception', hanzi:'前台', pinyin:'qiántái', english:'reception desk', example:{hanzi:'请到前台办理入住。',pinyin:'Qǐng dào qiántái bànlǐ rùzhù.',english:'Please check in at reception.'}},
    { id:'network-hotel-elevator', hanzi:'电梯', pinyin:'diàntī', english:'elevator', example:{hanzi:'电梯在大厅右边。',pinyin:'Diàntī zài dàtīng yòubian.',english:'The elevator is to the right of the lobby.'}},
    { id:'network-hotel-single-room', hanzi:'单人间', pinyin:'dānrénjiān', english:'single room', example:{hanzi:'我想订一间单人间。',pinyin:'Wǒ xiǎng dìng yì jiān dānrénjiān.',english:'I would like to book a single room.'}},
    { id:'network-hotel-checkout', hanzi:'退房', pinyin:'tuìfáng', english:'to check out', example:{hanzi:'我明天早上退房。',pinyin:'Wǒ míngtiān zǎoshang tuìfáng.',english:'I will check out tomorrow morning.'}},
    { id:'network-hotel-towel', hanzi:'毛巾', pinyin:'máojīn', english:'towel', example:{hanzi:'可以再给我一条毛巾吗？',pinyin:'Kěyǐ zài gěi wǒ yì tiáo máojīn ma?',english:'Could you give me another towel?'}},
    { id:'network-hotel-lobby', hanzi:'大厅', pinyin:'dàtīng', english:'lobby', example:{hanzi:'我们在酒店大厅见。',pinyin:'Wǒmen zài jiǔdiàn dàtīng jiàn.',english:'Let us meet in the hotel lobby.'}},
    { id:'network-hotel-double-room', hanzi:'双人间', pinyin:'shuāngrénjiān', english:'double room', example:{hanzi:'我们预订了一间双人间。',pinyin:'Wǒmen yùdìng le yì jiān shuāngrénjiān.',english:'We booked a double room.'}},
    { id:'network-hotel-air-conditioning', hanzi:'空调', pinyin:'kōngtiáo', english:'air conditioning', example:{hanzi:'房间里的空调坏了。',pinyin:'Fángjiān lǐ de kōngtiáo huài le.',english:'The air conditioning in the room is broken.'}},
    { id:'network-hotel-wifi', hanzi:'无线网络', pinyin:'wúxiàn wǎngluò', english:'Wi-Fi', example:{hanzi:'请问无线网络密码是什么？',pinyin:'Qǐngwèn wúxiàn wǎngluò mìmǎ shì shénme?',english:'What is the Wi-Fi password?'}},
  ],
  restaurant: [
    { id:'network-restaurant-server', hanzi:'服务员', pinyin:'fúwùyuán', english:'server', example:{hanzi:'服务员，请给我菜单。',pinyin:'Fúwùyuán, qǐng gěi wǒ càidān.',english:'Server, please give me the menu.'}},
    { id:'network-restaurant-order', hanzi:'点菜', pinyin:'diǎncài', english:'to order food', example:{hanzi:'我们现在可以点菜。',pinyin:'Wǒmen xiànzài kěyǐ diǎncài.',english:'We can order now.'}},
    { id:'network-restaurant-bill', hanzi:'账单', pinyin:'zhàngdān', english:'bill', example:{hanzi:'麻烦给我账单。',pinyin:'Máfan gěi wǒ zhàngdān.',english:'Please bring me the bill.'}},
    { id:'network-restaurant-delicious', hanzi:'好吃', pinyin:'hǎochī', english:'delicious', example:{hanzi:'这个菜很好吃。',pinyin:'Zhège cài hěn hǎochī.',english:'This dish is delicious.'}},
    { id:'network-restaurant-vegetarian', hanzi:'素食', pinyin:'sùshí', english:'vegetarian food', example:{hanzi:'你们有素食吗？',pinyin:'Nǐmen yǒu sùshí ma?',english:'Do you have vegetarian food?'}},
    { id:'network-restaurant-drink', hanzi:'饮料', pinyin:'yǐnliào', english:'beverage', example:{hanzi:'您想喝什么饮料？',pinyin:'Nín xiǎng hē shénme yǐnliào?',english:'What beverage would you like?'}},
    { id:'network-restaurant-spicy', hanzi:'辣', pinyin:'là', english:'spicy', example:{hanzi:'这个菜太辣了。',pinyin:'Zhège cài tài là le.',english:'This dish is too spicy.'}},
    { id:'network-restaurant-allergy', hanzi:'过敏', pinyin:'guòmǐn', english:'to be allergic', example:{hanzi:'我对花生过敏。',pinyin:'Wǒ duì huāshēng guòmǐn.',english:'I am allergic to peanuts.'}},
    { id:'network-restaurant-chopsticks', hanzi:'筷子', pinyin:'kuàizi', english:'chopsticks', example:{hanzi:'请再给我一双筷子。',pinyin:'Qǐng zài gěi wǒ yì shuāng kuàizi.',english:'Please give me another pair of chopsticks.'}},
  ],
  transport: [
    { id:'network-transport-taxi', hanzi:'出租车', pinyin:'chūzūchē', english:'taxi', example:{hanzi:'我们坐出租车去机场。',pinyin:'Wǒmen zuò chūzūchē qù jīchǎng.',english:'We will take a taxi to the airport.'}},
    { id:'network-transport-transfer', hanzi:'换乘', pinyin:'huànchéng', english:'to transfer', example:{hanzi:'请在下一站换乘。',pinyin:'Qǐng zài xià yí zhàn huànchéng.',english:'Please transfer at the next station.'}},
    { id:'network-transport-next-stop', hanzi:'下一站', pinyin:'xià yí zhàn', english:'next stop', example:{hanzi:'下一站是人民广场。',pinyin:'Xià yí zhàn shì Rénmín Guǎngchǎng.',english:'The next stop is People’s Square.'}},
    { id:'network-transport-airport', hanzi:'机场', pinyin:'jīchǎng', english:'airport', example:{hanzi:'去机场要多长时间？',pinyin:'Qù jīchǎng yào duō cháng shíjiān?',english:'How long does it take to get to the airport?'}},
    { id:'network-transport-map', hanzi:'地图', pinyin:'dìtú', english:'map', example:{hanzi:'我先看一下地图。',pinyin:'Wǒ xiān kàn yíxià dìtú.',english:'I will check the map first.'}},
    { id:'network-transport-bus', hanzi:'公交车', pinyin:'gōngjiāochē', english:'public bus', example:{hanzi:'这辆公交车到火车站吗？',pinyin:'Zhè liàng gōngjiāochē dào huǒchēzhàn ma?',english:'Does this bus go to the train station?'}},
    { id:'network-transport-route', hanzi:'路线', pinyin:'lùxiàn', english:'route', example:{hanzi:'请帮我看一下这条路线。',pinyin:'Qǐng bāng wǒ kàn yíxià zhè tiáo lùxiàn.',english:'Please help me check this route.'}},
    { id:'network-transport-entrance', hanzi:'入口', pinyin:'rùkǒu', english:'entrance', example:{hanzi:'地铁入口在马路对面。',pinyin:'Dìtiě rùkǒu zài mǎlù duìmiàn.',english:'The metro entrance is across the road.'}},
    { id:'network-transport-terminal', hanzi:'终点站', pinyin:'zhōngdiǎnzhàn', english:'terminal station', example:{hanzi:'这趟车的终点站在哪里？',pinyin:'Zhè tàng chē de zhōngdiǎnzhàn zài nǎli?',english:'Where is the terminal station for this train?'}},
  ],
  shopping: [
    { id:'network-shopping-cheap', hanzi:'便宜', pinyin:'piányi', english:'inexpensive', example:{hanzi:'这个比较便宜。',pinyin:'Zhège bǐjiào piányi.',english:'This one is less expensive.'}},
    { id:'network-shopping-try-on', hanzi:'试穿', pinyin:'shìchuān', english:'to try on', example:{hanzi:'我可以试穿吗？',pinyin:'Wǒ kěyǐ shìchuān ma?',english:'May I try it on?'}},
    { id:'network-shopping-size', hanzi:'尺码', pinyin:'chǐmǎ', english:'size', example:{hanzi:'这个尺码太小了。',pinyin:'Zhège chǐmǎ tài xiǎo le.',english:'This size is too small.'}},
    { id:'network-shopping-cash', hanzi:'现金', pinyin:'xiànjīn', english:'cash', example:{hanzi:'我用现金付款。',pinyin:'Wǒ yòng xiànjīn fùkuǎn.',english:'I will pay in cash.'}},
    { id:'network-shopping-receipt', hanzi:'收据', pinyin:'shōujù', english:'receipt', example:{hanzi:'请给我一张收据。',pinyin:'Qǐng gěi wǒ yì zhāng shōujù.',english:'Please give me a receipt.'}},
    { id:'network-shopping-discount', hanzi:'折扣', pinyin:'zhékòu', english:'discount', example:{hanzi:'这件衣服有折扣吗？',pinyin:'Zhè jiàn yīfu yǒu zhékòu ma?',english:'Is there a discount on this clothing item?'}},
    { id:'network-shopping-return', hanzi:'退货', pinyin:'tuìhuò', english:'to return goods', example:{hanzi:'这件商品可以退货吗？',pinyin:'Zhè jiàn shāngpǐn kěyǐ tuìhuò ma?',english:'Can this item be returned?'}},
    { id:'network-shopping-hours', hanzi:'营业时间', pinyin:'yíngyè shíjiān', english:'business hours', example:{hanzi:'商场的营业时间是几点？',pinyin:'Shāngchǎng de yíngyè shíjiān shì jǐ diǎn?',english:'What are the mall’s business hours?'}},
    { id:'network-shopping-mobile-pay', hanzi:'移动支付', pinyin:'yídòng zhīfù', english:'mobile payment', example:{hanzi:'这里可以用移动支付。',pinyin:'Zhèlǐ kěyǐ yòng yídòng zhīfù.',english:'You can use mobile payment here.'}},
  ],
  campus: [
    { id:'network-campus-professor', hanzi:'教授', pinyin:'jiàoshòu', english:'professor', example:{hanzi:'王教授今天有课。',pinyin:'Wáng jiàoshòu jīntiān yǒu kè.',english:'Professor Wang has class today.'}},
    { id:'network-campus-classmate', hanzi:'同学', pinyin:'tóngxué', english:'classmate', example:{hanzi:'她是我的同学。',pinyin:'Tā shì wǒ de tóngxué.',english:'She is my classmate.'}},
    { id:'network-campus-course', hanzi:'课程', pinyin:'kèchéng', english:'course', example:{hanzi:'这门课程很有意思。',pinyin:'Zhè mén kèchéng hěn yǒuyìsi.',english:'This course is very interesting.'}},
    { id:'network-campus-exam', hanzi:'考试', pinyin:'kǎoshì', english:'exam', example:{hanzi:'下周我们有考试。',pinyin:'Xià zhōu wǒmen yǒu kǎoshì.',english:'We have an exam next week.'}},
    { id:'network-campus-cafeteria', hanzi:'食堂', pinyin:'shítáng', english:'cafeteria', example:{hanzi:'我们去食堂吃午饭。',pinyin:'Wǒmen qù shítáng chī wǔfàn.',english:'We are going to the cafeteria for lunch.'}},
    { id:'network-campus-semester', hanzi:'学期', pinyin:'xuéqī', english:'semester', example:{hanzi:'这个学期我有五门课。',pinyin:'Zhège xuéqī wǒ yǒu wǔ mén kè.',english:'I have five courses this semester.'}},
    { id:'network-campus-grade', hanzi:'成绩', pinyin:'chéngjì', english:'grade / result', example:{hanzi:'考试成绩下周公布。',pinyin:'Kǎoshì chéngjì xià zhōu gōngbù.',english:'Exam results will be announced next week.'}},
    { id:'network-campus-lecture', hanzi:'讲座', pinyin:'jiǎngzuò', english:'lecture', example:{hanzi:'今晚有一个中文讲座。',pinyin:'Jīnwǎn yǒu yí ge Zhōngwén jiǎngzuò.',english:'There is a Chinese lecture tonight.'}},
    { id:'network-campus-campus', hanzi:'校园', pinyin:'xiàoyuán', english:'campus', example:{hanzi:'这个校园很安静。',pinyin:'Zhège xiàoyuán hěn ānjìng.',english:'This campus is very quiet.'}},
  ],
  health: [
    { id:'network-health-doctor', hanzi:'医生', pinyin:'yīshēng', english:'doctor', example:{hanzi:'我想去看医生。',pinyin:'Wǒ xiǎng qù kàn yīshēng.',english:'I would like to see a doctor.'}},
    { id:'network-health-nurse', hanzi:'护士', pinyin:'hùshi', english:'nurse', example:{hanzi:'护士正在量体温。',pinyin:'Hùshi zhèngzài liáng tǐwēn.',english:'The nurse is taking a temperature.'}},
    { id:'network-health-fever', hanzi:'发烧', pinyin:'fāshāo', english:'to have a fever', example:{hanzi:'我昨天晚上发烧了。',pinyin:'Wǒ zuótiān wǎnshang fāshāo le.',english:'I had a fever last night.'}},
    { id:'network-health-pharmacy', hanzi:'药店', pinyin:'yàodiàn', english:'pharmacy', example:{hanzi:'附近有药店吗？',pinyin:'Fùjìn yǒu yàodiàn ma?',english:'Is there a pharmacy nearby?'}},
    { id:'network-health-appointment', hanzi:'预约', pinyin:'yùyuē', english:'appointment', example:{hanzi:'我想预约明天下午。',pinyin:'Wǒ xiǎng yùyuē míngtiān xiàwǔ.',english:'I would like an appointment tomorrow afternoon.'}},
    { id:'network-health-cough', hanzi:'咳嗽', pinyin:'késou', english:'to cough', example:{hanzi:'我咳嗽了好几天。',pinyin:'Wǒ késou le hǎo jǐ tiān.',english:'I have been coughing for several days.'}},
    { id:'network-health-cold', hanzi:'感冒', pinyin:'gǎnmào', english:'to have a cold', example:{hanzi:'我可能感冒了。',pinyin:'Wǒ kěnéng gǎnmào le.',english:'I may have caught a cold.'}},
    { id:'network-health-prescription', hanzi:'处方', pinyin:'chǔfāng', english:'prescription', example:{hanzi:'医生给我开了处方。',pinyin:'Yīshēng gěi wǒ kāi le chǔfāng.',english:'The doctor wrote me a prescription.'}},
    { id:'network-health-temperature', hanzi:'体温', pinyin:'tǐwēn', english:'body temperature', example:{hanzi:'护士正在给我量体温。',pinyin:'Hùshi zhèngzài gěi wǒ liáng tǐwēn.',english:'The nurse is taking my temperature.'}},
  ],
  coffee: [
    { id:'network-coffee-shop', hanzi:'咖啡店', pinyin:'kāfēidiàn', english:'coffee shop', example:{hanzi:'这家咖啡店很安静。',pinyin:'Zhè jiā kāfēidiàn hěn ānjìng.',english:'This coffee shop is very quiet.'}},
    { id:'network-coffee-cup', hanzi:'杯', pinyin:'bēi', english:'cup (measure word)', example:{hanzi:'我要两杯咖啡。',pinyin:'Wǒ yào liǎng bēi kāfēi.',english:'I would like two cups of coffee.'}},
    { id:'network-coffee-iced', hanzi:'冰的', pinyin:'bīng de', english:'iced / cold', example:{hanzi:'我要一杯冰的美式咖啡。',pinyin:'Wǒ yào yì bēi bīng de Měishì kāfēi.',english:'I would like an iced Americano.'}},
    { id:'network-coffee-hot', hanzi:'热的', pinyin:'rè de', english:'hot', example:{hanzi:'今天我想喝热的。',pinyin:'Jīntiān wǒ xiǎng hē rè de.',english:'Today I would like a hot drink.'}},
    { id:'network-coffee-milk', hanzi:'牛奶', pinyin:'niúnǎi', english:'milk', example:{hanzi:'请多加一点牛奶。',pinyin:'Qǐng duō jiā yìdiǎn niúnǎi.',english:'Please add a little more milk.'}},
    { id:'network-coffee-takeaway', hanzi:'打包', pinyin:'dǎbāo', english:'takeaway / to pack', example:{hanzi:'这杯咖啡我要打包。',pinyin:'Zhè bēi kāfēi wǒ yào dǎbāo.',english:'I would like this coffee to go.'}},
    { id:'network-coffee-dine-in', hanzi:'堂食', pinyin:'tángshí', english:'for here / dine in', example:{hanzi:'堂食，谢谢。',pinyin:'Tángshí, xièxie.',english:'For here, thank you.'}},
    { id:'network-coffee-sweet', hanzi:'甜', pinyin:'tián', english:'sweet', example:{hanzi:'这个饮料有点儿甜。',pinyin:'Zhège yǐnliào yǒudiǎnr tián.',english:'This drink is a little sweet.'}},
    { id:'network-coffee-pay', hanzi:'买单', pinyin:'mǎidān', english:'to pay the bill', example:{hanzi:'您好，我想买单。',pinyin:'Nín hǎo, wǒ xiǎng mǎidān.',english:'Hello, I would like to pay.'}},
  ],
  social: [
    { id:'network-social-friend', hanzi:'朋友', pinyin:'péngyou', english:'friend', example:{hanzi:'他是我的新朋友。',pinyin:'Tā shì wǒ de xīn péngyou.',english:'He is my new friend.'}},
    { id:'network-social-weekend', hanzi:'周末', pinyin:'zhōumò', english:'weekend', example:{hanzi:'你周末有什么计划？',pinyin:'Nǐ zhōumò yǒu shénme jìhuà?',english:'What are your plans this weekend?'}},
    { id:'network-social-meet', hanzi:'见面', pinyin:'jiànmiàn', english:'to meet', example:{hanzi:'我们周六见面吧。',pinyin:'Wǒmen zhōuliù jiànmiàn ba.',english:'Let’s meet on Saturday.'}},
    { id:'network-social-chat', hanzi:'聊天', pinyin:'liáotiān', english:'to chat', example:{hanzi:'我们一起喝茶聊天。',pinyin:'Wǒmen yìqǐ hē chá liáotiān.',english:'Let’s drink tea and chat together.'}},
    { id:'network-social-contact', hanzi:'联系', pinyin:'liánxì', english:'to contact', example:{hanzi:'到了以后联系我。',pinyin:'Dào le yǐhòu liánxì wǒ.',english:'Contact me after you arrive.'}},
    { id:'network-social-invite', hanzi:'邀请', pinyin:'yāoqǐng', english:'to invite', example:{hanzi:'谢谢你邀请我参加聚会。',pinyin:'Xièxie nǐ yāoqǐng wǒ cānjiā jùhuì.',english:'Thank you for inviting me to the party.'}},
    { id:'network-social-party', hanzi:'聚会', pinyin:'jùhuì', english:'gathering / party', example:{hanzi:'周末我们有一个聚会。',pinyin:'Zhōumò wǒmen yǒu yí ge jùhuì.',english:'We have a gathering this weekend.'}},
    { id:'network-social-address', hanzi:'地址', pinyin:'dìzhǐ', english:'address', example:{hanzi:'请把地址发给我。',pinyin:'Qǐng bǎ dìzhǐ fā gěi wǒ.',english:'Please send me the address.'}},
    { id:'network-social-message', hanzi:'消息', pinyin:'xiāoxi', english:'message / news', example:{hanzi:'我看到了你的消息。',pinyin:'Wǒ kàndào le nǐ de xiāoxi.',english:'I saw your message.'}},
  ],
};

export const vocabularyNetworkCategories: VocabularyNetworkCategory[] = adventureChapters.map(chapter=>({
  id:chapter.id,
  icon:chapter.icon,
  title:chapter.title,
  chinese:chapter.chinese,
  words:[...chapter.vocabulary,...(extendedWords[chapter.id]??[])],
}));

export const allNetworkVocabulary = vocabularyNetworkCategories.flatMap(category=>category.words);
