import { describe, expect, it } from "vitest";
import { MANGA_SCRIPT, SIMILES, type Panel } from "../manga-script";

// Structural contracts for the manga script: this riff's version of
// spec/assignment-1.test.ts, checking the *data* the reader will eventually
// render rather than a built page. It encodes the shape the story has to
// keep, not how a future renderer happens to draw it.

const BY_SIMILE = new Map<string, Panel[]>(
  SIMILES.map((simile) => [simile, MANGA_SCRIPT.filter((panel) => panel.simile === simile)]),
);

const OLD_WOMAN = "Old Woman";

const ESTABLISH_BADGE: Record<string, string> = {
  dream: "夢",
  illusion: "幻",
  bubble: "泡",
  shadow: "影",
  dew: "露",
  lightning: "電",
};

describe("the manga script", () => {
  it("has one panel per id, p0 through p21, with no gaps or repeats", () => {
    const ids = MANGA_SCRIPT.map((panel) => panel.id);
    expect(ids).toEqual(Array.from({ length: 22 }, (_, i) => `p${i}`));
  });

  it("opens on a cover panel and closes on a close panel", () => {
    expect(MANGA_SCRIPT[0]?.kind).toBe("cover");
    expect(MANGA_SCRIPT.at(-1)?.kind).toBe("close");
  });

  it("gives every one of the six similes exactly three panels", () => {
    for (const simile of SIMILES) {
      expect(BY_SIMILE.get(simile), simile).toHaveLength(3);
    }
  });

  it("walks each simile through establish, beat, then reveal, in that order", () => {
    for (const simile of SIMILES) {
      const kinds = BY_SIMILE.get(simile)?.map((panel) => panel.kind);
      expect(kinds, simile).toEqual(["establish", "beat", "reveal"]);
    }
  });

  it("never leaves a panel's text or illustration description blank", () => {
    for (const panel of MANGA_SCRIPT) {
      expect(panel.text.trim(), panel.id).not.toBe("");
      expect(panel.artAlt.trim(), panel.id).not.toBe("");
    }
  });

  it("only puts a speaker on panels that are actually spoken", () => {
    const narration = new Set(["cover", "establish", "gather", "close"]);
    const spoken = new Set(["beat", "reveal", "turn"]);
    for (const panel of MANGA_SCRIPT) {
      if (narration.has(panel.kind)) {
        expect(panel.speaker, panel.id).toBeUndefined();
      }
      if (spoken.has(panel.kind)) {
        expect(panel.speaker?.trim(), panel.id).toBeTruthy();
      }
    }
  });

  it("has the Old Woman, and only her, deliver every reveal and the coda's turn", () => {
    const explainers = MANGA_SCRIPT.filter((panel) => panel.kind === "reveal" || panel.kind === "turn");
    expect(explainers).toHaveLength(SIMILES.length + 1);
    for (const panel of explainers) {
      expect(panel.speaker, panel.id).toBe(OLD_WOMAN);
    }
  });

  it("opens each simile's establish panel on its own character, badged", () => {
    for (const simile of SIMILES) {
      const establish = BY_SIMILE.get(simile)?.[0];
      expect(establish?.art).toEqual({ type: "badge", char: ESTABLISH_BADGE[simile] });
    }
  });

  it("lets each reveal panel's art show the thing actually having gone", () => {
    const revealArt: Record<string, Panel["art"]> = {};
    for (const simile of SIMILES) {
      const reveal = BY_SIMILE.get(simile)?.[2];
      if (reveal) revealArt[simile] = reveal.art;
    }
    expect(revealArt.dream).toEqual({ type: "dream", state: "dissolved" });
    expect(revealArt.illusion).toEqual({ type: "illusion", flipped: true });
    expect(revealArt.bubble).toMatchObject({ type: "bubble", popped: true });
    expect(revealArt.shadow).toEqual({ type: "shadow" });
    expect(revealArt.dew).toEqual({ type: "dew", state: "evaporated" });
    expect(revealArt.lightning).toEqual({ type: "lightning", flash: "flash-slow" });
  });

  it("gives every reveal panel a short sound effect", () => {
    for (const simile of SIMILES) {
      const reveal = BY_SIMILE.get(simile)?.[2];
      expect(reveal?.sfx?.trim(), simile).toBeTruthy();
    }
  });
});
