# Spec — Interface viva: tema persistente, movimento visível e elementos de utilidade

Status: **aprovado com ajustes em 2026-11-23** — proprietário escolheu a opção 4 (deploy no mesmo fluxo, após QA) e acrescentou: trocar os círculos/retângulos espalhados por outra forma e fazer **tudo** acompanhar o tema. `<sitemap-index.xml>` já foi lido pelo Google com as 60 páginas; item encerrado.
Data: 2026-11-23
Escopo escolhido: **Utilidade + movimento**, em **todas as páginas** (PT na raiz, EN/ES espelhados).

## Problema e evidência

1. **Sitemap — ENCERRADO**: validado no ar (200, `application/xml`, 60 URLs, 180 alternates) e **confirmado pelo Google: leu as 60 páginas corretamente**. O aspecto de "HTML puro" era só o XML cru no navegador. Ação: registrar a confirmação na documentação; nenhuma alteração de arquivo.
2. **Tema some ao navegar**: com `localStorage.dt-theme = dark`, a home abre escura; ao clicar em "Sobre" via ClientRouter, `document.documentElement.dataset.theme` fica `undefined` e o fundo volta a `rgb(250,250,250)`. Causa: o router troca os atributos do `<html>` e o script inline do `<head>` não roda na navegação client-side.
3. **Sem animação perceptível**: a transição de página roda (1 chamada a `startViewTransition`), mas dura 200 ms; `.reveal` existe só nas ilustrações; as animações de rolagem dependem de `animation-timeline: view()/scroll()` sem fallback — em navegador sem suporte não há efeito algum. A barra de progresso de leitura existe somente em guias.

## Princípios

- Nenhuma dependência, plugin, pacote, skill, script externo, analytics, cookie ou requisição de terceiros novo.
- PT continua canônico na raiz; EN/ES espelham caminhos e recebem as mesmas melhorias com textos traduzidos nos 3 dicionários.
- Estado final sempre visível e legível; `prefers-reduced-motion: reduce` desliga movimento sem esconder conteúdo.
- Alvos novos ≥ 44 px; foco visível; contraste AA; nenhum dado inventado (nomes, cidades, estatísticas, revisão humana).
- Só publicar depois de QA e autorização explícita.

## Mudanças

### A. Tema que acompanha a navegação — `src/components/ThemeToggle.astro`

- `astro:before-swap`: copiar o tema resolvido para `event.newDocument.documentElement.dataset.theme`, usando a API documentada do Astro para passar estado ao documento entrante.
- `astro:after-swap`: reaplicar antes da pintura, evitando flash claro.
- Manter o script inline do `<head>` para o carregamento inicial e o `sync()` do botão (`aria-pressed`, `title`).

### B. Movimento visível com fallback — `src/styles/motion.css`, `src/layouts/Base.astro`, `src/scripts/reveal.ts`

- Transição de página de ~280 ms (entrada + saída com leve deslocamento), mantendo `prefers-reduced-motion`.
- Revelação por rolagem aplicada a seções, cards, listas e ilustrações. CSS nativo com `view()` quando suportado; fallback com `IntersectionObserver` quando `CSS.supports('animation-timeline: view()')` for falso. O fallback só adiciona classe quando não há preferência por menos movimento.
- Barra de progresso de leitura no topo em todas as páginas, com fallback por listeners de `scroll` quando `scroll()` não for suportado; `aria-hidden="true"`.
- Registrar/desregistrar o observer nos eventos `astro:page-load` / `astro:before-swap`, seguindo o padrão já usado em `site-navigation.ts`.

### C. Elementos de utilidade — todas as páginas

1. **Índice do guia (ToC)** em `GuidePage.astro`: gerado a partir dos títulos `h2`/`h3` do conteúdo (`headings` do `render()`), com links âncora e rolagem suave já existente.
2. **Copiar link do guia**: botão no cabeçalho do artigo, usa Clipboard API com fallback por seleção, e status em `aria-live="polite"`; sem requisição externa.
3. **Filtro por pilar** no índice de guias (`/guias/`, `/en/guias/`, `/es/guias/`): botões "Todos" + 4 pilares, com `aria-pressed`, ocultando seções inteiras via atributo `hidden`. Sem mudança de URL, sem análise de dados.
4. **Voltar ao topo**: botão global fixo no `Base`, 44×44 px, aparece após rolagem, volta suave (instantânea com reduced motion).
5. Guias relacionados já existem em `GuidePage.astro`: não serão duplicados.

### D. Troca dos círculos/retângulos por outra linguagem visual (pedido explícito)

- Os 24 SVGs em `public/illustrations/` são hoje montados com `<rect>` e `<circle>` e cores fixas (`#09090B`, `#FAFAFA`, `#EC4899`). Serão reescritos como **traços curvos, arcos e chevrons** (`<path>` com `stroke`), sem círculos nem retângulos, com `stroke` vindo de variáveis CSS (`var(--color-accent)`, `var(--color-primary)`, `var(--color-muted-foreground)`).
- `Illustration.astro` passa a injetar o SVG **inline** (via `import.meta.glob(..., { query: '?raw' })`), para que as variáveis do tema cheguem ao desenho. Continua decorativo (`aria-hidden`), com `width`/`height` e o mesmo controle de tamanho.
- Mesma troca nos elementos CSS: marcadores redondos de "Como funciona" viram chevrons; barra/quadrado do exemplo animado viram seta e losango; badge pílula vira etiqueta com canto cortado; logo perde o retângulo de fundo e vira only-bolt em `currentColor`/accent.
- Auditoria de tema: nenhuma cor fixa nova; onde havia hex literal em elementos visíveis, usar tokens. `#fef3c7`/`#b45309` ficam restritos ao marcador de placeholder legal, que é semântico e não muda com tema.

### E. Textos e documentação

- Novas chaves em `src/i18n/{pt,en,es}.ts`: ToC, copiar link, copiado, filtro, todos, voltar ao topo.
- `docs/central-de-links.md`: sitemap confirmado pelo Google com 60 páginas; explicação curta de que XML cru no navegador é normal.
- `docs/changelog.md`: versão 0.2.2.

### F. Publicação

- Autorização dada para publicar **no mesmo fluxo**, depois do QA: build, commit e `vercel deploy --prod --yes` no projeto `slydtx/destrava-tech`, seguido de validação no ar.

## Fora de escopo

AdSense/`adsEnabled`, mudança de conteúdo dos 14 guias, domínio pago, novos assets de imagem, projetos Vercel acidentais, credenciais dos gerenciadores.

## Aceite

- `npm run build` sem erro; `git diff --check` limpo; commit local.
- Playwright: tema escuro permanece após 2 navigações internas; existem animações ao rolar em home, índice e guia; ToC âncora funciona; copiar link muda o status; filtro oculta/exibe seções; botão voltar ao topo funciona; 320/390/768/1280 px; reduced motion sem conteúdo invisível; console sem erro e zero requisição externa.
- Deploy apenas com autorização explícita.
