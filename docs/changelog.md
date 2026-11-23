# Changelog

## 0.2.0 — 2026-11-23 (PRONTO — aguardando autorização final 🔒)

Expansão completa construída e validada localmente; **não publicada**. Nada foi pushed, merged ou deployado nesta rodada.

- Home animada em capa de revista (preto/rosa), com estado final legível por padrão e em `prefers-reduced-motion`.
- 14 guias em português, inglês e espanhol (42 páginas de artigo), com aviso visível de tradução automática e prevalência da versão PT nas páginas EN/ES.
- Índices de guias, páginas fixas e home espelhados em `/en/` e `/es/`; 404 personalizada única na raiz.
- Ilustrações locais por pilar e nas 12 páginas fixas; exemplo animado por pilar nos guias.
- Tema claro/escuro com persistência (`dt-theme`), contraste AA verificado nos dois temas e alvos novos de 44 px.
- `sitemap-index.xml` com 60 URLs e 180 alternates `hreflang` (`pt-BR`, `en`, `es`); `ads.txt`, `robots.txt`, `favicon.svg` e arquivo de verificação do Google presentes no build.
- `ads.txt` é previsão apenas: `SITE.adsEnabled` continua `false`; zero anúncio, analytics, cookie de terceiro ou requisição externa.
- 20 tasks executadas em SDD, cada uma com build limpo, commit local e revisão task-scoped antes da próxima.
- QA final aprovado em Chromium: 320/375/768/1024/1280/1440 px, 5 navegações, teclado/foco, reduced motion, skeleton em rede lenta, dois temas, console limpo — `docs/qa-report.md`.

Pendente: autorização final separada do proprietário e as porteiras humanas em `docs/pending-actions.md`.

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