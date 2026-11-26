# Ações pendentes — quem faz o quê

Atualizado: 2026-11-24

## Você (proprietário) — antes de enviar ao AdSense

1. **PENDENTE — Ler e revisar os 14 guias** (em `src/content/guias/`; 4 novos: celular no exterior, IA para traduzir, Wi-Fi público e falso suporte no WhatsApp). Corrigir o que não bater com sua experiência real. O Google valoriza conteúdo útil e original — sua revisão é o que garante isso. A versão PT prevalece; EN/ES são traduções automáticas com aviso visível.
2. **PENDENTE — Decidir o nome definitivo do site** ("Destrava Tech" é nome de trabalho).
3. ~~Escolher a hospedagem gratuita e autorizar a publicação~~ ✅ **FEITO (2026-11-23, rodada anterior):** publicado na Vercel → https://destrava-tech-rho.vercel.app

## Responsável adulto (pai/mãe/responsável) — obrigatório para AdSense

4. **Dados legais do responsável adulto**: ✅ **e-mail de contato informado e publicado** (`macedoartur1250@gmail.com`, em Contato, Sobre, Privacidade e `site.config.ts`). Ainda faltam, e não foram inventados:
   - **PENDENTE — nome completo do responsável adulto** (para Sobre, Privacidade e Termos);
   - **PENDENTE — cidade/UF do responsável** (para a Privacidade);
   - **PENDENTE — foro competente** (para o item 6 dos Termos de Uso).
5. **PENDENTE — Revisar os documentos legais** (Privacidade e Termos são rascunhos honestos, não parecer jurídico). A revisão humana ainda não foi feita.
6. **Conta Google AdSense**: ✅ conta já criada pelo proprietário. **PENDENTE — confirmar que a conta está em nome do responsável adulto** (18+ é regra oficial) e com dados reais. Nunca usar dados falsos ou de terceiros.
7. **PENDENTE — Enviar o site para revisão do AdSense** depois de publicado (a aprovação NÃO é garantida e pode levar dias/semanas; rejeição por "conteúdo de baixo valor" é comum em sites novos — o caminho é melhorar conteúdo e tentar de novo).
8. **PENDENTE — Configurar o Search Console** (grátis) com a conta Google do responsável, para acompanhar como o site aparece no Google.

## Agente — depois das aprovações acima

9. ~~Publicar na hospedagem escolhida~~ ✅ **FEITO (rodada anterior):** Vercel, projeto `slydtx/destrava-tech`, verificado no ar (artigo/sitemap/robots/404/canonical OK).
10. Quando a conta AdSense for aprovada: receber o código do publisher (`ca-pub-...`), configurar `ads.txt`, ativar `SITE.adsEnabled`, integrar o código de anúncio **atrás do banner de consentimento LGPD** e atualizar a Política de Privacidade com a lista de cookies.
11. Atualizar `portfolio-registry.json` e configurar monitoramento conforme a escolha do proprietário na Central de Gerenciamento.

## Publicação desta rodada

12. ~~Autorização explícita e separada do proprietário antes de publicar a expansão 0.2.0~~ ✅ **FEITO (2026-11-23):** confirmada após o QA aprovado; deploy `dpl_EvtJP37VmYnSphswh29iAet7AFsD` no projeto `slydtx/destrava-tech`, aliasado a https://destrava-tech-rho.vercel.app. Nenhum push ou merge.

13. ~~Validar no ar a verificação do Google e o sitemap~~ ✅ **FEITO (2026-11-23):** `/googlee2e464378dc22f96.html` 200 com a linha exata; `/sitemap-index.xml` 200; `/sitemap-0.xml` 200 com 60 URLs e 180 alternates `pt-BR`/`en`/`es`; `robots.txt`, `ads.txt`, home PT/EN/ES e guia 200; 404 personalizado retornado para caminho inexistente.

14. **PENDENTE — AdSense:** a conta já foi configurada e a revisão solicitada pelo proprietário (2026-11-23); falta a decisão do Google. Depois da aprovação, substituir em `public/ads.txt` o `pub-1903855512494155` (valor de previsão) pelo `pub-...` real da conta aprovada e só então ativar `SITE.adsEnabled`. Atualmente `false` — o site segue sem anúncios.

16. **PENDENTE — Search Console:** a verificação de propriedade já foi feita pelo proprietário, mas ela apenas prova posse; **não** coloca o site na busca. ✅ **FEITO (2026-11-23):** (a) o Google leu `sitemap-index.xml` e confirmou as **60 páginas** — não é preciso reenviar; o aspecto de "HTML puro" era apenas XML cru no navegador. **Faltam:** (b) *Inspecionar qualquer URL* → home → *Solicitar indexação*; (c) aguardar dias/semanas. Métodos extras de verificação (tag HTML, Analytics, Tag Manager, DNS) são apenas reserva de posse, não etapa de indexação. Até 2026-11-23 a URL canônica `-rho` não aparecia nos resultados de busca consultados; existe outro projeto com nome parecido em `destrava-tech.vercel.app`.

15. **PENDENTE (limpeza — requer sua confirmação) — excluir o projeto Vercel `slydtx/interface-motion`.** O CLI criou esse projeto por engano no primeiro deploy porque o worktree ainda não estava vinculado ao `destrava-tech`; ele contém apenas uma cópia da versão 0.2.0 e não afeta o site no ar. A exclusão é irreversível e o próprio CLI exige aprovação humana (`vercel project rm interface-motion --confirm-name interface-motion`). Se preferir, deixe o projeto lá.

## Rodada 0.2.4 (2026-11-24 — publicada)

Deploy `dpl_87AdpEZevrEvdkRBpT7SNfhaPApD`, production, alias inalterado, publicado com autorização explícita; validação no ar em `docs/qa-report.md`. Nenhum push ou merge.

17. ✅ **FEITO (2026-11-24) — login do Google no MCP Search Console:** o proprietário concluiu `npx search-console-mcp setup`; `search-console-mcp diagnostics` agora reporta Google (`macedoartur1250@gmail.com`, 1 site), AdSense (`pub-1903855512494155`) e GA4 (propriedade `565763914`) conectados. **Atenção:** o pacote guarda o config em cache na memória, então o processo do MCP iniciado antes do setup continuava dizendo `No google accounts found`. É obrigatório **reiniciar o OpenCode** depois do setup; a skill `service-hub-connector` 0.1.0-alpha.3 registra isso. As ferramentas ficam somente leitura por padrão: `sitemaps_submit`, `sitemaps_delete`, `sites_manage`, `accounts_manage` e `indexing_submit` exigem autorização explícita de escrita.
20. **INFORMAÇÃO — leitura real feita pelo CLI do MCP (2026-11-24):** propriedade `https://destrava-tech-rho.vercel.app/` como `siteOwner`; home com `verdict PASS`, “Submitted and indexed”, canonical igual à URL, rastreio em 23/11, sitemap reconhecido e busca mobile; `sitemap-index.xml` sem erros/avisos, 60 URLs submetidas e última leitura em 24/11 00:23 UTC (antes da 0.2.4 — por isso “indexed: 0” no índice é dado antigo); sem dados de consultas nos últimos 7 dias; Bing não conectado. Nenhum segredo foi exibido ou enviado ao chat.
18. **INFORMAÇÃO — XSLT no Chrome:** o Chrome 158 (17/11/2026) desativou XSLT no Stable. Os XML do sitemap continuam legíveis e o Google lê o conteúdo cru; a folha `/sitemap.xsl` só é aplicada em navegadores que ainda suportam XSLT (Firefox/Safari). Se a aparência no Chrome for importante, é preciso escolher outra abordagem — não feita nesta rodada porque o desenho aprovado exclui nova rota e pacote.
19. **NOVO — decisão do proprietário sobre analytics/consentimento:** ao conferir o ar após a 0.2.4, o contêiner `GTM-WLRH4RGN` da conta do proprietário disparou um `page_view` do GA4 (`G-FJN8PJVT8Y`) para `google-analytics.com`. O código do site apenas carrega o GTM, como autorizado; a tag veio da configuração do contêiner. O banner LGPD continua desligado porque `SITE.adsEnabled` é `false`. Se esse evento de analytics deve exigir consentimento, a decisão e a configuração do contêiner/banner são do responsável adulto — não afirmar conformidade sem essa decisão.

## Custos

- Hoje: **R$ 0** (hospedagem gratuita, sem domínio próprio).
- Futuro opcional: domínio .com.br ~R$ 40/ano (compra é ação do responsável).
- AdSense: gratuito; paga a partir de US$ 100 acumulados (regra do Google, verificar valor atual na conta).

## Expectativas honestas

- Site novo começa com ~zero visitas; SEO leva meses. Receita inicial tende a zero.
- Nenhum ganho é prometido; estimativas de RPM de terceiros estão no evidence-ledger com confiança baixa.
