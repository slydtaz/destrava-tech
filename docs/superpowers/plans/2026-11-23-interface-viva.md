# Interface viva Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o tema sobreviver à navegação, substituir as ilustrações de retângulos/círculos por traços que acompanham o tema, tornar o movimento perceptível e adicionar elementos de utilidade em todas as páginas.

**Architecture:** Astro 5 + ClientRouter. O tema passa a ser copiado para o documento entrante nos eventos do router. As ilustrações deixam de ser `<img>` externas e passam a SVG inline vindo de `?raw`, para herdar variáveis CSS. Movimento usa CSS scroll-driven com fallback `IntersectionObserver`, registrado no ciclo de vida do ClientRouter. Elementos novos usam apenas tokens do design system e dicionários i18n existentes.

**Tech Stack:** Astro 5.18.2, TypeScript, CSS nativo, Playwright para QA, Vercel CLI para deploy.

**Spec:** `docs/superpowers/specs/2026-11-23-interface-viva-spec.md`

## Global Constraints

- Zero dependência, plugin, pacote, skill, analytics, cookie ou requisição externa nova.
- `SITE.adsEnabled` continua `false`; `ads.txt` intocado.
- PT na raiz; EN/ES espelham caminhos; textos novos nos 3 dicionários.
- WCAG 2.2 AA: foco visível, alvos novos ≥ 44 px, contraste 4,5:1, `prefers-reduced-motion` respeitado, estado final sempre visível.
- Nenhum dado inventado (nome, cidade, UF, foro, depoimento, estatística, revisão humana).
- Cada tarefa termina com `npm run build` limpo e commit local.
- Deploy autorizado no mesmo fluxo, somente em `slydtx/destrava-tech`, após QA.

## Review Focus

- Tema salvo como `dark` deve permanecer escuro após qualquer navegação interna, inclusive troca de idioma — teste: clique em 2 links internos e confirme `dataset.theme === 'dark'` e fundo `rgb(9,9,11)`.
- SVG inline não pode vazar `aria-hidden` ausente nem perder proporção 1:1 — teste: inspecionar `<svg>` renderizado e `width`/`height` do wrapper.
- Navegador sem `animation-timeline: view()` precisa ainda revelar conteúdo — teste: forçar `CSS.supports` falso e conferir classe do fallback.
- Filtro e ToC não podem criar âncoras quebradas em EN/ES — teste: navegar nas 3 versões e verificar `href` e alvos.
- Nenhuma cor fixa nova em elementos visíveis — teste: `grep` por `#` em componentes alterados (exceto tokens em `global.css`).

---

### Task 1: Tema persistente no ClientRouter

**Files:**
- Modify: `src/components/ThemeToggle.astro` (script)

**Interfaces:**
- Consumes: `localStorage['dt-theme']`, `document.documentElement.dataset.theme` (já usados).
- Produces: tema correto no documento entrante em `astro:before-swap` e `astro:after-swap`.

- [x] **Step 1: adicionar `astro:before-swap`** copiando o tema resolvido para `event.newDocument.documentElement.dataset.theme`.
- [x] **Step 2: adicionar `astro:after-swap`** reaplicando o tema antes da pintura e chamando `sync()`.
- [x] **Step 3: validar** com build e checagem no ar/local de 2 navegações com `dark` salvo.
- [x] **Step 4: commit** `fix: mantém tema ao navegar com ClientRouter`.

### Task 2: Nova linguagem visual das ilustrações

**Files:**
- Rewrite: `public/illustrations/*.svg` (24 arquivos)
- Modify: `src/components/Illustration.astro`
- Modify: `src/components/Header.astro` (logo)
- Modify: `src/styles/global.css` (badge)
- Modify: `src/components/HomePage.astro` (`.how-node`)
- Modify: `src/components/AnimatedExample.astro` (linha/quadrado)

**Interfaces:**
- Consumes: variáveis `--color-primary`, `--color-accent`, `--color-muted-foreground`, `--color-background`.
- Produces: `<Illustration src="/illustrations/x.svg" size={n} eager? />` com SVG inline decorativo.

- [x] **Step 1: reescrever os SVGs** com `<path>` (arcos, curvas, chevrons) e `stroke="var(--...)"`, sem `<rect>`/`<circle>` e sem hex fixo.
- [x] **Step 2: trocar `Illustration.astro` para inline** via `import.meta.glob('/public/illustrations/*.svg', { query: '?raw', import: 'default', eager: true })`, mantendo `size`, `eager`, `width`/`height`, `aria-hidden` e `data-astro-cid` do wrapper.
- [x] **Step 3: trocar os decores CSS**: nós redondos → chevrons; barra/quadrado do exemplo → seta/losango; badge pílula → etiqueta com canto cortado; logo → apenas raio em `currentColor`/accent.
- [x] **Step 4: validar** build, tamanhos 144/352/112 px, zero `<rect>`/`<circle>` nos SVGs, zero hex novo fora dos tokens.
- [x] **Step 5: commit** `feat: ilustrações em traços e decores que acompanham o tema`.

### Task 3: Movimento perceptível com fallback

**Files:**
- Modify: `src/styles/motion.css`
- Modify: `src/layouts/Base.astro`
- Create: `src/scripts/reveal.ts`

**Interfaces:**
- Consumes: `astro:page-load`, `astro:before-swap`, `CSS.supports`, `matchMedia`.
- Produces: `.reveal` visível por padrão, com classe de fallback quando necessário; barra de progresso global.

- [x] **Step 1: aumentar transição** para ~280 ms mantendo reduced motion.
- [x] **Step 2: mover `.reading-progress` para `Base.astro`** e remover a duplicata de `GuidePage.astro`.
- [x] **Step 3: criar `reveal.ts`** com observer/fallback e cleanup; registrar em `Base.astro` ao lado de `setupPageLifecycle()`.
- [x] **Step 4: aplicar `.reveal`** em seções/cards por CSS global, sem esconder nada por padrão.
- [x] **Step 5: validar** build + rolagem com e sem fallback + reduced motion.
- [x] **Step 6: commit** `feat: movimento visível com fallback e progresso de leitura`.

### Task 4: Elementos de utilidade

**Files:**
- Modify: `src/components/GuidePage.astro`
- Modify: `src/pages/guias/index.astro`, `src/pages/en/guias/index.astro`, `src/pages/es/guias/index.astro`
- Modify: `src/i18n/{pt,en,es}.ts`
- Create: `src/scripts/guide-tools.ts`

**Interfaces:**
- Consumes: `headings` do `render()`, `PILLARS`, `t(lang, key)`.
- Produces: ToC, copiar link, filtro por pilar, voltar ao topo.

- [x] **Step 1: adicionar chaves i18n** nos 3 idiomas.
- [x] **Step 2: ToC** em `GuidePage.astro` a partir de `headings` (h2/h3), com `aria-label`.
- [x] **Step 3: copiar link** com status `aria-live`.
- [x] **Step 4: filtro por pilar** nos 3 índices, com `aria-pressed` e `hidden`.
- [x] **Step 5: voltar ao topo** em `Base.astro`, 44 px, aparece após rolagem.
- [x] **Step 6: validar** build e navegação PT/EN/ES.
- [x] **Step 7: commit** `feat: índice, copiar link, filtro e voltar ao topo`.

### Task 5: Documentação, QA e deploy

**Files:**
- Modify: `docs/central-de-links.md`, `docs/changelog.md`, `docs/pending-actions.md`
- Modify: `docs/qa-report.md`

- [x] **Step 1: registrar sitemap confirmado (60 páginas)** e remover item pendente.
- [x] **Step 2: registrar versão 0.2.2** no changelog.
- [x] **Step 3: QA final** — build, `git diff --check`, Playwright em 320/390/768/1280 px, tema, filtro, ToC, copiar link, voltar ao topo, reduced motion, console e zero requisição externa.
- [x] **Step 4: commit** `docs: registra 0.2.2 e QA`.
- [x] **Step 5: deploy** `vercel deploy --prod --yes` em `slydtx/destrava-tech` e validação no ar.
- [x] **Step 6: commit final** com ID do deploy.
