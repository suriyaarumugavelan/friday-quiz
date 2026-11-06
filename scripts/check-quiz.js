// Run with: node scripts/check-quiz.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "quiz.js"), "utf8"), sandbox);
const { questions, acceptedThemes, passwordHash, passwordClue } = sandbox.window.QUIZ;

const problems = [];
questions.forEach((q, i) => {
  if (q.options.length !== 4) problems.push(`Question ${i + 1} needs 4 options`);
  if (new Set(q.options).size !== q.options.length) problems.push(`Question ${i + 1} has duplicate options`);
  if (!Number.isInteger(q.correct) || !q.options[q.correct]) problems.push(`Question ${i + 1} has no valid correct answer`);
});

if (!/^[0-9a-f]{64}$/.test(passwordHash || "") || !passwordClue) problems.push("Password hash or clue is missing");

const sorted = (s) => [...s].sort().join("");
const letters = questions.map((q) => q.letter).join("");
if (questions.length !== 10) problems.push("Expected 10 questions");
if (sorted(letters) !== sorted("RELAXATION")) problems.push(`Letters ${letters} do not make RELAXATION`);
if (letters === "RELAXATION") problems.push("Letters are not scrambled");
if (!acceptedThemes.includes("RELAXATION") || !acceptedThemes.includes("SELFCARE")) problems.push("Accepted themes are incomplete");

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`OK: ${questions.length} questions, letters ${letters}`);
