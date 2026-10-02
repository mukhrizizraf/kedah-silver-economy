---
name: Kedah Silver Economy
description: An evening field in paddy green and lamp gold, carrying a grant proposal that must read as fundable.
colors:
  paddy: "#12664f"
  paddy-ink: "#0d5a45"
  paddy-soft: "#dcebe3"
  on-paddy: "#ffffff"
  gold: "#d6a01e"
  gold-ink: "#7a5706"
  gold-soft: "#f5e8c4"
  on-gold: "#1f1703"
  band: "#0d2d26"
  band-ink: "#eef5f1"
  band-muted: "#a3bcb2"
  band-gold: "#e8bd4f"
  bg: "#edf1ee"
  surface: "#fbfcfb"
  surface-2: "#f3f6f4"
  sunk: "#e2e9e5"
  ink: "#0f231e"
  ink-2: "#3d5149"
  muted: "#57685f"
  line: "#d2dcd6"
  line-2: "#e2e9e5"
  good: "#0ca30c"
  good-ink: "#0b6b1f"
  good-soft: "#dff1df"
  warn: "#fab219"
  warn-ink: "#7a5200"
  warn-soft: "#fcf0d0"
  crit: "#d03b3b"
  neutral: "#9aa8a1"
  neutral-ink: "#4a5a53"
  neutral-soft: "#e5ebe8"
  type-1: "#2a78d6"
  type-2: "#eb6834"
  type-3: "#1baf7a"
  type-4: "#eda100"
  type-5: "#e87ba4"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(36px, 4.9vw, 62px)"
    fontWeight: 720
    lineHeight: 0.99
    letterSpacing: "-0.018em"
    fontVariation: "font-stretch 84%"
  headline:
    fontFamily: "Bricolage Grotesque, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(30px, 4vw, 50px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.015em"
    fontVariation: "font-stretch 86%"
  title:
    fontFamily: "Bricolage Grotesque, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(25px, 2.7vw, 34px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.012em"
    fontVariation: "font-stretch 88%"
  body:
    fontFamily: "Onest, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Onest, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.12em"
  figure:
    fontFamily: "Onest, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "40px"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  micro: "2px"
  bar: "5px"
  control: "9px"
  field: "10px"
  drawer-item: "12px"
  card: "18px"
  full: "999px"
spacing:
  gutter: "24px"
  card-pad: "24px"
  section: "56px"
  container: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.band-gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#f0c860"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.band-ink}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 36px 10px 12px"
  pill-confirmed:
    backgroundColor: "{colors.good-soft}"
    textColor: "{colors.good-ink}"
    rounded: "{rounded.full}"
    padding: "3px 9px 3px 7px"
  pill-tocheck:
    backgroundColor: "{colors.warn-soft}"
    textColor: "{colors.warn-ink}"
    rounded: "{rounded.full}"
    padding: "3px 9px 3px 7px"
  pill-example:
    backgroundColor: "{colors.neutral-soft}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.full}"
    padding: "3px 9px 3px 7px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.full}"
    padding: "4px 9px"
  preset-selected:
    backgroundColor: "{colors.paddy}"
    textColor: "{colors.on-paddy}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Design System: Kedah Silver Economy

## Overview

**Creative North Star: "The Evening Field"**

Dusk over padi. The deep green band is the field after the light has gone off it, and the gold is lamp light: warm, small, and deliberately rare. Kedah is Malaysia's rice bowl, and the palette comes from that land rather than from a template. But the site's job is to get a research grant approved, so the warmth is held under an institutional discipline. Nothing here should look casual to a panel that is deciding whether to spend RM30,000.

The system runs on two temperatures. Dark bands carry identity and argument: the hero, each page head, the coverage card. Light surfaces carry evidence: tables, cards, budget bars, the reviewer log. Moving between them is how the site changes register from "here is what we believe" to "here is what we can show you". Density is moderate and text-forward. Figures are large and set in the body face, never the display face, so a number reads as a measurement rather than a headline.

Colour is doing real work beyond decoration, and this is the part that must not be broken. Five fixed categorical slots name organisation types and never cycle. Three reserved status tokens carry Confirmed, To check and Example, and every one of them ships with a text label, because the honesty of those three states is the site's credibility and colour alone cannot be trusted to carry it.

**Key Characteristics:**
- Two-temperature structure: dark bands for argument, light surfaces for evidence
- Gold is rare by design and marks one thing per view
- Variable-width display type, tightly tracked, set against a plain body face
- Categorical colour is fixed and meaning-bearing, never decorative
- Every status colour is redundantly encoded with a word
- Flat and border-led today; moving toward more physical components

## Colors

A sober institutional palette drawn from agricultural sources: field green, harvest gold, and a wide neutral range that keeps documents readable in both themes.

### Primary
- **Paddy Green** (`#12664f`): The identity green. Interactive emphasis, selected states, the counter discs on numbered steps, and the "our model" layer on Figure 2. Its darker ink variant (`#0d5a45`) carries links and eyebrow labels where the plain green would fail contrast on light surfaces.
- **Field At Dusk** (`#0d2d26`): The band colour. Hero, all five page heads, the coverage card, and tooltips. It is the deepest surface in the system and the only place display type reaches full size.

### Secondary
- **Lamp Gold** (`#d6a01e`): Attention, and nothing else. The active nav underline, the primary button, the coverage meter fill, the centre of the organisation map, section labels. Its lifted variant (`#e8bd4f`) appears only on the band, where the base gold goes muddy.

### Tertiary
- **The Five Type Slots** (`#2a78d6`, `#eb6834`, `#1baf7a`, `#eda100`, `#e87ba4`): Fixed categorical identities for agencies, NGOs, masjids, care providers and volunteer groups. Each type owns its slot permanently. A parallel band-adapted set sits on dark surfaces where the page versions lose separation.

### Neutral
- **Paper** (`#edf1ee` page, `#fbfcfb` raised, `#f3f6f4` tinted, `#e2e9e5` sunk): Four steps of near-white with a green cast. Section alternation uses the tinted step rather than a border alone.
- **Field Ink** (`#0f231e` primary, `#3d5149` secondary, `#57685f` muted): Text, in three weights of presence. Never pure black.
- **Rules** (`#d2dcd6` structural, `#e2e9e5` internal): Two border weights. The heavier one separates components; the lighter one divides within them.

### Status
- **Confirmed Green** (`#0ca30c` dot, `#0b6b1f` text, `#dff1df` field): Backed by a source.
- **To Check Amber** (`#fab219` dot, `#7a5200` text, `#fcf0d0` field): Likely, not yet checked. Its dot is drawn half-filled.
- **Example Grey** (`#9aa8a1` dot, `#4a5a53` text, `#e5ebe8` field): Made up, to show the system. Its dot is drawn dashed.

### Named Rules

**The One Lamp Rule.** Gold marks a single most-important thing per view. The active page, the primary action, the current value. When two golds compete on one screen, one of them is wrong.

**The Fixed Slot Rule.** Organisation types own their colour permanently and are never reassigned by sort order, filter state, or how many happen to be visible. A type's colour is part of its name.

**The Never Colour Alone Rule.** Every status carries a dot shape, a background, and a word. A reader who cannot separate the green from the amber must still get Confirmed from Example, and a printed page in greyscale must still be honest.

**The Two Temperature Rule.** Dark bands make claims; light surfaces show evidence. A number that a reviewer is meant to check belongs on paper, not on the band.

## Typography

**Display Font:** Bricolage Grotesque (with Arial Narrow, then system-ui)
**Body Font:** Onest (with system-ui, Segoe UI, Roboto)

**Character:** A variable-width grotesque set narrow and tight against a plain, generous body face. The display face compresses to 84% width at hero size, which lets long bilingual headings hold a line without shrinking. Onest does the opposite job: neutral, even in colour, and equally at home in English and Bahasa Melayu.

### Hierarchy
- **Display** (720, `clamp(36px, 4.9vw, 62px)`, 0.99, width 84%): Hero only, once per site, capped near 13 characters a line.
- **Headline** (700, `clamp(30px, 4vw, 50px)`, 1.02, width 86%): The five page heads. Capped near 22 characters a line.
- **Title** (650, `clamp(25px, 2.7vw, 34px)`, 1.08, width 88%): Section headings.
- **Subtitle** (620, 19px, 1.2, width 92%): Card and panel headings.
- **Body** (400, 15px, 1.55): All running text. Lede paragraphs run 17px against a 56ch measure; section intros hold 54ch.
- **Label** (600, 11px, 0.12em, uppercase): Eyebrows in paddy ink, section labels in gold ink, field labels in muted.
- **Figure** (650, 32–40px, tabular): Large numbers, set in the **body** face.

### Named Rules

**The Numbers Are Not Headlines Rule.** Every figure, KPI, headstat, budget amount and coverage score is set in Onest, not Bricolage. Display type argues; body type measures. Numbers are evidence, so they take the measuring face.

**The Bilingual Measure Rule.** Bahasa Melayu runs roughly 15–20% longer than English for the same content. Every heading cap, nav width and button label must hold at BM length. This is why the navigation collapses to a drawer at 1260px and not at a smaller, tidier number.

## Layout

A single centred container at 1240px with 24px gutters. Sections are 56px tall in the block direction and separated by a rule, or by a tinted background where the change of subject is larger.

Page structure is fixed: a sticky translucent top bar, then a dark band carrying the page head and its single headline statistic, then light content sections, then a two-up pager, then the footer. Every inner page follows it, which is what makes arrow-key navigation feel continuous in a live presentation.

Content grids are asymmetric and content-led rather than a uniform column count: the hero splits 1 / 1.02, the organisation page splits 1.5 / 1, the case panel runs 1.05 / 1 / 1. The KPI strip deliberately overlaps the band above it by 44px, which is the one place the two temperatures touch.

Breakpoints step at 1260, 1080, 960, 760, 620 and 520px, with a final pass at 420. The 1260 step is a content decision, not a device one: it is where the Bahasa Melayu navigation stops fitting. Wide tables and the Gantt chart scroll horizontally inside their own containers rather than forcing the page to.

### Signature layouts
- **Results on the time axis (Overview):** the nine months as a ruler, one node on each result's due month, and a curved leader from the node down to that result's column. The columns stay even for reading, while the axis stays true to time, which shows the plan is back-loaded (three of five results land in the last three months). Hovering a result lights its leader and node in gold. Below 1080px the axis hides and the results become a ruled two-column list.
- **Ruled figures:** big numbers in Onest at 44px, divided by vertical hairlines under one top rule, with no boxes.
- **Ticked index:** national and state plans as a two-column ruled list, each with a drawn paddy tick, because each one was ticked in the application form.

### Entrance
One authored moment per page: the page head settles in from top to bottom, with a 10px rise and 60ms steps (whole cascade under 200ms, 560ms each), on the signature curve. Nothing else on the page enters. Skipped under reduced motion.

## Elevation & Depth

**The system is flat today.** Depth comes from tonal layering, not shadow: four steps of near-white (`sunk` → `bg` → `surface-2` → `surface`) and two border weights do nearly all the work. One soft shadow token exists and is used sparingly, mainly to lift the KPI strip where it crosses the band.

This is where the chosen direction and the shipped code differ, and the difference is deliberate rather than an oversight to be silently fixed. The direction is **tactile and confident**: components should gain physical presence, buttons should feel pressable, and state changes should be more definite. The current implementation is quieter than that. Treat the shadow vocabulary below as the floor to build up from, and move components toward presence as they are touched, rather than in one sweep that would flatten the distinction between the two temperatures.

### Shadow Vocabulary
- **Ambient lift** (`0 1px 2px rgba(15,35,30,.06), 0 6px 14px -4px rgba(15,35,30,.1)`): A two-part shadow, one contact and one short lift. Kept tight on purpose: a hairline border with a wide soft blur is a generated-UI tell. Used where a surface genuinely floats above another, not as a default card treatment.
- **Drawer** (`-20px 0 40px rgba(0,0,0,.15)`): Directional, for the slide-in navigation only.

### Named Rules

**The Earn The Lift Rule.** A shadow means an element is genuinely above the page: an overlay, a crossing element, a raised control. Cards sitting in a grid are not above anything. Borders are the default; lift is the exception that has to be justified.

## Shapes

Cards, bands and large panels take 18px, which is the system's signature and generous enough to read as soft at size. Form controls take 10px, tight enough to feel precise under a finger. Drawer items take 12px. Everything that behaves as a token, a pill, a chip or a button is fully round at 999px.

Below those sits a micro band, 1px to 9px, for things too small to carry a component radius: meter caps and progress bars (5px), legend dots and tick marks, keyboard hints, the small rules under a chart. **The rule is proportional, not fixed:** a radius near half the element's height reads as a rounded cap, and anything larger looks like a mistake. These values are part of the system, not drift from it.

The distinction is behavioural, not decorative. **Round means a value; cornered means a container.** A status pill, a filter chip, a preset and a language toggle are all round because each one is a single value you can read or pick. A card, a table or a panel is cornered because it holds things.

The brand mark follows the same logic: a square, the same square rotated 45 degrees, and a filled centre. That eight-pointed figure repeats at 7% opacity as the band's background texture, which is where the dark surfaces get their faint pattern.

## Components

**Philosophy: tactile and confident.** Components should feel like objects with weight, and a press or a hover should be unmistakable. Buttons, tabs, the pager and the page cards now carry that; cards sitting in a grid stay flat.

### Buttons
Tactile: a lit top edge, a short neutral shadow, a 1px lift on hover and a 1px press on click.
- **Shape:** Fully round (999px), 46px tall, 650 weight at 14.5px.
- **Primary (on the band):** Lamp gold with near-black text. The arrow sits in its own dark round chip at the right end and steps 3px forward on hover.
- **Primary (on paper):** Paddy green with white text, the same chip in white at 16%.
- **Ghost:** A hairline band border and a faint fill, used beside the primary on dark surfaces only. It may lead with a page icon in band gold.
- **Focus:** Band gold outline on dark, paddy on light, always 2px at 2px offset.

**The Neutral Shadow Rule.** Shadows under buttons and cards are dark and neutral, never tinted with the button's colour. A gold or green glow under a control is the generated-UI look this site refuses.

### Pills
The site's most important component. A dot, a word, and a soft field, fully round.
- **Confirmed:** Solid dot, green field.
- **To check:** Half-filled dot (a 50% linear gradient inside a ring), amber field.
- **Example:** Dashed ring, grey field.
- **Never** render a pill as a bare colour without its word.

### Cards
**The Earned Box Rule.** A box is for a collection of like things a reader compares or clicks: people, pages, data lists. A sequence goes on its real axis, a set of figures goes in a ruled row, and a reference list goes in a ruled index. Same-size card grids used as page structure are the generated-UI tell this site removed.
- **Corner:** 18px.
- **Background:** Raised surface on page, tinted surface inside tinted sections.
- **Border:** 1px structural rule. No shadow by default.
- **Padding:** 24px.

### Inputs and Selects
- **Style:** Raised surface, 1px structural border, 10px corner, 14px text.
- **Select:** Native chevron suppressed, replaced with a CSS caret at 14px from the right.
- **Currency:** A muted RM prefix sits inside the field; the input carries tabular figures.
- **Hover:** Border shifts to muted. **Direction:** focus deserves more than the default ring.

### Chips and Presets
- Round, 600 weight, on a raised surface with a structural border.
- **Presets** are a pressed-state control: `aria-pressed="true"` fills with paddy green and white.

### Navigation
- **Two rows.** A brand bar (logo, EN/BM, theme) that scrolls away, and a tab bar that sticks to the top of the screen. The tabs got their own row so every Bahasa Melayu label fits without collapsing to a menu.
- **Tabs:** a page icon and a label, 600 at 13.5px, 38px tall with a 10px corner. Muted at rest; a tinted field on hover; the current tab takes a paddy-soft field in paddy ink.
- **The marker:** one 2px gold bar under the current tab, sitting on the bar's bottom edge. It appears with the destination page as navigation completes.
- **Phones (760px and below):** the tab bar hides, the brand bar sticks, and a menu button opens the right-hand drawer. The drawer repeats the pitch order with each page's icon, number, label and one-line description.

### Page Icons
One drawn icon per page, the same six everywhere: tabs, drawer, page heads, pager, overview cards and buttons. Line icons on a 24px grid, 1.7px round stroke, `currentColor`, no fills except the slider knobs.
- **Each icon moves in its own way, and the motion says what the page does:** the compass finds its bearing, the match turns, a second person joins, the sliders move, the plan gets ticked, the lines of a source get written.
- **When it moves:** on hover or keyboard focus of whatever holds it. The page head draws its icon in once, on load, in a 38px gold tile beside the page number.
- **Motion grammar:** Corporate. One easing curve, `cubic-bezier(.2,0,0,1)`, for 80% of motion; 150ms for hover and press, about 260ms for state, 520ms for an icon playing through. No overshoot. All of it stops under `prefers-reduced-motion`, and the icons are complete at rest, so nothing depends on the motion.

### The Organisation Map
The signature component. Concentric rings place organisations by how checked they are: Confirmed nearest the centre, then To check, then Example, with an older person at the middle in gold. Dots take their fill from their type slot, are half-tinted when To check and hollow-dashed when Example. Each dot is a keyboard-reachable node that links through to its row. It is the single clearest statement the site makes: the further from the centre, the less we can vouch for it.

The centre now uses a transparent 3D animated elder avatar (`assets/img/elder-motion/`) inside the gold hub. The character is a clearly illustrated, non-photoreal elder rather than a real-person portrait. Eight subtle key frames create a gentle welcome loop, with a small float and hover response, without competing with the evidence rings. The avatar links to the scenario page, making the person served by the network the entry point for trying a case. The motion stops under reduced-motion preferences.

The overview opens with a wider scene before the evidence map: an illustrated elderly Malay Muslim couple on a teal couch in a Kedah kampung home (`assets/img/kampung-elder-couple-socks.png`). The woman wears cream socks. The scene carries a slow camera breath, warm light drift and restrained pointer parallax; the copy and actions remain HTML above the image so the pitch stays readable, bilingual and keyboard reachable. The map follows as the evidence layer rather than competing with the first human moment.

Page links navigate immediately, and the destination content settles in over 420 ms from the first paint: a small 12px rise with a near-zero scale settle on the corporate ease curve. The shell starts this as soon as it runs rather than waiting for DOMContentLoaded, so a tap never appears to pause before the next page responds. The entrance is removed under reduced motion. On How it works, the three input nodes enter in a stagger and the matching box accepts hover, focus and click to reveal a floating explanation. A click, Escape, or a click elsewhere can dismiss it.

### The Coverage Meter
A 10px gold bar on the dark card, growing to its value over 0.35s by clip-path rather than width, so its round cap survives and nothing reflows. Its scale is ticked 0 to 100 beneath. It always ships beside a "Sample data only" mark, because the number behind it is invented.

## Do's and Don'ts

### Do:
- **Do** set every number in Onest, never in Bricolage Grotesque.
- **Do** ship a word with every status colour, in both languages.
- **Do** keep gold to one thing per view.
- **Do** test headings, nav items and buttons at Bahasa Melayu length before calling a layout done.
- **Do** update all three dark-theme blocks together (bare `:root`, the `prefers-color-scheme` block, and `[data-theme="dark"]`). They are defined three times and drift silently.
- **Do** use the tinted surface for section alternation when the subject changes substantially.
- **Do** let wide tables and the Gantt scroll inside their own containers.

### Don't:
- **Don't** reassign the five type colours by sort order, filter state or count. The slot is part of the type's identity.
- **Don't** put a shadow on a card that is sitting in a grid. Borders are the default.
- **Don't** let an Example or To check record render with Confirmed styling, in any view, including charts, maps and print.
- **Don't** introduce a third font.
- **Don't** add a colour outside the token set for a one-off. If something needs emphasis and gold is taken, the layout is wrong.
- **Don't** put a figure a reviewer is meant to verify on a dark band. Evidence belongs on paper-coloured surfaces.
- **Don't** copy the visual language of `sefb_planner_code`. Its architecture is the reference; its appearance is a confirmed anti-reference.
