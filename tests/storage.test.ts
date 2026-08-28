import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { readLocalJson, writeLocalJson, type StorageLike } from '../lib/storage.ts';

function memoryStorage(seed:Record<string,string>={}):StorageLike&{values:Record<string,string>}{
  const values={...seed};
  return {values,getItem:key=>values[key]??null,setItem:(key,value)=>{values[key]=value},removeItem:key=>{delete values[key]}};
}

test('valid device-local JSON survives a safe read',()=>{
  const storage=memoryStorage({profile:JSON.stringify({name:'Timmy',hsk:5})});
  const result=readLocalJson(storage,'profile',{name:'Learner',hsk:1},(value):value is {name:string;hsk:number}=>typeof value==='object'&&value!==null&&typeof (value as {name?:unknown}).name==='string'&&typeof (value as {hsk?:unknown}).hsk==='number');
  assert.deepEqual(result,{value:{name:'Timmy',hsk:5},recovered:false});
});

test('corrupt device-local JSON is removed and safely recovered',()=>{
  const storage=memoryStorage({learning:'{not-json'});
  const result=readLocalJson(storage,'learning',{xp:0});
  assert.deepEqual(result,{value:{xp:0},recovered:true});
  assert.equal(storage.getItem('learning'),null);
});

test('blocked browser storage returns a recoverable write result',()=>{
  const storage:StorageLike={getItem:()=>null,removeItem:()=>undefined,setItem:()=>{throw new Error('quota')}};
  assert.equal(writeLocalJson(storage,'learning',{xp:20}),false);
});

test('offline shell, privacy metadata, and recovery routes ship together',()=>{
  const sw=readFileSync(new URL('../public/sw.js',import.meta.url),'utf8');
  const offline=readFileSync(new URL('../public/offline.html',import.meta.url),'utf8');
  const layout=readFileSync(new URL('../app/layout.tsx',import.meta.url),'utf8');
  const error=readFileSync(new URL('../app/error.tsx',import.meta.url),'utf8');
  assert.match(sw,/offline\.html/);
  assert.match(sw,/skipWaiting/);
  assert.match(offline,/You are offline/);
  assert.match(layout,/index: false/);
  assert.match(layout,/skip-link/);
  assert.match(error,/reset/);
});
