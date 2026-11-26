# 🎛️ Central de Links — Destrava Tech

Modo de gerenciamento escolhido pelo proprietário: **Central de links** (acompanhar tudo diretamente pelos painéis).
Atualizado: 2026-11-24 · Status do site no ar: **PUBLICADO** 🟢 — versão 0.2.4 (GTM + XSL do sitemap), publicada com autorização explícita do proprietário (`dpl_87AdpEZevrEvdkRBpT7SNfhaPApD`). A 0.2.3 (ícones Lucide + botão de animações) foi a versão anterior. O alias abaixo permanece o mesmo.

## O site

| O quê | Link |
|---|---|
| 🌐 Site no ar | https://destrava-tech-rho.vercel.app |
| 📚 Todos os guias | https://destrava-tech-rho.vercel.app/guias/ |
| 🔒 Política de Privacidade | https://destrava-tech-rho.vercel.app/privacidade/ |
| 🗺️ Sitemap (para o Google) | https://destrava-tech-rho.vercel.app/sitemap-index.xml |
| 🎨 Folha de estilo do sitemap | https://destrava-tech-rho.vercel.app/sitemap.xsl |

### Rotas da expansão 0.2.0 (já no ar)

| O quê | Caminho no site |
|---|---|
| 🏠 Home EN / ES | `/en/` · `/es/` |
| 📚 Índice de guias EN / ES | `/en/guias/` · `/es/guias/` |
| 📄 Páginas fixas EN / ES | `/en/{sobre,contato,privacidade,termos}/` · `/es/{sobre,contato,privacidade,termos}/` |
| ❌ 404 personalizada | qualquer caminho inexistente |
| 🔍 Verificação do Google | `/googlee2e464378dc22f96.html` |
| 🗺️ Sitemap com hreflang | `/sitemap-index.xml` → `/sitemap-0.xml` (60 URLs, 180 alternates), com folha local `/sitemap.xsl` |

O arquivo de verificação do Google, `ads.txt`, `robots.txt` e `favicon.svg` vêm de `public/` e são copiados byte a byte; a 404, `sitemap-index.xml` e `sitemap-0.xml` são gerados pelo build. Todos foram confirmados no ar após a publicação.

## Painéis de controle (sua conta Vercel: slydtx)

| O quê | Link | Para quê |
|---|---|---|
| 📊 Dashboard do projeto | https://vercel.com/slydtx/destrava-tech | Visitas, desempenho, erros |
| 🚀 Último deploy | https://vercel.com/slydtx/destrava-tech/87AdpEZevrEvdkRBpT7SNfhaPApD | Interface viva 0.2.4 (`dpl_87AdpEZevrEvdkRBpT7SNfhaPApD`) |
| ⚙️ Configurações | https://vercel.com/slydtx/destrava-tech/settings | Domínio próprio, proteção, etc. |
| 📈 Analytics | https://vercel.com/slydtx/destrava-tech/analytics | Visitas (ativar Web Analytics grátis se quiser — sem cookies) |

## Google (ações do responsável adulto)

| O quê | Link | Situação |
|---|---|---|
| 💰 AdSense | https://adsense.google.com/ | Configurado e com revisão solicitada — aguardando decisão do Google |
| 🔍 Search Console | https://search.google.com/search-console | Propriedade verificada; **sitemap lido pelo Google com as 60 páginas**; falta pedir indexação da home e aguardar |
| 🤖 MCP Search Console (OpenCode) | Ferramenta `search-console` | Instalado globalmente e registrado na skill `service-hub-connector`; login do Google pendente (`npx search-console-mcp setup`). Somente leitura por padrão |
| 📋 Regras do AdSense | https://support.google.com/adsense/answer/9724 | Consulta |

Verificação de propriedade **não** indexa o site: ela só prova ao Google que você controla a URL. O sitemap já foi **lido com sucesso pelo Google (60 páginas)** — não há mais nada a enviar em *Sitemaps*. Falta apenas abrir o Search Console → **Inspecionar qualquer URL** → cole `https://destrava-tech-rho.vercel.app/` → **Solicitar indexação** e aguardar. Métodos extras de verificação (tag HTML, Analytics, Tag Manager, DNS) são apenas **redundância de posse**, não etapa de indexação. Ver detalhes em `docs/pending-actions.md`.

`https://destrava-tech-rho.vercel.app/sitemap-index.xml` aponta para `sitemap-0.xml`, onde estão as 60 URLs; o Google confirmou a leitura completa. Desde a 0.2.4 os dois XML declaram a folha local `/sitemap.xsl`: ela é aplicada em Firefox/Safari, mas o Chrome 158 (17/11/2026) desativou XSLT e mostra o XML no visualizador nativo. Isso não muda o que o Google lê. Desde a 0.2.4 o GTM `GTM-WLRH4RGN` é carregado em todas as páginas; no ar o contêiner do proprietário disparou um `page_view` do GA4 (`G-FJN8PJVT8Y`). Anúncios seguem desligados (`SITE.adsEnabled: false`); a decisão sobre consentimento para analytics está em `docs/pending-actions.md`, item 19.

## Gerenciadores locais (Service Hub — já rodando)

| O quê | Link | O que foi conectado |
|---|---|---|
| 🟢 Uptime Kuma | http://localhost:3001/dashboard | Monitor HTTP `#6` "Destrava Tech (producao)", checagem a cada 60 s (`200-299`) |
| 📊 Grafana | http://localhost:3000/d/service-hub-home/central-de-servicos | Painel "Central de Servicos" com o card **Destrava Tech** e links para Kuma/Directus |
| 🗄️ Directus | http://localhost:8055/admin/content/destrava_tech | Collection `destrava_tech` (status, status_code, response_time, last_check, uptime_history) |

Como usar: no **Kuma**, o monitor fica em *Dashboard*; o ícone de edição permite mudar intervalo e o menu *Status Pages* cria uma página pública. No **Grafana**, o card do site está no painel "Central de Servicos" (não há gráfico de tempo real: o plugin `json-api` do datasource antigo não está instalado, então o monitor real é o Kuma). No **Directus**, a collection `destrava_tech` recebe linhas com `POST /items/destrava_tech` usando um token de admin — é onde registrar histórico de checagens se quiser.

Para iniciar/parar: `powershell -ExecutionPolicy Bypass -File C:\Users\MARY\service-hub\start-all.ps1` e `...\stop-all.ps1`. Estado: `...\health-check.ps1`. Credenciais ficam apenas em `C:\Users\MARY\service-hub\CREDENTIALS.txt` (nunca em chat, git ou código).

## Documentos do projeto (nesta pasta)

| Documento | Caminho |
|---|---|
| Ações pendentes (quem faz o quê) | `docs/pending-actions.md` |
| Relatório de testes (QA) | `docs/qa-report.md` |
| Pesquisa e evidências | `docs/evidence-ledger.md` |
| Plano do produto (PRD) | `docs/product-brief-prd.md` |
| Histórico de mudanças | `docs/changelog.md` |
| Registro do portfólio | `portfolio-registry.json` |

## Como atualizar o site (fluxo rápido)

1. Editar artigos em `src/content/guias/` (ou pedir ao agente).
2. `npm run build` para conferir localmente.
3. `vercel deploy --prod --yes` para publicar (ou pedir ao agente).
4. Conferir o site no ar e atualizar este documento se algo mudar.

## Rotina sugerida de acompanhamento (5 min/semana)

- Abrir o dashboard Vercel: site no ar? erros?
- Search Console (quando configurado): páginas indexadas, cliques de busca.
- AdSense (quando aprovado): status da conta e ganhos.
- Revisar 1 guia antigo por mês: passos ainda batem com os apps atuais?