# Ícones Lucide + botão de animações Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir os SVGs e decores feitos à mão por ícones Lucide consistentes e dar ao proprietário um botão no header para ligar/desligar animações, com padrão ligado.

**Architecture:** Os SVG da Lucide entram como texto em `public/illustrations/` e são injetados inline pelo componente existente `Illustration.astro`, herdando tokens do tema. O estado de movimento passa a viver em `data-motion` no `<html>`, aplicado por script inline antes da pintura, preservado no ClientRouter e alternado por um botão no header. As media queries `prefers-reduced-motion` são substituídas por seletores desse atributo, mantendo o estado final sempre visível.

**Tech Stack:** Astro 5.18.2, TypeScript, CSS nativo, SVG Lucide (ISC/MIT) copiados como texto, agent-browser para QA, Vercel CLI apenas se houver autorização nova.

**Spec:** `docs/superpowers/specs/2026-11-23-icones-lucide-design.md`

## Global Constraints

- Zero dependência, pacote, plugin, CDN ou requisição externa nova. `SITE.adsEnabled` continua `false`.
- Identidade preto+rosa; nenhum hex novo fora dos tokens em `global.css`.
- PT na raiz; EN/ES espelham caminhos; toda string nova nos três dicionários.
- WCAG 2.2 AA: foco visível, alvos novos ≥ 44 px, contraste dos tokens, estado final sempre visível.
- `prefers-reduced-motion` deixa de ser o padrão por decisão explícita do proprietário; botão permite desligar.
- SVGs decorativos com `aria-hidden`; nenhum ícone vira conteúdo informativo.
- Cada tarefa termina com `npm run build` exit 0 e commit local. **Deploy não autorizado nesta rodada.**
- Sitemap intocado: 60 URLs / 180 alternates já confirmados pelo Google.

## Review Focus

- **Navegador com `prefers-reduced-motion: reduce`:** com padrão ligado, animações devem aparecer. Teste: emular reduced motion, abrir `/guias/`, conferir `data-motion='on'`, `animationName: 'reveal-up'` e barra `display: block`.
- **Botão desligado:** nenhum conteúdo pode ficar invisível. Teste: clicar no botão, conferir `data-motion='off'`, `opacity: 1` em `.card`/`.section-head` e `animationName: 'none'`.
- **Persistência no ClientRouter:** estado não pode voltar ao padrão ao navegar. Teste: desligar, navegar `/` → `/en/guias/` → `/es/sobre/`, conferir `data-motion='off'` em todos.
- **Tema e movimento juntos:** os dois atributos precisam sobreviver ao swap simultaneamente. Teste: `dt-theme='dark'` + `dt-motion='off'`, duas navegações, conferir `rgb(9,9,11)` e movimento desligado.
- **Ícones sem vazamento de tema:** nenhum `stroke` fixo. Teste: conferir que os 24 SVGs usam `var(--color-*)` ou `currentColor` e que nenhum `<rect>`/`<circle>` antigo resta.

---

### Task 1: Botão de animações com padrão ligado

**Files:**
- Create: `src/components/MotionToggle.astro`
- Modify: `src/layouts/Base.astro` (script inline no `<head>`)
- Modify: `src/components/Header.astro` (importar e renderizar ao lado de `ThemeToggle`)
- Modify: `src/i18n/pt.ts`, `src/i18n/en.ts`, `src/i18n/es.ts`
- Modify: `src/styles/motion.css`, `src/styles/global.css`
- Modify: `src/scripts/reveal.ts`, `src/scripts/guide-tools.ts`

**Interfaces:**
- Consumes: padrão de `ThemeToggle.astro` (`astro:before-swap`, `astro:after-swap`, `astro:page-load`, `localStorage` com try/catch).
- Produces: `document.documentElement.dataset.motion` ∈ `{'on','off'}`; `localStorage['dt-motion']` ∈ `{'on','off'}` (ausente = ligado); seletor `:root[data-motion='on']` e `:root[data-motion='off']` no CSS.

- [x] **Step 1: adicionar chaves i18n** nos três dicionários: `motion.toggle` ("Alternar animações"/"Toggle animations"/"Alternar animaciones"), `motion.on` ("Animações ligadas"/"Animations on"/"Animaciones activadas"), `motion.off` ("Animações desligadas"/"Animations off"/"Animaciones desactivadas"). Manter paridade de contagem entre pt/en/es.

- [x] **Step 2: aplicar `data-motion` antes da pintura** em `Base.astro`, dentro do `<head>`, logo após o script de tema: ler `localStorage['dt-motion']`, aceitar somente `'on'`/`'off'`, padrão `'on'` quando ausente ou bloqueado, e gravar em `document.documentElement.dataset.motion`. Usar `<script is:inline>` com try/catch aninhado, igual ao tema.

- [x] **Step 3: criar `MotionToggle.astro`** com botão `.motion-toggle`, `aria-pressed`, `title`, `data-label-on`/`data-label-off`, dois SVGs inline Lucide (`play` e `pause`, `viewBox 0 0 24 24`, `stroke: currentColor`), e script que segue exatamente o ciclo de `ThemeToggle.astro`: `astro:before-swap` copia `data-motion` para `newDocument.documentElement`, `astro:after-swap` reaplica do `localStorage`, `astro:page-load` reinstala o listener com guarda de duplo registro. `sync()` atualiza `aria-pressed` e `title`. Clique alterna `on`/`off`, persiste e chama `sync()`.

- [x] **Step 4: renderizar no header** — importar `MotionToggle` em `Header.astro` e colocar `<MotionToggle lang={lang} />` imediatamente depois de `<ThemeToggle lang={lang} />`.

- [x] **Step 5: reestruturar o CSS de movimento** — em `motion.css`, `global.css`, `HomePage.astro` e `AnimatedExample.astro`, substituir cada `@media (prefers-reduced-motion: no-preference)` por um seletor `:root[data-motion='on']` envolvendo as mesmas declarações, e cada `@media (prefers-reduced-motion: reduce)`/regra de desligamento por `:root[data-motion='off']`. Preservar `@supports`, `@keyframes`, durações (280 ms), `animation-timeline` e o estado final visível. Em `global.css`, ajustar também a regra com `transition: none !important` para depender de `data-motion='off'`.

- [x] **Step 6: alinhar os scripts** — em `reveal.ts`, trocar `matchMedia('(prefers-reduced-motion: reduce)')` pela checagem de `document.documentElement.dataset.motion === 'off'`; em `guide-tools.ts`, trocar o `matchMedia` do `scrollTo` pela mesma checagem. Manter o fallback `IntersectionObserver` e o cleanup do ClientRouter intactos.

- [x] **Step 7: estilizar o botão** em `global.css`: `.motion-toggle` com `inline-size`/`block-size` de 44 px, `display: inline-flex`, `align-items: center`, `justify-content: center`, `color: var(--color-primary)`, `background: transparent`, `border: 0`, `cursor: pointer`, ícones de 1.25 rem. Na media query estreita existente (`.site-logo .logo-text`, `.menu-button .menu-text`), o header já comporta três controles de 44 px — confirmar `scrollWidth === clientWidth` em 320 px e, se necessário, reduzir o `gap`.

- [x] **Step 8: validar com build e navegador** — `npm run build` exit 0; `git diff --check` limpo. No preview local: (a) reduced motion emulado + padrão → `data-motion='on'`, `.card` com `animationName: 'reveal-up'` e barra `display: block`; (b) clique → `data-motion='off'`, `.card` `opacity: 1` e `animationName: 'none'`; (c) navegar PT → EN → ES mantendo `off`; (d) tema escuro + `off` em duas navegações mantém `rgb(9,9,11)`; (e) 0 erros de console.

- [x] **Step 9: commit** `feat: botão de animações com padrão ligado`.

### Task 2: Ícones Lucide nos 24 SVGs

**Files:**
- Rewrite: `public/illustrations/*.svg` (24 arquivos)
- Create: `docs/third-party-credits.md`
- Modify: `src/components/Illustration.astro` (apenas se necessário para o viewBox 24)

**Interfaces:**
- Consumes: `import.meta.glob('/public/illustrations/*.svg', { query: '?raw' })` já existente em `Illustration.astro`.
- Produces: 24 SVGs com `viewBox="0 0 24 24"`, `fill="none"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"` e `stroke` por `var(--color-primary)` / `var(--color-accent)`.

- [x] **Step 1: baixar os SVG oficiais** da Lucide via `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/<nome>.svg` (somente leitura, em tempo de desenvolvimento — entra no repositório como texto, nunca em runtime). Validar HTTP 200 para cada nome; se algum não existir, escolher o equivalente da mesma categoria e registrar a troca.

- [x] **Step 2: mapear os 24 arquivos** — `home-cover`→`trending-up`; `pillar-seguranca`→`shield-check`; `pillar-whatsapp`→`message-circle`; `pillar-celular`→`smartphone`; `pillar-ia`→`sparkles`; `about`→`users`; `contact`→`mail`; `privacy`→`lock-keyhole`; `terms`→`file-text`; `notfound`→`compass`; guias→`globe` (exterior), `bot` (qual IA usar), `battery-charging` (bateria/dados), `shield-alert` (falso suporte), `circle-alert` (golpe Pix), `message-circle-check` (proteção WhatsApp), `graduation-cap` (estudar), `languages` (traduzir), `hard-drive` (espaço), `sparkles` (Meta AI), `key-round` (senhas), `scan-face` (2FA), `settings-2` (privacidade WhatsApp), `wifi` (Wi-Fi público).

- [x] **Step 3: escrever os arquivos** com o conteúdo baixado, substituindo `stroke="currentColor"` por `stroke="var(--color-primary)"` no traço principal e `stroke="var(--color-accent)"` em um detalhe quando houver mais de um `<path>`. Remover `width`/`height` fixos (o wrapper controla o tamanho). Manter `aria-hidden="true"` e `focusable="false"` no `<svg>`.

- [x] **Step 4: crédito de licença** — criar `docs/third-party-credits.md` com os avisos ISC da Lucide e MIT do Feather na íntegra, conforme `https://raw.githubusercontent.com/lucide-icons/lucide/main/LICENSE`, indicando que os SVG foram copiados e adaptados com tokens locais.

- [x] **Step 5: validar** build exit 0; conferir zero `<rect>`/`<circle>`/hex nos 24 arquivos, `viewBox` 24 em todos, e no navegador: 5 SVGs inline na home, 0 `<img>` em `.illustration`, tamanhos 352/144/112 px preservados, traços claros `rgb(24,24,27)` → escuros `rgb(250,250,250)`.

- [x] **Step 6: commit** `feat: troca ilustrações por ícones Lucide`.

### Task 3: Decores com ícones Lucide

**Files:**
- Modify: `src/components/Header.astro` (logo)
- Modify: `src/components/HomePage.astro` (`.how-node`)
- Modify: `src/components/AnimatedExample.astro` (linha e passo)
- Modify: `src/layouts/Base.astro` (`back-to-top`)
- Modify: `src/scripts/guide-tools.ts` (copiar link)

**Interfaces:**
- Consumes: ícones Lucide da Task 2 (`zap`, `chevron-right`, `arrow-right`, `check`, `arrow-up`, `link`).
- Produces: nenhum decore feito com `clip-path` ou `<path>` desenhado à mão nos componentes listados.

- [x] **Step 1: logo** — substituir o `<path>` do raio em `Header.astro` pelo SVG Lucide `zap`, mantendo `viewBox 0 0 64 64`, `aria-hidden`, `focusable="false"` e `style="stroke:var(--color-accent)"` (ou `fill` equivalente) para acompanhar o tema.

- [x] **Step 2: marcadores do "como funciona"** — em `HomePage.astro`, trocar os três `<span class="how-node">` por SVG inline Lucide `chevron-right` com `stroke: var(--color-accent)`, mantendo a grade de três colunas e a linha `.how-line`. Ajustar `.how-node` no CSS para dimensionar o SVG (1 rem) em vez de aplicar `clip-path`.

- [x] **Step 3: exemplo animado** — em `AnimatedExample.astro`, trocar `.animated-example-line` (seta segmentada via `clip-path`) por SVG `arrow-right` e `.animated-example-step` (losango rotacionado) por SVG `check`, com `stroke: var(--color-accent)`. Manter as animações `example-line-in`/`example-step-in` aplicadas ao `<svg>` e os estados finais visíveis.

- [x] **Step 4: voltar ao topo e copiar link** — em `Base.astro`, substituir o `<path>` do botão por SVG Lucide `arrow-up`; em `guide-tools.ts`, injetar ícone `link` no botão de copiar e trocar por `check` no estado `ok`, sem alterar os rótulos `aria-live`.

- [x] **Step 5: validar** build exit 0, `git diff --check` limpo; no navegador conferir foco visível nos botões, alvos de 44 px, nenhum decore com `clip-path` nos componentes alterados, ícones acompanhando tema claro/escuro e 0 erros de console.

- [x] **Step 6: commit** `feat: decores com ícones Lucide`.

### Task 4: QA final e documentação

**Files:**
- Modify: `docs/changelog.md`, `docs/qa-report.md`, `docs/central-de-links.md`
- Modify: `docs/superpowers/specs/2026-11-23-icones-lucide-design.md` (marcar aprovado)

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: versão 0.2.3 registrada (sem deploy), QA com evidências.

- [x] **Step 1: registrar versão 0.2.3** no changelog como `PREPARADO — aguardando autorização de deploy`, descrevendo ícones Lucide, botão de animações e a decisão de padrão ligado.

- [x] **Step 2: QA final** — build exit 0, `git diff --check` limpo, i18n paritário, sitemap 60/180 intacto, responsividade 320/390/768/1280 px sem overflow, reduced motion com padrão ligado, botão desligado sem conteúdo invisível, persistência PT/EN/ES, tema + movimento juntos, console limpo, zero requisição externa, zero anúncios/cookies.

- [x] **Step 3: documentar evidências** em `docs/qa-report.md` e atualizar status em `docs/central-de-links.md` sem alterar o ID do último deploy.

- [x] **Step 4: commit** `docs: registra 0.2.3 e QA dos ícones`.
