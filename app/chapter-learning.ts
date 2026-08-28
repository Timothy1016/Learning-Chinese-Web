export type ChapterLearningPack = {
  grammar: {
    title: string;
    pattern: string;
    explanation: string;
    example: string;
    question: { prompt: string; choices: string[]; answer: string; explanation: string };
  };
  listening: {
    prompt: string;
    audio: string;
    choices: string[];
    answer: string;
    explanation: string;
  };
  production: {
    prompt: string;
    translation: string;
    pieces: string[];
    target: string[];
  };
};

export const chapterLearningPacks = {
  arrival: {
    grammar: { title:'Identify something clearly',pattern:'这 + 是 + Possessor + Noun',explanation:'这是 introduces the object in front of you. Add 我的 before a noun to say it belongs to you.',example:'这是我的护照。',question:{prompt:'Which sentence clearly identifies your passport?',choices:['这是我的护照。','护照这是我。','我的这是护照吗。'],answer:'这是我的护照。',explanation:'这是 begins the identification, followed by 我的护照, “my passport.”'}},
    listening: {prompt:'The officer asks for your passport. Choose the natural response.',audio:'请出示您的护照。',choices:['好的，这是我的护照。','我的房间在三楼。','我要一杯热茶。'],answer:'好的，这是我的护照。',explanation:'好的 acknowledges the request, then 这是我的护照 presents the document clearly.'},
    production: {prompt:'Build: “This is my passport.”',translation:'This is my passport.',pieces:['护照','这是','我的'],target:['这是','我的','护照']},
  },
  hotel: {
    grammar: { title:'Say what you have',pattern:'Subject + 有 + Noun',explanation:'有 expresses possession or availability. At reception, 我有预订 is concise and natural.',example:'我有预订。',question:{prompt:'Which sentence tells reception you have a reservation?',choices:['我有预订。','我在预订有。','预订我是。'],answer:'我有预订。',explanation:'Use 我 as the subject, 有 for “have,” then 预订, “reservation.”'}},
    listening: {prompt:'Reception asks whether you booked. Choose the best reply.',audio:'请问您有预订吗？',choices:['有，我姓李。','我要去地铁站。','这件衣服太贵了。'],answer:'有，我姓李。',explanation:'有 confirms the booking, and 我姓李 gives the surname used for it.'},
    production: {prompt:'Build: “I have a reservation.”',translation:'I have a reservation.',pieces:['预订','我','有'],target:['我','有','预订']},
  },
  restaurant: {
    grammar: { title:'Make a polite request',pattern:'请 + 给 + Person + Verb / Noun',explanation:'请 softens a request. 给我 introduces the recipient: “for me” or “give me.”',example:'请给我看一下菜单。',question:{prompt:'Which request naturally asks to see the menu?',choices:['请给我看一下菜单。','菜单我请一下给。','看菜单给请我。'],answer:'请给我看一下菜单。',explanation:'请 gives politeness, 给我 marks the recipient, and 看一下 softens the action.'}},
    listening: {prompt:'The host asks how many people. Choose the natural answer.',audio:'您好，请问几位？',choices:['两位，谢谢。','两张票，谢谢。','两个菜单很远。'],answer:'两位，谢谢。',explanation:'位 is the polite measure word for people; 两位 means “two people.”'},
    production: {prompt:'Build: “Please show me the menu.”',translation:'Please let me see the menu.',pieces:['菜单','看一下','请','给我'],target:['请','给我','看一下','菜单']},
  },
  transport: {
    grammar: { title:'Describe distance',pattern:'Place A + 离 + Place B + Adjective',explanation:'离 connects two places when talking about distance. Add 远 or 近 before 吗 to form a yes/no question.',example:'车站离这里远吗？',question:{prompt:'Which sentence asks whether the station is far from here?',choices:['车站离这里远吗？','这里车站吗离远？','远车站这里离。'],answer:'车站离这里远吗？',explanation:'车站 is Place A, 这里 is Place B, and 远吗 asks “is it far?”'}},
    listening: {prompt:'Someone explains where the station is. What did you hear?',audio:'车站不远，走路五分钟就到了。',choices:['It is five minutes away on foot.','The train leaves in five hours.','A ticket costs fifty yuan.'],answer:'It is five minutes away on foot.',explanation:'走路五分钟 means “walk for five minutes,” and 不远 means it is not far.'},
    production: {prompt:'Build: “Is the station far from here?”',translation:'Is the station far from here?',pieces:['远吗','这里','车站','离'],target:['车站','离','这里','远吗']},
  },
  shopping: {
    grammar: { title:'Ask a price',pattern:'Demonstrative + 多少钱？',explanation:'这个 means “this one.” Place 多少钱 after the item to ask its price.',example:'这个多少钱？',question:{prompt:'Which sentence asks the price of this item?',choices:['这个多少钱？','多少钱这个有。','钱这个多少是。'],answer:'这个多少钱？',explanation:'这个 identifies the item, and 多少钱 directly asks “how much money?”'}},
    listening: {prompt:'The seller tells you the price. Choose what it means.',audio:'这个一百二十块。',choices:['This is 120 yuan.','There are 12 items.','It closes at 1:20.'],answer:'This is 120 yuan.',explanation:'一百二十 is 120, while 块 is the common spoken unit for yuan.'},
    production: {prompt:'Build: “Can I pay by card?”',translation:'Can I pay by card?',pieces:['刷卡','吗','可以'],target:['可以','刷卡','吗']},
  },
  campus: {
    grammar: { title:'Put time before the action',pattern:'Subject + Time + Verb + Place',explanation:'Chinese commonly places time before the main verb. 我下午去图书馆 gives who, when, action, and destination.',example:'我下午去图书馆。',question:{prompt:'Which sentence has natural Chinese time order?',choices:['我下午去图书馆。','我去图书馆下午。','下午图书馆我去的。'],answer:'我下午去图书馆。',explanation:'下午 belongs before 去 because time normally comes before the action.'}},
    listening: {prompt:'A classmate suggests a meeting place. Where will you meet?',audio:'下午我们在图书馆见吧。',choices:['At the library','In the hotel lobby','At the metro station'],answer:'At the library',explanation:'在图书馆见 means “meet at the library.”'},
    production: {prompt:'Build: “I am going to the library this afternoon.”',translation:'I am going to the library this afternoon.',pieces:['图书馆','我','去','下午'],target:['我','下午','去','图书馆']},
  },
  health: {
    grammar: { title:'Soften a symptom',pattern:'Subject + 有一点 + Symptom / Adjective',explanation:'有一点 makes a negative condition sound mild: “a little” or “slightly.”',example:'我有一点头疼。',question:{prompt:'Which sentence naturally describes a slight headache?',choices:['我有一点头疼。','头疼我一点有。','我一点头疼是有。'],answer:'我有一点头疼。',explanation:'我 introduces the speaker, 有一点 softens the symptom, and 头疼 names it.'}},
    listening: {prompt:'The clinician asks a question. Choose the most relevant answer.',audio:'你哪里不舒服？',choices:['我有一点头疼。','我的房卡不见了。','我要两张地铁票。'],answer:'我有一点头疼。',explanation:'哪里不舒服 asks what feels unwell, so a symptom is the relevant response.'},
    production: {prompt:'Build: “I have a slight headache.”',translation:'I have a slight headache.',pieces:['头疼','有一点','我'],target:['我','有一点','头疼']},
  },
  coffee: {
    grammar: { title:'Order with a quantity',pattern:'我要 + Number + Measure Word + Item',explanation:'Use 杯 as the measure word for drinks. Add details such as 热 and 少糖 after naming the drink.',example:'我要一杯热拿铁，少糖。',question:{prompt:'Which sentence naturally orders one hot latte with less sugar?',choices:['我要一杯热拿铁，少糖。','一热拿铁杯我要糖。','我要拿铁一张少糖。'],answer:'我要一杯热拿铁，少糖。',explanation:'我要 states the order, 一杯 counts the drink, and 热拿铁，少糖 gives the customization.'}},
    listening: {prompt:'The barista asks whether you will drink here or take it away.',audio:'请问堂食还是打包？',choices:['堂食，谢谢。','我要一张票。','房间在三楼。'],answer:'堂食，谢谢。',explanation:'堂食 means “for here,” while 打包 means takeaway.'},
    production: {prompt:'Build: “I want one hot latte.”',translation:'I want one hot latte.',pieces:['热拿铁','一杯','我要'],target:['我要','一杯','热拿铁']},
  },
  social: {
    grammar: { title:'Make a friendly suggestion',pattern:'Subject + 一起 + Verb + 吧',explanation:'一起 means “together.” Sentence-final 吧 turns the statement into a friendly suggestion.',example:'我们一起吃饭吧。',question:{prompt:'Which sentence naturally suggests eating together?',choices:['我们一起吃饭吧。','一起我们吧吃饭。','吃饭吧一起我们吗。'],answer:'我们一起吃饭吧。',explanation:'我们 is the subject, 一起 modifies the action, and 吧 softens the suggestion.'}},
    listening: {prompt:'A new friend asks about your weekend. Choose a warm response.',audio:'你周末有空吗？',choices:['有空，我们一起吃饭吧。','我要去买房卡。','我的护照在酒店。'],answer:'有空，我们一起吃饭吧。',explanation:'有空 answers the availability question, then the second clause suggests a shared plan.'},
    production: {prompt:'Build: “Let’s eat together.”',translation:'Let’s eat together.',pieces:['吃饭','一起','吧','我们'],target:['我们','一起','吃饭','吧']},
  },
} satisfies Record<string, ChapterLearningPack>;
