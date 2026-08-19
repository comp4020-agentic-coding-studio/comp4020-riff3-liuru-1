# You are riffing on someone else's prototype

This repo is a copy of [`comp4020-ass1-liuru`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-liuru) at
`76bc9de7` --- liuru's crit agent's shipped prototype for `03-a1-retro`.
The copy is yours; their repo is untouched and off limits.

**The brief is to take this somewhere it hasn't been.** Not to restart it, not
to polish it, and not to finish the agent's to-do list. Read how they directed
the agent, find the thing the prototype implies but doesn't do, and build
that. You have the room's half-hour, so pick something you can get live.

**Nothing here is marked.** No cutoff, no reflection, no `PROCESS.md` entry,
no crit sweep, no repo of your own on the line. That is the point --- the
interesting move is the one you wouldn't risk in your own graded repo.

**What you show at the share-back** is the live site plus
`git diff riff-start`. Push early and keep `main` green.

**The agent's own spec tests are `spec/assignment-1.test.ts`.** They encode the crit brief,
not yours, and they gate the deploy --- a red check means no live site to show
at the share-back. If your riff moves past that brief, change them or delete
them; keep `spec/invariants.test.ts` green, since that one is true of any good
site.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Before you push, run `pnpm check`. It runs most of what CI runs --- build,
  lint, and the spec --- so you catch those in seconds instead of waiting for
  the pipeline. The links check, the evidence check, the secrets scan, and the
  deploy itself only run in CI; run `pnpm dlx linkinator ./dist --silent`
  locally against a fresh `pnpm build` for the links check without waiting for
  CI.
- To see what the page actually looks like rather than what you assume it looks
  like, open it in a browser (the `agent-browser` CLI, documented on
  [the course site](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/backpressure/#agent-browser-the-rendered-page-as-ground-truth),
  works well for this). The rendered page is the truth; your mental model of it
  isn't.
- When a check fails, read its output before changing anything. Each check below
  names what it measures, and the failure message is the instruction: it tells
  you the file, the line, or the contract. Treat a red check as authoritative
  --- the page is wrong until the check is green, not until you decide it should
  be.
- Commit when the checks pass. Never commit a red state.
- **Commit as you go.** Small, frequent commits are the record of how the work
  came together, and that record is read, not just the final state. A trail that
  grew alongside the code is the strongest evidence of your process; a single
  dump the night before is the weakest.

## Riff: manga/drama visual-storytelling stack

The riff direction: the six stations already *argue* impermanence (dream fools
you from inside, bubble pops regardless of care, etc.) but render it in flat
essay-style prose styling. The thing the prototype implies but doesn't do is
land each station's "it slipped away anyway" moment as a felt beat, the way
manga/comic panels use ink, halftone, and impact lines to make an instant hit
harder than a paragraph can. Stack chosen for that, evaluated but not yet
wired in (no `index.html`/`styles.css`/`main.ts` edits landed — only the
dependency is installed):

- **CSS only, no framework** --- the comic-panel look is entirely achievable
  with layered gradients and doesn't need a component library:
  - Halftone shading: layered `radial-gradient` dot patterns (small
    background-size, repeating) instead of a texture image --- stays crisp at
    both marked viewports and costs no asset/network request.
  - Speed lines / impact bursts: `repeating-conic-gradient` from a center
    point, radius-clipped, gives the radiating manga "impact" motif without
    SVG.
  - Panel borders: hard-offset `box-shadow` (no blur, e.g.
    `4px 4px 0 var(--ink)`) reads as ink-panel border/gutter, cheaper and
    crisper than a real drawn border-image.
  - SFX/onomatopoeia burst text: bold condensed type with a layered
    `text-shadow` stack for the outline, **not** `-webkit-text-stroke`
    (vendor-prefix-only, and stylelint here flags it) or an SVG stroke.
  - All of the above are purely additive (new classes, new decorative
    elements marked `aria-hidden="true"`) --- they don't touch any existing
    `id`, `data-testid`, `role`, or button `type`, so both spec files
    (`spec/invariants.test.ts` and `spec/assignment-1.test.ts`) should stay
    green without editing either.
- **`animejs@4.5.0`** (installed via `pnpm add animejs`) for the JS-driven
  impact beats (screen-shake on pop/strike, a burst-text animate-in) --- picked
  over CSS-only keyframes because several stations already compute state at
  runtime (bubble's random `popAt`, dream's random word swap) and the impact
  animation needs to fire from that same JS moment, not a fixed CSS delay.
  **v4's API is a breaking change from the v3 most tutorials still show**:
  - No default export / no global `anime()` callable. Import what you need:
    `import { animate } from "animejs"`. Core call is
    `animate(targets, parameters)` returning a `JSAnimation`.
  - Easing strings dropped the `ease` prefix and camelCase the rest: v3's
    `"easeOutExpo"` / `"easeInOutSine"` are now `"outExpo"` / `"inOutSine"`
    (composed from `{in,out,inOut,outIn}` + `{Quad,Cubic,Quart,Quint,Sine,
    Circ,Expo,Bounce,Back,Elastic}`, verified in
    `node_modules/animejs/dist/modules/easings/eases/parser.js`). The old
    v3-style `"easeOutExpo"` string is not recognized and resolves to no
    easing function found (not an error, just silently wrong motion) ---
    don't copy an easing string from a v3-era example without renaming it.
  - v4 also removed the old string syntax for `steps()`/`irregular()`/
    `linear()`/`cubicBezier()` --- passing those now logs a console warning
    and no-ops; import the replacement function from the `easings` submodule
    directly instead of building the string by hand.

Next actions for whoever (agent or human) picks this back up: land the CSS
design system in `styles.css`, add `aria-hidden` SFX-burst containers per
station in `index.html`, wire `animate()` calls into `main.ts`'s existing
per-station handlers (same call sites `tally()` already lives in), then
`pnpm check` and a real-browser pass before pushing.
