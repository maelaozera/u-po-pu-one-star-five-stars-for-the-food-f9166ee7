// One Star, Five Stars for the Food
// Writes a single-sentence alien tourist review of Earth
// (one star, with a sincere compliment about the food)
// to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The review is built from labeled segments: each segment covers
// one beat of the alien tourist's complaint-then-compliment arc,
// and the builder joins them in order so the sentence stays easy
// to revise segment by segment.
type Segment = { label: string; text: string };

const segments: Segment[] = [
  { label: "rating-and-gripe", text: "One star: Earth charged me rent for gravity," },
  { label: "second-gripe", text: " the traffic sang in gridlock," },
  { label: "compliment-turn", text: " yet the street tacos made my third stomach weep with joy." },
];

function buildEntry(parts: Segment[]): string {
  // Concatenate the segment texts in declaration order; the leading
  // spaces inside each later segment keep the sentence flowing.
  return parts.map((part) => part.text).join("");
}

const entry = buildEntry(segments);

// Gate: the entry must be one sentence of 1-200 characters,
// not empty, with no newline inside it.
function validateSentence(candidate: string): void {
  if (candidate.trim().length === 0) {
    throw new Error("Entry must not be empty.");
  }
  if (candidate.length > 200) {
    throw new Error(
      `Entry is ${candidate.length} characters, over the 200 limit.`,
    );
  }
  if (candidate.includes("\n") || candidate.includes("\r")) {
    throw new Error("Entry must be a single sentence on one line.");
  }
  const sentenceEnders = (candidate.match(/[.!?]/g) ?? []).length;
  if (sentenceEnders !== 1 || !candidate.endsWith(".")) {
    throw new Error("Entry must be exactly one sentence ending in a period.");
  }
}

validateSentence(entry);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(join(OUTPUT_PATH), entry, "utf8");

console.log(`Wrote ${entry.length} characters to ${OUTPUT_PATH}`);
console.log(entry);
