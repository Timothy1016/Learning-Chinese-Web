export type GameQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
  audioText?: string;
};

export type RadicalFamily = {
  radical: string;
  variant?: string;
  meaning: string;
  hint: string;
  characters: { hanzi: string; pinyin: string; meaning: string }[];
};

export const radicalFamilies: RadicalFamily[] = [
  { radical: '口', meaning: 'mouth / speech', hint: 'Look for a square opening connected to speaking or eating.', characters: [{ hanzi: '吃', pinyin: 'chī', meaning: 'eat' }, { hanzi: '喝', pinyin: 'hē', meaning: 'drink' }, { hanzi: '叫', pinyin: 'jiào', meaning: 'call' }] },
  { radical: '木', meaning: 'wood / tree', hint: 'A trunk, branches, and roots often point to wood or objects made from it.', characters: [{ hanzi: '林', pinyin: 'lín', meaning: 'grove' }, { hanzi: '森', pinyin: 'sēn', meaning: 'forest' }, { hanzi: '桌', pinyin: 'zhuō', meaning: 'table' }] },
  { radical: '人', variant: '亻', meaning: 'person', hint: 'The narrow 亻 form usually stands on the left of people-related characters.', characters: [{ hanzi: '你', pinyin: 'nǐ', meaning: 'you' }, { hanzi: '他', pinyin: 'tā', meaning: 'he' }, { hanzi: '们', pinyin: 'men', meaning: 'plural marker' }] },
  { radical: '水', variant: '氵', meaning: 'water / liquid', hint: 'Three drops on the left often signal water, washing, or liquid.', characters: [{ hanzi: '河', pinyin: 'hé', meaning: 'river' }, { hanzi: '海', pinyin: 'hǎi', meaning: 'sea' }, { hanzi: '洗', pinyin: 'xǐ', meaning: 'wash' }] },
  { radical: '心', variant: '忄', meaning: 'heart / emotion', hint: 'The compressed 忄 form often appears in feelings and mental states.', characters: [{ hanzi: '快', pinyin: 'kuài', meaning: 'happy / fast' }, { hanzi: '怕', pinyin: 'pà', meaning: 'afraid' }, { hanzi: '想', pinyin: 'xiǎng', meaning: 'think / miss' }] },
  { radical: '手', variant: '扌', meaning: 'hand / action', hint: 'Three strokes on the left often indicate an action done with the hand.', characters: [{ hanzi: '打', pinyin: 'dǎ', meaning: 'hit / make' }, { hanzi: '找', pinyin: 'zhǎo', meaning: 'look for' }, { hanzi: '拿', pinyin: 'ná', meaning: 'take' }] },
  { radical: '言', variant: '讠', meaning: 'speech / language', hint: 'The simplified 讠 component introduces words about speaking or language.', characters: [{ hanzi: '说', pinyin: 'shuō', meaning: 'speak' }, { hanzi: '话', pinyin: 'huà', meaning: 'speech' }, { hanzi: '请', pinyin: 'qǐng', meaning: 'please / invite' }] },
  { radical: '火', variant: '灬', meaning: 'fire / heat', hint: 'Four dots underneath can be the compressed form of fire.', characters: [{ hanzi: '热', pinyin: 'rè', meaning: 'hot' }, { hanzi: '烧', pinyin: 'shāo', meaning: 'burn' }, { hanzi: '灯', pinyin: 'dēng', meaning: 'lamp' }] },
];

export const meaningHunterQuestions: GameQuestion[] = [
  ['passport', '护照', '行李', '出口', '房间', '护照', '护照 means passport; it is the document used at immigration.'],
  ['reservation', '预订', '菜单', '车站', '地图', '预订', '预订 is a reservation or the act of booking.'],
  ['recommend', '推荐', '付款', '学习', '换乘', '推荐', '推荐 means to recommend.'],
  ['platform', '站台', '前台', '餐厅', '商店', '站台', '站台 is the platform where a train arrives.'],
  ['discount', '打折', '打车', '打包', '打开', '打折', '打折 literally describes applying a discount.'],
  ['assignment', '作业', '专业', '毕业', '同学', '作业', '作业 means homework or an assignment.'],
  ['interview', '面试', '会议', '简历', '公司', '面试', '面试 is a job or school interview.'],
  ['debug', '调试', '部署', '数据', '网络', '调试', '调试 means debugging or testing a program.'],
].map(([id, answer, b, c, d, expected, explanation]) => ({ id: `meaning-${id}`, prompt: `Find the Chinese word for “${id}”`, choices: [answer, b, c, d], answer: expected, explanation }));

export const pinyinChallengeQuestions: GameQuestion[] = [
  ['护照', 'hùzhào', 'húzhāo', 'hǔzhǎo', 'hùzào'], ['预订', 'yùdìng', 'yǔdīng', 'yúdìng', 'yùdǐng'],
  ['菜单', 'càidān', 'cǎidàn', 'cáidān', 'cāidǎn'], ['推荐', 'tuījiàn', 'tuǐjiān', 'tuíjiǎn', 'tuìjiān'],
  ['地铁', 'dìtiě', 'dǐtié', 'dītǐe', 'dítie'], ['便宜', 'piányi', 'piǎnyì', 'biànyí', 'piānyi'],
  ['学习', 'xuéxí', 'xuěxì', 'xuēxǐ', 'xuéxi'], ['工作', 'gōngzuò', 'gǒngzuó', 'gòngzūo', 'gōngzǒu'],
].map(([hanzi, answer, b, c, d], index) => ({ id: `pinyin-${index + 1}`, prompt: `Choose the correct pinyin for ${hanzi}`, choices: [answer, b, c, d], answer, explanation: `${hanzi} is pronounced ${answer}. Say it once before moving on.`, audioText: hanzi }));

export const toneMasterQuestions: GameQuestion[] = [
  ['妈 mā', 'Tone 1', 'Tone 2', 'Tone 3', 'Tone 4', 'high and level'], ['茶 chá', 'Tone 2', 'Tone 1', 'Tone 3', 'Tone 4', 'rising'],
  ['好 hǎo', 'Tone 3', 'Tone 1', 'Tone 2', 'Tone 4', 'dip then rise'], ['去 qù', 'Tone 4', 'Tone 1', 'Tone 2', 'Tone 3', 'sharp falling'],
  ['书 shū', 'Tone 1', 'Tone 2', 'Tone 3', 'Tone 4', 'high and level'], ['来 lái', 'Tone 2', 'Tone 1', 'Tone 3', 'Tone 4', 'rising'],
  ['你 nǐ', 'Tone 3', 'Tone 1', 'Tone 2', 'Tone 4', 'dip then rise'], ['饭 fàn', 'Tone 4', 'Tone 1', 'Tone 2', 'Tone 3', 'sharp falling'],
].map(([prompt, answer, b, c, d, contour], index) => ({ id: `tone-${index + 1}`, prompt: `Which tone does ${prompt} use?`, choices: [answer, b, c, d], answer, explanation: `${answer} has a ${contour} contour.`, audioText: prompt.split(' ')[0] }));

export const sentenceSpeedrunQuestions: GameQuestion[] = [
  ['Say “This is my passport.”', '这是我的护照。', '我的这是护照。', '护照我的这是。', '这是我的护照。'],
  ['Say “I have a reservation.”', '我有预订。', '有我预订。', '预订我有。', '我有预订。'],
  ['Say “Please show me the menu.”', '请给我看一下菜单。', '菜单请一下看我。', '我菜单给请看。', '请给我看一下菜单。'],
  ['Say “How do I get to the subway?”', '地铁怎么走？', '怎么地铁走？', '走地铁怎么？', '地铁怎么走？'],
  ['Say “This is too expensive.”', '这个太贵了。', '太这个贵了。', '贵了这个太。', '这个太贵了。'],
  ['Say “I study Chinese.”', '我学习中文。', '学习我中文。', '中文我学习。', '我学习中文。'],
  ['Say “I want to apply for this job.”', '我想申请这份工作。', '申请我这份想工作。', '这份工作申请想我。', '我想申请这份工作。'],
  ['Say “The program has a problem.”', '这个程序有问题。', '有这个问题程序。', '问题程序这个有。', '这个程序有问题。'],
].map(([prompt, answer, b, c, expected], index) => ({ id: `sentence-speed-${index + 1}`, prompt, choices: [answer, b, c], answer: expected, explanation: `${expected} follows a natural Mandarin topic–comment and verb-object order.`, audioText: expected }));

export const hanziPuzzleQuestions: GameQuestion[] = [
  ['Which character contains the mouth radical 口?', '喝', '河', '快', '打', '喝', '喝 uses 口 because drinking involves the mouth.'],
  ['Which character contains the water radical 氵?', '海', '他', '话', '灯', '海', '海 begins with the three-dot water component 氵.'],
  ['Which character contains the person radical 亻?', '你', '请', '热', '森', '你', 'The left side of 你 is 亻, the person radical.'],
  ['Which character contains the hand radical 扌?', '找', '想', '说', '吃', '找', '找 begins with 扌 because searching is an action.'],
  ['Which character contains the speech radical 讠?', '请', '林', '洗', '快', '请', '请 begins with the simplified speech radical 讠.'],
  ['Which character uses the fire form 灬?', '热', '们', '河', '桌', '热', 'The four dots under 热 are the compressed fire form 灬.'],
  ['Which character is built from two 木?', '林', '森', '桌', '想', '林', 'Two trees 木 + 木 form 林, a grove.'],
  ['Which character is built from three 木?', '森', '林', '喝', '烧', '森', 'Three 木 components form 森, a forest.'],
].map(([prompt, answer, b, c, d, expected, explanation], index) => ({ id: `hanzi-${index + 1}`, prompt, choices: [answer, b, c, d], answer: expected, explanation, audioText: expected }));

export const flashcardBattleQuestions: GameQuestion[] = [
  ['passport', '护照', '菜单', '房卡', '地图'], ['luggage', '行李', '出口', '前台', '地铁'],
  ['reservation', '预订', '推荐', '付款', '换乘'], ['menu', '菜单', '桌子', '房间', '公司'],
  ['subway', '地铁', '站台', '车票', '地图'], ['cheap', '便宜', '贵', '热', '远'],
  ['homework', '作业', '专业', '同学', '老师'], ['company', '公司', '程序', '数据', '会议'],
  ['interview', '面试', '简历', '工作', '申请'], ['program', '程序', '网络', '问题', '调试'],
].map(([meaning, answer, b, c, d], index) => ({ id: `battle-${index + 1}`, prompt: `Battle card: choose “${meaning}”`, choices: [answer, b, c, d], answer, explanation: `${answer} means “${meaning}”.`, audioText: answer }));

export const coreGameIds = ['word-match', 'sentence-builder', 'memory-cards', 'word-rush', 'meaning-hunter', 'pinyin-challenge', 'tone-master', 'audio-detective', 'sentence-speedrun', 'hanzi-puzzle', 'flashcard-battle'] as const;
