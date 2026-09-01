export function availableBackgroundRotation(ownedIds:string[],selectedIds:string[],equippedId:string){
  const owned=new Set(ownedIds);
  const selected=selectedIds.filter((id,index)=>owned.has(id)&&selectedIds.indexOf(id)===index);
  if(selected.length)return selected;
  if(owned.has(equippedId))return [equippedId];
  return ownedIds.length?[ownedIds[0]]:[];
}

export function toggleBackgroundRotation(ownedIds:string[],selectedIds:string[],id:string){
  if(!ownedIds.includes(id))return availableBackgroundRotation(ownedIds,selectedIds,ownedIds[0]??'');
  const active=availableBackgroundRotation(ownedIds,selectedIds,ownedIds[0]??'');
  if(active.includes(id)&&active.length===1)return active;
  return active.includes(id)?active.filter(item=>item!==id):[...active,id];
}
