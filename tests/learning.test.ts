import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { awardXpOnce, calculateSkillEvidence, calculateSkillScores, getLevelProgress, recommendHsk, scheduleReview, streakGapStatus, updateStreak, updateStreakWithGrace, type LearningEvent, type ReviewCard } from '../lib/learning.ts';
import { hskCoverage, searchHskWords, selectHskWords, type HskDictionaryData } from '../lib/hsk-dictionary.ts';
import { buildDailySession, createDailySessionEvents, dailySessionQuestionCount, dailySessionReviewWordIds } from '../lib/daily-session.ts';
import { chapterAccuracy, chapterStageProgress, createChapterLessonEvents, type ChapterLessonResult } from '../lib/chapter-lesson.ts';
import { buildFlashcardRound, flashcardRatingPreview, flashcardStatus, isFlashcardDue, updateFlashcardStat, type FlashcardStat } from '../lib/flashcards.ts';
import { extractChineseSegments, imageDictionaryMatches, normalizedChineseText } from '../lib/image-lookup.ts';
import { dampedPullDistance, pullRefreshLabel, shouldTriggerPullRefresh } from '../lib/pull-refresh.ts';
import { buildQuestBoard, playerTitle, weekStartKey } from '../lib/quests.ts';
import { createMistake, dueMistakes, mergeMistakes, mistakeMasteryLabel, reviewMistake } from '../lib/mistakes.ts';
import { resolvePreferredVoice, voiceStyleOf, voicesForAccent } from '../lib/voice.ts';
import { adventureChapters } from '../app/content.ts';
import { hskStyleBanks, pathPacks, storyLibrary } from '../app/extended-content.ts';
import { completeTextbookStoryLibrary } from '../app/textbook-library.ts';
import { completeCourseStoryCatalog } from '../app/course-story-catalog.ts';
import { completeCourseExerciseBank, courseExerciseCoverage, courseExerciseLessons } from '../app/course-exercise-bank.ts';
import { specializedTracks } from '../app/specialized-tracks.ts';
import { chapterLearningPacks } from '../app/chapter-learning.ts';
import { allNetworkVocabulary, vocabularyNetworkCategories } from '../app/vocabulary-network.ts';
import { hskCourseUnits, hskGradedStories } from '../app/hsk-course-content.ts';
import { coreGameIds, flashcardBattleQuestions, hanziPuzzleQuestions, meaningHunterQuestions, pinyinChallengeQuestions, radicalFamilies, sentenceSpeedrunQuestions, toneMasterQuestions } from '../app/game-content.ts';
import { createLocalBackup, parseLocalBackup } from '../lib/backup.ts';
import { readerCoverage, segmentChineseText } from '../lib/reader.ts';
import { tonePairQuestions, tonePairs } from '../app/pronunciation-content.ts';
import { buildLibraryBank, filterLibraryBank, libraryBankCounts } from '../lib/library-bank.ts';
import { advanceRecallQueue, recallMatches } from '../lib/review-queue.ts';
import { newestSnapshot, validCloudSnapshot } from '../lib/cloud-sync.ts';

const now = new Date('2026-08-24T00:00:00Z');
const card: ReviewCard = { wordId: 'menu', dueAt: now.toISOString(), intervalDays: 0, ease: 2.5, repetitions: 0, mastery: 10 };

test('active recall accepts meaningful synonyms but rejects unrelated guesses', () => {
  assert.equal(recallMatches('love', 'to love; to be fond of; to like'), true);
  assert.equal(recallMatches('be fond of', 'to love; to be fond of; to like'), true);
  assert.equal(recallMatches('table', 'to love; to be fond of; to like'), false);
});

test('wrong recall returns to the back while correct recall leaves the session', () => {
  assert.deepEqual(advanceRecallQueue(['爱','学','看'],'爱',false), ['学','看','爱']);
  assert.deepEqual(advanceRecallQueue(['爱','学','看'],'爱',true), ['学','看']);
});

test('cloud sync accepts versioned snapshots and chooses the newest copy', () => {
  const local = { schemaVersion: 1, savedAt: '2026-08-28T10:00:00.000Z', profile: {}, learning: {}, voice: {} };
  const remote = { ...local, savedAt: '2026-08-28T11:00:00.000Z' };
  assert.equal(validCloudSnapshot(local), true);
  assert.equal(validCloudSnapshot({ ...local, schemaVersion: 2 }), false);
  assert.equal(newestSnapshot(local, remote), 'remote');
  assert.equal(newestSnapshot(remote, local), 'local');
});

test('smart reader uses longest HSK matches and reports coverage', () => {
  const words=[
    {id:'today',h:'今天',py:'jīntiān',m:'today',pos:'t',r:'日',q:1,l:1},
    {id:'subway',h:'地铁',py:'dìtiě',m:'subway',pos:'n',r:'土',q:2,l:2},
    {id:'university',h:'大学',py:'dàxué',m:'university',pos:'n',r:'大',q:3,l:1},
    {id:'big',h:'大',py:'dà',m:'big',pos:'a',r:'大',q:4,l:1},
  ];
  const tokens=segmentChineseText('今天我坐地铁去大学。',words);
  assert.deepEqual(tokens.filter(token=>token.word).map(token=>token.text),['今天','地铁','大学']);
  assert.deepEqual(readerCoverage(tokens),{known:6,chinese:9,percent:67});
});

test('tone-pair lab covers the full four-by-four matrix with valid quizzes', () => {
  assert.equal(tonePairs.length,16);
  assert.equal(new Set(tonePairs.map(pair=>pair.id)).size,16);
  for(let first=1;first<=4;first++)for(let second=1;second<=4;second++)assert.ok(tonePairs.some(pair=>pair.id===`${first}-${second}`));
  assert.equal(tonePairQuestions.length,8);
  tonePairQuestions.forEach(question=>assert.ok(question.choices.includes(question.answer)));
});

test('game mistakes are valid spaced-review records', () => {
  const mistake=createMistake({chapterId:'restaurant',prompt:'Which word means table?',answer:'菜单',correction:'桌子',explanation:'桌子 means table.',skill:'Vocabulary',source:'game',sourceKey:'meaning-hunter:table'},now);
  assert.equal(mistake.source,'game');
  assert.equal(mistake.correction,'桌子');
  assert.equal(dueMistakes([mistake],now).length,1);
});

test('library bank unifies HSK, Adventure, and personal saved words', () => {
  const hskWords=[{id:'hsk-table',h:'桌子',py:'zhuōzi',m:'table',pos:'n',r:'木',q:100,l:1}];
  const adventureWords=[{id:'passport',hanzi:'护照',pinyin:'hùzhào',english:'passport',chapter:'arrival'}];
  const personalWords=[{id:'personal-1',hanzi:'加油',pinyin:'jiāyóu',english:'keep going',createdAt:now.toISOString()}];
  const bank=buildLibraryBank({favoriteIds:['passport','hsk-table'],hskWords,adventureWords,personalWords});
  assert.deepEqual(libraryBankCounts(bank),{total:3,hsk:1,adventure:1,personal:1});
  assert.deepEqual(filterLibraryBank(bank,{source:'hsk',hsk:1}).map(word=>word.hanzi),['桌子']);
  assert.deepEqual(filterLibraryBank(bank,{source:'all',hsk:'all',query:'keep'}).map(word=>word.hanzi),['加油']);
});

test('again schedules a short retry and lowers mastery', () => {
  const next = scheduleReview(card, 'again', now);
  assert.equal(next.dueAt, '2026-08-24T00:10:00.000Z');
  assert.equal(next.mastery, 0);
});

test('easy schedules four days for a new card', () => {
  const next = scheduleReview(card, 'easy', now);
  assert.equal(next.intervalDays, 4);
  assert.equal(next.mastery, 25);
});

test('XP cannot be farmed twice from one activity on one day', () => {
  const first = awardXpOnce([], 'game:match:restaurant', 20, now);
  const repeat = awardXpOnce([first.key], 'game:match:restaurant', 20, now);
  assert.equal(first.xp, 20);
  assert.equal(repeat.xp, 0);
});

test('streak increments on the next calendar day and resets after a gap', () => {
  assert.equal(updateStreak('2026-08-23', 4, now).streak, 5);
  assert.equal(updateStreak('2026-08-20', 4, now).streak, 1);
});

test('two missed days are protected but three missed days require rescue', () => {
  assert.deepEqual(updateStreakWithGrace('2026-08-21', 8, now), { streak: 9, lastActiveDate: '2026-08-24', protectedByGrace: true });
  assert.deepEqual(streakGapStatus('2026-08-21', now), { missedDays: 2, needsRescue: false });
  assert.deepEqual(streakGapStatus('2026-08-20', now), { missedDays: 3, needsRescue: true });
});

test('player level exposes lifetime XP and exact progress to next level', () => {
  assert.deepEqual(getLevelProgress(2840), { level: 5, levelStartXp: 2500, nextLevelXp: 3500, earnedThisLevel: 340, requiredThisLevel: 1000, remainingXp: 660, progress: 34 });
});

test('one successful attempt remains cautious instead of implying ability', () => {
  const scores = calculateSkillScores([{ id: '1', type: 'review', skill: 'Vocabulary', correct: true, xp: 4, createdAt: now.toISOString() }]);
  assert.equal(scores.Vocabulary, 8);
  assert.equal(scores.Listening, 0);
});

function skillEvents(count: number, activeDays: number, correctRate = 1, types: LearningEvent['type'][] = ['review']): LearningEvent[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `skill-${count}-${activeDays}-${index}`,
    type: types[index % types.length],
    skill: 'Vocabulary',
    correct: index / count < correctRate,
    xp: 4,
    createdAt: new Date(now.getTime() - (index % activeDays) * 86_400_000).toISOString(),
  }));
}

test('a one-day practice burst cannot create a high skill rating', () => {
  const evidence = calculateSkillEvidence(skillEvents(20, 1), now).Vocabulary;
  assert.equal(evidence.activeDays, 1);
  assert.equal(evidence.activityTypes, 1);
  assert.ok(evidence.score < 20);
  assert.equal(evidence.status, 'Foundation');
});

test('skill rating requires accurate practice across days and activity types', () => {
  const narrow = calculateSkillEvidence(skillEvents(40, 1), now).Vocabulary;
  const sustained = calculateSkillEvidence(skillEvents(100, 60, .9, ['lesson', 'review', 'game', 'story']), now).Vocabulary;
  assert.equal(sustained.activeDays, 60);
  assert.equal(sustained.activityTypes, 4);
  assert.ok(sustained.score >= 80);
  assert.ok(sustained.score > narrow.score + 50);
});

test('accuracy and recent practice both constrain long-term skill evidence', () => {
  const strongEvents = skillEvents(100, 60, .9, ['lesson', 'review', 'game', 'story']);
  const lowAccuracy = calculateSkillEvidence(skillEvents(100, 60, .55, ['lesson', 'review', 'game', 'story']), now).Vocabulary;
  const current = calculateSkillEvidence(strongEvents, now).Vocabulary;
  const inactive = calculateSkillEvidence(strongEvents, new Date('2026-12-22T00:00:00Z')).Vocabulary;
  assert.ok(lowAccuracy.score < current.score);
  assert.ok(inactive.score < current.score);
  assert.ok(inactive.daysSincePractice >= 90);
});

function dailyPlan(minutes = 10, weakestSkill:LearningEvent['skill'] = 'Reading') {
  return buildDailySession({
    dayKey: '2026-08-25',
    dailyMinutes: minutes,
    hsk: 3,
    path: 'Computer Science',
    career: 'Software Developer',
    weakestSkill,
    chapter: adventureChapters[2],
    hskQuestions: hskStyleBanks[3],
    specializationQuestions: pathPacks['Computer Science'].gameQuestions,
  });
}

test('daily session length follows the learner goal without overloading them', () => {
  assert.equal(dailySessionQuestionCount(5), 5);
  assert.equal(dailySessionQuestionCount(10), 7);
  assert.equal(dailySessionQuestionCount(20), 9);
  assert.equal(dailySessionQuestionCount(30), 10);
  assert.equal(dailyPlan(5).questions.length, 5);
  assert.equal(dailyPlan(30).questions.length, 10);
});

test('daily session is deterministic, interleaved, and prioritizes weak evidence', () => {
  const plan = dailyPlan(10, 'Reading');
  assert.equal(plan.questions[0].kind, 'warmup');
  assert.equal(plan.questions[1].skill, 'Reading');
  assert.ok(plan.skillMix.length >= 4);
  assert.deepEqual(plan, dailyPlan(10, 'Reading'));
  for (const question of plan.questions) assert.ok(question.choices.includes(question.answer));
});

test('daily answers create one evidence event each and target incorrect words for review', () => {
  const plan = dailyPlan();
  const results = [
    { question: plan.questions[0], selected: 'wrong', correct: false },
    { question: plan.questions[1], selected: plan.questions[1].answer, correct: true },
  ];
  const events = createDailySessionEvents(results, now, 40);
  assert.equal(events.length, 2);
  assert.deepEqual(events.map(event => event.xp), [40, 0]);
  assert.deepEqual(events.map(event => event.correct), [false, true]);
  assert.deepEqual(dailySessionReviewWordIds(results), [plan.questions[0].reviewWordId]);
});

test('placement recommendation stays inside supported HSK 1–6', () => {
  assert.equal(recommendHsk([{ level: 1, correct: true }, { level: 2, correct: true }, { level: 3, correct: true }, { level: 4, correct: true }]), 5);
});

test('every HSK-style level has a valid question bank', () => {
  for (const level of [1, 2, 3, 4, 5, 6]) {
    assert.ok(hskStyleBanks[level].length >= 3);
    for (const question of hskStyleBanks[level]) assert.ok(question.choices.includes(question.answer));
  }
});

test('every HSK level has substantial playable course content',()=>{
  for(let level=1;level<=6;level++){
    const units=hskCourseUnits[level];
    assert.equal(units.length,2);
    assert.ok(hskStyleBanks[level].length>=7);
    for(const unit of units){
      assert.equal(unit.level,level);
      assert.equal(unit.vocabulary.length,5);
      assert.equal(unit.questions.length,2);
      assert.equal(unit.story.scenes.length,3);
      assert.ok(unit.grammar.example.length>3);
    }
  }
});

test('graded story library covers HSK 1 through 6 evenly',()=>{
  assert.equal(hskGradedStories.length,12);
  for(let level=1;level<=6;level++)assert.equal(hskGradedStories.filter(story=>story.hsk===level).length,2);
  assert.equal(new Set(hskGradedStories.map(story=>story.id)).size,hskGradedStories.length);
});

test('supplied textbook themes cover every advanced course-book lesson',()=>{
  assert.equal(completeTextbookStoryLibrary.length,111);
  assert.deepEqual([1,2,3,4,5,6].map(level=>completeTextbookStoryLibrary.filter(story=>story.hsk===level).length),[5,5,5,20,36,40]);
  assert.equal(completeCourseStoryCatalog.length,96);
  assert.deepEqual([4,5,6].flatMap(level=>(['上','下'] as const).map(volume=>completeCourseStoryCatalog.filter(story=>story.level===level&&story.volume===volume).length)),[10,10,18,18,20,20]);
  assert.equal(new Set(completeCourseStoryCatalog.map(story=>`${story.level}-${story.lesson}`)).size,96);
  for(const story of completeTextbookStoryLibrary){assert.equal(story.scenes.length,3);assert.ok(story.question.choices.includes(story.question.answer))}
});

test('interactive textbook and workbook bank covers every supplied HSK lesson',()=>{
  assert.equal(courseExerciseLessons.length,146);
  assert.equal(completeCourseExerciseBank.length,876);
  assert.deepEqual(courseExerciseCoverage(),[
    {level:1,lessons:15,questions:90},
    {level:2,lessons:15,questions:90},
    {level:3,lessons:20,questions:120},
    {level:4,lessons:20,questions:120},
    {level:5,lessons:36,questions:216},
    {level:6,lessons:40,questions:240},
  ]);
  assert.deepEqual([4,5,6].flatMap(level=>(['上','下'] as const).map(volume=>courseExerciseLessons.filter(lesson=>lesson.level===level&&lesson.volume===volume).length)),[10,10,18,18,20,20]);
  assert.equal(new Set(courseExerciseLessons.map(lesson=>lesson.id)).size,courseExerciseLessons.length);
  for(const lesson of courseExerciseLessons){
    assert.equal(lesson.questions.length,6);
    assert.deepEqual(new Set(lesson.questions.map(question=>question.kind)),new Set(['Vocabulary','Listening','Grammar','Sentence order','Reading','Context']));
    for(const question of lesson.questions){assert.ok(question.choices.includes(question.answer));assert.ok(question.explanation.length>12)}
  }
});

test('specialized Chinese paths cover graduate CS, AI, software, and data security',()=>{
  assert.deepEqual(specializedTracks.map(track=>track.id),['graduate-cs','ai-research','software-engineering','data-cyber']);
  for(const track of specializedTracks){assert.ok(track.words.length>=6);assert.ok(track.questions.length>=3);for(const question of track.questions)assert.ok(question.choices.includes(question.answer))}
});

test('adventure chapters and vocabulary IDs stay unique', () => {
  assert.equal(adventureChapters.length, 9);
  assert.equal(new Set(adventureChapters.map(chapter => chapter.id)).size, adventureChapters.length);
  const words = adventureChapters.flatMap(chapter => chapter.vocabulary);
  assert.equal(new Set(words.map(word => word.id)).size, words.length);
});

test('Vocabulary Network has switchable, substantial topic collections', () => {
  assert.deepEqual(vocabularyNetworkCategories.map(category=>category.id),adventureChapters.map(chapter=>chapter.id));
  assert.ok(vocabularyNetworkCategories.every(category=>category.words.length>=12));
  assert.equal(allNetworkVocabulary.length,108);
  assert.equal(new Set(allNetworkVocabulary.map(word=>word.id)).size,allNetworkVocabulary.length);
  for(const word of allNetworkVocabulary){assert.ok(word.hanzi);assert.ok(word.pinyin);assert.ok(word.english);assert.ok(word.example.hanzi);}
});

test('every Adventure chapter has reusable grammar, listening, and production content', () => {
  assert.deepEqual(Object.keys(chapterLearningPacks), adventureChapters.map(chapter => chapter.id));
  for (const chapter of adventureChapters) {
    const pack = chapterLearningPacks[chapter.id as keyof typeof chapterLearningPacks];
    assert.ok(pack.grammar.question.choices.includes(pack.grammar.question.answer));
    assert.ok(pack.listening.choices.includes(pack.listening.answer));
    assert.equal(pack.production.pieces.length, pack.production.target.length);
    assert.deepEqual([...pack.production.pieces].sort(), [...pack.production.target].sort());
  }
});

test('chapter stages save bounded progress and one evidence event per skill result', () => {
  assert.equal(chapterStageProgress(0), 17);
  assert.equal(chapterStageProgress(5), 100);
  assert.equal(chapterStageProgress(99), 100);
  const results:ChapterLessonResult[]=[
    {stage:'grammar',skill:'Grammar',correct:true,prompt:'Grammar?',answer:'A',correction:'A',explanation:'Because.'},
    {stage:'listening',skill:'Listening',correct:false,prompt:'Listen?',answer:'B',correction:'A',explanation:'Listen again.'},
    {stage:'production',skill:'Grammar',correct:true,prompt:'Build?',answer:'A',correction:'A',explanation:'Natural order.'},
    {stage:'application',skill:'Speaking',correct:true,prompt:'Respond?',answer:'A',correction:'A',explanation:'Natural response.'},
  ];
  const events=createChapterLessonEvents('restaurant',results,now,35);
  assert.equal(chapterAccuracy(results),75);
  assert.equal(events.length,5);
  assert.deepEqual(events.map(event=>event.xp),[35,0,0,0,0]);
  assert.deepEqual(events.map(event=>event.skill),['Vocabulary','Grammar','Listening','Grammar','Speaking']);
  assert.deepEqual(events.map(event=>event.correct),[true,true,false,true,true]);
});

test('personalized paths and stories have playable content', () => {
  for (const pack of Object.values(pathPacks)) {
    assert.ok(pack.careers.length >= 3);
    assert.ok(pack.words.length >= 8);
    for (const question of pack.gameQuestions) assert.ok(question.choices.includes(question.answer));
  }
  for (const story of storyLibrary) {
    assert.equal(story.scenes.length, 3);
    assert.ok(story.question.choices.includes(story.question.answer));
  }
});

test('HSK dictionary covers all six normalized level libraries', () => {
  const data = JSON.parse(readFileSync(new URL('../app/hsk-vocabulary.json', import.meta.url), 'utf8')) as HskDictionaryData;
  assert.deepEqual(data.levels.map(group => group.level), [1, 2, 3, 4, 5, 6]);
  assert.equal(data.levels.flatMap(group => group.words).length, 5363);
  assert.deepEqual(Object.values(data.meta.officialCumulativeCounts), [500, 1272, 2245, 3245, 4316, 5456]);
  for (const group of data.levels) assert.equal(new Set(group.words.map(word => word.id)).size, group.words.length);
});

test('HSK dictionary supports level-only, cumulative, search, and coverage views', () => {
  const data = JSON.parse(readFileSync(new URL('../app/hsk-vocabulary.json', import.meta.url), 'utf8')) as HskDictionaryData;
  const levelOne = selectHskWords(data, 1, 'new');
  const throughTwo = selectHskWords(data, 2, 'cumulative');
  assert.equal(levelOne.length, 506);
  assert.equal(throughTwo.length, 1256);
  const tea = searchHskWords(throughTwo, 'chá');
  assert.ok(tea.some(word => word.h === '茶'));
  assert.deepEqual(hskCoverage(levelOne, [levelOne[0].id]), { count: 1, total: 506, percent: 0 });
});

test('flashcard mastery requires repeated accurate recall', () => {
  let stat:FlashcardStat|undefined;
  stat=updateFlashcardStat(stat,'good',now);
  assert.equal(flashcardStatus(stat),'learning');
  stat=updateFlashcardStat(stat,'good',now);
  stat=updateFlashcardStat(stat,'good',now);
  assert.equal(flashcardStatus(stat),'mastered');
  stat=updateFlashcardStat(stat,'again',now);
  stat=updateFlashcardStat(stat,'again',now);
  assert.equal(flashcardStatus(stat),'learning');
});

test('flashcard ratings create distinct due dates and previews',()=>{
  const again=updateFlashcardStat(undefined,'again',now);
  const hard=updateFlashcardStat(undefined,'hard',now);
  const good=updateFlashcardStat(undefined,'good',now);
  const easy=updateFlashcardStat(undefined,'easy',now);
  assert.equal(again.dueAt,'2026-08-24T00:10:00.000Z');
  assert.equal(hard.intervalDays,1);
  assert.equal(good.intervalDays,1);
  assert.equal(easy.intervalDays,4);
  assert.equal(flashcardRatingPreview(undefined,'again'),'10 min');
  assert.equal(flashcardRatingPreview(undefined,'easy'),'4 days');
  assert.equal(isFlashcardDue(again,new Date('2026-08-24T00:09:59.000Z')),false);
  assert.equal(isFlashcardDue(again,new Date('2026-08-24T00:10:00.000Z')),true);
});

test('flashcard rounds stay inside an HSK category and prioritize learning cards', () => {
  const data=JSON.parse(readFileSync(new URL('../app/hsk-vocabulary.json',import.meta.url),'utf8')) as HskDictionaryData;
  for(const level of [1,2,3,4,5,6])assert.ok(selectHskWords(data,level,'new').every(word=>word.l===level));
  const words=selectHskWords(data,1,'new').slice(0,12);const stats:Record<string,FlashcardStat>={};
  stats[words[0].id]={seen:3,known:3,again:0,lastSeenAt:'2026-08-24T00:00:00.000Z',intervalDays:8,dueAt:'2026-08-30T00:00:00.000Z'};
  stats[words[1].id]={seen:1,known:0,again:1,lastSeenAt:'2026-08-23T00:00:00.000Z',intervalDays:0,dueAt:'2026-08-23T00:10:00.000Z'};
  const round=buildFlashcardRound(words,stats,10);
  assert.equal(round.length,10);
  assert.equal(round[0].id,words[1].id);
  assert.ok(round.every(word=>word.l===1));
  assert.ok(!round.some(word=>word.id===words[0].id));
});

test('local backup round-trips profile, progress, and voice settings', () => {
  const text=createLocalBackup({profile:{name:'Timmy',hsk:3},learning:{xp:42,favorites:['hsk1-1'],personalWords:[]},voice:{accent:'zh-CN',style:'female'}},new Date('2026-08-26T10:00:00.000Z'));
  const backup=parseLocalBackup(text);
  assert.equal(backup.format,'long-chinese-backup');
  assert.equal(backup.exportedAt,'2026-08-26T10:00:00.000Z');
  assert.equal(backup.profile.name,'Timmy');
  assert.equal(backup.learning.xp,42);
});

test('local backup rejects unrelated or damaged JSON', () => {
  assert.throws(()=>parseLocalBackup('{"hello":"world"}'),/not a supported/);
  assert.throws(()=>parseLocalBackup('{broken'),/not valid JSON/);
});

test('image lookup extracts Hanzi and prefers longer exact HSK words',()=>{
  const data=JSON.parse(readFileSync(new URL('../app/hsk-vocabulary.json',import.meta.url),'utf8')) as HskDictionaryData;
  const words=data.levels.flatMap(group=>group.words);
  assert.deepEqual(extractChineseSegments('Menu: 请看菜单。Good!'),['请看菜单']);
  assert.equal(normalizedChineseText('123 请看 菜单！'),'请看菜单');
  const matches=imageDictionaryMatches('请看菜单。',words,12);
  assert.ok(matches.some(word=>word.h==='菜单'));
  assert.ok(matches.findIndex(word=>word.h==='菜单')<matches.findIndex(word=>word.h==='单'));
  assert.equal(new Set(matches.map(word=>word.h)).size,matches.length);
});

test('pull-to-refresh dampens touch distance and requires a deliberate pull',()=>{
  assert.equal(dampedPullDistance(-20),0);
  assert.equal(dampedPullDistance(100),46);
  assert.equal(dampedPullDistance(1000),104);
  assert.equal(shouldTriggerPullRefresh(71),false);
  assert.equal(shouldTriggerPullRefresh(72),true);
  assert.equal(pullRefreshLabel(40),'Pull down to refresh');
  assert.equal(pullRefreshLabel(72),'Release to refresh');
  assert.equal(pullRefreshLabel(0,true),'Refreshing…');
});

test('daily quests scale review targets with the selected study duration',()=>{
  const short=buildQuestBoard({events:[],xpKeys:[],activityDates:[],dailyMinutes:5,now:new Date('2026-08-25T12:00:00')});
  const intensive=buildQuestBoard({events:[],xpKeys:[],activityDates:[],dailyMinutes:30,now:new Date('2026-08-25T12:00:00')});
  assert.equal(short.daily[1].target,3);
  assert.equal(intensive.daily[1].target,10);
  assert.equal(short.weekly.tasks[1].target,15);
  assert.equal(intensive.weekly.tasks[1].target,50);
});

test('quest completion comes from real learning events and daily session evidence',()=>{
  const date='2026-08-25T08:00:00.000Z';
  const events:LearningEvent[]=[
    ...Array.from({length:5},(_,index)=>({id:`review-${index}`,type:'review' as const,skill:'Vocabulary' as const,correct:true,xp:4,createdAt:new Date(Date.parse(date)+index).toISOString()})),
    {id:'game-1',type:'game',skill:'Grammar',correct:true,xp:20,createdAt:date},
  ];
  const board=buildQuestBoard({events,xpKeys:['2026-08-25:daily-session'],activityDates:['2026-08-25'],dailyMinutes:10,now:new Date('2026-08-25T12:00:00')});
  assert.ok(board.daily.every(quest=>quest.done));
  assert.equal(board.daily.reduce((sum,quest)=>sum+quest.rewardXp,0),50);
});

test('weekly challenge requires consistency across distinct learning dimensions',()=>{
  assert.equal(weekStartKey(new Date('2026-08-25T12:00:00')),'2026-08-24');
  const events:LearningEvent[]=[];
  for(let day=24;day<=27;day++)events.push({id:`lesson-${day}`,type:'lesson',skill:'Grammar',correct:true,xp:10,createdAt:`2026-08-${day}T08:00:00.000Z`});
  for(let index=0;index<25;index++)events.push({id:`review-week-${index}`,type:'review',skill:'Vocabulary',correct:true,xp:4,createdAt:`2026-08-${24+index%4}T09:00:00.000Z`});
  events.push({id:'game-week-1',type:'game',skill:'Grammar',correct:true,xp:20,createdAt:'2026-08-25T10:00:00.000Z'},{id:'game-week-2',type:'game',skill:'Grammar',correct:true,xp:20,createdAt:'2026-08-26T10:00:00.000Z'},{id:'story-week',type:'story',skill:'Reading',correct:true,xp:30,createdAt:'2026-08-27T11:00:00.000Z'});
  const board=buildQuestBoard({events,xpKeys:[],activityDates:['2026-08-24','2026-08-25','2026-08-26','2026-08-27'],dailyMinutes:10,now:new Date('2026-08-27T12:00:00')});
  assert.equal(board.weekly.progress,100);
  assert.equal(board.weekly.done,true);
});

test('player titles remain separate engagement milestones',()=>{
  assert.equal(playerTitle(1),'New Learner');
  assert.equal(playerTitle(5),'Word Hunter');
  assert.equal(playerTitle(20),'Chinese Speaker');
  assert.equal(playerTitle(50),'Mandarin Expert');
});

test('repeated errors merge into one stable mistake record',()=>{
  const input={chapterId:'restaurant',prompt:'I am a student.',answer:'我有学生。',correction:'我是学生。',explanation:'Use 是 for identity.',skill:'Grammar' as const,source:'lesson' as const,sourceKey:'restaurant:grammar'};
  const first=createMistake(input,now);
  const repeated=createMistake({...input,answer:'我学生。'},new Date('2026-08-25T00:00:00Z'));
  const merged=mergeMistakes([first],[repeated]);
  assert.equal(merged.length,1);
  assert.equal(merged[0].errorCount,2);
  assert.equal(merged[0].answer,'我学生。');
  assert.equal(merged[0].mastery,0);
});

test('mistake review schedules success across days and failure after ten minutes',()=>{
  const mistake=createMistake({chapterId:'hotel',prompt:'Choose reservation.',answer:'房间',correction:'预订',skill:'Vocabulary',source:'daily'},now);
  const correct=reviewMistake(mistake,true,now);
  const retry=reviewMistake(correct,false,now);
  assert.equal(correct.reviewIntervalDays,1);
  assert.equal(correct.reviewDueAt,'2026-08-25T00:00:00.000Z');
  assert.equal(correct.mastery,27);
  assert.equal(retry.reviewDueAt,'2026-08-24T00:10:00.000Z');
  assert.equal(retry.errorCount,2);
  assert.equal(dueMistakes([correct],now).length,0);
  assert.equal(dueMistakes([retry],new Date('2026-08-24T00:10:00.000Z')).length,1);
});

test('mistake mastery labels require repeated successful recovery',()=>{
  assert.equal(mistakeMasteryLabel(5),'New');
  assert.equal(mistakeMasteryLabel(25),'Familiar');
  assert.equal(mistakeMasteryLabel(70),'Strong');
  assert.equal(mistakeMasteryLabel(90),'Mastered');
});

test('voice matching never relabels an unknown voice as female or male',()=>{
  assert.equal(voiceStyleOf('Mystery Mandarin Voice'),'unknown');
  assert.equal(voiceStyleOf('Microsoft Xiaoxiao Online Natural'),'female');
  assert.equal(voiceStyleOf('Microsoft Yunxi Online Natural'),'male');
});

test('voice matching respects exact region and requested style',()=>{
  const voices=[{name:'Microsoft Xiaoxiao Online Natural',lang:'zh-CN',voiceURI:'female-cn'},{name:'Microsoft Yunxi Online Natural',lang:'zh-CN',voiceURI:'male-cn'},{name:'Mei-Jia',lang:'zh-TW',voiceURI:'female-tw'}];
  assert.equal(voicesForAccent(voices,'zh-TW').length,1);
  assert.equal(resolvePreferredVoice(voices,{accent:'zh-CN',style:'female'}).voice?.voiceURI,'female-cn');
  assert.equal(resolvePreferredVoice(voices,{accent:'zh-CN',style:'male'}).voice?.voiceURI,'male-cn');
});

test('an explicitly selected installed voice stays locked',()=>{
  const voices=[{name:'Microsoft Xiaoxiao Online Natural',lang:'zh-CN',voiceURI:'female-cn'},{name:'Microsoft Yunxi Online Natural',lang:'zh-CN',voiceURI:'male-cn'}];
  const resolved=resolvePreferredVoice(voices,{accent:'zh-CN',style:'female',voiceURI:'female-cn'});
  assert.equal(resolved.voice?.voiceURI,'female-cn');
  assert.equal(resolved.exact,true);
  assert.equal(resolved.verifiedStyle,true);
});

test('game center covers all eleven requested core game modes',()=>{
  assert.equal(coreGameIds.length,11);
  assert.equal(new Set(coreGameIds).size,11);
  for(const required of ['meaning-hunter','pinyin-challenge','tone-master','sentence-speedrun','hanzi-puzzle','flashcard-battle'])assert.ok(coreGameIds.includes(required as typeof coreGameIds[number]));
});

test('new choice games contain complete playable question banks',()=>{
  const banks=[meaningHunterQuestions,pinyinChallengeQuestions,toneMasterQuestions,sentenceSpeedrunQuestions,hanziPuzzleQuestions,flashcardBattleQuestions];
  for(const bank of banks){
    assert.ok(bank.length>=8);
    assert.equal(new Set(bank.map(question=>question.id)).size,bank.length);
    for(const question of bank){
      assert.ok(question.choices.length>=3);
      assert.ok(question.choices.includes(question.answer));
      assert.ok(question.explanation.length>=12);
    }
  }
});

test('Hanzi center teaches broad radical families and linked characters',()=>{
  assert.ok(radicalFamilies.length>=8);
  assert.ok(radicalFamilies.filter(family=>family.variant).length>=5);
  assert.ok(radicalFamilies.every(family=>family.characters.length>=3));
  assert.equal(new Set(radicalFamilies.map(family=>family.radical)).size,radicalFamilies.length);
});
