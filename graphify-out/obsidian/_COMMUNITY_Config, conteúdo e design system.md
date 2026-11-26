---
type: community
cohesion: 0.08
members: 33
---

# Config, conteúdo e design system

**Cohesion:** 0.08 - loosely connected
**Members:** 33 nodes

## Members
- [[AdSlot.astro reserved ad slot renders nothing (no empty box, no ad network calls) while ads disabled]] - code - src/components/AdSlot.astro
- [[ArticleCard.astro guide list card with pillar badge, guias{id} link and formatted updated date]] - code - src/components/ArticleCard.astro
- [[Astro site URL httpsdestrava-tech-rho.vercel.app (provisional free subdomain)]] - code - astro.config.mjs
- [[Astro site configuration (sitemap integration, directory build)]] - code - astro.config.mjs
- [[Base.astro canonicalOGJSON-LD head, skip link, composes Header + Skeleton + slot + Footer + ConsentBar]] - code - src/layouts/Base.astro
- [[ClientRouter fallback='swap' enables Astro view transitions]] - code - src/layouts/Base.astro
- [[Consent choice persisted in localStorage key 'dt-consent' as 'accepted' or 'rejected']] - code - src/components/ConsentBar.astro
- [[ConsentBar.astro LGPD acceptreject banner shown only when SITE.adsEnabled is true]] - code - src/components/ConsentBar.astro
- [[Design System Master Swiss Modernism 2.0, Libre Bodoni + Public Sans, pink accent EC4899, Scroll-Triggered Stor_74736283]] - document - design-system/destrava-tech/MASTER.md
- [[Footer.astro site name from config, dynamic year, five legalnav links]] - code - src/components/Footer.astro
- [[Guias content collection glob loader on srccontentguias with Zod frontmatter schema]] - code - src/content.config.ts
- [[Guias frontmatter pillar enum seguranca  whatsapp  ia  celular]] - code - src/content.config.ts
- [[Header.astro]] - code - src/components/Header.astro
- [[Header.astro responsive navigation using native popover menu and SVG logo in brand colors]] - code - src/components/Header.astro
- [[Inline script calls setupPageLifecycle() from site-navigation and setupSkeleton() from skeleton]] - code - src/layouts/Base.astro
- [[Menu button popovertarget='site-menu', popovertargetaction='toggle', aria-controlsaria-expanded; ulsite-menu po_74bba4a2]] - code - src/components/Header.astro
- [[NavigationSkeleton.astro honest skeleton hidden by default, sr-only text created by JS only while overlay visible]] - code - src/components/NavigationSkeleton.astro
- [[PILLARS map with four keys and pt-BR labelsdescriptions seguranca, whatsapp, ia, celular]] - code - src/site.config.ts
- [[PillarKey type = keyof typeof PILLARS]] - code - src/site.config.ts
- [[Portfolio registry Destrava Tech (proj-001, static-web Astro, Vercel Hobby)]] - code - portfolio-registry.json
- [[Props_2]] - code - src/components/Header.astro
- [[README local commands, source structure, 5-step AdSense activation, privacy by default]] - document - README.md
- [[Registry monetization.adsEnabled = false; AdSense account does not exist; revenue no data]] - code - portfolio-registry.json
- [[SITE central config object (name, tagline, description, url, locale pt-BR, adsEnabled, contactEmail)]] - code - src/site.config.ts
- [[SITE.adsEnabled = false (never enable before adult-owned approved AdSense account, publisher code, LGPD banner)]] - code - src/site.config.ts
- [[SITE.contactEmail = macedoartur1250@gmail.com (public contact of responsible adult)]] - code - src/site.config.ts
- [[SITE.url = httpsdestrava-tech-rho.vercel.app — canonical and ogurl base]] - code - src/site.config.ts
- [[TODO(ads) load AdSense script ONLY in click handler when consent === 'accepted']] - code - src/components/ConsentBar.astro
- [[docspending-actions.md — cross-referenced pending actions (legal placeholders, AdSense, deploy)]] - document - docs/pending-actions.md
- [[isCurrent(href) returns 'page' on exact match, 'location' on prefix match, else undefined for aria-current]] - code - src/components/Header.astro
- [[links]] - code - src/components/Header.astro
- [[npm manifest Astro 5, @astrojssitemap, Libre Bodoni + Public Sans fontsource, @oddbirdpopover-polyfill]] - code - package.json
- [[transitionpersist keeps the same skeleton node across ClientRouter swaps; hidden until navigation exceeds 300 ms]] - code - src/components/NavigationSkeleton.astro

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Config_conteúdo_e_design_system
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Componentes e tipos Astro]]

## Top bridge nodes
- [[Header.astro]] - degree 4, connects to 1 community