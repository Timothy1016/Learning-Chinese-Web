import test from 'node:test';
import assert from 'node:assert/strict';
import { checkInMilestoneProgress, consecutiveCheckInDays, gameGemMultiplier, recordDailyCheckIn } from '../lib/check-in.ts';

test('daily check-in is idempotent and unlocks the seventh-day reward', () => {
  const dates = ['2026-08-21','2026-08-22','2026-08-23','2026-08-24','2026-08-25','2026-08-26'];
  const result = recordDailyCheckIn(dates, [], new Date('2026-08-27T08:00:00'));
  assert.equal(result.day, 7);
  assert.equal(result.rewardDiamonds, 20);
  assert.equal(result.unlockedMilestone, 7);
  const repeated = recordDailyCheckIn(result.dates, result.claimedMilestones, new Date('2026-08-27T18:00:00'));
  assert.equal(repeated.added, false);
  assert.equal(repeated.rewardDiamonds, 0);
});

test('check-in streak and game multipliers follow the 20, 40, and 80 day ladder', () => {
  assert.equal(gameGemMultiplier(19), 1);
  assert.equal(gameGemMultiplier(20), 1.5);
  assert.equal(gameGemMultiplier(40), 2);
  assert.equal(gameGemMultiplier(80), 2.5);
  assert.equal(consecutiveCheckInDays(['2026-08-24','2026-08-25','2026-08-27'], '2026-08-27'), 1);
  assert.deepEqual(checkInMilestoneProgress(20), { next: 40, remaining: 20, progress: 0 });
});
