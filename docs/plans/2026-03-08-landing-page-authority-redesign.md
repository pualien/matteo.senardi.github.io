# Landing Page Authority Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework the static landing page into a bilingual executive authority page that foregrounds leadership impact and uses open-source work as supporting proof.

**Architecture:** Keep the current single-page static architecture and implement the redesign by editing `index.html`, `static/css/site.css`, and `static/js/site.js`, then rebuild the minified assets with `make build`. Add a lightweight `node --test` regression file that checks the new structural hooks and bilingual copy wiring before running visual verification with `@playwright`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner, esbuild via `make build`, Playwright CLI

---

**Required execution skills:** `@test-driven-development`, `@playwright`, `@verification-before-completion`

### Task 1: Add a regression harness for the new authority-page structure

**Files:**
- Create: `tests/landing-page-authority.test.mjs`
- Modify: `index.html:151-390`
- Modify: `static/js/site.js:125-360`

**Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (file) => readFileSync(resolve(process.cwd(), file), 'utf8');

test('homepage exposes authority-page structure hooks', () => {
    const html = read('index.html');

    assert.match(html, /class="hero__grid"/);
    assert.match(html, /class="hero__proof"/);
    assert.match(html, /section id="impact"/);
    assert.match(html, /class="projects__featured"/);
    assert.match(html, /href="#impact" class="btn btn--secondary"/);
});

test('translations expose authority-page content in both languages', () => {
    const js = read('static/js/site.js');

    assert.match(js, /heroEyebrow:/);
    assert.match(js, /impactLabel:/);
    assert.match(js, /impactTitle:/);
    assert.match(js, /impactItems:/);
    assert.match(js, /featuredProjectsLabel:/);
    assert.match(js, /featuredProjectsTitle:/);
});
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: FAIL with a missing match such as `The input did not match /class="hero__grid"/`

**Step 3: Write minimal implementation**

Add the smallest structural hooks so the test has real targets to lock onto.

```html
<header class="hero" id="home">
    <div class="hero__grid">
        <div class="hero__content">
            <p class="hero__eyebrow">Data &amp; AI Leadership</p>
            <h1 class="hero__name">...</h1>
            <p class="hero__title">...</p>
            <p class="hero__desc">...</p>
            <div class="hero__actions">
                <a href="https://www.linkedin.com/in/matteosenardi/" class="btn btn--primary">Reach out on LinkedIn</a>
                <a href="#impact" class="btn btn--secondary">See Selected Impact</a>
            </div>
        </div>
        <aside class="hero__proof">...</aside>
    </div>
</header>

<section id="impact" class="section">...</section>

<div class="projects__featured">...</div>
```

```js
heroEyebrow: 'Data & AI Leadership',
impactLabel: 'Selected Impact',
impactTitle: 'Leadership with shipped systems.',
impactItems: [],
featuredProjectsLabel: 'Open Source',
featuredProjectsTitle: 'Featured Work.',
```

Mirror those keys in both `en` and `it`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/landing-page-authority.test.mjs index.html static/js/site.js
git commit -m "test: add landing page authority regression checks"
```

### Task 2: Rebuild the hero into a split executive intro with a proof panel

**Files:**
- Modify: `index.html:151-220`
- Modify: `static/css/site.css:237-386,691-760`
- Modify: `static/js/site.js:145-165,274-294`
- Test: `tests/landing-page-authority.test.mjs`

**Step 1: Write the failing test**

Extend the regression file to assert the new hero-specific structure and CTA target.

```js
test('hero uses the executive split layout', () => {
    const html = read('index.html');
    const css = read('static/css/site.css');

    assert.match(html, /class="hero__eyebrow"/);
    assert.match(html, /class="hero__grid"/);
    assert.match(html, /class="hero__proof"/);
    assert.match(html, /See Selected Impact|Scopri l'impatto selezionato/);
    assert.match(css, /\.hero__grid\s*\{/);
    assert.match(css, /\.hero__proof\s*\{/);
});
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: FAIL because `.hero__grid` / `.hero__proof` styles are not implemented yet

**Step 3: Write minimal implementation**

Update the hero markup, copy, and styling around the current hero block.

```html
<div class="hero__grid">
    <div class="hero__content">
        <p class="hero__eyebrow">Data &amp; AI Leadership</p>
        <h1 class="hero__name">Data &amp; AI leader with a maker's track record.</h1>
        <p class="hero__title">
            I lead teams building cloud data platforms, AI copilots, and analytics systems that ship to production.
        </p>
        <p class="hero__desc">...</p>
        <div class="hero__actions">
            <a href="https://www.linkedin.com/in/matteosenardi/" class="btn btn--primary">Reach out on LinkedIn</a>
            <a href="#impact" class="btn btn--secondary">See Selected Impact</a>
        </div>
    </div>
    <aside class="hero__proof">
        <picture>...</picture>
        <div class="proof__list">
            <div class="proof__item">...</div>
            <div class="proof__item">...</div>
            <div class="proof__item">...</div>
        </div>
    </aside>
</div>
```

```css
.hero {
    padding: var(--space-2xl) var(--space-md) var(--space-xl);
}

.hero__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.9fr);
    gap: var(--space-lg);
    align-items: center;
}

.hero__content {
    text-align: left;
}

.hero__proof {
    background: var(--color-tag-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
}
```

```js
heroEyebrow: 'Data & AI Leadership',
heroSecondaryText: 'See Selected Impact',
heroSecondaryAria: 'See selected leadership impact',
heroProofLabels: [
    'Years in Data, Cloud & AI',
    'Active leadership mandates',
    'Cloud ecosystems led',
    'Open-source projects published'
],
```

Repeat the copy updates in the Italian translation block.

**Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/landing-page-authority.test.mjs index.html static/css/site.css static/js/site.js
git commit -m "feat: redesign hero into executive authority layout"
```

### Task 3: Add the selected-impact section and curate open-source proof

**Files:**
- Modify: `index.html:225-382`
- Modify: `static/css/site.css:388-545,691-760`
- Modify: `static/js/site.js:166-210,295-339`
- Test: `tests/landing-page-authority.test.mjs`

**Step 1: Write the failing test**

Extend the regression file to lock the new impact and project group structure.

```js
test('homepage includes selected impact and curated project groups', () => {
    const html = read('index.html');
    const css = read('static/css/site.css');

    assert.match(html, /section id="impact"/);
    assert.match(html, /class="impact__grid"/);
    assert.match(html, /class="impact__item"/);
    assert.match(html, /class="projects__featured"/);
    assert.match(html, /class="projects__archive"/);
    assert.match(css, /\.impact__grid\s*\{/);
    assert.match(css, /\.projects__featured\s*\{/);
});
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: FAIL because the new impact and curated project wrappers do not exist yet

**Step 3: Write minimal implementation**

Create a new impact section before the detailed experience timeline and split projects into featured + secondary groups.

```html
<section id="impact" class="section">
    <p class="section__label reveal">Selected Impact</p>
    <h2 class="section__title reveal">Leadership backed by delivered systems.</h2>
    <div class="impact__grid">
        <article class="impact__item reveal">
            <p class="impact__context">Gruppo Dylog</p>
            <h3 class="impact__headline">Head of Data &amp; AI</h3>
            <p class="impact__summary">...</p>
        </article>
        <article class="impact__item reveal">...</article>
        <article class="impact__item reveal">...</article>
    </div>
</section>
```

```html
<section id="projects" class="section section--wide">
    <p class="section__label reveal">Open Source</p>
    <h2 class="section__title reveal">Technical proof.</h2>

    <div class="projects__featured reveal">
        <article class="project project--featured">...</article>
        <article class="project project--featured">...</article>
    </div>

    <div class="projects__archive reveal">
        <article class="project">...</article>
        <article class="project">...</article>
        <article class="project">...</article>
        <article class="project">...</article>
    </div>
</section>
```

```css
.impact__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-md);
}

.impact__item {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
}

.projects__featured {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-md);
    margin-bottom: var(--space-md);
}

.projects__archive {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
}
```

```js
impactItems: [
    {
        context: 'Gruppo Dylog',
        title: 'Head of Data & AI',
        summary: 'Leading teams shipping AI reconciliation, natural-language copilots, and advanced analytics platforms.'
    },
    {
        context: 'Docsity',
        title: 'Head of Data & Analytics / Innovation',
        summary: 'Owned data strategy, cloud platform design, and analytics governance across product and decision workflows.'
    },
    {
        context: 'Mediaset',
        title: 'Solution Architect / Lead Data Engineer',
        summary: 'Architected a production data lake for real-time click-stream processing on AWS.'
    }
],
featuredProjectIndexes: [0, 2],
```

Mirror the impact content in the Italian translation block and update the DOM wiring so impact cards and project groups render correctly in both languages.

**Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/landing-page-authority.test.mjs index.html static/css/site.css static/js/site.js
git commit -m "feat: add selected impact and curated open source proof"
```

### Task 4: De-emphasize the resume sections and finish responsive bilingual polish

**Files:**
- Modify: `index.html:193-460`
- Modify: `static/css/site.css:347-760`
- Modify: `static/js/site.js:155-360`
- Test: `tests/landing-page-authority.test.mjs`

**Step 1: Write the failing test**

Add assertions for the supporting-section polish and responsive hooks.

```js
test('supporting sections are visually demoted and mobile-safe', () => {
    const css = read('static/css/site.css');
    const js = read('static/js/site.js');

    assert.match(css, /\.hero__grid\s*\{[\s\S]*grid-template-columns:/);
    assert.match(css, /@media \(max-width: 768px\)\s*\{[\s\S]*\.hero__grid\s*\{[\s\S]*grid-template-columns:\s*1fr/);
    assert.match(css, /\.projects__archive\s*\{/);
    assert.match(js, /featuredProjectsTitle:/);
    assert.match(js, /impactItems:/);
});
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: FAIL until the responsive hero and supporting-section polish are in place

**Step 3: Write minimal implementation**

Compress the about/skills/education sections and finish the mobile/dark-mode adaptations.

```html
<section id="about" class="section section--compact">
    <div class="about__summary reveal">
        <p class="section__label">About</p>
        <p class="about__lede">I lead data and AI programs while staying close to architecture, product delivery, and the systems that make them real.</p>
    </div>
</section>
```

```css
.section--compact {
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
}

.skills__grid,
.edu__item,
.exp__list {
    opacity: 0.96;
}

@media (max-width: 768px) {
    .hero__grid,
    .impact__grid,
    .projects__featured,
    .projects__archive {
        grid-template-columns: 1fr;
    }

    .hero__content,
    .hero__proof {
        text-align: left;
    }
}
```

```js
aboutLede:
    'I lead data and AI programs while staying close to architecture, product delivery, and the systems that make them real.',
skillsTitle: 'Capabilities.',
educationTitle: 'Credentials.',
```

Keep both languages in sync and make sure no translation selector still assumes the old about-section paragraph structure.

**Step 4: Run test to verify it passes**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/landing-page-authority.test.mjs index.html static/css/site.css static/js/site.js
git commit -m "feat: polish authority layout and supporting sections"
```

### Final Verification

**Files:**
- Verify: `index.html`
- Verify: `static/css/site.css`
- Verify: `static/js/site.js`
- Verify: `static/css/site.min.css`
- Verify: `static/js/site.min.js`
- Verify: `tests/landing-page-authority.test.mjs`

**Step 1: Run automated verification**

Run: `node --test tests/landing-page-authority.test.mjs`
Expected: PASS

**Step 2: Rebuild minified assets**

Run: `make build`
Expected:
- `static/js/site.min.js` regenerated by esbuild
- `static/css/site.min.css` regenerated by esbuild

**Step 3: Start a local preview server**

Run: `python3 -m http.server 4173`
Expected: `Serving HTTP on ... port 4173`

**Step 4: Perform visual verification with Playwright**

Run:

```bash
export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export PWCLI="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"
"$PWCLI" open http://127.0.0.1:4173
"$PWCLI" snapshot
"$PWCLI" screenshot --full-page --filename output/playwright/landing-authority-en.png
```

Expected:
- The hero is split, not centered
- The right rail shows the portrait and proof panel
- The secondary CTA points to `#impact`
- The impact cards appear before the full experience timeline
- Featured projects are visually separated from the archive grid

**Step 5: Verify Italian content**

Run:

```bash
"$PWCLI" click e21
"$PWCLI" snapshot
"$PWCLI" screenshot --full-page --filename output/playwright/landing-authority-it.png
```

Expected:
- Italian copy fits without overlap or overflow
- Buttons, proof labels, and impact cards are translated
- Navigation, footer, and section headings still switch correctly

**Step 6: Verify dark mode**

Run:

```bash
"$PWCLI" click e23
"$PWCLI" snapshot
"$PWCLI" screenshot --full-page --filename output/playwright/landing-authority-dark.png
```

Expected:
- Proof cards and project groupings remain readable
- Contrast stays acceptable in dark mode
- No border or hover treatment disappears against the dark background
