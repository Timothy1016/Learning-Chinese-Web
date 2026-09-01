import { neuralRatePercent, neuralVoiceName, type NeuralVoicePreference } from '../../../lib/neural-voice';

export const runtime='edge';

type NeuralVoiceRequest=NeuralVoicePreference&{text:string};

function escapeXml(value:string){
  return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
}

function validPreference(value:unknown):value is NeuralVoiceRequest{
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  const item=value as Partial<NeuralVoiceRequest>;
  return ['zh-CN','zh-TW','zh-HK'].includes(item.accent??'')&&['female','male'].includes(item.style??'')&&typeof item.speed==='number'&&typeof item.text==='string';
}

export async function POST(request:Request){
  const key=process.env.AZURE_SPEECH_KEY;const region=process.env.AZURE_SPEECH_REGION;
  if(!key||!region)return Response.json({error:'Neural voice is not configured.'},{status:503});
  let input:unknown;
  try{input=await request.json()}catch{return Response.json({error:'Invalid request.'},{status:400})}
  if(!validPreference(input))return Response.json({error:'Invalid voice preference.'},{status:400});
  const text=input.text.trim();
  if(!text||text.length>1200)return Response.json({error:'Text must contain 1–1200 characters.'},{status:400});
  const voice=neuralVoiceName(input);const rate=neuralRatePercent(input.speed);const ssml=`<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${input.accent}"><voice name="${voice}"><prosody rate="${rate}">${escapeXml(text)}</prosody></voice></speak>`;
  const response=await fetch(`https://${encodeURIComponent(region)}.tts.speech.microsoft.com/cognitiveservices/v1`,{method:'POST',headers:{'Ocp-Apim-Subscription-Key':key,'Content-Type':'application/ssml+xml','X-Microsoft-OutputFormat':'audio-24khz-48kbitrate-mono-mp3','User-Agent':'Long-Chinese-Learning'},body:ssml});
  if(!response.ok)return Response.json({error:'Speech provider rejected the request.'},{status:502});
  return new Response(response.body,{headers:{'Content-Type':'audio/mpeg','Cache-Control':'private, max-age=3600'}});
}
