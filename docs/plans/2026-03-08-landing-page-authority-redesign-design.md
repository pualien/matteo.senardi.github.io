# Landing Page Authority Redesign Design

**Date:** 2026-03-08

**Objective:** Reposition the current landing page from a broad portfolio/resume into a restrained, corporate authority page that strengthens Matteo Senardi's personal brand and leadership credibility while preserving bilingual support, accessibility, and the existing lightweight static architecture.

## Context

The current site is technically solid, bilingual, and fast, but the first screen reads as a general-purpose CV. It explains a lot, yet it does not establish a sharp personal-brand narrative quickly enough. The existing layout gives similar visual weight to biography, project inventory, and skill coverage, which dilutes the strongest signal the page can send.

The target direction is an executive authority page for a "Data & AI leader with a maker's track record." The site should lead with leadership impact and use open-source work as supporting proof of technical depth.

## Goals

1. Establish a clear first-impression message within the first 10 seconds.
2. Prioritize leadership impact over chronological resume structure.
3. Keep open-source work visible as maker credibility, not as the main narrative.
4. Preserve the bilingual English/Italian experience.
5. Maintain a restrained, corporate visual language rather than an editorial or highly expressive one.
6. Keep the implementation compatible with the existing static HTML/CSS/JS setup, dark mode, and accessibility features.

## Non-Goals

1. Turning the site into a multi-page personal website.
2. Introducing a framework, build system migration, or CMS.
3. Adding flashy animation or highly experimental visual behavior.
4. Expanding the site into a full blog, writing archive, or case-study platform in this pass.

## Audience

Primary audience:
- People evaluating Matteo's authority and reputation in data and AI leadership.
- Peers and professionals who may discover Matteo through open source or LinkedIn.

Secondary audience:
- Potential collaborators or companies assessing strategic and technical credibility.

## Positioning

The page should communicate:

"Matteo Senardi is a Data & AI leader who ships production systems and has the maker track record to prove it."

This is not a pure consulting landing page and not a pure open-source portfolio. Leadership credibility comes first, technical proof second, resume completeness third.

## Narrative Structure

The redesigned page should follow this order:

1. Hero
   A tighter positioning statement, shorter supporting copy, and stronger above-the-fold hierarchy.

2. Proof Bar
   Immediate credibility signals such as years of experience, active leadership scope, cloud breadth, and open-source output.

3. Selected Impact
   A new section that summarizes leadership and business outcomes before the detailed career timeline.

4. Open Source as Proof
   A curated projects section that reinforces technical depth and maker credibility.

5. Career Timeline
   A quieter, more compact experience section for completeness.

6. Skills and Education
   Supporting sections with reduced emphasis.

7. Contact / Footer
   A stronger closing CTA aligned with personal brand and reputation building.

## Visual Direction

The redesign should remain minimal but more deliberate and senior.

### Hero Layout

The current centered hero should become a split composition:
- Left side: headline, subhead, and primary CTA.
- Right side: portrait plus a compact proof panel.

This shifts the above-the-fold experience from "personal profile card" to "executive introduction with supporting evidence."

### Typography

Typography should remain clean and professional, but the headline should become:
- shorter
- heavier in meaning
- easier to scan quickly

Supporting text should be tightened to reduce paragraph density and improve executive readability.

### Section Hierarchy

The page should rely on spacing, contrast, and structured content blocks rather than decorative effects. Cards or panel treatments should be reserved for proof, impact, and featured project groupings.

## Content Strategy

### Hero Copy

The current hero headline is descriptive but generic. The new hero should:
- say who Matteo is in strategic terms
- convey distinction rather than listing domains
- support both English and Italian without excessive length

The subheading should translate that positioning into concrete scope: cloud data platforms, AI copilots, analytics, and team leadership.

### Proof Bar

A short row of credibility markers should sit directly below the hero. Candidate signals:
- years in data, cloud, and AI
- current leadership roles
- cloud ecosystems led
- open-source projects/packages published

These markers should be scannable and low-friction rather than verbose.

### Selected Impact

This is the core new section. It should surface 3 to 4 impact summaries before the full CV chronology. Each summary should include:
- company or context
- leadership scope
- systems or products delivered
- operational, analytical, or customer value

The goal is to give visitors a fast understanding of Matteo's seniority and practical outcomes.

### About

The current About section should be compressed heavily or partially absorbed into the new impact narrative. It should no longer compete with the hero for introductory space.

### Open Source

Projects should be repositioned as supporting proof:
- feature the strongest 2 to 3 projects first
- keep the broader project list as secondary support
- preserve links to GitHub and PyPI

This keeps the maker track record prominent without making the site feel like an OSS catalog.

### Skills

The current skills inventory is broad but visually heavy. It should become a tighter capability map that supports the leadership story rather than reading like a resume appendix.

### Education

Education should remain present but low emphasis.

## Interaction Design

The redesign should keep the current functional strengths:
- bilingual toggle
- dark mode
- accessible navigation
- lightweight JS enhancements

Interaction changes should be subtle:
- keep reveal effects if they remain tasteful
- avoid flashy motion
- strengthen CTA labeling and section anchoring

The primary CTA should continue to point to LinkedIn or the most reputation-aligned contact path. The secondary CTA should guide users toward selected impact or featured work, not a generic project list.

## Technical Constraints

Implementation should remain within the current architecture:
- `index.html` for structure
- `static/css/site.css` compiled into `static/css/site.min.css`
- `static/js/site.js` compiled into `static/js/site.min.js`
- `Makefile` build flow using `npx esbuild`

The redesign must preserve:
- bilingual content parity
- existing language/theme toggles
- mobile responsiveness
- accessibility semantics
- static hosting compatibility

## Success Criteria

The redesign is successful if:

1. The first screen communicates a sharper personal-brand message.
2. Leadership impact becomes easier to understand before the user reaches the full experience section.
3. Open source still reinforces credibility without dominating the page narrative.
4. The page remains bilingual, accessible, mobile-friendly, and lightweight.
5. The overall feel is restrained and corporate rather than flashy or generic.

## Risks and Mitigations

### Risk: The page becomes too executive and loses maker credibility

Mitigation:
- keep a curated featured-project treatment
- retain GitHub/PyPI proof points
- preserve explicit references to production systems and technical leadership

### Risk: The page becomes too text-heavy again

Mitigation:
- use structured proof rows and impact cards
- shorten hero and about copy
- reduce duplication across sections

### Risk: Bilingual content causes layout stress

Mitigation:
- keep headline and proof labels concise
- validate both English and Italian content in desktop and mobile layouts

## Implementation Notes

Implementation should focus more on hierarchy and information architecture than on visual novelty. The strongest improvement will come from changing what appears first, what gets emphasized, and what gets compressed.
