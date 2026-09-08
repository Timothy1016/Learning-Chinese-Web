import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app/product-polish.tsx", import.meta.url), "utf8");

test("HSK 6 companion covers both supplied course volumes", () => {
  const lessonBlock = source.slice(source.indexOf("export const hsk6Lessons"), source.indexOf("export const hsk6WorkbookQuestions"));
  for (let lesson = 1; lesson <= 40; lesson += 1) assert.match(lessonBlock, new RegExp(`\\[${lesson},`));
  assert.match(source, /Volume I · Lessons 1–20/);
  assert.match(source, /Volume II · Lessons 21–40/);
});

test("HSK 6 workbook practice has complete interactive questions", () => {
  assert.match(source, /Interactive workbook/);
  assert.match(source, /Reading comprehension/);
  assert.match(source, /Grammar notes/);
  assert.match(source, /Start HSK 6 mock exam/);
});
