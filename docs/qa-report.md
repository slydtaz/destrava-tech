# Relatório de QA — Destrava Tech MVP

Data: 2026-11-23 · Ambiente: Windows, Node v24.19.0, Astro 5 · Navegador de teste: Chromium 157 (Playwright)

## Mapa requisito → teste → resultado

| # | Requisito (PRD) | Teste executado | Resultado | Evidência |
|---|---|---|---|---|
| 1 | Build sem erros | `npm run build` | ✅ Aprovado | 17 páginas geradas em 2,45s; sitemap criado |
| 2 | Navegação mobile (375px) | Menu popover nativo abre com clique; links corretos | ✅ Aprovado | `menuOpen: true`, 4 links, sem overflow horizontal |
| 3 | Navegação desktop (1280px) | Mesma `<nav>` vira inline; atributo popover removido | ✅ Aprovado | `headerWide: true`, `menuHasPopoverAttr: false` |
| 4 | Página atual indicada | `aria-current="page"` em /guias/ | ✅ Aprovado | Snapshot de acessibilidade |
| 5 | Artigo completo | H1, 4 fontes, 3 relacionados, JSON-LD | ✅ Aprovado | Página golpe-do-pix |
| 6 | Sem anúncios/rastreio antes da hora | Nenhum `.ad-slot`/`.consent-bar` renderizado; 0 requisições externas | ✅ Aprovado | `performance.getEntriesByType('resource')` → origens externas: [] |
| 7 | Contraste (WCAG AA) | Corpo 19.06:1; links 5.78:1; badge 5.21:1 | ✅ Aprovado | Cálculo de luminância no navegador |
| 8 | Teclado | 1º Tab = "Pular para o conteúdo"; foco visível (CSS :focus-visible) | ✅ Aprovado | `document.activeElement` após Tab |
| 9 | Header esconde ao rolar | Rolagem gradual desce → esconde; sobe → volta | ✅ Aprovado (após correção) | Ver "Bug encontrado e corrigido" |
| 10 | 404 amigável | /pagina-inexistente/ → H1 + botões início/guias | ✅ Aprovado | Navegação real |
| 11 | Páginas legais | Privacidade renderiza com 3 placeholders marcados | ✅ Aprovado | Contagem de `.placeholder-mark` |
| 12 | Sitemap | GET /sitemap-index.xml | ✅ Aprovado | HTTP 200 |
| 13 | Console limpo | Logs do navegador | ✅ Aprovado | 0 erros; 1 warning era do script de teste (canvas), não do site |
| 14 | Fontes locais (privacidade) | Nenhuma chamada a fonts.googleapis.com | ✅ Aprovado | @fontsource empacotado no build |

## Bug encontrado e corrigido (registro de recuperação de falha)

- **Sintoma:** header não escondia ao rolar para baixo no Chromium 157.
- **Causa raiz (verificada com sonda no navegador):** o navegador suporta `container-type: scroll-state` e a query `scrollable`, mas NÃO a query `scrolled`. O gate do fallback JS (`CSS.supports('container-type','scroll-state')`) era insuficiente.
- **Correção:** fallback JS roda sempre (passivo, ~15 linhas); regra CSS mantida como enhancement. Ambos aplicam o mesmo transform, sem conflito.
- **Reexecução:** build + teste de rolagem gradual → `hiddenDown: true`, `visibleUp: true`. ✅
- **Regressão:** demais testes (menu, contraste, overflow) repetidos após o rebuild — sem regressão.

## Não executado (com justificativa)

- Testes com leitor de tela real (NVDA/VoiceOver): requer equipamento/sessão humana. Estrutura semântica verificada via árvore de acessibilidade.
- Testes em Safari/Firefox reais: apenas Chromium disponível no ambiente. Recursos usados são Baseline ou têm fallback.
- Lighthouse/axe automatizado: não executado nesta rodada; contraste e semântica verificados manualmente via script. Recomenda-se rodar antes do deploy final.
- Validação com usuários reais: conceito não validado (registrado no PRD).

## Veredito do MVP

**Aprovado para revisão do proprietário** — pendente: preenchimento dos placeholders legais, revisão humana dos artigos e decisão de publicação.