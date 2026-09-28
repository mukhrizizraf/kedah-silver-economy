# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this folder is

A Google Drive working folder, and also a git repo published to GitHub as `mukhrizizraf/kedah-silver-economy` (GitHub Pages serves `main` from the root), for a **UUM Scale-Up Research 2026** grant proposal: *Integrated Islamic Elderly Care Ecosystem: A Proof-of-Concept Study for Kedah State* (project leader Prof. Madya Dr. Shamzaeffa bt. Samsudin). It holds a static, multi-page, bilingual (English / Bahasa Melayu) pitch site, plus `dokumen/`, the source material. `dokumen/` contains the revised application form (23-page PDF), the response-to-reviewers table (5-page PDF), and the "Pilot-to-Policy Pathway" roadmap image (the WhatsApp JPEG).

There is no build, lint, or test tooling. To check a change, open `index.html` in a browser. The site uses classic `<script src>` tags on purpose, with no ES modules and no `fetch()`, so it works from `file://` as well as GitHub Pages. Keep it that way. Fonts come from Google Fonts and fall back to system fonts offline. `kedah_silver_economy_grant_dashboard.html` is now only a redirect to `index.html`. `kedah_silver_economy_grant_dashboard_v1_codex.html` is the original single-file version, kept for reference.

`.gitignore` keeps `dokumen/`, `OPEN_ITEMS.md`, the Codex backup and the redirect file off the public repo. Never commit the grant PDFs. `OPEN_ITEMS.md` lists figure checks the user will do later.

To verify a change without a browser session, use headless Chrome (`chrome.exe --headless=new --dump-dom` or `--screenshot`) on the `file:///` URL. Its window can't go narrower than about 500px, so check phone layouts by loading the page inside a 390px `<iframe>` in a scratch HTML file.

PDF page rendering (`pdftoppm`) is not installed on this machine. The 5-page reviewer response can be read directly. The 23-page application form needs a text extractor, or the user can supply the relevant pages.

The site's structure was modelled on the user's `mukhrizizraf/sefb_planner_code` repo: multi-page static HTML, one design-system CSS file, shared JS, and `body[data-page]`. It was deliberately made not to look like that repo, so don't copy its naming or visuals.

## Architecture

The six pages, in pitch order, are `index.html` (Overview / Latar belakang), `ecosystem.html` (How it works), `network.html` (Who can help), `scenario.html` (Try a case), `roadmap.html` (Plan & budget) and `evidence.html` (Sources). The file names are older than the labels; keep them, because links depend on them. Each page contains only its `<main>` content. The load order matters:

1. In `<head>`: an inline one-liner applies the saved `kse-theme` before paint, then `assets/css/kse.css` and `assets/js/kse-data.js` load.
2. `assets/js/kse-shell.js` must be the **first child of `<body>`**. It injects the top bar and drawer straight away (so there is no layout jump), using `K.PAGES`, which is the site map and the pitch order. On `DOMContentLoaded` it appends the footer pager and the tooltip, runs `KSE.pageInit[body.dataset.page]`, and then calls `K.applyLang()`.
3. At the end of `<body>`, `kse-viz.js` (charts) and `kse-pages.js` (the per-page inits) load.

Everything hangs off one global, `window.KSE` (`K`). Other things to know:

- **Rendering contract:** a page init binds its events once and pushes its render functions onto `K.onLang`. `K.applyLang()` runs those functions on load and on every EN/BM switch. Dynamic text must therefore use `K.L({en,bm})` or `K.T(en,bm)` at render time, never at init time.
- **Static i18n:** the English text lives in the HTML, and an element opts in with `data-i18n="key"`. On first run `applyLang` stores the English in `data-en`, and `K.bm[key]` (in `kse-data.js`) supplies the BM text. `applyLang` sets `textContent`, so a `data-i18n` element must contain text only. Wrap text in a `<span data-i18n>` when it sits beside an icon or a form control.
- **Data (`kse-data.js`):** it holds `records` (30 register entries), `types`/`typeOrder`, `status`/`statusOrder` (the `ring` radius drives the constellation), `schema`, `scenario` (profiles, needs, district adjustments, gaps, presets), `budget`, `reviews`/`reviewStatus` and `bm`. Filters match record fields by exact string, so `<option value>`s must equal `type`, `district` and `status` values.
- **Colour roles:** organisation types use the fixed categorical slots `--t1..5` on page surfaces and `--b1..5` on the dark band. They are assigned by `types[x].c` and never cycled. Evidence and review status use the reserved good/warn/neutral tokens and always come with a text label (`K.pill`). The dark theme is defined three times in `kse.css`: bare `:root`, the `prefers-color-scheme` block, and `[data-theme="dark"]`. Keep all three in sync.
- **Cross-page links:** constellation dots link to `network.html#r<index>`, which scrolls to that row and highlights it. Arrow keys move through `K.PAGES` except while focus is in a form control or a scroll container.
- **Scenario lab:** the logic in `K.pageInit.scenario` is the same as the original prototype's: coverage is clamped to 20–96%, the need and district adjustments apply, income under RM1,000 adds 6, and welfare with income over RM3,000 subtracts 8. The outputs are illustrative heuristics, not estimates, and the page says so.
- **Hard-coded figures in HTML:** the KPI strip on `index.html`, the `headstat` numbers on each page head, and the Gantt `grid-column` spans on `roadmap.html` (column 1 is the label, and month *n* is column *n+1*). The budget chart is generated from `KSE.budget`.

## Content rules

- **Write plainly.** The user asked for simple, direct words. Use short sentences and everyday vocabulary (around IELTS Band 6), and no em dashes. Say what a thing is ("Who can help", "Try a case"), not a clever name for it. This applies to both EN and BM.
- Keep the status labelling. The data values are `Verified` / `Candidate` / `Demo`, and they display as **Confirmed** / **To check** / **Example** (BM: Disahkan / Perlu disemak / Contoh). Only Confirmed records are source-backed. Never present To check or Example records as confirmed coverage (the site promises this in several places).
- Figures must trace back to `dokumen/`. The core facts are: 5 objectives mapped to 4 action-research phases (Objectives 4 and 5 both sit in Phase 4); 9 months, from 1 Nov 2026 to 31 Jul 2027; Objective 1 in M1–3, Objective 2 in M4–5, Objective 3 in M6–7, Objective 4 in M8, Objective 5 in M9; 8–10 Muslim older persons interviewed; 15–20 co-creation stakeholders; validation by content validity index (I-CVI, S-CVI/Ave) followed by a small-scale feasibility pilot focused on referral and coordination; RM30,000 total.
- Framing from the reviewer response: the framework is a *complementary, optional* Islamic institutional model that sits alongside national social protection. It does not replace it.

## Discrepancies to check against the application form

- **Expert panel size:** the reviewer response says "8–10" (executive summary) in one place and "10" (methodology) in another. The KPI strip shows 10, and the evidence page quotes both, because the source says both.
- **Budget:** the revision added a mandatory 3% RMC fee of RM874 under Vot 29000 while keeping the RM30,000 total. The grouped lines in `KSE.budget` (including "Other / admin RM300") may come from before that revision. A comment in `kse-data.js` flags this.
