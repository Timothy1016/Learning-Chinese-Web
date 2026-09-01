export type ShopCategory='boosters'|'themes'|'wallpapers'|'avatars'|'identity';

export type ShopCatalogItem={
  id:string;
  category:ShopCategory;
  cost:number;
  icon:string;
  title:string;
  description:string;
};

// Expansion packs are deliberately data-driven so the shop can grow without
// turning the main application component into a wall of product definitions.
export const expandedShopCatalog:ShopCatalogItem[]=[
  {id:'voice:news-anchor',category:'boosters',cost:32,icon:'播',title:'News Anchor Voice',description:'Measured pacing for current-affairs passages'},
  {id:'voice:campus-mentor',category:'boosters',cost:28,icon:'师',title:'Campus Mentor Voice',description:'Warm classroom-style narration preset'},
  {id:'voice:slow-shadow',category:'boosters',cost:24,icon:'慢',title:'Slow Shadowing Pack',description:'Extra-deliberate pronunciation practice'},
  {id:'voice:dialogue-duo',category:'boosters',cost:36,icon:'双',title:'Dialogue Duo Pack',description:'Contrasting presets for role-play dialogue'},
  {id:'voice:exam-focus',category:'boosters',cost:34,icon:'考',title:'Exam Focus Voice',description:'Neutral listening-test pacing preset'},
  {id:'story:silk-road',category:'boosters',cost:32,icon:'路',title:'Silk Road Stories',description:'Travel choices and historical side quests'},
  {id:'story:startup-campus',category:'boosters',cost:34,icon:'创',title:'Startup Campus Stories',description:'Technology teams, pitches, and alternate endings'},
  {id:'story:medical-night',category:'boosters',cost:34,icon:'医',title:'Hospital Night Stories',description:'Professional healthcare situations and choices'},
  {id:'story:mystery-hutong',category:'boosters',cost:30,icon:'谜',title:'Hutong Mystery',description:'Clue-based reading across a Beijing neighborhood'},
  {id:'story:festival-route',category:'boosters',cost:30,icon:'节',title:'Festival Route',description:'Seasonal culture stories with bonus vocabulary'},

  {id:'cosmetic:theme-teahouse',category:'themes',cost:28,icon:'茶',title:'Quiet Teahouse',description:'Soft tea green with warm wood accents'},
  {id:'cosmetic:theme-porcelain',category:'themes',cost:30,icon:'瓷',title:'Blue Porcelain',description:'Clean cobalt details on pale paper'},
  {id:'cosmetic:theme-lotus',category:'themes',cost:28,icon:'莲',title:'Lotus Morning',description:'Fresh mint and gentle pink highlights'},
  {id:'cosmetic:theme-neon',category:'themes',cost:36,icon:'霓',title:'Neon Chongqing',description:'Electric cyan and warm city-light accents'},
  {id:'cosmetic:theme-autumn',category:'themes',cost:30,icon:'秋',title:'Autumn Academy',description:'Amber study cards and deep brown ink'},
  {id:'cosmetic:theme-snow',category:'themes',cost:32,icon:'雪',title:'Harbin Snow',description:'Crisp ice blue with high-contrast typography'},
  {id:'cosmetic:theme-orchid',category:'themes',cost:30,icon:'兰',title:'Orchid Studio',description:'Elegant violet and jade study surfaces'},
  {id:'cosmetic:theme-sunset',category:'themes',cost:32,icon:'霞',title:'West Lake Sunset',description:'Coral light over calm lake-blue cards'},
  {id:'cosmetic:theme-bamboo',category:'themes',cost:27,icon:'竹',title:'Bamboo Paper',description:'Minimal ink green with natural texture'},
  {id:'cosmetic:theme-space',category:'themes',cost:38,icon:'星',title:'Shenzhou Night',description:'Deep space navy with luminous progress bars'},

  {id:'cosmetic:wallpaper-hutong',category:'wallpapers',cost:34,icon:'巷',title:'Beijing Hutong',description:'Layered courtyard-roof silhouettes'},
  {id:'cosmetic:wallpaper-lotus',category:'wallpapers',cost:32,icon:'荷',title:'Lotus Pond',description:'Quiet leaves behind reading sessions'},
  {id:'cosmetic:wallpaper-terrace',category:'wallpapers',cost:36,icon:'田',title:'Rice Terraces',description:'Soft contour lines inspired by Longji'},
  {id:'cosmetic:wallpaper-porcelain',category:'wallpapers',cost:34,icon:'青',title:'Porcelain Clouds',description:'Blue-and-white cloud ornament'},
  {id:'cosmetic:wallpaper-metro',category:'wallpapers',cost:35,icon:'铁',title:'Metro Lines',description:'Subtle transit-map geometry'},
  {id:'cosmetic:wallpaper-library',category:'wallpapers',cost:32,icon:'书',title:'University Library',description:'Calm shelves and desk-light pattern'},
  {id:'cosmetic:wallpaper-cyber',category:'wallpapers',cost:38,icon:'网',title:'Cyber Grid',description:'Low-contrast digital network texture'},
  {id:'cosmetic:wallpaper-kites',category:'wallpapers',cost:30,icon:'鸢',title:'Spring Kites',description:'Playful sky shapes for daily practice'},
  {id:'cosmetic:wallpaper-moon',category:'wallpapers',cost:34,icon:'月',title:'Mid-Autumn Moon',description:'Moonlit clouds with restrained gold'},
  {id:'cosmetic:wallpaper-opera',category:'wallpapers',cost:36,icon:'戏',title:'Opera Stage',description:'Elegant curtain and mask-inspired forms'},

  {id:'cosmetic:avatar-red-panda',category:'avatars',cost:24,icon:'浣',title:'Red Panda',description:'A cheerful vocabulary companion'},
  {id:'cosmetic:avatar-owl',category:'avatars',cost:24,icon:'鸮',title:'Night Owl',description:'For focused evening study'},
  {id:'cosmetic:avatar-dolphin',category:'avatars',cost:24,icon:'豚',title:'River Dolphin',description:'A calm listening companion'},
  {id:'cosmetic:avatar-monkey',category:'avatars',cost:26,icon:'猴',title:'Golden Monkey',description:'Bright energy for challenge sessions'},
  {id:'cosmetic:avatar-dog',category:'avatars',cost:22,icon:'犬',title:'Study Dog',description:'A loyal daily-practice partner'},
  {id:'cosmetic:avatar-phoenix',category:'avatars',cost:32,icon:'凤',title:'Phoenix',description:'A rare symbol for consistent comebacks'},
  {id:'cosmetic:avatar-turtle',category:'avatars',cost:22,icon:'龟',title:'Patient Turtle',description:'Slow, steady mastery over time'},
  {id:'cosmetic:avatar-moon-rabbit',category:'avatars',cost:28,icon:'月',title:'Moon Rabbit',description:'Festival-themed reading companion'},
  {id:'cosmetic:avatar-astronaut',category:'avatars',cost:32,icon:'航',title:'Taikonaut',description:'A space explorer for ambitious goals'},
  {id:'cosmetic:avatar-robot',category:'avatars',cost:30,icon:'机',title:'Learning Robot',description:'A friendly AI practice companion'},

  {id:'cosmetic:frame-bamboo',category:'identity',cost:24,icon:'竹',title:'Bamboo Frame',description:'Layered green profile outline'},
  {id:'cosmetic:frame-lantern',category:'identity',cost:26,icon:'灯',title:'Lantern Frame',description:'Warm festival glow around your avatar'},
  {id:'cosmetic:frame-cloud-gold',category:'identity',cost:28,icon:'祥云',title:'Golden Cloud Frame',description:'Traditional cloud-shaped profile halo'},
  {id:'cosmetic:frame-neon',category:'identity',cost:30,icon:'霓',title:'Neon Frame',description:'Modern cyan and violet profile ring'},
  {id:'cosmetic:frame-scholar',category:'identity',cost:28,icon:'墨',title:'Scholar Frame',description:'Ink-brush detail around your identity'},
  {id:'cosmetic:badge-grammar',category:'identity',cost:25,icon:'法',title:'Grammar Architect',description:'Badge for sentence-pattern practice'},
  {id:'cosmetic:badge-streak',category:'identity',cost:28,icon:'火',title:'Streak Keeper',description:'Celebrate a durable study rhythm'},
  {id:'cosmetic:badge-speaker',category:'identity',cost:26,icon:'说',title:'Brave Speaker',description:'Badge for pronunciation practice'},
  {id:'cosmetic:badge-review',category:'identity',cost:24,icon:'复',title:'Review Guardian',description:'Celebrate consistent spaced repetition'},
  {id:'cosmetic:badge-tech',category:'identity',cost:28,icon:'码',title:'Tech Chinese',description:'Professional technology-path identity badge'},
];

export function expandedShopCounts(){
  return expandedShopCatalog.reduce<Record<ShopCategory,number>>((counts,item)=>{counts[item.category]++;return counts},{boosters:0,themes:0,wallpapers:0,avatars:0,identity:0});
}

export const avatarGlyphs:Record<string,string>={
  'avatar-panda':'熊','avatar-dragon':'龙','avatar-scholar':'学','avatar-tiger':'虎','avatar-rabbit':'兔','avatar-crane':'鹤','avatar-fox':'狐','avatar-koi':'鲤','avatar-cat':'猫','avatar-lion':'狮',
  'avatar-red-panda':'浣','avatar-owl':'鸮','avatar-dolphin':'豚','avatar-monkey':'猴','avatar-dog':'犬','avatar-phoenix':'凤','avatar-turtle':'龟','avatar-moon-rabbit':'月','avatar-astronaut':'航','avatar-robot':'机',
};

export const badgeGlyphs:Record<string,string>={
  'badge-hsk':'级','badge-tone':'调','badge-story':'阅','badge-explorer':'游','badge-hanzi':'字','badge-listener':'听','badge-grammar':'法','badge-streak':'火','badge-speaker':'说','badge-review':'复','badge-tech':'码',
};

export function isThemeCosmetic(id:string){return ['midnight','peach','scholar','mountain','imperial','ocean'].includes(id)||id.startsWith('theme-')}
