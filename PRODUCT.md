# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences of **genuinely equal** weight. The hero's split path ("I am a
nonprofit" / "I want to help") expresses this structurally, and both routes
funnel to the same footer contact form.

**Nonprofits (demand).** Organizations that need digital work (websites,
content, social media, SEO, audits) but lack in-house capacity or an agency
budget. They arrive wanting to
describe a project and find out whether GoodEWorkers can take it on.

**Remote workers (the community).** Freelancers, employees, students, unemployed
and retired people with technical, graphic, or semantic expertise who want their
skills to serve a cause. They work remotely and asynchronously, anywhere in the
world, and they join for meaningful projects plus training, community, open
source contributions, and portfolio material.

Do not improve one side's path at the other's cost.

## Product Purpose

GoodEWorkers is a community of remote workers, constituted as a French nonprofit
association registered in Paris. The community does three things: it promotes
remote work, it builds for nonprofits, and it releases what it makes as open
source.

The goal is to work together and demonstrate that fully remote jobs are not only
possible but a competitive advantage for any organization. The association
operating entirely without an office is itself the demonstration.

## Positioning

- **The thesis is the product.** Fully remote work is not a compromise or a perk;
  it is a competitive advantage for any structure. Everything the community does
  is evidence for that claim.
- **The organization is its own proof.** GoodEWorkers has never had premises.
  Every project, decision, and meeting happens remotely, so the argument is one
  it is already living rather than one it is making from the outside.
- **No geographic restriction.** Explicitly not a local association. Members
  join from anywhere, so the right person for a task is never ruled out by where
  they live.
- **No premises, so lower cost.** With no offices, infrastructure cost is near
  zero, and that saving is what makes the work affordable to nonprofits.
- **Work in the open.** What the community builds is released as open source
  where it can be.
- **Teams assembled per project** from the member pool, against written
  specifications and availability, not a fixed agency roster.
- **One dedicated contact** for the duration of each project.

## Operating Context

- Projects run against written specifications. Communication is async by
  default, via phone, email, video conferencing, or chat.
- Volunteers receive free training in remote work and the association's methods
  before contributing.
- Contact is a single point: a Netlify-handled form in the footer (name, email,
  message) plus a `mailto:hello@goodeworkers.org` link. Both hero CTAs anchor to
  `/#contact`.

## Capabilities and Constraints

- **Services offered:** website creation, content marketing, SEO optimization,
  audits and advice (hero cards); web development, content marketing, design,
  animation (About copy). The hero also says "and much more".
- **Current surface:** the landing page, `/legal-notice`, `/contributors/`
  (a gallery of the people who build GoodEWorkers, with a profile page per
  person), and `/projects/` (a gallery of the work — websites for nonprofits
  and the association's own open-source initiatives — with a page per
  project). Static Astro build published to Netlify from `dist/`.
- **Bilingual EN/FR is the goal.** The UI is currently English-only with a French
  legal notice. Future work must plan for i18n, `hreflang`, and translated
  content. Not yet implemented, and no translation infrastructure exists.
- **Open source is a stated pillar with no named releases.** The community
  releases what it can as open source, but no specific project or repository has
  been identified as public proof. The site says this as an activity, not with
  links. Do not invent project names or URLs.
- **A blog is anticipated but not shipped.** Unmerged branches
  `origin/feature/articles-blog` and `origin/feature/add-Article-Page` contain
  an articles section. Treat as anticipated, not as committed roadmap.
- **Missing pages:** there is no About, Privacy Policy, or Terms page. The
  team and mission live only as sections of the landing page.

### Unresolved product facts

These are recorded, not resolved. Future work must not paper over them.

- **Data-collection conflict.** `legal-notice.md` states the association
  collects no personal data on site visitors ("ne collecte aucune donnée
  personnelle"), while the footer form collects name, email, and message through
  Netlify Forms. One of the two has to change; that is the association's call.
- **Truncated email in content.** The legal notice's closing contact address
  reads `hello@goodeworkers.` with the TLD missing.
- **`/legal-notice` is not a privacy policy.** It is a French *mentions légales*.
  It never uses the words privacy, cookie, or GDPR.

## Brand Commitments

- **Name:** GoodEWorkers. The wordmark renders it "GoodeWorkers". The About
  prose read "Good eWorkers" until that was corrected.
- **Wordmark treatment:** "Good" yellow, "e" orange, "Workers" purple.
- **Encircled motif:** an orange `rounded-full` outline around one key word in a
  heading (`src/components/Miscs/Encircled.astro`), used in the H1 and in the
  Why and Partners headings.
- **Typefaces:** ClashDisplay (display) and Inter (body), self-hosted from
  `src/assets/fonts/`.
- **Palette:** `tailwind.config.js`. Page background is `#111111` from
  `global.css`. Note that `primary`, `background`, `pantone`, and `black-ink` are
  declared in the config but used nowhere in the codebase.
- **A Figma file exists but is not binding.** The shipped code is the visual
  authority. Do not treat Figma as a constraint unless the user reintroduces it.
- **Netlify is credited in the footer** as the host.

## Evidence on Hand

Real, and the only proof that exists:

- **Team:** Richard (Co-founder) and Alice (Executive Director). Alice Perchaud
  is *Présidente de l'association* and director of publication per the legal
  notice. Portraits at `src/assets/images/{richard,alice}_thumb.png`.
- **Scale claim:** "2 ongoing projects", stated in the About section and
  confirmed current.
- **The organization itself is the proof.** GoodEWorkers has always operated
  fully remote with no office. This is the primary evidence for the thesis and
  is now stated explicitly in the Why section.
- **Partners:** one named partner, Lili Schmitt. The Partners section was
  removed from the site on request; the partnership itself was not stated to
  have ended, and the asset remains in git history.
- **Registered address:** Legal Place, 60 Rue François 1er, 75008 Paris, France.
- **Contact:** hello@goodeworkers.org.

Absences that must not be fabricated: there are **no** testimonials, case
studies, client names, press mentions, metrics, or funding figures. There is no
logo asset suitable for social or structured-data use beyond `favicon.png`
(198×198) and `logo.png` (160×63).

## Product Principles

1. Both sides are the product. The two-sided community is the mechanism, so
   never improve one audience's path at the cost of the other's.
2. The organization is the argument. Running fully remote with no office is the
   best evidence available for the thesis. Let the way of working show
   competence instead of claiming it.
3. Frame remote as an advantage. Async, specification-led working is the
   differentiator. Nothing on any surface should read as an apology for having
   no office.
4. Say what it costs. No premises and volunteer labor are why the work is
   affordable, and saying so persuades better than any quality claim.
5. What members get is part of the offer. Training, an expert community, real
   projects, open source contributions and portfolio material are what they buy
   with their time.
6. Claim only what exists. Two ongoing projects, no named open source releases.
   For a nonprofit, inflated proof would be both false and unusually damaging.
