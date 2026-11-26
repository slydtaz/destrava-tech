# Google Tag Manager + sitemap estilizado — desenho

Data: 2026-11-24
Status: aprovado, implementado e publicado em 2026-11-24 (`dpl_87AdpEZevrEvdkRBpT7SNfhaPApD`)
Escolha do proprietário: opção **A** (XSL local), em vez da página HTML `/mapa-do-site/`.

## Intenção

O proprietário está configurando a conta Google e precisa que o contêiner `GTM-WLRH4RGN` esteja presente em todas as páginas para integrar Analytics e conectar o MCP do Search Console. Ao mesmo tempo, quer que o sitemap — que hoje abre como XML cru no navegador — vire uma página agradável de olhar, sem mexer no que o Google já leu.

## Objetivos

1. Inserir o trecho fornecido pelo proprietário no `<head>` de **todas** as páginas, sem alterar uma vírgula do código enviado.
2. Fazer `/sitemap-index.xml` e `/sitemap-0.xml` abrirem estilizados no navegador, com a identidade visual do site.
3. Manter as 60 URLs e os 180 alternates `hreflang` exatamente como estão.
4. Corrigir afirmações de privacidade que deixam de ser literais quando um script do Google é carregado.

## Não objetivos

- Ativar `SITE.adsEnabled`, AdSense, anúncios ou cookies de publicidade.
- Configurar tags dentro do contêiner GTM (isso é feito na conta do proprietário).
- Criar rotas novas, traduzir textos novos ou alterar a contagem do sitemap.
- Conectar contas Google, fazer login ou mexer em configuração de MCP nesta rodada.

## Restrições

- Nenhuma dependência, pacote, plugin ou CDN novo. O XSL é um arquivo local em `public/`.
- O `<link rel="sitemap">` continua apontando para o XML; não será trocado por HTML.
- `robots.txt`, `ads.txt`, arquivo de verificação do Google e os dois XML continuam com o mesmo conteúdo funcional.
- WCAG 2.2 AA nos textos alterados; contraste mínimo 4,5:1; nenhum conteúdo dependente de animação.
- Cada mudança termina com `npm run build` sem erro e commit local.

## Abordagens consideradas

| Abordagem | O que faz | Trade-off | Decisão |
| --- | --- | --- | --- |
| **A — `xslURL` com XSL local** | Uma linha em `astro.config.mjs` + `public/sitemap.xsl`; o próprio XML abre estilizado | Entra uma linha `<?xml-stylesheet?>` no XML; estilo depende do navegador aceitar XSLT | **Escolhida** |
| B — página HTML `/mapa-do-site/` em PT/EN/ES | Interface navegável com cards por pilar, usando o layout do site | Cria 3 URLs novas no sitemap e exige textos novos nos três idiomas | Rejeitada pelo proprietário |
| C — deixar o XML cru | Nenhuma mudança | Não resolve o pedido | Rejeitada |

## Desenho

### 1. GTM em todas as páginas

- `src/layouts/Base.astro`: inserir, no início do `<head>`, exatamente o trecho enviado pelo proprietário (`gtm.js?id=GTM-WLRH4RGN`, `window.dataLayer`, `function gtag`, `gtag('js', new Date())`). Usar `is:inline` nos dois `<script>` para que o Astro não mova ou transforme o código.
- Como todas as páginas — inclusive a 404 — usam `Base.astro`, um único ponto cobre as 61 páginas.
- Não acrescentar `gtm.start`, `<noscript>` nem evento de pageview para o `ClientRouter`: esses pedaços não vieram no trecho fornecido. Se o contêiner não disparar na conta do proprietário, ajustamos depois com a configuração real dele.
- Efeito esperado: uma requisição externa nova para `www.googletagmanager.com` em cada página. Isso é intencional e autorizado pelo proprietário.

### 2. Sitemap estilizado

- `astro.config.mjs`: acrescentar `xslURL: '/sitemap.xsl'` dentro de `sitemap({ ... })`, mantendo `i18n` intacto.
- `public/sitemap.xsl` (novo): folha XSLT 1.0 sem dependência externa, com CSS inline usando as cores e a tipografia do design system. Templates casam por `local-name()` para atender tanto `<urlset>` quanto `<sitemapindex>` e ignorar o namespace `xhtml`.
- A folha mostra: título, contagem de entradas, cada URL em texto legível (sem o protocolo/domínio repetido), idioma quando houver `xhtml:link`, `lastmod` quando existir e link para o XML cru.
- Nenhum número é fixo no XSL: a contagem sai do próprio XML via `count()`.

### 3. Textos de privacidade

- `src/i18n/pt.ts`, `en.ts`, `es.ts`: reescrever `home.trust4Text` para não afirmar "não usa cookies". Nova redação em PT: "Respeito à sua privacidade. O site não pede cadastro; o servidor registra dados técnicos de acesso e o Google Tag Manager é carregado para medir o uso. Veja a ". Traduções diretas em EN/ES, sem inventar finalidade de cookie.
- `src/pages/privacidade.astro` e equivalentes em `/en/` e `/es/`: ajustar a seção "Quais dados coletamos hoje" e a frase sobre chamadas externas em "Fontes e tipografia" para refletir o carregamento do GTM, sem declarar cookies que o contêiner ainda não configurou.
- `src/components/ConsentBar.astro`: atualizar apenas o comentário desatualizado. O banner continua ligado a `SITE.adsEnabled` (que segue `false`); não será ativado para analytics nesta rodada. Limitação conhecida e registrada, não uma afirmação de conformidade.

### 4. Verificação

- `npm run build` sem erro; confirmar 61 páginas.
- `dist/sitemap-index.xml` e `dist/sitemap-0.xml`: linha `xml-stylesheet` presente; 60 `<loc>` e 180 `<xhtml:link>` intactos.
- Abrir os dois XML no navegador e conferir o estilo, os dois temas e a responsividade em 375 e 1280 px.
- Conferir no HTML gerado: trecho do GTM presente em home, guia, página legal e 404.
- `git diff --check` limpo; commit local com mensagem convencional.
- Atualizar `docs/changelog.md` e `docs/central-de-links.md` com a mudança, sem marcar deploy (publicação só com autorização explícita).

## Riscos e limitações

- O GTM é uma requisição de terceiro e pode definir cookies conforme a configuração da conta do proprietário; o texto da Privacidade foi escrito de forma a não afirmar o que não foi verificado.
- Não há consentimento para analytics nesta rodada. Se o contêiner passar a coletar dados pessoais, essa decisão volta para o proprietário antes de qualquer ativação de anúncios.
- Navegadores sem suporte a XSLT continuarão mostrando o XML cru; é o comportamento atual, não uma regressão.

## Resultado da verificação (2026-11-24)

- O trecho do GTM foi encontrado nas 61 páginas geradas; `gtm.start` e `<noscript>` continuam ausentes.
- Os dois XML mantêm 60 `<loc>` e 180 `<xhtml:link>` e ganharam a linha `xml-stylesheet`. O `@astrojs/sitemap` resolve `xslURL` para a URL absoluta de produção, no mesmo domínio.
- A folha foi validada por `System.Xml.Xsl.XslCompiledTransform`: o índice gera 1 entrada e o `sitemap-0.xml` gera 60 entradas com 180 badges de idioma, com título e link para o XML cru.
- **Descoberta após a aprovação:** o Chrome 158 (17/11/2026) desativou XSLT no canal Stable; o Chromium de teste exibiu o visualizador XML nativo e não requisitou `/sitemap.xsl`. Firefox e Safari seguem aplicando a folha. Isso não altera o que o Google lê e não foi tratado com nova rota/pacote porque o desenho aprovado não autoriza essa mudança.
