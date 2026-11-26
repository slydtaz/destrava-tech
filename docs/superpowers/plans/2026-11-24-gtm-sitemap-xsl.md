# Google Tag Manager + sitemap estilizado Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Colocar o contêiner GTM fornecido pelo proprietário em todas as páginas e fazer os sitemaps XML abrirem estilizados, sem mudar URLs nem ativar anúncios.

**Architecture:** `Base.astro` é o único ponto de inserção do `<head>`, então um par de scripts `is:inline` cobre as 61 páginas. O estilo do sitemap vem de `xslURL` do `@astrojs/sitemap` apontando para um XSLT local em `public/`, deixando a geração dos XML intacta.

**Tech Stack:** Astro 5, `@astrojs/sitemap` 3.x, XSLT 1.0, CSS inline.

**Spec:** `docs/superpowers/specs/2026-11-24-gtm-sitemap-xsl-design.md`

## Global Constraints

- `SITE.adsEnabled` continua `false`; nenhum AdSense, anúncio, `data-ad-client` ou cookie de publicidade.
- Nenhuma dependência, pacote, plugin ou CDN novo. `npm install` apenas reinstala as dependências já declaradas em `package.json`.
- Não alterar `sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`, `ads.txt` nem o arquivo de verificação do Google à mão.
- 60 `<loc>` e 180 `<xhtml:link>` no `sitemap-0.xml` após o build.
- PT-BR na raiz; EN/ES em `/en/` e `/es/`; chaves novas ou alteradas nos três dicionários.
- Nenhum dado inventado (nome, cidade, UF, depoimento, estatística, afirmação de revisão humana).
- WCAG 2.2 AA: contraste 4,5:1, foco visível, conteúdo visível com movimento desligado.
- Terminar com `npm run build` exit 0, `git diff --check` limpo e commit local. Sem deploy sem autorização explícita.

## Review Focus

- O GTM some em alguma rota (404, EN/ES, guia) — teste: contar `GTM-WLRH4RGN` nos 61 HTML gerados; esperado 61.
- O XSL quebra o XML ou altera o que o Google lê — teste: comparar contagem de `<loc>`/`<xhtml:link>` antes e depois e conferir a linha `xml-stylesheet`.
- Alguém troca o trecho fornecido por um "padrão" com `gtm.start`/`noscript` — teste: conferir no HTML que o trecho está byte a byte como o usuário enviou.
- Texto de privacidade continua dizendo "sem cookies" em algum idioma — teste: buscar as frases antas nos três idiomas e conferir presença das novas chaves.
- O XSL puxa fonte/CDN externo ou deixa o site sem estilo — teste: nenhuma URL `http` no XSL e renderização conferida nos dois XML a 375 e 1280 px.

---

### Task 1: GTM no `<head>` de todas as páginas

**Files:**
- Modify: `src/layouts/Base.astro:37-39`

**Interfaces:**
- Consumes: nada.
- Produces: HTML gerado com `GTM-WLRH4RGN` em todas as páginas.

- [ ] **Step 1: garantir dependências instaladas**

Run: `npm install` (somente se `node_modules/astro` não existir)
Expected: exit 0, nenhuma dependência nova adicionada a `package.json`/`package-lock.json` além das já declaradas.

- [ ] **Step 2: registrar contagem inicial de páginas**

Run: `npm run build`
Expected: exit 0; contar arquivos `.html` em `dist` = 61; `dist/sitemap-0.xml` com 60 `<loc>` e 180 `<xhtml:link>`.

- [ ] **Step 3: inserir o trecho no início do `<head>`**

Em `src/layouts/Base.astro`, imediatamente após `<meta charset="utf-8" />`, inserir exatamente:

```astro
    <script is:inline async src="https://www.googletagmanager.com/gtm.js?id=GTM-WLRH4RGN"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    </script>
```

Não adicionar `gtm.start`, `<noscript>` nem pageview do ClientRouter.

- [ ] **Step 4: verificar o build e a presença em todas as rotas**

Run: `npm run build`
Expected: exit 0, 61 páginas. Contar arquivos `.html` em `dist` que contêm `GTM-WLRH4RGN`: 61. Conferir que o trecho aparece antes de `<meta name="viewport">` em `dist/index.html`.

- [ ] **Step 5: commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add Google Tag Manager container to all pages"
```

---

### Task 2: sitemap estilizado com XSL local

**Files:**
- Modify: `astro.config.mjs:10-16`
- Create: `public/sitemap.xsl`

**Interfaces:**
- Consumes: XML gerado pelo `@astrojs/sitemap` (60 URLs, namespace `xhtml`).
- Produces: `/sitemap-index.xml` e `/sitemap-0.xml` com `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`.

- [ ] **Step 1: criar `public/sitemap.xsl`**

Folha XSLT 1.0 com `xsl:output method="html"`, CSS inline usando `--color-*` equivalentes em valores literais do design system (fundo `#fafafa`, texto `#09090b`, acento `#be185d`, borda `#e4e4e7`, fonte `system-ui`), sem `http:`/`https:` no arquivo. Templates com `local-name()` para `urlset`, `url`, `sitemapindex` e `sitemap`. Cada entrada mostra `loc` sem o prefixo `https://destrava-tech-rho.vercel.app`, `lastmod` quando presente e os valores de `hreflang` dos elementos `xhtml:link`. Cabeçalho com título "Mapa do site — Destrava Tech" e contagem via `count()`. Incluir link para o XML cru via `xsl:variable name="raw" select="..."/` sem hardcode de domínio.

- [ ] **Step 2: ativar a folha no `astro.config.mjs`**

Dentro de `sitemap({ ... })`, acrescentar `xslURL: '/sitemap.xsl'`, preservando o objeto `i18n` existente.

- [ ] **Step 3: verificar XML e contagem**

Run: `npm run build`
Expected: exit 0, 61 páginas. `dist/sitemap-index.xml` e `dist/sitemap-0.xml` contêm a linha `xml-stylesheet`. `dist/sitemap-0.xml` continua com 60 `<loc>` e 180 `<xhtml:link>`.

- [ ] **Step 4: verificar renderização no navegador**

Run: servir `dist` com `npm run preview` e abrir `/sitemap-index.xml` e `/sitemap-0.xml` em Chromium a 375 e 1280 px.
Expected: página estilizada, legível, sem requisição a domínio externo, console sem erro, contagem exibida igual à do XML (60 no `sitemap-0.xml`).

- [ ] **Step 5: commit**

```bash
git add astro.config.mjs public/sitemap.xsl
git commit -m "feat: style sitemap XML with local XSL stylesheet"
```

---

### Task 3: textos de privacidade honestos nos três idiomas

**Files:**
- Modify: `src/i18n/pt.ts:93`, `src/i18n/en.ts`, `src/i18n/es.ts` (chave `home.trust4Text`)
- Modify: `src/pages/privacidade.astro:32-49`, `src/pages/en/privacidade.astro`, `src/pages/es/privacidade.astro`
- Modify: `src/components/ConsentBar.astro:1-4`

**Interfaces:**
- Consumes: `t(lang, 'home.trust4Text')` e as páginas legais já existentes.
- Produces: textos sem negação falsa de rastreamento, com a mesma chave nos três dicionários.

- [ ] **Step 1: confirmar valores atuais das chaves**

Run: buscar `home.trust4Text` em `src/i18n/pt.ts`, `en.ts`, `es.ts`.
Expected: três valores, todos afirmando ausência de cookies.

- [ ] **Step 2: reescrever `home.trust4Text` nos três dicionários**

PT exato: `Respeito à sua privacidade. O site não pede cadastro; o servidor registra dados técnicos de acesso e o Google Tag Manager é carregado para medir o uso. Veja a `
EN e ES: tradução direta da mesma frase, sem citar cookies, finalidade de dados ou revisão humana.

- [ ] **Step 3: ajustar as três páginas de Privacidade**

Em cada arquivo, substituir a frase "Não usamos cookies de rastreamento nem ferramentas de analytics de terceiros nesta fase." por texto equivalente que diga que o Google Tag Manager é carregado para medir o uso e que a configuração do contêiner fica na conta do proprietário. Na seção de fontes, trocar "Não fazemos chamadas a servidores externos de fontes nem a redes sociais para exibir esta página." por texto que preserve a afirmação sobre fontes locais e acrescente que o GTM é carregado à parte. Não especificar cookies que não foram verificados.

- [ ] **Step 4: corrigir comentário da `ConsentBar`**

Atualizar só o comentário do topo: o site passa a carregar GTM, mas o banner segue condicionado a `SITE.adsEnabled`. Não mudar a lógica do componente.

- [ ] **Step 5: verificar paridade e ausência da frase antiga**

Run: `npm run build` e buscar `não usa cookies`, `no cookies`, `sin cookies`, `analytics de terceiros nesta fase` em `src/`.
Expected: exit 0, 61 páginas, nenhum resultado para as frases antigas; `home.trust4Text` existe nos três dicionários.

- [ ] **Step 6: commit**

```bash
git add src/i18n src/pages/privacidade.astro src/pages/en/privacidade.astro src/pages/es/privacidade.astro src/components/ConsentBar.astro
git commit -m "docs: update privacy copy for Google Tag Manager"
```

---

### Task 4: documentação e QA final

**Files:**
- Modify: `docs/changelog.md`, `docs/central-de-links.md`
- Modify: `docs/superpowers/specs/2026-11-24-gtm-sitemap-xsl-design.md` (status aprovado)

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: registro local da mudança, sem claim de deploy.

- [ ] **Step 1: atualizar documentação**

`docs/changelog.md`: nova entrada 0.2.4-preparada descrevendo GTM e XSL, explicitamente sem deploy. `docs/central-de-links.md`: acrescentar o XSL à linha do sitemap e o GTM ao estado atual. Spec: status `aprovado em 2026-11-24`.

- [ ] **Step 2: QA final**

Run: `npm run build`; `git diff --check`; buscar `adsEnabled` em `src/site.config.ts`; contar `GTM-WLRH4RGN` nos HTML; contar `<loc>` e `<xhtml:link>` no XML; conferir que nenhum arquivo `sitemap-*.xml` em `public/` foi criado.
Expected: build exit 0, 61 páginas, diff limpo, `adsEnabled: false`, 61 HTML com GTM, 60/180 no XML, nenhum XML em `public/`.

- [ ] **Step 3: commit**

```bash
git add docs
git commit -m "docs: record GTM sitemap styling change"
```
