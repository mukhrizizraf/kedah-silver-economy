# Codex Project Record

**Project:** Kedah Silver Economy static research dashboard and future elderly mobile app blueprint  
**Workspace:** `I:\My Drive\SILVER ECONOMY`  
**Current working line:** Codex Version 23 (the root workspace)  
**Record started:** 2026-10-02 (Asia/Kuala Lumpur)

## Operating boundary

- Work only in the root Codex Version 23 workspace: `I:\My Drive\SILVER ECONOMY`.
- **Never touch** `I:\My Drive\SILVER ECONOMY\claude-code-silver-app-version` from this point onward. Do not read, write, edit, move, delete, rename, format, or run scripts against anything inside that folder.
- That folder is a preserved Claude snapshot/reference owned by the user. It is intentionally outside the active Codex workstream.
- The root `CLAUDE.md` was moved into that protected folder at the user's request. Its new path is `claude-code-silver-app-version\CLAUDE.md`.
- Do not copy active Codex changes into the protected folder. Do not use it as a build target or test target.
- Root `codex.md` is the active handoff and change record. Read it before future Codex edits.

## Product context

This is a no-build, classic-script, bilingual English/Bahasa Melayu pitch site for the UUM Scale-Up Research Grant 2026 proposal: Integrated Islamic Elderly Care Ecosystem, a proof-of-concept study for Kedah State. The site is designed first for a review panel and later as the project site. It is also the blueprint for a future iOS and Android app for older people in Kedah.

The future app must keep an elderly-first approach: large readable type, strong contrast, clear Malay and English choices, touch targets of at least 44px, short steps, plain labels, visible back and home actions, minimal typing, screen-reader support, text scaling, forgiving forms, confirmation before submission, and useful feedback after every action.

## Conversation and edit history

### 1. Popup and page navigation

User reported that the "What this box does" popup would not disappear after clicking and that moving to the next page felt laggy and unsmooth.

Changes made in the root workspace:

- `assets/js/kse-pages.js`
  - Added explicit popup close state for the ecosystem matching card.
  - Popup can close by clicking the card again, pressing Escape, clicking outside, or leaving the card after it is closed.
  - Added focus handling so keyboard focus can reopen the explanation without the old `:focus` state trapping it open.
- `assets/css/kse.css`
  - Popup visibility now respects `.is-dismissed` and uses `:focus-visible` instead of the old persistent `:focus` behavior.
  - Removed the heavy manual ribbon/dust page transition and the delayed click interception.
  - Kept a short 340 ms destination-page entrance animation and disabled duplicate browser view-transition layers.
- `assets/js/kse-shell.js`
  - Removed the 160 ms delayed navigation interception and shortened the page-enter cleanup to match the lighter entrance.
- `DESIGN.md`
  - Updated the navigation and motion notes to describe immediate links, the short destination entrance, and dismissible ecosystem explanation.
- HTML asset query versions were updated to `20261002a` where needed so the root site can receive the fixes without stale cached CSS/JS.

### 2. Silver App flow stopped at the status screen

User reported that the mock app stopped at the screen shown as `5 / 5 - Application status` and could not continue.

Cause: screen 5 had only a reset action (`data-app-reset`), while screens 6-9 existed but had no reachable forward action from the main path.

Changes made:

- `app.html`
  - Status screen is now `6 / 10` and has a primary `Continue` button (`data-app-next`) plus a secondary `Start again` action.
  - Corrected the earlier screen labels to `2 / 10` through `5 / 10`.
  - Added `aria-live="polite"` to the screen container.
  - Replaced the decorative back `<span>` with a real 44px-friendly back `<button>`.
- `assets/js/kse-pages.js`
  - Back control is disabled on the first screen and enabled on later screens.
- `assets/js/kse-data.js`
  - Added BM translations for the new welcome and status actions.

### 3. Elderly-first Silver App welcome screen

User asked for the front screen to feel genuine and usable for older people, with a Pixar-like 3D image.

Changes made:

- Generated an original warm 3D animated family-film-style illustration of an older Malay woman using the app in a bright home. The prompt avoided logos, text, watermarks, distress, and clutter.
- Saved the compressed project asset at `assets/img/silver-app-welcome.webp`.
- `app.html`
  - Replaced the abstract SVG welcome mark with the new image.
  - Changed the welcome copy to "What would make today easier?"
  - Added large "Find help" and "I am helping someone" actions.
- `assets/css/kse.css`
  - Added image crop, large touch-friendly action styles, and a real back-button style.
- `assets/js/kse-data.js`
  - Added BM copy for the new welcome actions and status continuation.

## Validation completed

- Ran `node --check` on `kse-data.js`, `kse-shell.js`, `kse-viz.js`, and `kse-pages.js`.
- Ran `git diff --check` with no whitespace errors.
- Used Chrome CDP against the root `app.html` and confirmed:
  - Welcome image loaded with natural width 1024.
  - The mock app advances through screens `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`.
  - The final screen is reachable and has a reset action.
- Rendered and visually inspected the root app welcome screen. It shows the elderly illustration, large controls, clear copy, progress dots, and readable layout.

## "Try a case" ownership and blueprint priority

The user stated that the **Try a case** component is the most important structure because it is intended to support patent or copyright work and become the blueprint for the iOS and Android app.

This requirement is now part of the product record. Future work on `scenario.html`, the scenario controller in `assets/js/kse-pages.js`, and the scenario data in `assets/js/kse-data.js` must preserve and improve:

- A single, inspectable source of truth for the case state and score.
- Deterministic results: the breakdown, meter, suggested route, provider list, district comparison, and gaps must agree for the same inputs.
- Explicit input validation and clear handling for incomplete or private answers.
- A stable state model that can be ported to SwiftUI and Android Compose without depending on DOM state.
- Accessible controls, keyboard support, screen-reader labels, visible progress, back/next behavior, and a reset path.
- Clear separation between sample/demo logic and verified records.
- Testable fixtures for representative people, needs, districts, income bands, urgency, and edge cases.
- Versioned decision rules and a human-readable explanation of how each result was produced.
- No claim that the prototype itself grants patent or copyright protection. Legal filing and registrability must be reviewed by qualified IP counsel.

The hardening and improvement pass for "Try a case" was completed in the root workspace on 2026-10-02. Treat the versioned rules engine and reproducible case record as the canonical blueprint surface for future native app work.

### 4. Try a case blueprint hardening

- Added `assets/js/kse-case-engine.js`, a DOM-free rules module with one normalized state shape, deterministic scoring, route/provider resolution, stable case IDs, and rules version `2026.10.02`.
- Connected the scenario UI to the engine so the score breakdown, coverage meter, suggested path, provider list, district comparison, gap label, and route view all use the same resolved model.
- Added a reproducible case record with rules version, stable case ID, and a copyable plain-text summary. The free-text note is capped at 500 characters and is excluded from the case ID to avoid putting private notes into identifiers.
- Added explicit handling for “Prefer not to say” income. Unknown income does not receive an income adjustment and is not shown as a fake RM0 value.
- Added accessible wizard state: progressbar values, `aria-hidden` step panels, `aria-pressed` choice buttons, disabled first-step Back control, and live copy feedback.
- Kept provider links tied to the existing organisation records and statuses, while retaining clear sample/demo wording for unverified matching logic.
- Validated the engine with Node fixtures for stable IDs, unknown income, provider projection, and deterministic path/score output. Re-ran JavaScript syntax checks and `git diff --check`.

### 5. Codex handoff and protected Claude snapshot

User asked for a complete working record and a strict separation between the active Codex Version 23 workspace and the preserved Claude version.

- Created this root `codex.md` with the conversation history, edits, validation, product constraints, IP-related caution, and next-work notes.
- Moved the root `CLAUDE.md` to `claude-code-silver-app-version\CLAUDE.md`.
- The protected snapshot must not be touched by future Codex work.

## Active root files changed in this session

- `app.html`
- `assets/css/kse.css`
- `assets/js/kse-data.js`
- `assets/js/kse-pages.js`
- `assets/js/kse-case-engine.js`
- `assets/js/kse-shell.js`
- `DESIGN.md`
- `data.html`
- `ecosystem.html`
- `evidence.html`
- `index.html`
- `network.html`
- `roadmap.html`
- `scenario.html`
- `assets/img/silver-app-welcome.webp`

Committed as `b6ca007` (`Harden Try a case blueprint and record Codex history`) and pushed to `origin/main` after the validation pass.

### 6. Additional elderly illustrations

The user requested more elderly images as alternatives and additions to the current Silver App welcome art. Created three original portrait illustrations using the built-in imagegen tool and stored compact WebP copies in the root project:

- `assets/img/silver-app-welcome-man.webp` — older Malay man using a smartphone.
- `assets/img/silver-app-family-support.webp` — older Malay woman and adult daughter using the app together.
- `assets/img/silver-app-couple.webp` — older Malay couple using a smartphone together.

The existing `assets/img/silver-app-welcome.webp` remains the current app image. `assets/img/elderly-image-options.md` provides previews, suggested uses, alt text, and the generation prompts. The protected Claude folder was not accessed.

### 7. Dashboard illustration set

The user requested 20 additional 3D animated elderly illustrations for dashboard tabs and purposes. Created and stored all final WebP assets under `assets/img`:

- Welcome, family support, volunteer companion, community, mosque, welfare, health, transport, meals, home care, wellbeing, digital help, accessibility, family network, location matching, evidence, roadmap, and budget scenes.
- `assets/img/dashboard-image-options.md` maps every filename to a dashboard purpose and alt text.
- Each asset was verified as a readable 1254 × 1254 WebP file. No current app image was replaced, and the protected Claude folder was not accessed.

### 8. Dashboard image placement

The user asked for the new elderly illustrations to be injected into the dashboard where they fit. Added responsive galleries and one evidence feature card to the root dashboard pages:

- Overview: people and family scenes.
- How it works: volunteers, community, faith support and place matching.
- Who can help: welfare, health, transport, meals and home care.
- Try a case: wellbeing, digital help and accessible information.
- Plan & budget: roadmap planning and budget review.
- Sources: an evidence interview feature.

The galleries use the new WebP assets, descriptive alt text, responsive grids, reduced-motion-safe hover treatment, and Bahasa Melayu translations for their section headings and descriptions. CSS cache references were bumped to `20261002c` so the placements load after the earlier dashboard stylesheet.

### 9. Latest GitHub sync

The dashboard image placement work was committed as `2fcb4fa` (`Place elderly illustrations across dashboard tabs`) and pushed to `origin/main`. The root workspace is clean after the push. The protected `claude-code-silver-app-version` folder remains untouched.
