import assert from 'node:assert/strict';
import test from 'node:test';
import { neuralRatePercent, neuralTtsEnabled, neuralVoiceName } from '../lib/neural-voice.ts';

test('neural voice mapping keeps accent and gender deterministic',()=>{
  assert.equal(neuralVoiceName({accent:'zh-CN',style:'female'}),'zh-CN-XiaoxiaoNeural');
  assert.equal(neuralVoiceName({accent:'zh-CN',style:'male'}),'zh-CN-YunxiNeural');
  assert.equal(neuralVoiceName({accent:'zh-TW',style:'female'}),'zh-TW-HsiaoChenNeural');
  assert.equal(neuralVoiceName({accent:'zh-HK',style:'male'}),'zh-HK-WanLungNeural');
});

test('neural rate clamps unsafe speed values',()=>{
  assert.equal(neuralRatePercent(.1),'-45%');
  assert.equal(neuralRatePercent(1),'0%');
  assert.equal(neuralRatePercent(2),'25%');
});

test('neural TTS requires an explicit public feature switch',()=>{
  assert.equal(neuralTtsEnabled({NEXT_PUBLIC_NEURAL_TTS_ENABLED:'true'}),true);
  assert.equal(neuralTtsEnabled({NEXT_PUBLIC_NEURAL_TTS_ENABLED:'false'}),false);
});
