# Interface e Movimento — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar a navegação contínua, adicionar movimento com propósito e corrigir os defeitos de base encontrados, sem quebrar privacidade, acessibilidade ou o visual editorial.

**Architecture:** Astro 5 estático. O `<ClientRouter fallback="swap" />` no `Base.astro` cuida da troca de páginas; scripts de navegação são (re)instalados em `astro:page-load` e limpos em `astro:before-swap`. Todo movimento vive em `src/styles/motion.css`, separado do CSS estrutural. O skeleton é um elemento persistido pelo próprio router, controlado por um timer de 300ms ligado aos eventos de preparação — nunca por atraso artificial.

**Tech Stack:** Astro 5.10, TypeScript inline, CSS nativo (`@starting-style`, `view-transition-name`, `animation-timeline: scroll()`), Playwright via MCP para QA. Nenhum pacote novo.

**Spec:** `docs/superpowers/specs/2026-11-23-interface-motion-design.md`

## Global Constraints

- **Não instalar** pacote, plugin, skill, fonte externa, analytics ou cookie de terceiro.
- **Não publicar** no Vercel nesta rodada: o proprietário decidirá depois do QA.
- **Não inventar** nome, e-mail, foro, depoimento, fonte, estatística ou dado legal. Onde faltar dado, usar texto neutro e verdadeiro + registrar pendência em `docs/pending-actions.md`.
- Nenhuma requisição de rede externa; fontes continuam locais via `@fontsource-variable`.
- `SITE.adsEnabled` continua `false`; `AdSlot`/`ConsentBar` continuam desligados.
- Idioma: pt-BR simples. Sem jargão, sem emojis como ícone.
- Movimento: entrada/transição 160–220ms; hover 120ms (exceção curta); pulse do skeleton 1.2s (loop funcional, fora da faixa). Apenas `opacity`/`transform`/`border-color`; `prefers-reduced-motion: reduce` desliga tudo e mantém o estado final visível.
- Skeleton: limite de **300ms** medido em `astro:before-preparation`; se a página chegar antes, nada aparece. Teto duro de **3s** para limpar erro/offline. Esconder em `astro:after-swap`. Nunca atrasar navegação de propósito.
- **Não usar `transition:persist` no `.site-header`** (o `aria-current` é calculado no servidor e ficaria errado). Persistir apenas o skeleton.
- **Não adicionar `transition:animate="none"` no `<html>`**; o visual da transição é definido em `::view-transition-old(root)` / `::view-transition-new(root)`.
- Não criar `aria-live` extra para o skeleton: o `ClientRouter` já anuncia a nova rota. O texto sr-only "Carregando página…" entra no DOM só enquanto o skeleton aparece.
- Barra de progresso de leitura envolvida em `@supports (animation-timeline: scroll())`; sem suporte ou com reduced motion, fica oculta (`display:none`), nunca em 0%/100% enganoso.
- Critérios de aceitação e backlog completo: ler a spec antes de cada tarefa.

## Review Focus

1. **Script morto após troca de página** — menu, popover e header devem continuar funcionando após 5 navegações (Início → Guias → Artigo → voltar → Guias); behavior de scroll e menu não pode duplicar; teste na Task 3.
2. **Skeleton mentiroso ou tardio** — não pode aparecer em navegação rápida, deve sumir no `astro:after-swap` (não cobrir conteúdo já pintado), ter teto de 3s e limpar o texto sr-only; teste com eventos sintéticos e rede simulada na Task 2/6.
3. **Popover aberto + resize para desktop + `aria-expanded`** — estado deve zerar e foco não deve ficar preso; teste de resize com menu aberto na Task 3.
4. **Tabela em 320px e teclado** — overflow zero e a tabela ser alcançável por Tab com rótulo; teste na Task 1 e Task 3.
5. **Reduced motion escondendo conteúdo** — nenhum elemento pode ficar em `opacity: 0`; barra de progresso `display:none`; teste com emulação de `prefers-reduced-motion` na Task 4.
6. **Foco após navegação** — se o foco parar no `<main>`, o `:focus-visible` precisa aparecer; teste de Tab após troca de página na Task 3/4.
7. **Placeholders legais vazando** — nenhum `[PREENCHER]` pode chegar ao visitante; teste com `grep` e navegação nas páginas legais na Task 5.

---

### Task 1: Correções de base de navegação, datas e responsividade

**Files:**
- Modify: `src/components/Header.astro:14-15,28-39`
- Modify: `src/components/ArticleCard.astro:12`
- Modify: `src/pages/guias/[...id].astro:16`
- Modify: `src/styles/global.css:49-52,123-127,336-343,388-426,560-565,641-652,714-725`

**Interfaces:**
- Consumes: tokens `--header-height`, `--color-ring` de `global.css:39,23`.
- Produces: `.card h3 a::after` como área clicável; `aria-current="location"` para descendentes de `/guias/`; datas formatadas em UTC. A Task 3 adicionará `aria-expanded` dinâmico sobre o valor inicial `false`.

- [ ] **Step 1: Ajustar `aria-current` e estado inicial do menu em `Header.astro`**
  - `isCurrent(href)` retorna `page` apenas em correspondência exata e `location` quando `href !== '/'` e `currentPath.startsWith(href)`.
  - Renderizar `aria-current={...}` no `<a>` e `aria-expanded="false"` inicial no `.menu-button`.

- [ ] **Step 2: Corrigir datas em `ArticleCard.astro` e `[...id].astro`**
  - `new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })` nos dois arquivos.
  - Verificar no navegador que a data aparece como `23 de novembro de 2026`, não `22`.

- [ ] **Step 3: Aplicar correções CSS estruturais em `global.css`**
  - `html { scroll-padding-top: calc(var(--header-height) + var(--space-4)) }` e `section[id] { scroll-margin-top: calc(var(--header-height) + var(--space-4)) }`.
  - `.article-body table { display:block; overflow-x:auto; max-inline-size:100% }`.
  - `.card { position:relative }`, `.card h3 a::after { content:''; position:absolute; inset:0 }`, trocar `.card:hover` por `.card:has(a:hover)` e adicionar `.card:has(a:focus-visible) { outline:3px solid var(--color-ring); outline-offset:3px }`.
  - `main:focus:not(:focus-visible) { outline:none }` (substituir regra atual).
  - Alvos isolados: `.section-head > a, .sources a, .footer-nav a { display:inline-flex; align-items:center; min-block-size:24px }`.
  - Envolver botões do 404 com `display:flex; flex-wrap:wrap; gap:var(--space-3)` (editar `src/pages/404.astro` se necessário).
  - Em `@media (max-width:40rem)`: `main { padding-block-end: var(--space-8) }`.

- [ ] **Step 4: Verificar**
  - Run: `npm run build`
  - Esperado: build sem erros, 17 páginas + sitemap.
  - Playwright em 320, 375 e 1280px nas rotas `/`, `/guias/`, `/guias/chatgpt-gemini-meta-ai-qual-usar/`, `/guias/golpe-do-pix-sinais-de-alerta/`:
    - `document.documentElement.scrollWidth - innerWidth === 0` em todas.
    - `getComputedStyle(document.documentElement).scrollPaddingTop !== '0px'`.
    - Em `/guias/#seguranca` via home, o topo da seção fica abaixo do header (diferença ≥ 60px).
    - Em artigo, `document.querySelector('main a[aria-current]')` não existe; no header, "Guias" tem `aria-current="location"`, não `page`.
    - Texto da data contém `23 de novembro de 2026`.
    - Tab até um card: `document.activeElement` é o `<a>` do título e o outline do card aparece.

- [ ] **Step 5: Commit**
  - `git add src/components/Header.astro src/components/ArticleCard.astro src/pages/guias/[...id].astro src/pages/404.astro src/styles/global.css`
  - `git commit -m "fix: base navigation, dates and mobile overflow"`

---

### Task 2: Skeleton honesto

**Files:**
- Create: `src/components/NavigationSkeleton.astro`
- Create: `src/scripts/skeleton.ts`
- Modify: `src/layouts/Base.astro` (importar componente e script; nada mais nesta tarefa)

**Interfaces:**
- Consumes: tokens de `--color-card`, `--color-border`, `--color-muted` de `global.css`.
- Produces: `setupSkeleton(): () => void` — registra `astro:before-preparation`, `astro:after-preparation`, `astro:after-swap` e `astro:page-load`, e devolve cleanup que limpa os timers, esconde o overlay, remove o texto sr-only e remove os listeners.
- O componente expõe o seletor `.nav-skeleton` (raiz, com `hidden` nesta tarefa). `transition:persist` será adicionado na Task 3, junto com o `ClientRouter`, para que o build desta tarefa não dependa do router. O texto sr-only é criado/removido pelo JS, não existe no HTML inicial.

- [ ] **Step 1: Criar `NavigationSkeleton.astro`**
  - `<div class="nav-skeleton" hidden aria-hidden="true">` com 4 blocos: uma linha de título, duas linhas de texto e dois retângulos de card, todos vazios e sem conteúdo textual. Sem `transition:persist` até a Task 3.
  - **Sem** `role="status"` e sem texto fixo no HTML: o `ClientRouter` já anuncia a rota; um `aria-live` extra duplicaria o anúncio.
  - Sem `role="progressbar"` e sem porcentagem: a duração é desconhecida.

- [ ] **Step 2: Implementar `setupSkeleton()` em `src/scripts/skeleton.ts`**
  - `const THRESHOLD_MS = 300; const HARD_TIMEOUT_MS = 3000;`.
  - Em `astro:before-preparation`: se `event.to.href === event.from.href` ou `event.to.hash`, sair. Guardar início, limpar timers anteriores, agendar timer de 300ms que remove `hidden`, cria `<p class="visually-hidden" data-skeleton-status>Carregando página…</p>` logo após a raiz e agenda o teto duro de 3s.
  - Em `astro:after-preparation`: limpar apenas o timer de 300ms (não esconder ainda, para não piscar a página antiga no swap).
  - Em `astro:after-swap`: chamar `hide()` — remove `hidden`, remove o texto sr-only e limpa os timers.
  - Em `astro:page-load`: chamar `hide()` como rede de segurança.
  - O teto de 3s também chama `hide()` se nenhum evento de conclusão chegar (fetch falhou/offline).

- [ ] **Step 3: Estilos do skeleton em `src/styles/motion.css` (criar arquivo agora, só o bloco do skeleton)**
  - `.nav-skeleton { position:fixed; inset:var(--header-height) 0 0; z-index:40; display:grid; align-content:start; gap:var(--space-4); padding:var(--space-8) max(1rem, calc((100vw - 72rem)/2)); background:var(--color-background) }`.
  - Blocos: `background:var(--color-muted); border-radius:var(--radius); height:1rem` (título 2rem, cards 8rem).
  - `@keyframes skeleton-pulse { 50% { opacity:.45 } }` com `1.2s ease-in-out infinite`, **dentro** de `@media (prefers-reduced-motion: no-preference)`; fora dele os blocos ficam estáticos.
  - `.nav-skeleton[hidden] { display:none }`.
  - Respeitar `forced-colors`: borda `1px solid CanvasText` nos blocos.

- [ ] **Step 4: Ligar no layout**
  - Em `Base.astro`: renderizar `<NavigationSkeleton />` logo após `<Header ... />` e importar `setupSkeleton` no `<script>` existente, chamando-o uma vez. Nenhuma outra mudança de script nesta tarefa.

- [ ] **Step 5: Verificar**
  - Run: `npm run build` → sem erros.
  - Playwright em `/` (depois, repetir com `npm run preview` + rede simulada lenta na Task 6):
    - `document.querySelector('.nav-skeleton').hidden === true` e `document.querySelector('[data-skeleton-status]') === null` no estado inicial.
    - Disparar `document.dispatchEvent(new Event('astro:before-preparation'))`; após 350ms: `hidden === false` e o texto sr-only existe. Disparar `astro:after-preparation` e `astro:after-swap`; `hidden === true` e o texto sr-only foi removido.
    - Repetir disparando `astro:after-preparation`/`astro:after-swap` antes de 300ms: `hidden` continua `true` e nenhum status entra no DOM.
    - Deixar o timer de 3s vencer sem evento de conclusão: overlay volta a `hidden`.
    - Navegação real Início → Guias → artigo: skeleton continua `hidden` e o console não registra erros.
    - Com emulação de reduced motion: blocos sem `animation-name`.

- [ ] **Step 6: Commit**
  - `git add src/components/NavigationSkeleton.astro src/scripts/skeleton.ts src/styles/motion.css src/layouts/Base.astro`
  - `git commit -m "feat: honest navigation skeleton"`

---

### Task 3: ClientRouter e ciclo de vida dos scripts

**Files:**
- Modify: `src/layouts/Base.astro` (head + script)
- Modify: `src/components/NavigationSkeleton.astro` (adicionar `transition:persist`)
- Create: `src/scripts/site-navigation.ts`
- Create: `src/scripts/table-scroll.ts`

**Interfaces:**
- Consumes: `setupSkeleton()` da Task 2 (já registrado por conta própria).
- Produces:
  - `setupNavigation(): Promise<() => void>` — migra exatamente o código atual de menu/popover/header de `Base.astro:48-112`, adiciona sincronização de `aria-expanded` nos eventos `beforetoggle`/`toggle`, e devolve cleanup que: desconecta `ResizeObserver`, remove o listener `scroll` pelo **mesmo handler nomeado**, remove os handlers `beforetoggle`/`toggle`, fecha o popover com `hidePopover()` se aberto, limpa `.is-hidden` e zera `lastY`/`lastWidth` com o `scrollY` real.
  - `setupPageLifecycle(): void` — registra `astro:page-load` (chama `setupNavigation()` e `setupTableScroll()`) e `astro:before-swap` (executa cleanups). Usa um contador de geração para descartar cleanup que chegar depois de uma troca rápida. Objetivo observável: após 5 navegações, continua existindo exatamente **1** observer e **1** listener de scroll ativos — verificado por comportamento (nenhum toggle duplo, hide-on-scroll uma única vez), não por variável global de debug.
  - `setupTableScroll(): void` — para cada `.article-body table` com `scrollWidth > clientWidth`, define `tabindex="0"`, `role="region"` e `aria-label="Tabela (role a tela para ver tudo)"`.

- [ ] **Step 1: Criar `src/scripts/site-navigation.ts`**
  - Mover o código atual do `<script>` de `Base.astro` para `setupNavigation()`; manter o polyfill `@oddbird/popover-polyfill` carregado com `await import(...)` **antes** de instalar os listeners.
  - No `sync()`: quando o layout ficar wide, remover `aria-expanded` do botão e fechar o popover se estiver aberto.
  - Nos eventos `beforetoggle`/`toggle` do `#site-menu`, atualizar `aria-expanded` para `menu.matches(':popover-open')`.
  - `setupPageLifecycle()` conforme a interface acima; `astro:page-load` também roda na carga inicial.
  - **Proibido** `transition:persist` no `.site-header`: o `aria-current` vem do servidor e ficaria errado dentro dos artigos. O header é recriado a cada troca.

- [ ] **Step 2: Criar `src/scripts/table-scroll.ts`**
  - Implementar `setupTableScroll()` exatamente como descrito na interface; idempotente (checar `hasAttribute('tabindex')`).

- [ ] **Step 3: Ativar ClientRouter no head do `Base.astro`**
  - `import { ClientRouter } from 'astro:transitions';` no frontmatter.
  - `<ClientRouter fallback="swap" />` após a linha do `<meta name="generator">`.
  - Adicionar `transition:persist` à raiz `.nav-skeleton` em `NavigationSkeleton.astro` (agora o router existe).
  - Substituir o `<script>` inline por imports de `setupPageLifecycle` e `setupSkeleton` e chamá-los uma vez: `setupPageLifecycle(); setupSkeleton();`.
  - **Não** adicionar `@view-transition { navigation: auto }` ao CSS e **não** pôr `transition:animate` no `<html>`: com ClientRouter isso duplicaria ou apagaria a transição. O visual virá das pseudo-classes `::view-transition-*` na Task 4.

- [ ] **Step 4: Verificar**
  - Run: `npm run build` → sem erros.
  - Playwright, em 375px e 1280px:
    - Carga inicial: menu abre com clique, `aria-expanded="true"`, 4 links, Escape fecha e devolve `aria-expanded="false"`; foco volta ao botão.
    - Navegar Início → Guias → artigo → voltar (browser back) → Guias (5 navegações no total); em **cada** página repetir: 1 clique abre o menu (`aria-expanded="true"`), 2º clique/ Escape fecha (`false`), sem toggle duplo; rolagem gradual esconde e mostra o header uma única vez.
    - Abrir menu em 375px e redimensionar para 1280px: popover fecha, botão some, `aria-expanded` removido, sem erro no console.
    - Após navegação por teclado (Enter no menu), `document.activeElement` é visível; se for `#content`, o `main:focus-visible` precisa mostrar outline.
    - Artigo da tabela em 320px: `table.tabIndex === 0`, `role === 'region'`, `aria-label` presente e `scrollWidth > clientWidth` (rolagem interna, não da página).
    - Zero requisições externas em todas as navegações.

- [ ] **Step 5: Commit**
  - `git add src/layouts/Base.astro src/components/NavigationSkeleton.astro src/scripts/site-navigation.ts src/scripts/table-scroll.ts`
  - `git commit -m "feat: client router with safe script lifecycle"`

---

### Task 4: Movimento — transição, entrada, barra de leitura e microestados

**Files:**
- Modify: `src/styles/motion.css`
- Modify: `src/layouts/Base.astro` (import de `../styles/motion.css`)
- Modify: `src/pages/guias/[...id].astro` (elemento `.reading-progress`)

**Interfaces:**
- Consumes: `ClientRouter` da Task 3; tokens de cor de `global.css`.
- Produces: `.reading-progress` (elemento `aria-hidden="true"`, 2px, `position:fixed; inset-block-start:0; z-index:20`); animações nomeadas `page-in`, `skeleton-pulse`, `progress-grow`.

- [ ] **Step 1: Completar `src/styles/motion.css`**
  - Transição (somente em `@media (prefers-reduced-motion: no-preference)`):
    - `::view-transition-old(root) { animation: 200ms cubic-bezier(.2,0,0,1) both page-out }`
    - `::view-transition-new(root) { animation: 200ms cubic-bezier(.2,0,0,1) both page-in }`
    - `page-out`: `opacity 1 → 0`, `translate 0 → -6px`; `page-in`: `opacity 0 → 1`, `translate 6px → 0`.
    - Nenhum `view-transition-name` duplicado; só `root`. Essas regras substituem o fade padrão do Astro — não usar `transition:animate` no `<html>` nem `@view-transition { navigation:auto }`.
  - Entrada de conteúdo: `.hero, .article-header { animation: 180ms cubic-bezier(.2,0,0,1) both page-in }` no mesmo media query; sem stagger, sem atraso.
  - Barra de leitura: `@keyframes progress-grow { from { transform:scaleX(0) } to { transform:scaleX(1) } }`; dentro de `@supports (animation-timeline: scroll())` **e** `@media (prefers-reduced-motion: no-preference)`: `.reading-progress { transform-origin:left; animation:progress-grow linear both; animation-timeline:scroll(root block) }`. Fora desse bloco, inclusive com reduced motion, `.reading-progress { display:none }` — nunca um valor enganoso de 0% ou 100%. A barra é um elemento separado da transição; as duas não compartilham `transform`.
  - Popover: em `.site-menu:popover-open`, `opacity:1; translate:0 0; transition:opacity 140ms ease, translate 140ms ease, display, overlay; transition-behavior:allow-discrete; @starting-style { opacity:0; translate:0 -4px }`. Desativar em `.site-header.is-wide .site-menu`.
  - Microestados: `.card` e `.button` com `transition` curta já existente; adicionar `:active { transform:translateY(1px) }` apenas em `@media (hover:hover) and (prefers-reduced-motion:no-preference)`.
  - Garantir que nenhuma regra deixe elemento em `opacity:0` quando reduced motion estiver ativo.

- [ ] **Step 2: Inserir a barra no artigo**
  - Em `src/pages/guias/[...id].astro`, logo dentro de `<Base ...>` e antes do `.container`: `<div class="reading-progress" aria-hidden="true"></div>`.
  - Nenhum atributo ARIA adicional: é puramente decorativa e o progresso real é a rolagem.

- [ ] **Step 3: Verificar**
  - Run: `npm run build` → sem erros.
  - Playwright em 1280px:
    - Navegar entre páginas e conferir que `document.getAnimations()` contém animação com `effect.target` do tipo pseudo-elemento de transição durante ~200ms (ou, se o navegador não expuser, conferir que não há erro e que a troca acontece).
    - No artigo: `getComputedStyle(document.querySelector('.reading-progress')).animationTimeline !== 'auto'`; após rolar 50% da página, `getComputedStyle(el).transform` contém `matrix` com `scaleX` entre 0 e 1. Se o navegador não suportar `animation-timeline`, a barra deve estar `display:none` — não um traço parado.
    - Com reduced motion ligado: `getAnimations().length === 0` para `.hero`/`.article-header`/`.reading-progress`, `display:none` na barra, e todo o texto do artigo visível (`opacity:1`).
    - Popover em 375px: ao abrir, `opacity` transita de 0 para 1 em ~140ms; Escape funciona; sem `!important` novo fora de `global.css:54-65`.

- [ ] **Step 4: Commit**
  - `git add src/styles/motion.css src/layouts/Base.astro src/pages/guias/[...id].astro`
  - `git commit -m "feat: editorial motion and reading progress"`

---

### Task 5: Conteúdo honesto e pendências do responsável

**Files:**
- Modify: `src/site.config.ts`
- Modify: `src/pages/contato.astro`, `src/pages/sobre.astro`, `src/pages/privacidade.astro`, `src/pages/termos.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/guias/[...id].astro`
- Modify: `docs/pending-actions.md`

**Interfaces:**
- Consumes: `SITE.contactEmail` de `site.config.ts`.
- Produces: nenhuma função nova; apenas renderização condicional e textos.

- [ ] **Step 1: Definir e-mail de contato sem inventar dado (item bloqueado)**
  - **Bloqueado por dado humano:** o e-mail real não existe ainda. Ação provisória segura: remover a seção "E-mail" quando não houver valor válido e manter apenas o texto sobre LGPD. Não inventar endereço.
  - Manter `SITE.contactEmail` vazio ou com valor inválido de exemplo enquanto o responsável não informar o real.
  - Em `contato.astro`: se o valor for válido (contém `@` e não contém `exemplo.invalid`), renderizar `<a href="mailto:...">`; senão renderizar apenas: "O e-mail de contato será publicado aqui pelo responsável antes da abertura da monetização." Sem marca amarela, sem `[PREENCHER]`.

- [ ] **Step 2: Remover placeholders das páginas legais e Sobre**
  - Substituir cada `<span class="placeholder-mark">[PREENCHER…]</span>` por texto neutro equivalente, por exemplo "Dados do responsável a serem publicados após a revisão final.".
  - Registrar em `docs/pending-actions.md` o que falta: nome completo, e-mail, foro e revisão humana.
  - Não alterar a estrutura jurídica das páginas nem inventar dados.

- [ ] **Step 3: Corrigir afirmações e detalhes de confiança**
  - `index.astro:79`: trocar "não coleta seus dados pessoais" por "não pede cadastro nem usa cookies; o servidor registra apenas dados técnicos de acesso".
  - `[...id].astro`: trocar "Equipe Destrava Tech" por "Destrava Tech"; adicionar `<span class="visually-hidden"> (abre em nova aba)</span>` nos links de fonte; quando `sources` estiver vazio, mostrar texto honesto em vez de esconder a seção: "Este guia usa passos gerais dos aplicativos. Confira sempre o suporte oficial".
  - Não criar `og:image` nesta rodada (fica no backlog Lote 3).

- [ ] **Step 4: Verificar**
  - Run: `grep -R "PREENCHER" src/` → nenhum resultado.
  - Run: `npm run build` → sem erros.
  - Playwright: `/contato/`, `/sobre/`, `/privacidade/`, `/termos/` sem `.placeholder-mark`; fonte externa em artigo contém `(abre em nova aba)` no DOM; guia sem `sources` mostra o texto honesto.

- [ ] **Step 5: Commit**
  - `git add src docs/pending-actions.md`
  - `git commit -m "content: remove placeholders and make claims precise"`

---

### Task 6: QA final, documentação e handoff (sem deploy)

**Files:**
- Modify: `docs/qa-report.md`
- Modify: `docs/central-de-links.md`
- Modify: `docs/changelog.md`
- Move: capturas `baseline-*.png` para `docs/qa/screenshots/` (usar `git mv`/`move` sem apagar)

**Interfaces:**
- Consumes: resultados das Tasks 1–5.
- Produces: relatório atualizado e lista explícita do que **não** foi verificado.

- [ ] **Step 1: Rodar matriz completa**
  - `npm run build`.
  - `npm run preview` (produção local) + rede simulada lenta: confirmar que o skeleton aparece acima de 300ms e some no `astro:after-swap`, com o texto sr-only removido; confirmar teto de 3s.
  - Playwright em 320, 375, 768, 1024, 1280, 1440px: overflow, menu, teclado (Tab/Enter/Esc), foco visível, console, requisições externas, reduced motion, transição e skeleton. Repetir 5 navegações seguidas para provar que listeners não duplicam.
  - Repetir as 14 checagens antigas de `docs/qa-report.md`.

- [ ] **Step 2: Atualizar documentação**
  - `docs/qa-report.md`: nova data, resultados, medições de overflow, limitações (sem leitor de tela real, sem Safari/Firefox, análise visual não humana das capturas).
  - `docs/changelog.md` e `docs/central-de-links.md`: registrar as mudanças;URL pública continua `https://destrava-tech-rho.vercel.app` e **ainda não recebeu este deploy**.
  - `docs/pending-actions.md`: destacar que publicação depende de autorização explícita.

- [ ] **Step 3: Verificar estado final**
  - Run: `git status --short` → apenas arquivos intencionalmente alterados, sem `.env.local` ou `.vercel/`.
  - Run: `grep -R "PREENCHER" src/` → vazio.
  - Confirmar que nenhum comando `vercel` foi executado nesta rodada.

- [ ] **Step 4: Commit**
  - `git add docs baseline-*.png`
  - `git commit -m "docs: update QA after interface and motion work"`

---

## Self-review

- **Cobertura da spec:** Lote 0 → Task 1 (0.3–0.9) e Task 5 (0.1/0.2, com 0.1 bloqueado por dado humano); Lote 1 → Tasks 2–4; pendências legais e confiança → Task 5; QA → Task 6. Itens 2.1–2.14 e 3.2–3.4 permanecem como backlog consciente, listados na spec e não prometidos neste plano. O item 2.14 foi corrigido na spec porque `AdSlot`/`ConsentBar` já são condicionais a `adsEnabled`.
- **Dependências entre tarefas:** Task 2 cria `motion.css`; Task 4 completa. Task 3 depende do `setupSkeleton()` da Task 2 apenas para não duplicar listeners. Task 5 é independente. Task 6 depende de todas.
- **Nomes consistentes:** `setupSkeleton`, `setupNavigation`, `setupPageLifecycle`, `setupTableScroll`, `.nav-skeleton`, `[data-skeleton-status]`, `.reading-progress`, `page-in`, `page-out`, `skeleton-pulse`, `progress-grow`.
- **Revisão externa:** subagente `review` apontou 7 riscos reais; todos foram incorporados: limpeza explícita de observer/listener + teste de 5 navegações (Task 3), skeleton escondido no `astro:after-swap` + teto de 3s + status sr-only apenas quando visível (Task 2), separação entre barra de progresso e transição + proibição de `transition:persist` no header (spec/Global Constraints/Task 4), `@supports` para scroll-driven animation (Task 4), foco visível após navegação (Tasks 3/4), e ajuste das durações e do termo "build local" (Global Constraints/Task 6).
- **Proporção:** o plano descreve decisões e verificações, não transcriptos de código; nenhum pacote novo foi adicionado.
