import test from 'node:test';
import assert from 'node:assert/strict';
import { availableBackgroundRotation, toggleBackgroundRotation } from '../lib/background-rotation.ts';

test('background rotation excludes locked and duplicate city choices',()=>{
  assert.deepEqual(availableBackgroundRotation(['jade','bund'],['bund','locked','bund'],'jade'),['bund']);
});

test('background rotation always keeps at least one owned background',()=>{
  assert.deepEqual(toggleBackgroundRotation(['jade','bund'],['jade'],'jade'),['jade']);
  assert.deepEqual(toggleBackgroundRotation(['jade','bund'],['jade'],'bund'),['jade','bund']);
  assert.deepEqual(toggleBackgroundRotation(['jade','bund'],['jade','bund'],'jade'),['bund']);
});
