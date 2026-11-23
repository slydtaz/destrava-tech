# Registro de Evidências — startup-secundaria

Data da pesquisa: 2026-11-23 · Fase 2 (pesquisa de mercado) · Modo simplificado

## Fatos verificados (fontes oficiais)

| Fato | Fonte | Confiança |
|---|---|---|
| AdSense exige titular com 18+; menor de idade pode ter pai/mãe/responsável como titular da conta | https://support.google.com/adsense/answer/14230 e https://support.google.com/adsense/answer/9724 | Alta (Google oficial) |
| Requisitos: conteúdo original e útil, acesso ao HTML do site, cumprir políticas. Google NÃO exige número mínimo de artigos, tráfego mínimo ou idade do domínio | https://support.google.com/adsense/answer/9724 | Alta (Google oficial) |
| Aprovação não é garantida; rejeições comuns: conteúdo raso, site em construção, conteúdo copiado/gerado sem valor | Comunidade AdSense + guias de terceiros (innopanda, explainwp, anobee) | Média |
| AdSense funciona em sites web responsivos (desktop/tablet/celular). AdMob é para apps móveis — não se aplica aqui | https://adsense.google.com/intl/pt-BR_br/start/resources/3-types-of-sites/ | Alta |
| RPM = receita por mil visualizações de página; fórmula oficial | https://support.google.com/adsense/answer/190515 | Alta |

## Estimativas de terceiros (NÃO auditadas — usar com cautela)

| Estimativa | Fonte | Confiança |
|---|---|---|
| RPM Brasil: R$ 3–20 em nichos genéricos; finanças/seguros acima disso | viverdeadsense.com/quanto-o-google-adsense-paga (2026) | Baixa-média (estimativa de mercado) |
| RPM Brasil: R$ 8–15 genéricos, R$ 25–80 premium (finanças, seguros, SaaS) | crazystack.com.br (2026) | Baixa (blog de terceiros, sem auditoria) |
| Finanças: RPM médio ~US$ 5,98; Legal/Seguros ~US$ 7,11 | publisher-rpm.vercel.app/country-rpm/brazil | Baixa (sem metodologia clara) |
| Viagens: ~US$ 0,78 por clique no Brasil | kildaryoliver.com.br | Baixa (blog de curso, conflito de interesse) |

## Contra-evidências e riscos

- Sites novos demoram a ganhar tráfego orgânico (SEO leva meses); receita inicial tende a ser perto de zero.
- Nichos YMYL (finanças, saúde) têm exigência de qualidade maior no Google — mais difícil para site novo sem autoridade.
- RPMs divulgados por blogs de "ganhar dinheiro com AdSense" têm conflito de interesse (vendem cursos). Não prometer ganhos.
- Aprovação do AdSense depende de revisão do Google; nenhum resultado é garantido.
- Conta de titular menor de 18 é proibida — responsável adulto precisa ser o titular (fato oficial).

## Desconhecidos (pendentes do proprietário)

- Tema do site (nicho).
- Idade do proprietário / titularidade 18+ da conta AdSense já criada (item histórico da Fase 2; confirmação pendente em `docs/pending-actions.md`).
- Orçamento para domínio próprio (~R$ 40/ano .com.br) ou início grátis.
- Quem escreverá/validará o conteúdo original.

## Ambiente (Fase 0 — verificado 2026-11-23)

- OpenCode v2.4.0 · Git 2.55.0 · Node v24.19.0 (≥22.20 ✅) · npm 11.17.0 · npx 11.17.0 · winget 1.29.380
- Nada a instalar. Workspace estava vazio.

## Expansão 0.2.0 — evidências técnicas (verificado 2026-11-23)

Fatos observados no build local e no navegador, não estimativas:

| Fato | Como foi verificado | Confiança |
|---|---|---|
| Build gera 61 páginas; `sitemap-index.xml` com 60 URLs e 180 `<xhtml:link>` (60 por hreflang: `pt-BR`, `en`, `es`); zero `/guias/pt/` | `npm run build` + inspeção programática de `dist/sitemap-0.xml` | Alta (executado) |
| Config `sitemap({ i18n: ... })` é o mecanismo que gera os alternates; as tags `<link rel="alternate">` do `Base.astro` não alimentam o XML | Context7 `/withastro/docs` + leitura de `node_modules/@astrojs/sitemap/dist/utils/parse-i18n-url.js` e `generate-sitemap.js` | Alta (código-fonte instalado) |
| Paridade de 80 chaves em `pt.ts`, `en.ts` e `es.ts`; nenhum link `/guias/pt/` em `src/` ou `dist/` | Contagem por arquivo e busca em árvore | Alta (executado) |
| Contraste AA: corpo 19,06:1 (ambos os temas); links `#be185d` 5,78:1 no claro e `#f472b6` 7,51:1 no escuro | Cálculo de luminância sRGB sobre `getComputedStyle` no Chromium | Alta (medido) |
| Zero requisição a origem externa, zero `.ad-slot`/`.consent-bar`, zero erro/warning de console | `performance.getEntriesByType('resource')` filtrado por origem + logs do Playwright | Alta (medido) |
| `prefers-reduced-motion` mantém estado final visível; skeleton aparece só em navegação cliente lenta e some ao concluir | `browser_emulate_media` + CDP `Network.emulateNetworkConditions` (500 ms) | Alta (medido) |
| Sem overflow horizontal em 320/375/768/1024/1280/1440 px em home, índice, artigo e home EN | `scrollWidth === clientWidth` e varredura de `getBoundingClientRect()` | Alta (medido) |
| Indexação real no Google e aprovação de conta não podem ser afirmadas sem publicar e sem ação do proprietário | Fora do escopo local | N/A — pendente |

Nota: a URL canônica `https://destrava-tech-rho.vercel.app` recebeu a expansão 0.2.0 em 2026-11-23, após autorização explícita. A validação online foi executada contra o ar nesta rodada: arquivo de verificação do Google 200 com a linha exata, `sitemap-index.xml` 200, `sitemap-0.xml` 200 com 60 URLs/180 alternates, `robots.txt` e `ads.txt` 200, home PT/EN/ES e guia 200, 404 personalizado em caminho inexistente. Indexação no Google e aprovação de AdSense continuam fora do alcance local.