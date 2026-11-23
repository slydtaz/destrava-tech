# Destrava Tech

Site de guias práticos de tecnologia em português simples — segurança digital, WhatsApp, IA e celular. Feito para ser monetizado com Google AdSense (conta no nome do responsável adulto, ainda pendente).

## Rodar localmente

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:4321
npm run build     # gera o site estático em dist/
npm run preview   # serve o dist/ para conferência
```

## Estrutura

- `src/content/guias/` — os artigos em Markdown (frontmatter: title, description, pillar, updated, sources).
- `src/pages/` — páginas (home, lista de guias, artigo, sobre, contato, privacidade, termos, 404).
- `src/components/` — Header (nav responsiva com popover nativo), Footer, ArticleCard, ConsentBar (LGPD, inativo), AdSlot (inativo).
- `src/site.config.ts` — nome, URL, **adsEnabled** e e-mail de contato.
- `docs/` — PRD, ADRs, evidências, QA, ações pendentes.
- `portfolio-registry.json` — registro na Central de Gerenciamento.
- `design-system/destrava-tech/MASTER.md` — design system (ui-ux-pro-max).

## AdSense — como ativar (só depois da aprovação da conta)

1. Conta AdSense criada e aprovada **no nome do responsável adulto** (18+).
2. Preencher os placeholders legais (nome do responsável, e-mail) nas páginas.
3. Configurar o código do publisher e `ads.txt` (ver `docs/pending-actions.md`).
4. Ativar `SITE.adsEnabled` em `src/site.config.ts` — isso liga o banner de consentimento LGPD e os espaços de anúncio.
5. O script do AdSense só deve carregar **após o consentimento** (TODO marcado em `ConsentBar.astro`).

## Privacidade por padrão

Sem cadastro, sem analytics, sem cookies de terceiros, fontes hospedadas localmente. Nenhum dado pessoal coletado nesta fase.