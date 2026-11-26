# Graph Report - interface-motion  (2026-11-23)

## Corpus Check
- Corpus is ~23,992 words - fits in a single context window. You may not need a graph.

## Summary
- 324 nodes · 435 edges · 22 communities (17 shown, 5 thin omitted)
- Extraction: 70% EXTRACTED · 30% INFERRED · 1% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.79)
- Token cost: 12,400 input · 6,900 output

## Graph Freshness
- Built from commit: `b3eee7cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Monetização e publicação
- Componentes e tipos Astro
- Config, conteúdo e design system
- Stack e dependências
- Baseline visual (capturas)
- Guias de golpes e fontes
- Senhas e verificação em duas etapas
- IA: ferramentas e estudo
- Páginas fixas e privacidade
- Dados móveis e armazenamento
- Riscos de IA e privacidade
- Verificação e arquivos públicos
- Sinais de golpe e WhatsApp
- QA e critérios de aceite
- Navegação e ClientRouter
- Scripts de interação
- Home animada e ilustrações
- Tema e acessibilidade
- Bateria e mitos
- Grupos e chamadas no WhatsApp
- Confirmações de leitura
- Visto por último e online

## God Nodes (most connected - your core abstractions)
1. `SITE config (name, url, description, contactEmail)` - 15 edges
2. `ChatGPT, Gemini ou Meta AI: qual usar para cada tarefa` - 10 edges
3. `Verificação em duas etapas (segundo fator)` - 9 edges
4. `Guide Article Detail Page` - 9 edges
5. `PILLARS config (pillar keys, labels, descriptions)` - 8 edges
6. `Destrava Tech (site de guias)` - 8 edges
7. `QA Report — Destrava Tech MVP` - 8 edges
8. `Central de Links — Destrava Tech` - 8 edges
9. `Home Page (hero / pillars / recent / trust)` - 8 edges
10. `Privacy Policy Page (LGPD)` - 8 edges

## Surprising Connections (you probably didn't know these)
- `npm manifest: Astro 5, @astrojs/sitemap, Libre Bodoni + Public Sans fontsource, @oddbird/popover-polyfill` --shares_data_with--> `Design System Master: Swiss Modernism 2.0, Libre Bodoni + Public Sans, pink accent #EC4899, Scroll-Triggered Storytelling pattern`  [INFERRED]
  package.json → design-system/destrava-tech/MASTER.md
- `README: local commands, source structure, 5-step AdSense activation, privacy by default` --cites--> `Guias content collection: glob loader on src/content/guias with Zod frontmatter schema`  [EXTRACTED]
  README.md → src/content.config.ts
- `Design System Master: Swiss Modernism 2.0, Libre Bodoni + Public Sans, pink accent #EC4899, Scroll-Triggered Storytelling pattern` --conceptually_related_to--> `ArticleCard.astro: guide list card with pillar badge, /guias/{id}/ link and formatted updated date`  [INFERRED]
  design-system/destrava-tech/MASTER.md → src/components/ArticleCard.astro
- `Design System Master: Swiss Modernism 2.0, Libre Bodoni + Public Sans, pink accent #EC4899, Scroll-Triggered Storytelling pattern` --conceptually_related_to--> `Header.astro: responsive navigation using native popover menu and SVG logo in brand colors`  [INFERRED]
  design-system/destrava-tech/MASTER.md → src/components/Header.astro
- `Design System Master: Swiss Modernism 2.0, Libre Bodoni + Public Sans, pink accent #EC4899, Scroll-Triggered Storytelling pattern` --conceptually_related_to--> `Base.astro: canonical/OG/JSON-LD head, skip link, composes Header + Skeleton + slot + Footer + ConsentBar`  [INFERRED]
  design-system/destrava-tech/MASTER.md → src/layouts/Base.astro

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Golpes digitais que exploram WhatsApp e Pix** — src_content_guias_golpe_do_whatsapp_como_se_proteger_document, src_content_guias_golpe_do_pix_sinais_de_alerta_document, src_content_guias_whatsapp_privacidade_8_ajustes_document [INFERRED 0.75]
- **Proteção de contas com verificação em duas etapas** — src_content_guias_verificacao_em_duas_etapas_whatsapp_google_document, src_content_guias_senhas_fortes_gerenciador_de_senhas_verificacao_2etapas, src_content_guias_whatsapp_privacidade_8_ajustes_verificacao_2etapas [INFERRED 0.80]
- **Uso responsável de IA: alucinação e privacidade** — src_content_guias_chatgpt_gemini_meta_ai_qual_usar_ai_hallucination, src_content_guias_ia_para_estudar_sem_colar_alucinacao_ia, src_content_guias_meta_ai_no_whatsapp_como_usar_alucinacao [INFERRED 0.80]
- **AdSense publication gate** — README_adsense, docs_pending_actions_dados_legais, docs_evidence_ledger_adsense_18 [EXTRACTED 0.90]
- **Interface and motion delivery chain** — docs_superpowers_specs_2026_11_23_interface_motion_design_document, docs_superpowers_plans_2026_11_23_interface_motion_document, docs_qa_report_document [INFERRED 0.80]
- **Publication authorization gate** — docs_pending_actions_autorizacao_publicacao, docs_central_de_links_site_no_ar, docs_superpowers_plans_2026_11_23_interface_motion_document [EXTRACTED 0.80]
- **Shared four-pillar taxonomy across schema, config and UI** — siteconfig_PILLARS, contentconfig_pillarEnum, src_components_articlecard_component [INFERRED 0.85]
- **Ads/consent gating chain: flag, banner and ad slot** — siteconfig_adsEnabled, src_components_consentbar_component, src_components_adslot_component [INFERRED 0.90]
- **ClientRouter navigation lifecycle with persistent skeleton and setup hooks** — src_layouts_base_clientrouter, src_components_navigationskeleton_persist, src_layouts_base_lifecyclescripts [INFERRED 0.80]
- **Pillar-based guide browsing flow** — src_pages_index_home_page, src_pages_guias_index_guides_library, src_site_config_pillars [INFERRED 0.85]
- **ClientRouter page lifecycle scripts** — src_scripts_site_navigation_setup_page_lifecycle, src_scripts_skeleton_setup_skeleton, client_router_page_load_event [EXTRACTED 1.00]
- **Legal / draft policy documents (LGPD)** — src_pages_privacidade_privacy_policy, src_pages_termos_terms_of_use, src_pages_sobre_about_page [INFERRED 0.75]
- **ads.txt pre-provisioned while ads are disabled, pending AdSense approval** — adstxt_adsense_publisher_declaration, src_site_config_ads_disabled, docs_pending_actions_adsense_approval [INFERRED 0.85]
- **Public Google verification token proves ownership of deployed site URL for Search Console** — public_googlee2e464378dc22f96_verification_token, public_googlee2e464378dc22f96_search_console_ownership, deployed_url_destrava_tech_vercel_app [INFERRED 0.85]
- **robots.txt allows all crawlers and advertises the sitemap on the deployed domain** — robotstxt_crawl_allow_all, robotstxt_sitemap_index_reference, sitemap_index_xml_endpoint, deployed_url_destrava_tech_vercel_app [EXTRACTED 1.00]
- **Destrava Tech black-and-pink editorial visual identity across mark, header, kicker and cards** — public_favicon_dark_rounded_square_field, public_favicon_pink_lightning_bolt_path, baseline_home_desktop_sticky_header_navigation, baseline_home_desktop_black_pink_identity, baseline_home_mobile_collapsed_menu_button, baseline_guides_desktop_four_column_article_cards, baseline_article_desktop_article_header [INFERRED 0.90]
- **White bordered card grids with serif titles, pink category badges and update metadata reused across home, library and related guides** — baseline_home_desktop_pillar_card_grid, baseline_home_desktop_recent_guides_grid, baseline_home_mobile_single_column_cards, baseline_guides_desktop_four_column_article_cards, baseline_article_desktop_sources_and_related_cards [EXTRACTED 0.90]
- **Responsive adaptation from the 1280px desktop multi-column layout to the 375px mobile single-column reading flow** — baseline_home_desktop_homepage_baseline_screenshot, baseline_home_mobile_homepage_baseline_screenshot, baseline_home_desktop_sticky_header_navigation, baseline_home_mobile_collapsed_menu_button, baseline_home_mobile_responsive_behavior [INFERRED 0.90]
- **Four baseline screenshots captured before the interface-and-motion work, documenting the static pre-animation state of homepage, library and article views** — baseline_home_desktop_homepage_baseline_screenshot, baseline_home_mobile_homepage_baseline_screenshot, baseline_guides_desktop_library_baseline_screenshot, baseline_article_desktop_guide_baseline_screenshot [INFERRED 0.85]

## Communities (22 total, 5 thin omitted)

### Community 0 - "Monetização e publicação"
Cohesion: 0.07
Nodes (45): Google AdSense monetization, src/content/guias/ Markdown articles, design-system/destrava-tech/MASTER.md, Destrava Tech (site de guias), portfolio-registry.json, Privacy by default (no cookies/analytics), src/site.config.ts (adsEnabled), Central de Links — Destrava Tech (+37 more)

### Community 1 - "Componentes e tipos Astro"
Cohesion: 0.08
Nodes (17): Props, fmt, Props, bar, year, Props, fmt, jsonLd (+9 more)

### Community 2 - "Config, conteúdo e design system"
Cohesion: 0.08
Nodes (32): README: local commands, source structure, 5-step AdSense activation, privacy by default, Astro site configuration (sitemap integration, directory build), Astro site URL: https://destrava-tech-rho.vercel.app (provisional free subdomain), Guias content collection: glob loader on src/content/guias with Zod frontmatter schema, Guias frontmatter pillar enum: seguranca | whatsapp | ia | celular, Design System Master: Swiss Modernism 2.0, Libre Bodoni + Public Sans, pink accent #EC4899, Scroll-Triggered Storytelling pattern, npm manifest: Astro 5, @astrojs/sitemap, Libre Bodoni + Public Sans fontsource, @oddbird/popover-polyfill, docs/pending-actions.md — cross-referenced pending actions (legal placeholders, AdSense, deploy) (+24 more)

### Community 3 - "Stack e dependências"
Cohesion: 0.10
Nodes (22): ADR-0001, dependencies, astro@^5.10.0, @astrojs/sitemap@^3.4.0, @fontsource-variable/libre-bodoni@^5.2.0, @fontsource-variable/public-sans@^5.2.0, @oddbird/popover-polyfill@^0.5.0, name (+14 more)

### Community 4 - "Baseline visual (capturas)"
Cohesion: 0.12
Nodes (25): Article header: a pink pill category badge above a large serif H1 with a short measure, followed by a small grey metadata row 'Atualizado em ... · Destrava Tech', closed by a 1px separator rule, AMBIGUOUS: the exact guide title in this capture could not be read reliably; context from the design spec and QA report suggests the Pix-scam guide but positive visual confirmation was unavailable, Baseline single-guide article screenshot at 1280x900 — long-form reading view of one Destrava Tech how-to guide, Article body: a single narrow left-aligned reading column of about 68 characters, with serif subheadings separated by hairline rules, short paragraphs, lists and callout/quote blocks accented by a thin pink left border, Lower article region: a 'Fontes consultadas' heading with a list of external source links and a 'Continue por aqui' related-guides section rendered as the same card grid used elsewhere on the site, Guide card grid: four evenly spaced white cards per row across the 1280px container, each with a small pink pill category badge, serif title link, muted description and 'Atualizado em ...' footer metadata; pink badge clusters are visible at four distinct horizontal positions in the pixel analysis, Baseline guides index screenshot at 1280x900 — a browsable library of practical technology guides grouped by theme, Guides index hero: uppercase pink kicker 'Biblioteca de guias', serif H1 'Todos os guias' and a short instruction paragraph about choosing a theme and seeing update dates and sources (+17 more)

### Community 5 - "Guias de golpes e fontes"
Cohesion: 0.10
Nodes (21): Golpe do Pix: 7 sinais de alerta e o que fazer para se proteger, Banco do Brasil — Golpes do Pix: saiba como se proteger, Mercado Pago — Golpes pelo Pix: tipos mais comuns e sinais de alerta, SERPRO — Cinco hábitos simples para se proteger de golpes digitais (2026), Verificação em duas etapas como defesa contra golpes, Golpe do WhatsApp: clonagem, código de verificação e falso parente, Banco BMG — Golpe do WhatsApp: saiba como identificar e proteger seus dados, Gov.br (CISC) — Golpistas se passando por entidades do governo (+13 more)

### Community 6 - "Senhas e verificação em duas etapas"
Cohesion: 0.10
Nodes (20): Código de 6 dígitos enviado por SMS, Recuperação da conta roubada (reinstalar e avisar contatos), Golpe 1: roubo da conta do WhatsApp, Verificação em duas etapas com PIN próprio, Gerenciador da Apple (iCloud Keychain), Apps dedicados: Bitwarden (grátis) e 1Password (pago), Ataque de recheio de credenciais (credential stuffing), Frase-senha (senha-mestra de 4-5 palavras) (+12 more)

### Community 7 - "IA: ferramentas e estudo"
Cohesion: 0.15
Nodes (17): ChatGPT (OpenAI), ChatGPT, Gemini ou Meta AI: qual usar para cada tarefa, Gemini (Google), Meta AI (dentro do WhatsApp/Instagram), ChatGPT (OpenAI) — site oficial, Google Gemini — site oficial, Meta AI — site oficial, Teste dos 3 minutos para escolher a IA (+9 more)

### Community 8 - "Páginas fixas e privacidade"
Cohesion: 0.29
Nodes (14): AdSlot component (AdSense placeholder), ArticleCard component, Google advertising / cookies policy, Vercel privacy policy (hosting logs), LGPD / Marco Civil legal compliance concept, 404 Not Found Page, Contato (Contact Page), Guide Article Detail Page (+6 more)

### Community 9 - "Dados móveis e armazenamento"
Cohesion: 0.14
Nodes (15): Backup de fotos só em Wi-Fi (Google Fotos / iCloud), Dados móveis e bateria: 7 ajustes que realmente funcionam, Modo de economia de dados e de bateria, Suporte da Apple — ajuda oficial (iPhone), Suporte do Google Android — ajuda oficial, Uso de dados por app (Android/iPhone), Download automático de mídia no WhatsApp (dados móveis), Backup de conversas do WhatsApp (configurações → conversas) (+7 more)

### Community 10 - "Riscos de IA e privacidade"
Cohesion: 0.22
Nodes (11): Alucinação de IA: fatos inventados com confiança, Privacidade: nunca enviar dados sensíveis à IA, Perigo 1: a IA inventa com confiança (alucinação), Perigo 2: a ilusão de que entendeu, Alucinação da IA: não é fonte da verdade, Conversa própria com a Meta AI, Mensagens para Meta AI saem da criptografia de ponta a ponta, Menção @Meta em grupos e conversas (+3 more)

### Community 11 - "Verificação e arquivos públicos"
Cohesion: 0.24
Nodes (10): ads.txt — Google AdSense publisher declaration (google.com, pub-1903855512494155, DIRECT, f08c47fec0942fa0), AdSense publisher identifier pub-1903855512494155 with DIRECT reseller and fingerprint f08c47fec0942fa0, Deployed site URL https://destrava-tech-rho.vercel.app (Vercel free subdomain, canonical site URL), Pending action: AdSense account not approved; configure ads.txt and enable ads only after approval (docs/pending-actions.md; spec notes ads.txt committed in 60d5abd), Google Search Console site-ownership verification for the deployed domain via verification file at site root, Google site verification token: google-site-verification: googlee2e464378dc22f96.html (public file, exact value retained), robots.txt directive: User-agent * with Allow / — all crawlers permitted on all paths, robots.txt Sitemap directive: https://destrava-tech-rho.vercel.app/sitemap-index.xml (+2 more)

### Community 12 - "Sinais de golpe e WhatsApp"
Cohesion: 0.22
Nodes (10): Falsa central de atendimento e "conta segura", Golpe do falso parente (troca de número), Links suspeitos por SMS, WhatsApp ou e-mail, Mecanismo Especial de Devolução (MED) do Banco Central, Pix (pagamento instantâneo irreversível), Os 7 sinais de alerta do golpe do Pix, Urgência fabricada ("é agora ou nunca"), Golpe 2: o falso parente (+2 more)

### Community 13 - "QA e critérios de aceite"
Cohesion: 0.22
Nodes (9): Counter-evidence and monetization risks, MVP acceptance criteria, MVP scope (static responsive site, 10-12 articles), 14 passing QA checks in real Chromium 157, Header hide-on-scroll bug and fix (scrolled query unsupported), Not executed: screen reader, Safari/Firefox, Lighthouse, Task 1: base nav, dates and responsive fixes, Task 6: final QA, documentation and handoff (no deploy) (+1 more)

### Community 14 - "Navegação e ClientRouter"
Cohesion: 0.38
Nodes (7): astro:before-swap event, astro:page-load event, astro:before-preparation / after-preparation / after-swap events, setupNavigation (header popover measurement + scroll hide), setupPageLifecycle (ClientRouter generation guard), setupSkeleton (300ms delayed navigation skeleton), setupTableScroll (accessible scrollable tables)

### Community 15 - "Scripts de interação"
Cohesion: 0.43
Nodes (4): Cleanup, setupNavigation(), setupPageLifecycle(), setupTableScroll()

### Community 16 - "Home animada e ilustrações"
Cohesion: 0.67
Nodes (3): New animated magazine-cover homepage, Local SVG illustrations with light motion, Magazine page-turn motion direction

## Ambiguous Edges - Review These
- `Portfolio registry: Destrava Tech (proj-001, static-web Astro, Vercel Hobby)` → `SITE.contactEmail = macedoartur1250@gmail.com (public contact of responsible adult)`  [AMBIGUOUS]
  src/site.config.ts · relation: shares_data_with
- `Baseline single-guide article screenshot at 1280x900 — long-form reading view of one Destrava Tech how-to guide` → `AMBIGUOUS: the exact guide title in this capture could not be read reliably; context from the design spec and QA report suggests the Pix-scam guide but positive visual confirmation was unavailable`  [AMBIGUOUS]
  baseline-article-desktop.png · relation: references
- `Article header: a pink pill category badge above a large serif H1 with a short measure, followed by a small grey metadata row 'Atualizado em ... · Destrava Tech', closed by a 1px separator rule` → `AMBIGUOUS: the exact guide title in this capture could not be read reliably; context from the design spec and QA report suggests the Pix-scam guide but positive visual confirmation was unavailable`  [AMBIGUOUS]
  baseline-article-desktop.png · relation: references

## Knowledge Gaps
- **94 isolated node(s):** `ADR-0001`, `Teste dos 3 minutos para escolher a IA`, `ChatGPT (OpenAI) — site oficial`, `Google Gemini — site oficial`, `Meta AI — site oficial` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 132 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 5 inferred relationships involving `ChatGPT, Gemini ou Meta AI: qual usar para cada tarefa` (e.g. with `ChatGPT (OpenAI)` and `Gemini (Google)`) actually correct?**
  _`ChatGPT, Gemini ou Meta AI: qual usar para cada tarefa` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ADR-0001`, `Teste dos 3 minutos para escolher a IA`, `ChatGPT (OpenAI) — site oficial` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Monetização e publicação` be split into smaller, more focused modules?**
  _Cohesion score 0.06565656565656566 - nodes in this community are weakly interconnected._
- **Are the 9 inferred relationships involving `Verificação em duas etapas (segundo fator)` (e.g. with `Verificação em duas etapas como defesa contra golpes` and `Verificação em duas etapas com PIN próprio`) actually correct?**
  _`Verificação em duas etapas (segundo fator)` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Should `Componentes e tipos Astro` be split into smaller, more focused modules?**
  _Cohesion score 0.07973421926910298 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Portfolio registry: Destrava Tech (proj-001, static-web Astro, Vercel Hobby)` and `SITE.contactEmail = macedoartur1250@gmail.com (public contact of responsible adult)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `Baseline single-guide article screenshot at 1280x900 — long-form reading view of one Destrava Tech how-to guide` and `AMBIGUOUS: the exact guide title in this capture could not be read reliably; context from the design spec and QA report suggests the Pix-scam guide but positive visual confirmation was unavailable`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._