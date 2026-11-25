// One Star, Five Stars for the Food
// Writes a single-sentence alien tourist review of Earth
// (one star, with a sincere compliment about the food)
// to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The review, assembled from short fragments so every word
// earns its place and the sentence stays easy to revise.
const opening =
  "One star: Earth charged me rent for gravity,";
const middle =
  " the traffic sang in gridlock,";
const turn =
  " yet the street tacos made my third stomach weep with joy.";

const entry = opening + middle + turn;

// Gate: the entry must be one sentence of 1-200 characters,
// not empty, with no newline inside it.
if (entry.trim().length === 0) {
  throw new Error("Entry must not be empty.");
}
if (entry.length > 200) {
  throw new Error(
    `Entry is ${entry.length} characters, over the 200 limit.`,
  );
}
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("Entry must be a single sentence on one line.");
}
const sentenceEnders = (entry.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !entry.endsWith(".")) {
  throw new Error("Entry must be exactly one sentence ending in a period.");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(join(OUTPUT_PATH), entry, "utf8");

console.log(`Wrote ${entry.length} characters to ${OUTPUT_PATH}`);
console.log(entry);
