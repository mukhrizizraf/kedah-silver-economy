# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: the UUM Scale-Up Research Grant 2026 review panel.** Academics and evaluators who score the proposal. Their job is to judge whether the method is sound, the 9 months are feasible, the RM30,000 is justified, and the claims are backed by something. They have already reviewed one round and returned 11 written comments, so they arrive knowing the proposal and looking for what changed.

**Secondary: partner organisations.** MAIK, PERKIM, WANIDA, JKM and the waqf side. They see the site during partner meetings. Their question is different from the panel's: what is my role, what does joining cost me, and is this real.

The people the project serves, Muslim older persons in Kedah, are the subject of the site, not its users.

## Product Purpose

A pitch site for the grant proposal *Integrated Islamic Elderly Care Ecosystem: A Proof-of-Concept Study for Kedah State* (project leader Prof. Madya Dr. Shamzaeffa binti Samsudin, SEFB, UUM).

It exists to win the grant. Success is the panel approving the proposal, and partner agencies agreeing to take part.

After the decision it becomes the project's working site for the 9 months from 1 Nov 2026. Sample and example records are replaced by real findings as Phases 1 to 4 complete. So the site is not a one-off artefact: the structure has to survive its own data being swapped out.

## Positioning

Help for older people in Kedah already exists, but no one has linked it. Agencies, Islamic bodies, health services and volunteers each handle their own part, and people fall through the gaps between them.

The mechanism a neighbouring proposal could not truthfully copy: this is the first study of joined-up elderly care in Kedah, and it routes help through Islamic social finance (zakat, waqf, baitulmal, sadaqah) as an **optional** layer that adds to national social protection. It does not replace it. That framing is load-bearing and appears in Figure 2 of the application and in the reply to reviewers.

## Operating Context

Two modes, both real:

1. **Presented live.** The team walks the panel through it on a shared screen, talking over it. Pages are in pitch order and arrow keys move between them.
2. **Sent as a link afterwards.** The panel opens it alone with no one explaining. Every page has to answer the obvious objection unprompted.

The second mode is the harder constraint and the one to design against. Anything that only makes sense with a person narrating is a defect.

It runs from GitHub Pages and from `file://`, so it works from a USB stick or a laptop with no network.

## Capabilities and Constraints

- Six pages in pitch order: Overview, How it works, Who can help, Try a case, Plan & budget, Sources.
- Bilingual English and Bahasa Melayu throughout, switchable, remembered per browser. Light and dark themes, likewise.
- **No build step, on purpose.** Classic `<script src>` tags, no ES modules, no `fetch()`, so it runs from `file://`. Fonts come from Google Fonts and fall back to system fonts offline. This is a deliberate constraint, not tech debt.
- The organisation list is a 30-record **sample**, not a survey. Only 5 are Confirmed.
- The "Try a case" coverage score is invented sample logic to show how matching would work. It is not an estimate and must never read as one.
- Hard-coded figures exist in the HTML (the Overview KPI strip, each page's headstat, the Gantt column spans) and do not update when data changes.

**Terminology.** Three record states, used site-wide, each always shown with a text label:

| Data value | Shown as (EN) | Shown as (BM) | Means |
| --- | --- | --- | --- |
| `Verified` | Confirmed | Disahkan | Backed by a source |
| `Candidate` | To check | Perlu disemak | Likely, not yet checked |
| `Demo` | Example | Contoh | Made up, to show the system |

**Undecided:** whether the waqf governance expert may be named publicly. Until she confirms, she appears by role only.

## Brand Commitments

- **Plain, direct words.** Short sentences, everyday vocabulary at roughly IELTS Band 6. No em dashes. Things are named for what they are: "Who can help", "Try a case". Applies equally to English and Bahasa Melayu.
- Never publish IC numbers, staff IDs, phone numbers, or the grant PDFs.
- The site is public. Treat everything on it as readable by anyone.
- Official project title, dates, budget and team come from the 23-page revised application form and are not to be reworded for effect.

## Evidence on Hand

- **The 23-page revised application form** (28 Sep 2026) is the authority. Where it disagrees with the reply table or the roadmap image, the form wins.
- **The reply to reviewers**, 5 pages, 11 comments: 9 done, 1 in progress, 1 deferred to the design workshop.
- **The pilot-to-policy roadmap image.**
- Four earlier studies by the team covering over 2,900 people (PBIT 2020, FRGS 2018, UUM 2013, and a 2026 takaful industry report).
- Signed letters of intent from PERKIM, WANIDA and the waqf expert. MAIK is in talks, with a meeting set for October 2026.

All three source documents are kept out of the public repository.

**Absences future work must not fabricate:** there is no fieldwork data yet, no real coverage statistics for Kedah, no confirmed count of organisations beyond the 5, and no outcome from the MAIK meeting. Phase 1 is what produces the first of these.

## Product Principles

1. **Never dress an unchecked thing as a checked one.** The Confirmed / To check / Example system is the site's credibility. Anything that blurs it costs more than it gains.
2. **Show the working.** The panel is judging method. Reasoning made visible beats a confident number.
3. **It has to stand alone.** Written for the reviewer reading it at 11pm with nobody to ask.
4. **The data will be replaced.** Sample records become real findings over the 9 months. Design for the swap.
5. **Plain words, both languages.** Simplicity is a commitment to the reader, not a limitation.

## Accessibility & Inclusion

No institutional standard has been stated. Existing practice in the code sets the floor: a skip link, `aria-live` on values that change, text labels on every status colour rather than colour alone, and `prefers-reduced-motion` and print styles honoured. Bilingual EN/BM is an inclusion requirement, not a feature.
