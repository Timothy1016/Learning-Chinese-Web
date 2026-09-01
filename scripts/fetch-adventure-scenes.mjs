import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDirectory = path.join(root, 'public', 'adventure-scenes');
const manifestPath = path.join(root, 'app', 'adventure-scenes.json');

const chapters = [
  ['arrival', 'airport terminal interior China', 'Arrival in China', '抵达中国', 'Follow the signs, identify the service area, and use your arrival phrases.'],
  ['hotel', 'hotel lobby reception China', 'Hotel Check-in', '酒店入住', 'Notice the reception desk, room signs, and places where check-in language is used.'],
  ['restaurant', 'Chinese restaurant interior dining', 'Restaurant', '餐厅', 'Look for tables, menus, servers, and details that help you order naturally.'],
  ['transport', 'metro subway station China interior', 'Transportation', '交通', 'Read station clues, find the platform, and practise asking for directions.'],
  ['shopping', 'shopping mall supermarket China interior', 'Shopping', '购物', 'Find prices, sizes, counters, and payment signs used while shopping.'],
  ['campus', 'university campus classroom China', 'Campus Life', '校园生活', 'Explore lecture halls, libraries, dormitories, and student spaces.'],
  ['health', 'hospital pharmacy clinic China interior', 'Health & Pharmacy', '看病买药', 'Identify the registration desk, pharmacy counter, and places to explain symptoms.'],
  ['coffee', 'coffee shop cafe China interior', 'Coffee Shop', '咖啡店', 'Find the counter, menu board, seating, and takeaway area.'],
  ['social', 'friends students social gathering China', 'Friends & WeChat', '朋友和微信', 'Notice meeting places and practise making plans or sharing a location.'],
  ['sightseeing', 'museum exhibition hall China interior', 'Sightseeing & Museums', '观光和博物馆', 'Find tickets, galleries, visitor signs, and information counters.'],
  ['payments', 'mobile QR payment bank China', 'Banking & Mobile Payments', '银行和移动支付', 'Recognize payment screens, QR codes, bank counters, and receipts.'],
  ['apartment', 'apartment residential compound China interior', 'Renting an Apartment', '租房', 'Inspect rooms and facilities while practising rent and address vocabulary.'],
  ['delivery', 'food delivery courier parcel locker China', 'Delivery & Couriers', '外卖和快递', 'Find pickup points, parcel lockers, couriers, and order numbers.'],
  ['workplace', 'modern office meeting room China', 'Workplace Chinese', '职场中文', 'Explore meeting rooms, desks, presentations, and team spaces.'],
  ['rail', 'high speed railway station train China', 'High-speed Rail', '高铁出行', 'Identify platforms, carriages, departure boards, and seat information.'],
  ['emergency', 'ambulance police fire station China', 'Emergencies', '紧急情况', 'Recognize emergency services and practise giving a clear location.'],
  ['public-services', 'government public service hall China', 'Public Services', '公共服务', 'Find queue numbers, service windows, forms, and document counters.'],
  ['fitness', 'running cycling swimming exercise China park', 'Fitness & Healthy Habits', '运动与健康习惯', 'Notice exercise settings and describe a healthy routine.'],
  ['festivals', 'Chinese festival lantern dragon boat China', 'Festivals & Invitations', '节日与邀请', 'Explore decorations, celebrations, invitations, and festival activities.'],
  ['technology', 'technology park electronics market Shenzhen China', 'Technology & Digital Life', '科技与数字生活', 'Find devices, repair counters, technology offices, and digital services.'],
  ['gym', 'gym fitness room weight training China', 'Build Your Strength', '力量训练', 'Identify equipment, sets, rest areas, and ways to ask a trainer for help.'],
  ['basketball', 'basketball court players China', 'Own the Basketball Court', '篮球场上', 'Read the court, positions, scoreboard, and team communication.'],
  ['badminton', 'badminton court players China', 'Master the Badminton Rally', '羽毛球对练', 'Find rackets, courts, service lines, and scoring situations.'],
];
// The three sports chapters use the hand-curated, China-specific court and gym
// galleries in public/sports-scenes. Fetch only the remaining chapters here.
const fetchedChapters=chapters.filter(([id])=>!['gym','basketball','badminton'].includes(id));

const clean = (value = '') => value.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
const api = 'https://commons.wikimedia.org/w/api.php';
const seenTitles = new Set();
const queryOverrides = {
  hotel:['hotel reception desk interior','hotel lobby interior','酒店 大堂 前台'],
  restaurant:['Chinese restaurant interior','restaurant dining room China','中国 餐厅 内景'],
  health:['hospital registration desk China','pharmacy counter China','医院 挂号 药房'],
  coffee:['coffee shop interior China','cafe counter Shanghai','中国 咖啡店'],
  payments:['QR code payment China shop','bank service hall China','移动支付 银行 大厅'],
  apartment:['apartment interior China','residential compound China','中国 小区 公寓'],
  delivery:['parcel locker China','delivery courier China','快递柜 外卖 骑手'],
  workplace:['office meeting room China','technology office Shenzhen','中国 办公室 会议室'],
  emergency:['ambulance China','fire station China','police station China'],
  'public-services':['government service hall China','public service counter China','政务服务大厅'],
  technology:['technology park Shenzhen','electronics market China','科技园 电子市场'],
};

async function search(query) {
  const params = new URLSearchParams({
    action: 'query', generator: 'search', gsrsearch: `${query} filetype:bitmap`, gsrnamespace: '6',
    gsrlimit: '50', prop: 'imageinfo', iiprop: 'url|mime|extmetadata', iiurlwidth: '1280',
    format: 'json', origin: '*', formatversion: '2',
  });
  let response;
  for (let attempt=1;attempt<=6;attempt+=1) {
    response = await fetch(`${api}?${params}`, { headers: { 'User-Agent': 'LongChineseLearning/1.0 (educational project)' } });
    if (response.ok) break;
    if (response.status!==429||attempt===6) throw new Error(`Commons search failed (${response.status}) for ${query}`);
    const retryAfter=Number(response.headers.get('retry-after')??0);
    await new Promise(resolve=>setTimeout(resolve,Math.max(5000,retryAfter*1000,attempt*3500)));
  }
  const payload = await response.json();
  await new Promise(resolve=>setTimeout(resolve,700));
  return (payload.query?.pages ?? []).filter(page => {
    const info = page.imageinfo?.[0];
    const license = info?.extmetadata?.LicenseShortName?.value ?? '';
    return info?.thumburl && /^image\/(jpeg|png|webp)$/i.test(info.mime ?? '') && /(CC|public domain|PD)/i.test(license);
  });
}

async function download(url, destination) {
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': 'LongChineseLearning/1.0 (educational project; contact via project repository)' } });
    if (response.ok) {
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      await new Promise(resolve => setTimeout(resolve, 850));
      return;
    }
    if (response.status !== 429 || attempt === 6) throw new Error(`Image download failed (${response.status})`);
    const retryAfter = Number(response.headers.get('retry-after') ?? 0);
    await new Promise(resolve => setTimeout(resolve, Math.max(5000, retryAfter * 1000, attempt * 4000)));
  }
}

await mkdir(outputDirectory, { recursive: true });
const manifest = {};
const chapterSelections = [];

for (const [id, query, label, chinese, prompt] of fetchedChapters) {
  const variants = Array.from(new Set([query,query.replace(/\s+China\b/gi,''),`China ${label}`,label,chinese,...(queryOverrides[id]??[])]));
  const candidates = [];
  const localTitles = new Set();
  for (const variant of variants) {
    const results = await search(variant);
    for (const page of results) if (!localTitles.has(page.title)) { localTitles.add(page.title); candidates.push(page); }
    if (candidates.filter(page=>!seenTitles.has(page.title)).length>=8) break;
  }
  const selected = candidates.filter(page => !seenTitles.has(page.title)).slice(0, 5);
  if (selected.length < 5) throw new Error(`${id} returned only ${selected.length} unique licensed images`);
  selected.forEach(page=>seenTitles.add(page.title));
  chapterSelections.push({id,label,chinese,prompt,selected});
  process.stdout.write(`${id}: reserved ${selected.length} unique photos\n`);
}

seenTitles.clear();
for (const {id,label,chinese,prompt,selected} of chapterSelections) {
  manifest[id]=selected.map((page,index)=>{
    const info=page.imageinfo[0];
    const extension=info.mime==='image/png'?'png':info.mime==='image/webp'?'webp':'jpg';
    const artist=clean(info.extmetadata?.Artist?.value)||'Wikimedia Commons contributor';
    const license=clean(info.extmetadata?.LicenseShortName?.value)||'Creative Commons';
    return{image:`/adventure-scenes/${id}-${index+1}.${extension}`,label:`${label} · Scene ${index+1}`,chinese,prompt,credit:`${artist} · ${license}`,source:info.descriptionurl};
  });
}
// Persist the licensed selection before downloading so an interrupted batch can resume.
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

for (const {id,selected} of chapterSelections) {
  for (let index = 0; index < selected.length; index += 1) {
    const page = selected[index];
    const info = page.imageinfo[0];
    const extension = info.mime === 'image/png' ? 'png' : info.mime === 'image/webp' ? 'webp' : 'jpg';
    const filename = `${id}-${index + 1}.${extension}`;
    const destination=path.join(outputDirectory,filename);
    try{await access(destination)}catch{await download(info.thumburl,destination)}
    seenTitles.add(page.title);
  }
  process.stdout.write(`${id}: downloaded ${selected.length} unique photos\n`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`Saved ${seenTitles.size} unique Adventure photos and ${manifestPath}\n`);
