export type VoiceStyle = 'female' | 'male';

export type VoicePreference = {
  accent: 'zh-CN' | 'zh-TW' | 'zh-HK';
  style: VoiceStyle;
  voiceName?: string;
  voiceURI?: string;
};

export type VoiceCandidate = {
  name: string;
  lang: string;
  voiceURI?: string;
  default?: boolean;
  localService?: boolean;
};

const FEMALE_VOICE = /ting[ -]?ting|me[iy][ -]?jia|sin[ -]?ji|xiaoxiao|xiaoyi|xiaohan|xiaomeng|xiaomo|xiaoqiu|xiaorui|xiaoshuang|xiaoxuan|xiaoyan|xiaoyou|xiaoyu|hiu.*maan|female|woman|google.*(?:普通话|國語|chinese|mandarin)/i;
const MALE_VOICE = /kangkang|yunxi|yunjian|yunyang|yunhao|wan[ -]?lung|danny|male|\bman\b/i;

function normalizedLang(value: string) {
  return value.toLowerCase().replaceAll('_', '-');
}

export function voiceStyleOf(name: string): VoiceStyle | 'unknown' {
  if (FEMALE_VOICE.test(name)) return 'female';
  if (MALE_VOICE.test(name)) return 'male';
  return 'unknown';
}

export function voiceKey(voice: VoiceCandidate) {
  return voice.voiceURI || `${voice.name}::${voice.lang}`;
}

export function voicesForAccent<T extends VoiceCandidate>(voices: T[], accent: VoicePreference['accent']) {
  const target = normalizedLang(accent);
  return voices.filter(voice => normalizedLang(voice.lang) === target);
}

function qualityScore(voice: VoiceCandidate) {
  let score = 0;
  if (/natural|neural|premium|enhanced|online/i.test(voice.name)) score += 18;
  if (voice.localService) score += 4;
  if (voice.default) score += 2;
  return score;
}

export function resolvePreferredVoice<T extends VoiceCandidate>(voices: T[], preference: VoicePreference): { voice: T | null; verifiedStyle: boolean; exact: boolean } {
  const regional = voicesForAccent(voices, preference.accent);
  const exact = voices.find(voice =>
    (preference.voiceURI && voiceKey(voice) === preference.voiceURI) ||
    (!preference.voiceURI && preference.voiceName && voice.name === preference.voiceName && normalizedLang(voice.lang) === normalizedLang(preference.accent))
  );
  if (exact) return { voice: exact, verifiedStyle: voiceStyleOf(exact.name) === preference.style, exact: true };

  const confirmed = regional
    .filter(voice => voiceStyleOf(voice.name) === preference.style)
    .sort((left, right) => qualityScore(right) - qualityScore(left));
  if (confirmed[0]) return { voice: confirmed[0], verifiedStyle: true, exact: false };

  const regionalFallback = [...regional].sort((left, right) => qualityScore(right) - qualityScore(left))[0];
  if (regionalFallback) return { voice: regionalFallback, verifiedStyle: false, exact: false };

  const chineseFallback = voices.find(voice => normalizedLang(voice.lang).startsWith('zh')) ?? null;
  return { voice: chineseFallback, verifiedStyle: !!chineseFallback && voiceStyleOf(chineseFallback.name) === preference.style, exact: false };
}
