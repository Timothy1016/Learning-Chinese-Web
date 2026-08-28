export const PULL_REFRESH_THRESHOLD = 72;
export const PULL_REFRESH_MAX_DISTANCE = 104;

export function dampedPullDistance(rawDistance:number){
  if(rawDistance<=0)return 0;
  return Math.min(PULL_REFRESH_MAX_DISTANCE,Math.round(rawDistance*.46));
}

export function shouldTriggerPullRefresh(distance:number,threshold=PULL_REFRESH_THRESHOLD){
  return distance>=threshold;
}

export function pullRefreshLabel(distance:number,refreshing=false){
  if(refreshing)return 'Refreshing…';
  return shouldTriggerPullRefresh(distance)?'Release to refresh':'Pull down to refresh';
}

