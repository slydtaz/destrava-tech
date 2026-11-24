# Relatório de QA — Destrava Tech MVP

Data: 2026-11-23 · Ambiente: Windows, Node v24.19.0, Astro 5 · Navegador de teste: Chromium 157 (Playwright)

## QA dos ícones Lucide e do botão de animações — 0.2.3 (2026-11-23 a 2026-11-24)

Executado sobre `npm run preview` do build local do código final desta rodada, commit `eab0f35` (61 páginas), em Chromium via `agent-browser`. As verificações de `c615b4e` foram refeitas depois das correções de revisão, e o build final passou também após os ajustes de persistência e de fallback de revelação. Os commits seguintes desta rodada são só documentação e não alteram o código verificado. Após autorização explícita, o mesmo código foi publicado em 2026-11-24 como deploy `dpl_7bvyYkgAEeM19Kpsc4YYBKeTUFgy` e conferido no ar (linha "Deploy" abaixo). Zero dependência, pacote, CDN, requisição externa ou alteração de sitemap; `SITE.adsEnabled` continua `false`.

| Verificação | Resultado | Evidência |
|---|---|---|
| Build e diff | ✅ | `npm run build` exit 0, 61 páginas; `git diff --check` limpo |
| Paridade i18n | ✅ | 90/90/90 chaves em `pt.ts`/`en.ts`/`es.ts` (3 novas: `motion.toggle`, `motion.on`, `motion.off`) |
| Sitemap | ✅ | `dist/sitemap-0.xml` com 60 `<loc>` e 180 `<xhtml:link>` — byte-idêntico ao publicado |
| Ícones Lucide | ✅ | 24 SVGs com `viewBox="0 0 24 24"`, sem `width`/`height` no `<svg>`, sem hex, traço por token; claro `rgb(24,24,27)` → escuro `rgb(250,250,250)`, detalhe `rgb(236,72,153)` |
| Decores | ✅ | Logo `zap`, marcadores `chevron-right`, exemplo `arrow-right`/`check`, voltar ao topo `arrow-up`, copiar link `link`/`check`; zero `clip-path: polygon` nos componentes |
| Alinhamento | ✅ | 5 ilustrações inline com `dx=0` e `dw=0`; 3 marcadores com `dx=0, dy=0`; logo 26×26 px |
| Botão de animações | ✅ | 44×44 px, `aria-pressed`, `data-motion`, ícones `play`/`pause`; padrão `on` mesmo com `prefers-reduced-motion: reduce` |
| Movimento ligado | ✅ | Sob reduced motion emulado: `data-motion='on'`, `.card` com `animationName: 'reveal-up'`, barra `display: block` e transição de página com `animation ... !important` vencendo a regra injetada pelo ClientRouter |
| Movimento desligado | ✅ | Após clique: `data-motion='off'`, `animationName: 'none'`, `opacity: 1` em `.card` e `.section-head` — nada invisível |
| Persistência | ✅ | `off` preservado em `/`, `/en/guias/`, `/es/sobre/` e artigo PT; `dt-theme='dark'` + `dt-motion='off'` sobreviveram a duas navegações com fundo `rgb(9,9,11)` |
| Persistência sem armazenamento | ✅ | Com `setItem` bloqueado, `off` sobreviveu à navegação client-side para `/en/`, com `aria-pressed='false'` e `dt-motion` ausente |
| Fallback de revelação | ✅ | Sem `animation-timeline: view()`, ligar e desligar alterna `has-reveal-fallback`; desligado mantém `opacity: 1` no conteúdo |
| Responsividade | ✅ | `scrollWidth === clientWidth` em 320, 390, 768 e 1280 px; ajuste fino no header em 320 px |
| Foco e teclado | ✅ | 1º Tab = link "Pular para o conteúdo", `outline: solid 3px` |
| Contraste dos textos animados | ✅ | `.swap-from` e `.swap-to` mantêm `opacity: 1` em todo o ciclo; movimento apenas por `translate`, sem queda de contraste |
| Console e rede | ✅ | 0 erros; 0 requisições a origem externa nas quatro páginas medidas |
| Deploy | ✅ | `dpl_7bvyYkgAEeM19Kpsc4YYBKeTUFgy`, production, alias canônico inalterado; conferido no ar em 2026-11-24 |

Nota honesta: a decisão de ligar animações por padrão sobrescreve `prefers-reduced-motion`. Isso está registrado no desenho aprovado; o botão oferece a saída e o estado final do conteúdo continua sempre visível.

## QA da interface viva — 0.2.2 (2026-11-23)

Executado sobre `npm run preview` do build local de `35e5fe4` (61 páginas), em Chromium via `agent-browser`. Nenhuma dependência, pacote, plugin ou skill de projeto nova; `SITE.adsEnabled` continua `false`.

| Verificação | Resultado | Evidência |
|---|---|---|
| Build final | ✅ | `npm run build` exit 0, 61 páginas, `git diff --check` limpo |
| Tema persistente | ✅ | `dt-theme='dark'` em `/` → `/sobre/` → `/` e em `/en/`, `/es/`: `data-theme='dark'`, fundo `rgb(9, 9, 11)`; logo, traços e badge seguem os tokens |
| Ilustrações | ✅ | 5 SVGs inline, 0 `<img>`, 0 `<rect>`/`<circle>`; 352 px na capa e 144 px nas páginas fixas; `stroke` claro `rgb(24,24,27)` → escuro `rgb(250,250,250)` |
| Transição e revelação | ✅ | CSS compilado com 280 ms em `::view-transition-*`; `animationTimeline: 'view()'` e `animationName: 'reveal-up'` nos cards; fallback `has-reveal-fallback` esconde (`opacity: 0`) e restaura com `.is-visible` |
| Barra de progresso | ✅ | 1 instância em todas as páginas; `scaleX(0)` no topo → `scaleX(1)` no fim do scroll |
| `prefers-reduced-motion` | ✅ | `animationName: 'none'`, `opacity: 1`, sem classe de fallback; estado final visível |
| Filtro por pilar | ✅ | 5 botões / 4 seções em PT, EN e ES; `whatsapp` → `aria-pressed='true'` e 3 seções ocultas; `all` → nenhuma oculta |
| Sumário (ToC) | ✅ | 11 links em `/guias/golpe-do-pix-sinais-de-alerta/`; primeiro `href='#por-que-o-pix-atrai-tantos-golpes'` com alvo existente; títulos localizados em EN/ES |
| Copiar link | ✅ | Clique atualiza o rótulo e o `aria-live` para "Link copiado" / "Link copied" |
| Voltar ao topo | ✅ | Oculto no topo, visível em `scrollY=800`, 44×44 px, rolagem volta a `y=0` |
| Paridade i18n | ✅ | Mesmas 8 chaves novas em `pt.ts`, `en.ts` e `es.ts`; `/en/` e `/es/` com textos próprios |
| Console | ✅ | 0 erros em todas as navegações |
| Sitemap | ✅ | Google leu as 60 páginas; nenhuma alteração de arquivo |

## QA final da expansão — Task 19 (2026-11-23)

Executado sobre `npm run preview` do build local de `efe45a2` (61 páginas), em Chromium 157 via Playwright. Nenhuma dependência, pacote, plugin ou skill nova. Nenhuma requisição a origem externa.

| Verificação | Resultado | Evidência |
|---|---|---|
| Build final | ✅ | `npm run build` limpo: 61 páginas em 8,11s; `sitemap-index.xml` criado; `git diff --check` limpo |
| Responsividade 320 / 375 / 768 / 1024 / 1280 / 1440 px | ✅ | Em `/`, `/guias/`, `/guias/golpe-do-pix-sinais-de-alerta/` e `/en/`: `scrollWidth === clientWidth` e nenhum elemento com `right > vw+1` ou `left < -1` |
| 5 navegações consecutivas | ✅ | `/` → `/guias/` → artigo PT → artigo EN → artigo ES → `/`: `lang` = `pt-BR`/`en`/`es`; 0 requisições externas em cada; aviso de tradução apenas nas versões EN/ES |
| Teclado e foco | ✅ | 1º Tab = "Pular para o conteúdo"; `outline: solid 3px` nos 6 primeiros controles; nenhum alvo invisível |
| Controle de tema | ✅ | Botão 44×44 px, `aria-label` "Alternar tema claro e escuro"; clique alterna `data-theme` e grava `dt-theme`; preferência persistiu após navegação cliente |
| Contraste nos dois temas | ✅ | Corpo 19,06:1 em claro e escuro; links de conteúdo 5,78:1 (claro, `#be185d`) e 7,51:1 (escuro, `#f472b6`). Pares de texto e controles medidos ≥ 4,5:1 — exceto os dois tokens decorativos documentados em "Contraste WCAG 2.x" |
| `prefers-reduced-motion` | ✅ | Estado final visível em `.swap`, `.cover-word`, `.illustration`, `.how-line` e exemplo animado (`opacity: 1`, `transform: none`, `visibility: visible`); `scroll-behavior: auto` |
| Skeleton em rede lenta | ✅ | Navegação cliente com latência CDP de 500 ms: `hidden=false` e `[data-skeleton-status]` presente durante o carregamento; ao concluir, `hidden=true` e status removido |
| Zero requisição externa / anúncios | ✅ | `performance.getEntriesByType('resource')` filtrado por origem → `[]`; ausência de `.ad-slot` e `.consent-bar`; `SITE.adsEnabled = false` |
| Console do navegador | ✅ | 0 erros e 0 warnings |
| Paridade i18n | ✅ | 80/80/80 chaves em `pt.ts`/`en.ts`/`es.ts`; `/guias/pt/` ausente em `src/` e `dist/`; avisos de tradução no DOM exclusivamente em EN/ES |
| `hreflang` no HTML | ✅ | `x-default`, `pt-BR`, `en`, `es` apontando para as URLs canônicas corretas na home |
| Sitemap i18n | ✅ | 60 `<loc>` e 180 `<xhtml:link>` (60 por idioma: `pt-BR`, `en`, `es`); zero `/guias/pt/` |
| 404 personalizada | ✅ | `/404.html`: H1 "Essa página não existe (ou mudou de lugar)", 1 ilustração decorativa e os 6 links exatos (`/`, `/guias/`, `/en/`, `/en/guias/`, `/es/`, `/es/guias/`) |
| Arquivos públicos no `dist` | ✅ | `ads.txt`, `robots.txt`, `favicon.svg` e `googlee2e464378dc22f96.html` presentes e byte-idênticos ao `public/` |

Nota sobre falso positivo: uma busca por texto cru no HTML da home PT encontra a string `translation-notice` porque o nome da classe está no CSS empacotado. A contagem no DOM (`querySelectorAll('.translation-notice').length`) é `0` em PT e `1` em cada página EN/ES — comportamento correto.

**Validação no ar (após autorização, 2026-11-23):** deploy `dpl_EvtJP37VmYnSphswh29iAet7AFsD` em `slydtx/destrava-tech`, aliasado a `https://destrava-tech-rho.vercel.app`. HTTP 200 em `/`, `/en/`, `/es/`, guia PT, `/googlee2e464378dc22f96.html` (linha exata, 53 bytes), `/sitemap-index.xml`, `/sitemap-0.xml` (60 loc / 180 alternates), `/robots.txt` e `/ads.txt`; HTTP 404 com a página personalizada em caminho inexistente.

> **Nota:** as seções abaixo, até "Veredito final", são registros do baseline 0.1.0/MVP. Números como "17 páginas/2,45s" e "1 warning" são históricos; os valores atuais da expansão 0.2.0 estão na tabela Task 19 no topo.

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

## Fontes públicas validadas — guias novos (Task 7)

Pesquisa documental feita em 2026-11-23. Todas as URLs abaixo responderam com sucesso no `webfetch`
desta data e tiveram o conteúdo conferido. São apenas referências: nenhum texto de terceiros foi
copiado para o site. Quando uma fonte não cobre um passo, o guia usa a seção honesta "Sobre as fontes".

| Guia (slug) | Fonte | URL | Checado em | O que a fonte efetivamente cobre | Status |
|---|---|---|---|---|---|
| `celular-no-exterior-sem-gastar-muito` | Apple Support — "Use eSIM while traveling internationally with your iPhone" | https://support.apple.com/en-us/118227 | 2026-11-23 | Roaming da operadora atual, passes de viagem, eSIM local ou internacional pré-paga, conferência de desbloqueio do aparelho e escolha da linha usada para dados. | ✅ HTTP 200 |
| `celular-no-exterior-sem-gastar-muito` | Apple Support — "Set up eSIM on iPhone" | https://support.apple.com/en-us/118669 | 2026-11-23 | O que é eSIM, requisitos do aparelho e formas de ativação: transferência, ativação pela operadora, QR code, link e ajuste manual. | ✅ HTTP 200 |
| `ia-para-traduzir-textos-com-seguranca` | Google Translate Help — "How Google protects your privacy & keeps you in control" | https://support.google.com/translate/answer/10400210?hl=en | 2026-11-23 | Controles de privacidade da conta Google; Translate aparece entre os serviços cobertos; orienta a revisar e excluir atividade salva e alerta que atividade também pode ficar no navegador. | ✅ HTTP 200 |
| `ia-para-traduzir-textos-com-seguranca` | Google Translate Help — "Translate written words" | https://support.google.com/translate/answer/6142478?hl=en | 2026-11-23 | Passos para traduzir texto no app e no navegador, recomendação de escrever frases completas para dar contexto e opções de ouvir, compartilhar e inverter a tradução. | ✅ HTTP 200 |
| `wifi-publico-como-proteger-seus-dados` | CISA — "Best Practices for Using Public Wi-Fi Tip Card" | https://www.cisa.gov/resources-tools/resources/best-practices-using-public-wi-fi-tip-card | 2026-11-23 | Riscos de redes Wi-Fi públicas e referência ao cartão de boas práticas. A própria página informa que o conteúdo está arquivado (revisão de 2020). | ✅ HTTP 200 |
| `wifi-publico-como-proteger-seus-dados` | Android Help — "Connect to Wi-Fi networks on your Android device" | https://support.google.com/android/answer/9075847?hl=en | 2026-11-23 | Como conectar, redes salvas e reconexão automática, troca de rede pelo painel, remoção de rede salva e leitura da força do sinal. | ✅ HTTP 200 |
| `wifi-publico-como-proteger-seus-dados` | NIC.br / Cidadão na Rede — "Redes Públicas" | https://cidadaonarede.nic.br/pt/videos/redes-publicas | 2026-11-23 | Em português: redes públicas não garantem privacidade, existem redes WiFi falsas, conferir cadeado/HTTPS e usar dados móveis para informações sigilosas. | ✅ HTTP 200 |
| `golpe-de-falso-suporte-no-whatsapp` | WhatsApp Help Center — "About suspicious messages and scams" | https://faq.whatsapp.com/2286952358121083 | 2026-11-23 | Sinais de mensagem suspeita (link, pedido de dados ou dinheiro, promessa de emprego, imitação de conhecido), confirmação da identidade por chamada e encaminhamento para bloqueio e denúncia. | ✅ HTTP 200 |
| `golpe-de-falso-suporte-no-whatsapp` | WhatsApp Help Center — "How to block and report someone" | https://faq.whatsapp.com/1142481766359885 | 2026-11-23 | Passos para bloquear e denunciar contato ou número desconhecido no Android, iOS e Web, e o que é enviado ao WhatsApp numa denúncia. | ✅ HTTP 200 |
| `golpe-de-falso-suporte-no-whatsapp` | WhatsApp Help Center — "Account security tips" | https://faq.whatsapp.com/1095301557782068 | 2026-11-23 | Camadas extras de proteção da conta: verificação em duas etapas, senha, passkey, bloqueio de app, bloqueio de conversas e backup criptografado. | ✅ HTTP 200 |

Nota: as URLs testadas que falharam ou não serviram de referência ficam registradas apenas no
relatório da Task 7, fora do site. Nenhuma delas foi listada como fonte acima.

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

## Veredito final (expansão completa)

**QA aprovado e publicado em 2026-11-23** — build limpo (61 páginas), 20 tasks concluídas e revisadas task a task, zero requisição externa, zero anúncio, zero erro de console, WCAG 2.2 AA verificado nos pares de texto e controles medidos, nos dois temas (exceto os dois tokens decorativos documentados acima). Publicação autorizada explicitamente e validada no ar: verificação do Google, sitemap com hreflang, robots, ads.txt, home PT/EN/ES, guia e 404. Restam apenas porteiras humanas externas ao código: dados legais pendentes, Search Console, titularidade AdSense e revisão editorial.