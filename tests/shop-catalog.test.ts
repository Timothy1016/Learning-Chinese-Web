import assert from 'node:assert/strict';
import test from 'node:test';
import { avatarGlyphs, badgeGlyphs, expandedShopCatalog, expandedShopCounts, isThemeCosmetic } from '../app/shop-catalog.ts';

test('shop expansion adds at least ten products to every category',()=>{
  const counts=expandedShopCounts();
  for(const [category,count] of Object.entries(counts))assert.ok(count>=10,`${category} only has ${count} expansion items`);
});

test('shop expansion IDs stay unique and purchasable',()=>{
  assert.equal(new Set(expandedShopCatalog.map(item=>item.id)).size,expandedShopCatalog.length);
  for(const item of expandedShopCatalog){
    assert.ok(item.cost>0);
    assert.ok(item.id.startsWith('cosmetic:')||item.id.startsWith('voice:')||item.id.startsWith('story:'));
  }
});

test('new avatars, badges, and themes can be equipped visibly',()=>{
  for(const item of expandedShopCatalog.filter(item=>item.category==='avatars'))assert.ok(avatarGlyphs[item.id.slice(9)]);
  for(const item of expandedShopCatalog.filter(item=>item.category==='identity'&&item.id.includes('badge-')))assert.ok(badgeGlyphs[item.id.slice(9)]);
  for(const item of expandedShopCatalog.filter(item=>item.category==='themes'))assert.equal(isThemeCosmetic(item.id.slice(9)),true);
});
