// The Six As-Ifs, as a manga script — one panel per beat, three beats per
// simile (establish the loss, feel the holding, watch it go), framed by a
// prologue and a coda where all six losses meet at the same stall.
//
// This is data, not markup: every `art` spec is deliberately small enough to
// map onto a DOM snapshot that already exists in `main.ts`/`styles.css` (a
// dissolved sentence, a flipped card, a popped bubble, an evaporated drop, a
// slow-motion flash) — so a future renderer can reuse those classes verbatim
// instead of inventing new illustrations.

export const SIMILES = ["dream", "illusion", "bubble", "shadow", "dew", "lightning"] as const;
export type Simile = (typeof SIMILES)[number];

export type PanelKind = "cover" | "establish" | "beat" | "reveal" | "gather" | "turn" | "close";

export type ArtSpec =
  | { type: "cover" }
  | { type: "badge"; char: string }
  | { type: "dream"; state: "idle" | "dissolved" }
  | { type: "illusion"; flipped: boolean }
  | { type: "bubble"; scale: number; popped: boolean }
  | { type: "shadow" }
  | { type: "dew"; state: "forming" | "evaporated" }
  | { type: "lightning"; flash: "none" | "flash-slow" }
  | { type: "gather" }
  | { type: "sweep" };

export interface Panel {
  id: string;
  chapter: string;
  simile?: Simile;
  kind: PanelKind;
  speaker?: string;
  text: string;
  sfx?: string;
  art: ArtSpec;
  artAlt: string;
}

export const MANGA_SCRIPT: Panel[] = [
  {
    id: "p0",
    chapter: "Prologue",
    kind: "cover",
    text: "A market stall at the bend in the river, where six things get explained by losing them.",
    art: { type: "cover" },
    artAlt: "The characters six-ru, brushed large, above the title The Six As-Ifs.",
  },

  // 夢 · A Dream
  {
    id: "p1",
    chapter: "夢 · A Dream",
    simile: "dream",
    kind: "establish",
    text: "Before sunrise, a boy comes running — chasing a face he saw the night before.",
    art: { type: "badge", char: "夢" },
    artAlt: "A small circular badge with the character for dream.",
  },
  {
    id: "p2",
    chapter: "夢 · A Dream",
    simile: "dream",
    kind: "beat",
    speaker: "Boy",
    text: "My mother. Young again, laughing in a doorway that doesn't exist anymore. I had her back — just for a minute.",
    art: { type: "dream", state: "idle" },
    artAlt: "A sentence forming word by word: You are standing in a familiar room.",
  },
  {
    id: "p3",
    chapter: "夢 · A Dream",
    simile: "dream",
    kind: "reveal",
    speaker: "Old Woman",
    sfx: "...gone.",
    text: "The first as-if. A dream needed nothing from the waking world to feel complete — that's exactly why you can't carry it out of the room where you had it.",
    art: { type: "dream", state: "dissolved" },
    artAlt: "The sentence faded and blurred, dissolving into nothing.",
  },

  // 幻 · An Illusion
  {
    id: "p4",
    chapter: "幻 · An Illusion",
    simile: "illusion",
    kind: "establish",
    text: "A magician storms up next, certain his best trick has just been stolen from him.",
    art: { type: "badge", char: "幻" },
    artAlt: "A badge with the character for illusion.",
  },
  {
    id: "p5",
    chapter: "幻 · An Illusion",
    simile: "illusion",
    kind: "beat",
    speaker: "Magician",
    text: "The woman I sawed in half — whole again, bowing to applause from nowhere! Someone took it!",
    art: { type: "illusion", flipped: false },
    artAlt: "A card showing a solid-looking face, unflipped.",
  },
  {
    id: "p6",
    chapter: "幻 · An Illusion",
    simile: "illusion",
    kind: "reveal",
    speaker: "Old Woman",
    sfx: "FLIP.",
    text: "There was no woman in the box. It worked because nothing in it was what it looked like. Don't mourn a theft of something that was never there to own.",
    art: { type: "illusion", flipped: true },
    artAlt: "The same card flipped over: nothing on the other side.",
  },

  // 泡 · A Bubble
  {
    id: "p7",
    chapter: "泡 · A Bubble",
    simile: "bubble",
    kind: "establish",
    text: "A child blows soap through a ring and chases it the length of the square.",
    art: { type: "badge", char: "泡" },
    artAlt: "A badge with the character for bubble.",
  },
  {
    id: "p8",
    chapter: "泡 · A Bubble",
    simile: "bubble",
    kind: "beat",
    speaker: "Child",
    text: "Careful... careful...",
    art: { type: "bubble", scale: 0.85, popped: false },
    artAlt: "A soap bubble, nearly full size, still intact.",
  },
  {
    id: "p9",
    chapter: "泡 · A Bubble",
    simile: "bubble",
    kind: "reveal",
    speaker: "Old Woman",
    sfx: "POP.",
    text: "However carefully you held it, it was always going to end here. The catching was never the point — the arc was.",
    art: { type: "bubble", scale: 1, popped: true },
    artAlt: "The bubble, mid-pop, scattering to nothing.",
  },

  // 影 · A Shadow
  {
    id: "p10",
    chapter: "影 · A Shadow",
    simile: "shadow",
    kind: "establish",
    text: "A tall man is arguing with his own shadow, blaming it for following him everywhere he'd hoped to be alone.",
    art: { type: "badge", char: "影" },
    artAlt: "A badge with the character for shadow.",
  },
  {
    id: "p11",
    chapter: "影 · A Shadow",
    simile: "shadow",
    kind: "beat",
    speaker: "Man",
    text: "Cut yourself loose from me!",
    art: { type: "shadow" },
    artAlt: "A dark upright shape with a lit dot beside it, casting a low shadow.",
  },
  {
    id: "p12",
    chapter: "影 · A Shadow",
    simile: "shadow",
    kind: "reveal",
    speaker: "Old Woman",
    sfx: "—no lamp, no shadow.",
    text: "It has no shape of its own. It's only yours, minus you, thrown by a light that isn't yours either.",
    art: { type: "shadow" },
    artAlt: "The same shape and its shadow, unchanged.",
  },

  // 露 · Dew
  {
    id: "p13",
    chapter: "露 · Dew",
    simile: "dew",
    kind: "establish",
    text: "A farmer kneels in his field at first light, drinking dew from a leaf before the sun can take it.",
    art: { type: "badge", char: "露" },
    artAlt: "A badge with the character for dew.",
  },
  {
    id: "p14",
    chapter: "露 · Dew",
    simile: "dew",
    kind: "beat",
    speaker: "Farmer",
    text: "I do this every morning. I already know it won't stay.",
    art: { type: "dew", state: "forming" },
    artAlt: "A single drop, newly formed, catching the light.",
  },
  {
    id: "p15",
    chapter: "露 · Dew",
    simile: "dew",
    kind: "reveal",
    speaker: "Old Woman",
    sfx: "—already gone.",
    text: "Then you already understand this one. Dew doesn't fail by evaporating. Evaporating is the whole of what it was ever going to do.",
    art: { type: "dew", state: "evaporated" },
    artAlt: "The same stage, empty — the drop is gone.",
  },

  // 電 · Lightning
  {
    id: "p16",
    chapter: "電 · Lightning",
    simile: "lightning",
    kind: "establish",
    text: "A young scholar arrives drenched, describing one bolt that showed him the whole valley — gone before he could point.",
    art: { type: "badge", char: "電" },
    artAlt: "A badge with the character for lightning.",
  },
  {
    id: "p17",
    chapter: "電 · Lightning",
    simile: "lightning",
    kind: "beat",
    speaker: "Scholar",
    text: "I want to see it again. Slower, this time.",
    art: { type: "lightning", flash: "none" },
    artAlt: "A dark night sky, still, waiting.",
  },
  {
    id: "p18",
    chapter: "電 · Lightning",
    simile: "lightning",
    kind: "reveal",
    speaker: "Old Woman",
    sfx: "CRACK—",
    text: "This one doesn't do slow. Held any longer, it stops being lightning and becomes something else — worse for waking you up, better for staying asleep.",
    art: { type: "lightning", flash: "flash-slow" },
    artAlt: "The same sky, flashed white, stretched into slow motion.",
  },

  // Coda
  {
    id: "p19",
    chapter: "Coda",
    kind: "gather",
    text: "By evening, all six are standing at her stall — still arguing for their losses back.",
    art: { type: "gather" },
    artAlt: "Six small badges in a row: dream, illusion, bubble, shadow, dew, lightning.",
  },
  {
    id: "p20",
    chapter: "Coda",
    kind: "turn",
    speaker: "Old Woman",
    text: "None of you lost anything. Take away the causes, and there was never anything there to keep. That isn't a tragedy. It's just what conditioned means.",
    art: { type: "sweep" },
    artAlt: "An empty stall counter, swept clean.",
  },
  {
    id: "p21",
    chapter: "Coda",
    kind: "close",
    text: "She latches the stall, six coins richer, and doesn't look back — because whether they understood, too, was a thing arising from causes, and would pass, or wouldn't, on its own.",
    art: { type: "sweep" },
    artAlt: "The same empty counter, in fading light.",
  },
];
