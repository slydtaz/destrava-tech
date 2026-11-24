# Changelog

## 0.2.3 - 2026-11-24 (PUBLICADO 🟢)

Deploy `dpl_7bvyYkgAEeM19Kpsc4YYBKeTUFgy`, aliasado a https://destrava-tech-rho.vercel.app, executado com autorização explícita do proprietário em 2026-11-24. A 0.2.2 (`dpl_45hn5XCYCMqLizgqmvE2EVQs2VMu`) foi a versão anterior no ar.

Verificação feita no ar após o deploy: HTTP 200 com `data-motion` e `data-motion-toggle` no HTML, `sitemap-0.xml` com 60 URLs e 180 alternates, botão alternando `on` → `off` com `aria-pressed='false'` e `opacity: 1` no conteúdo, axe-core 4.12.1 com zero violações e 36 verificações aprovadas, console limpo e zero requisição externa. Commit final do código verificado: `eab0f35`; commits seguintes são só documentação.

- Os 24 SVGs e os decores feitos à mão foram trocados por ícones da Lucide copiados inline como texto: sem pacote, CDN ou requisição em runtime. Traços usam `--color-primary` e um detalhe `--color-accent`, acompanhando claro/escuro. Avisos ISC (Lucide) e MIT (Feather) em `docs/third-party-credits.md`.
- Causa de "não vejo animações" investigada: no ar as animações funcionavam; com `prefers-reduced-motion: reduce` o CSS as desligava de propósito. Por decisão do proprietário, **animações agora ligadas por padrão**, sobrescrevendo a preferência do sistema; o botão no header permite desligar.
- Novo botão de animações ao lado do tema, 44×44 px, `aria-pressed` e rótulos em PT/EN/ES. Estado em `dt-motion`, aplicado antes da pintura e preservado no ClientRouter. Movimento desligado mantém todo o conteúdo visível.
- Header em telas de 320 px sem overflow: controles de 44 px preservados e seletor de idioma reduzido para 36 px (acima do mínimo WCAG de 24 px).
- Sitemap intocado (60 URLs / 180 alternates), `SITE.adsEnabled` continua `false`, zero dependência nova. Build limpo (61 páginas).

## 0.2.2 — 2026-11-23 (PUBLICADO 🟢)

Deploy `dpl_45hn5XCYCMqLizgqmvE2EVQs2VMu`, aliasado a https://destrava-tech-rho.vercel.app. Validação no ar: 200 em `/`, `/guias/`, guia PT, `/en/guias/`, `/es/guias/`, `sitemap-index.xml`, `sitemap-0.xml` e `robots.txt`; tema escuro persistiu entre páginas e idiomas, 5 SVGs inline sem `<img>`, barra de progresso, filtro e sumário presentes; console limpo.

- Tema claro/escuro agora sobrevive à navegação cliente: o estado é passado ao documento entrante em `astro:before-swap` e reaplicado em `astro:after-swap`, sem flash.
- Os 24 SVGs de retângulos/círculos viraram traços, arcos e chevrons com `stroke` vindo dos tokens; o SVG passa a ser inline para herdar o tema. Logo, badge, marcadores e exemplo animado também foram trocados.
- Movimento perceptível: transição de página de 200 ms para 280 ms, revelação de cards/cabeçalhos com scroll-driven animations e fallback por `IntersectionObserver`, barra de progresso de leitura em todas as páginas. `prefers-reduced-motion` mantém o estado final visível.
- Utilidades novas: sumário e botão "copiar link" nos guias, filtro por pilar nos índices PT/EN/ES e botão "voltar ao topo" em todas as páginas, com textos nos três idiomas.
- Sitemap: o Google confirmou a leitura correta das 60 páginas; nenhum arquivo foi alterado.
- Build limpo (61 páginas) e commits locais `fb4f49c`, `26e6e7c`, `51813f4`, `35e5fe4`.

## 0.2.1 — 2026-11-23 (PUBLICADO 🟢 — correção de interface)

Deploy `dpl_4K16tto4FUt3G7yL9Br8t5JHE4vB`, aliasado a https://destrava-tech-rho.vercel.app; tamanhos confirmados no ar: 144 px nas páginas fixas, 352 px na capa, 112 px nos guias.

- Ilustrações das páginas fixas e do 404 deixaram de herdar a largura do container (até 1152 px): agora têm limite de 9 rem (144 px), preservando a capa da home em 22 rem (352 px) e a ilustração dos guias em 112 px.
- `width`/`height` adicionados ao `<img>` para reservar a proporção 1:1 e evitar salto de layout.
- Site conectado aos gerenciadores locais existentes: monitor HTTP no Uptime Kuma, card no Grafana e collection `destrava_tech` no Directus (`docs/central-de-links.md`).

## 0.2.0 — 2026-11-23 (PUBLICADO 🟢)

Expansão completa publicada em produção **após autorização explícita e separada do proprietário**. Deploy `dpl_EvtJP37VmYnSphswh29iAet7AFsD` no projeto `slydtx/destrava-tech`, aliasado a https://destrava-tech-rho.vercel.app. Validação no ar: home PT/EN/ES 200; guia 200; arquivo de verificação do Google 200 com a linha exata; `sitemap-index.xml` 200; `sitemap-0.xml` 200 com 60 URLs e 180 alternates; `robots.txt` e `ads.txt` 200; caminho inexistente retorna 404 com a página personalizada. Nenhum push ou merge foi feito; todo o código permanece em commits locais na branch `interface-motion`.

- Home animada em capa de revista (preto/rosa), com estado final legível por padrão e em `prefers-reduced-motion`.
- 14 guias em português, inglês e espanhol (42 páginas de artigo), com aviso visível de tradução automática e prevalência da versão PT nas páginas EN/ES.
- Índices de guias, páginas fixas e home espelhados em `/en/` e `/es/`; 404 personalizada única na raiz.
- Ilustrações locais por pilar e nas 12 páginas fixas; exemplo animado por pilar nos guias.
- Tema claro/escuro com persistência (`dt-theme`), contraste AA verificado nos dois temas e alvos novos de 44 px.
- `sitemap-index.xml` com 60 URLs e 180 alternates `hreflang` (`pt-BR`, `en`, `es`); `ads.txt`, `robots.txt`, `favicon.svg` e arquivo de verificação do Google presentes no build.
- `ads.txt` é previsão apenas: `SITE.adsEnabled` continua `false`; zero anúncio, analytics, cookie de terceiro ou requisição externa.
- 20 tasks executadas em SDD, cada uma com build limpo, commit local e revisão task-scoped antes da próxima.
- QA final aprovado em Chromium: 320/375/768/1024/1280/1440 px, 5 navegações, teclado/foco, reduced motion, skeleton em rede lenta, dois temas, console limpo — `docs/qa-report.md`.

Pendente: apenas as porteiras humanas em `docs/pending-actions.md` (dados legais, revisão editorial, Search Console e AdSense).

## 0.1.1 — 2026-11-23 (PUBLICADO 🟢)

- Publicação autorizada pelo proprietário na **Vercel** (CLI já autenticado): projeto `slydtx/destrava-tech`.
- Endereço oficial: **https://destrava-tech-rho.vercel.app** (nome sem sufixo já estava em uso).
- Canonical, sitemap e robots.txt atualizados para o endereço real; republicado e verificado no ar (artigo 200, sitemap 200, robots 200, 404 correto).
- Política de Privacidade: placeholder do provedor de hospedagem preenchido (Vercel Inc.).
- Modo de gerenciamento escolhido: **Central de links** → `docs/central-de-links.md`.
- `portfolio-registry.json` atualizado: status `published`.
- Pendências restantes: dados legais do responsável + conta AdSense (ver `docs/pending-actions.md`).

## 0.1.0 — 2026-11-23 (MVP, não publicado)

- Pesquisa de mercado com evidências (AdSense oficial + nichos BR) — `docs/evidence-ledger.md`.
- PRD e ADR-001 (Astro estático, hospedagem gratuita).
- Site completo: home, lista de guias por pilar, 10 artigos originais com fontes, sobre, contato, privacidade, termos, 404.
- Nav responsiva com popover nativo + polyfill condicional; header que esconde ao rolar (com fallback JS corrigido para Chromium sem query `scrolled`).
- Design system Swiss editorial (ui-ux-pro-max), fontes self-hosted, contraste AA verificado.
- Estrutura AdSense-ready desativada (AdSlot + ConsentBar LGPD) — ativa só após conta aprovada do responsável.
- QA em navegador real (Chromium 157): 14 verificações aprovadas — `docs/qa-report.md`.
- Registro automático na Central de Gerenciamento (`portfolio-registry.json`).
- Astro telemetry desativada.