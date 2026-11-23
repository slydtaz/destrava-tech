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

## Contraste WCAG 2.x — tema claro/escuro (Task 4)

Medição feita com script Node descartável fora do repo (sem dependência nova), pela fórmula
`(Lclaro + 0.05) / (Lescurado + 0.05)`, com `L = 0.2126R + 0.7152G + 0.0722B` em sRGB linearizado
(limiar `0.04045`). Valores de `color-mix` convertidos para hexadecimal antes do cálculo.

| Tema | Par | Cores (fundo / texto) | Razão | Mínimo | Resultado |
|---|---|---|---|---|---|
| claro | fundo / texto | #fafafa / #09090b | 19.06:1 | 4.5:1 | OK |
| escuro | fundo / texto | #09090b / #fafafa | 19.06:1 | 4.5:1 | OK |
| claro | fundo / secondary | #fafafa / #3f3f46 | 10.01:1 | 4.5:1 | OK |
| escuro | fundo / secondary | #09090b / #94a3b8 | 7.76:1 | 4.5:1 | OK |
| claro | fundo / muted-foreground | #fafafa / #475569 | 7.26:1 | 4.5:1 | OK |
| escuro | fundo / muted-foreground | #09090b / #94a3b8 | 7.76:1 | 4.5:1 | OK |
| claro | cartão / texto do cartão | #ffffff / #09090b | 19.90:1 | 4.5:1 | OK |
| escuro | cartão / texto do cartão | #18181b / #fafafa | 16.97:1 | 4.5:1 | OK |
| claro | cartão / muted-foreground | #ffffff / #475569 | 7.58:1 | 4.5:1 | OK |
| escuro | cartão / muted-foreground | #18181b / #94a3b8 | 6.91:1 | 4.5:1 | OK |
| claro | fundo / accent-text | #fafafa / #be185d | 5.78:1 | 4.5:1 | OK |
| escuro | fundo / accent-text | #09090b / #f472b6 | 7.51:1 | 4.5:1 | OK |
| claro | accent / on-accent | #ec4899 / #000000 | 5.95:1 | 4.5:1 | OK |
| escuro | accent / on-accent | #ec4899 / #000000 | 5.95:1 | 4.5:1 | OK |
| claro | borda / fundo (token do brief) | #e4e4e7 / #fafafa | 1.22:1 | 3:1 | **FALHA** |
| escuro | borda / fundo (token do brief) | #3f3f46 / #09090b | 1.91:1 | 3:1 | **FALHA** |
| claro | borda de controle / fundo | #71717a / #fafafa | 4.63:1 | 3:1 | OK |
| escuro | borda de controle / fundo | #64748b / #09090b | 4.18:1 | 3:1 | OK |
| claro | borda de controle / cartão | #71717a / #ffffff | 4.83:1 | 3:1 | OK |
| escuro | borda de controle / cartão | #64748b / #18181b | 3.72:1 | 3:1 | OK |
| claro | primary / on-primary | #18181b / #ffffff | 17.72:1 | 4.5:1 | OK |
| escuro | primary / on-primary | #fafafa / #09090b | 19.06:1 | 4.5:1 | OK |
| claro | muted / texto | #e8ecf0 / #09090b | 16.76:1 | 4.5:1 | OK |
| escuro | muted / texto | #27272a / #fafafa | 14.27:1 | 4.5:1 | OK |
| claro | badge fundo / badge texto | #fdedf5 / #be185d | 5.35:1 | 4.5:1 | OK |
| escuro | badge fundo / badge texto | #2a0d1c / #f472b6 | 6.76:1 | 4.5:1 | OK |
| claro | consent-bar / link | #18181b / #fbcfe8 | 12.82:1 | 4.5:1 | OK |
| escuro | consent-bar / link | #fafafa / #be185d | 5.78:1 | 4.5:1 | OK |
| claro | hover do botão / texto | #be185d / #ffffff | 6.04:1 | 4.5:1 | OK |
| escuro | hover do botão / texto | #f472b6 / #09090b | 7.51:1 | 4.5:1 | OK |

Nota: os pares "borda / fundo (token do brief)" usam os valores exigidos no brief
(`--color-border` claro `#e4e4e7`, escuro `#3f3f46`) e ficam abaixo de 3:1 — o valor claro já era
assim antes desta task. Para não mascarar o achado, o token `--color-border-control` foi criado
somente para contornos de controles e passa em ambos os temas. A mudança do token decorativo
exige decisão de design fora do escopo desta task.

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