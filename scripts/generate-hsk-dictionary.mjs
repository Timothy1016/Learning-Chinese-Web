import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error('Usage: node scripts/generate-hsk-dictionary.mjs SOURCE_ROOT');

const officialNewCounts = { 1: 500, 2: 772, 3: 973, 4: 1000, 5: 1071, 6: 1140 };
const officialCumulativeCounts = { 1: 500, 2: 1272, 3: 2245, 4: 3245, 5: 4316, 6: 5456 };

function preferredForm(forms = []) {
  return forms.find(form => {
    const pinyin = form?.i?.y ?? '';
    const meaning = (form?.m ?? []).join(' ');
    return pinyin && pinyin[0] === pinyin[0].toLowerCase() && !/surname|variant of/i.test(meaning);
  }) ?? forms.find(form => !(form?.m ?? []).some(meaning => /surname|variant of/i.test(meaning))) ?? forms[0] ?? {};
}

function cleanMeaning(meanings = []) {
  const useful = meanings.filter(meaning => !/surname|variant of/i.test(meaning));
  return (useful[0] ?? meanings[0] ?? 'Definition unavailable').replaceAll(' sth', ' something').slice(0, 180);
}

const levels = [];
for (let level = 1; level <= 6; level += 1) {
  const sourcePath = path.join(sourceRoot, 'wordlists', 'exclusive', 'new', `${level}.min.json`);
  const entries = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const words = entries.map((entry, index) => {
    const form = preferredForm(entry.f);
    return {
      id: `gf25-${level}-${String(index + 1).padStart(4, '0')}`,
      h: entry.s,
      py: form?.i?.y ?? '',
      m: cleanMeaning(form?.m),
      pos: (entry.p ?? []).slice(0, 3).join('/'),
      r: entry.r ?? '',
      q: entry.q ?? 0,
      l: level,
    };
  });
  levels.push({ level, words });
}

const payload = {
  meta: {
    standard: 'GF0025-2021',
    label: 'International Chinese Language Education Chinese Proficiency Grading Standards',
    officialSource: 'https://www.moe.gov.cn/jyb_sjzl/ziliao/A19/202111/t20211118_580755.html',
    datasetSource: 'https://github.com/drkameleon/complete-hsk-vocabulary',
    datasetLicense: 'MIT',
    officialNewCounts,
    officialCumulativeCounts,
    note: 'The official standard counts rows. This browser expands or merges some written variants into normalized searchable entries, so displayed entry totals can differ slightly.',
  },
  levels,
};

fs.writeFileSync(path.resolve('app/hsk-vocabulary.json'), `${JSON.stringify(payload)}\n`);
