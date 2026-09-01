export type NeuralVoicePreference={
  accent:'zh-CN'|'zh-TW'|'zh-HK';
  style:'female'|'male';
  speed:number;
};

const neuralVoiceMap={
  'zh-CN':{female:'zh-CN-XiaoxiaoNeural',male:'zh-CN-YunxiNeural'},
  'zh-TW':{female:'zh-TW-HsiaoChenNeural',male:'zh-TW-YunJheNeural'},
  'zh-HK':{female:'zh-HK-HiuMaanNeural',male:'zh-HK-WanLungNeural'},
} as const;

export function neuralVoiceName(preference:Pick<NeuralVoicePreference,'accent'|'style'>){
  return neuralVoiceMap[preference.accent][preference.style];
}

export function neuralRatePercent(speed:number){
  const normalized=Math.max(.55,Math.min(1.25,speed));
  return `${Math.round((normalized-1)*100)}%`;
}

export function neuralTtsEnabled(env:Record<string,string|undefined>=process.env){
  return env.NEXT_PUBLIC_NEURAL_TTS_ENABLED==='true';
}

export async function requestNeuralSpeech(text:string,preference:NeuralVoicePreference):Promise<Blob>{
  const response=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,accent:preference.accent,style:preference.style,speed:preference.speed})});
  if(!response.ok)throw new Error(response.status===503?'Neural voice is not configured.':'Neural voice is temporarily unavailable.');
  return response.blob();
}
