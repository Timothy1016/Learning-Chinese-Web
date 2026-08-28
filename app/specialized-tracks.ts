export type SpecializedTrack = {
  id:string;
  title:string;
  chinese:string;
  goal:string;
  words:{hanzi:string;pinyin:string;english:string;example:string}[];
  questions:{prompt:string;choices:string[];answer:string;explanation:string}[];
};

export const specializedTracks:SpecializedTrack[]=[
  {id:'graduate-cs',title:'Computer Science Master’s',chinese:'计算机硕士',goal:'Prepare for classes, labs, supervisor meetings, and graduate applications in China.',words:[
    {hanzi:'研究生',pinyin:'yánjiūshēng',english:'graduate student',example:'我是计算机专业的研究生。'},
    {hanzi:'导师',pinyin:'dǎoshī',english:'academic supervisor',example:'我明天和导师讨论研究计划。'},
    {hanzi:'课程',pinyin:'kèchéng',english:'course',example:'这门课程需要完成一个项目。'},
    {hanzi:'学分',pinyin:'xuéfēn',english:'academic credit',example:'这门课有三个学分。'},
    {hanzi:'开题报告',pinyin:'kāití bàogào',english:'research proposal presentation',example:'下个月我要做开题报告。'},
    {hanzi:'论文',pinyin:'lùnwén',english:'thesis / paper',example:'我的论文研究分布式系统。'},
  ],questions:[
    {prompt:'How do you say “I want to discuss my research plan with my supervisor”?',choices:['我想和导师讨论研究计划。','我想部署一杯咖啡。','学分返回了错误。'],answer:'我想和导师讨论研究计划。',explanation:'导师 is an academic supervisor; 讨论研究计划 means discuss a research plan.'},
    {prompt:'What is 开题报告?',choices:['research proposal presentation','final exam score','student ID card'],answer:'research proposal presentation',explanation:'Graduate students present the topic, method, and plan in a 开题报告.'},
    {prompt:'Complete: 这门课有三个 ___。',choices:['学分','漏洞','菜单'],answer:'学分',explanation:'学分 are academic credits attached to a course.'},
  ]},
  {id:'ai-research',title:'AI & Machine Learning',chinese:'人工智能与机器学习',goal:'Discuss models, experiments, datasets, and research results with an AI lab.',words:[
    {hanzi:'人工智能',pinyin:'réngōng zhìnéng',english:'artificial intelligence',example:'我想研究人工智能。'},
    {hanzi:'机器学习',pinyin:'jīqì xuéxí',english:'machine learning',example:'机器学习模型需要训练数据。'},
    {hanzi:'训练数据',pinyin:'xùnliàn shùjù',english:'training data',example:'训练数据里可能有偏差。'},
    {hanzi:'神经网络',pinyin:'shénjīng wǎngluò',english:'neural network',example:'这个神经网络有三层。'},
    {hanzi:'准确率',pinyin:'zhǔnquèlǜ',english:'accuracy rate',example:'模型的准确率提高了。'},
    {hanzi:'过拟合',pinyin:'guònǐhé',english:'overfitting',example:'我们需要防止模型过拟合。'},
  ],questions:[
    {prompt:'The model performs well on training data but poorly on new data. What is the likely issue?',choices:['模型可能过拟合。','模型需要一张房卡。','数据正在喝咖啡。'],answer:'模型可能过拟合。',explanation:'过拟合 is overfitting: strong training performance without reliable generalization.'},
    {prompt:'Which phrase means “training data”?',choices:['训练数据','神经网络','准确率'],answer:'训练数据',explanation:'训练 means training and 数据 means data.'},
    {prompt:'Choose “The model’s accuracy improved.”',choices:['模型的准确率提高了。','模型的导师迟到了。','模型的学分取消了。'],answer:'模型的准确率提高了。',explanation:'准确率 is accuracy rate; 提高了 indicates improvement.'},
  ]},
  {id:'software-engineering',title:'Software Engineering',chinese:'软件工程',goal:'Handle stand-ups, requirements, debugging, code review, and deployment in Chinese.',words:[
    {hanzi:'源代码',pinyin:'yuándàimǎ',english:'source code',example:'请把源代码提交到仓库。'},
    {hanzi:'代码审查',pinyin:'dàimǎ shěnchá',english:'code review',example:'代码审查发现了一个问题。'},
    {hanzi:'版本控制',pinyin:'bǎnběn kòngzhì',english:'version control',example:'团队使用版本控制管理代码。'},
    {hanzi:'单元测试',pinyin:'dānyuán cèshì',english:'unit test',example:'所有单元测试都通过了。'},
    {hanzi:'技术债务',pinyin:'jìshù zhàiwù',english:'technical debt',example:'这个方案会增加技术债务。'},
    {hanzi:'上线',pinyin:'shàngxiàn',english:'go live / launch',example:'新功能今晚正式上线。'},
  ],questions:[
    {prompt:'How do you report that every unit test passed?',choices:['所有单元测试都通过了。','所有课程都过拟合了。','所有接口都毕业了。'],answer:'所有单元测试都通过了。',explanation:'单元测试 means unit test; 通过 means pass.'},
    {prompt:'Which term means code review?',choices:['代码审查','技术债务','版本控制'],answer:'代码审查',explanation:'审查 means to inspect or review.'},
    {prompt:'Choose the natural launch update.',choices:['新功能今晚正式上线。','新功能今晚正式学分。','新功能今晚正式论文。'],answer:'新功能今晚正式上线。',explanation:'上线 is used when a software feature or service goes live.'},
  ]},
  {id:'data-cyber',title:'Data & Cybersecurity',chinese:'数据与网络安全',goal:'Explain data pipelines, permissions, encryption, incidents, and responsible handling.',words:[
    {hanzi:'数据分析',pinyin:'shùjù fēnxī',english:'data analysis',example:'数据分析显示用户数量增加了。'},
    {hanzi:'数据清洗',pinyin:'shùjù qīngxǐ',english:'data cleaning',example:'建模以前需要完成数据清洗。'},
    {hanzi:'访问权限',pinyin:'fǎngwèn quánxiàn',english:'access permission',example:'只有管理员有访问权限。'},
    {hanzi:'加密',pinyin:'jiāmì',english:'encrypt / encryption',example:'敏感信息必须加密。'},
    {hanzi:'网络攻击',pinyin:'wǎngluò gōngjī',english:'cyberattack',example:'系统检测到一次网络攻击。'},
    {hanzi:'隐私保护',pinyin:'yǐnsī bǎohù',english:'privacy protection',example:'这个设计重视隐私保护。'},
  ],questions:[
    {prompt:'Sensitive information must be encrypted.',choices:['敏感信息必须加密。','敏感信息必须上线。','敏感信息必须开题。'],answer:'敏感信息必须加密。',explanation:'加密 is the standard term for encryption.'},
    {prompt:'Who can access the data?',choices:['只有管理员有访问权限。','只有菜单有访问权限。','只有天气有访问权限。'],answer:'只有管理员有访问权限。',explanation:'访问权限 means permission to access a system or data.'},
    {prompt:'Which phrase means privacy protection?',choices:['隐私保护','数据清洗','网络攻击'],answer:'隐私保护',explanation:'隐私 is privacy and 保护 is protection.'},
  ]},
];
