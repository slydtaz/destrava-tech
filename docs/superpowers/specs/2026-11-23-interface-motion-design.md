# Direção de interface e movimento — Destrava Tech

Data: 2026-11-23
Status: **aguardando aprovação do proprietário antes de qualquer edição de código**
Skill líder: `design-excellence` · Apoio: `brainstorming` (gate de design) e `modern-web-guidance` (APIs nativas)

---

## 1. Objetivo

O pedido foi: *adicionar animações skeleton, animações de transição entre páginas, animações em geral e melhorar a interface*.

Traduzindo para um plano verificável:

1. Fazer a navegação parecer contínua, sem "piscar" entre páginas.
2. Criar um indicador de carregamento **honesto** (não fingir espera em site estático).
3. Dar feedback visual a ações reais (menu, cards, botões, leitura).
4. Corrigir problemas concretos de acessibilidade, responsividade e confiança encontrados na auditoria.

Não há meta de "parecer app". O site é uma revista de guias: a animação deve ajudar a ler, não competir com o texto.

---

## 2. Classificação (design-excellence, etapa 1)

| Eixo | Classificação |
|---|---|
| Superfície | `Read` — conteúdo/guia, não painel nem loja |
| Tarefa | Extensão + polimento + auditoria (não redesign) |
| Plataforma | Web, mobile-first, LTR, pt-BR |
| Escopo | Todo o site, mas em fatias reversíveis |
| Resultado deste documento | Direção de design + backlog priorizado + decisão de abordagem |
| Risco geral | Médio-baixo: qualquer erro em script de navegação pode quebrar menu/rolagem; por isso o gate de aprovação |

---

## 3. Evidências coletadas

### 3.1 Estado atual

- Site público em `https://destrava-tech-rho.vercel.app` (17 páginas, Astro 5 estático, build local aprovado).
- Identidade já definida em `design-system/destrava-tech/MASTER.md`: preto `#18181B`, rosa `#EC4899` (texto `#BE185D`), fundo `#FAFAFA`, Libre Bodoni + Public Sans **hospedadas localmente**.
- `src/styles/global.css:54-65` já desliga movimento com `prefers-reduced-motion`.
- `docs/qa-report.md` registra 14 checagens aprovadas em 375px e Chromium 157.
- `SITE.adsEnabled = false`: não há anúncio, cookie de terceiro nem requisição externa hoje.

### 3.2 Medições novas feitas nesta rodada (DOM real, Chromium via Playwright)

| Largura | Página | Resultado |
|---|---|---|
| 320px | `/guias/chatgpt-gemini-meta-ai-qual-usar/` | **overflow horizontal de 229px** na tabela comparativa |
| 375px | mesmo artigo | **overflow horizontal de 174px** |
| 320/375/834/1280px | home, índice, artigo Pix | overflow 0; header 69px; H1 30,4px no mobile |
| 320–1440px | demais rotas | overflow 0 (exceto artigo da tabela) |
| 375px | links do rodapé | altura **17px** (abaixo do mínimo confortável de 24px da WCAG 2.2) |
| Chromium 157 | `CSS.supports('view-transition-name','none')` | `true` — View Transitions disponíveis |

Capturas de baseline salvas em:
`baseline-home-desktop.png`, `baseline-home-mobile.png`, `baseline-guides-desktop.png`, `baseline-article-desktop.png`.
**Limitação:** as capturas foram geradas, mas não houve análise visual humana nesta rodada; as conclusões vêm de geometria/estilos medidos no DOM e de revisão de código.

### 3.3 Auditoria de código (subagente `explore`, somente leitura)

O inventário completo tem ~30 itens. Os mais importantes, com evidência:

| ID | Sev. | Achado | Evidência |
|---|---|---|---|
| C1 | **blocker** | Página de contato mostra placeholder; e-mail real nunca é usado | `src/pages/contato.astro:23-24`, `src/site.config.ts:15` |
| C2 | alto | `[PREENCHER...]` visível em Sobre/Contato/Privacidade/Termos | `src/pages/privacidade.astro:12,15-16,26-27,69-70`; `termos.astro:12,55-56`; `sobre.astro:54-55`; `contato.astro:23-24` |
| C3 | alto | Data pode sair com dia errado (UTC-3) porque `Intl.DateTimeFormat` não fixa `timeZone` | `src/components/ArticleCard.astro:12`, `src/pages/guias/[...id].astro:16` |
| A1 | alto | Tabela larga estoura o viewport | `global.css:560-565`, `src/content/guias/chatgpt-gemini-meta-ai-qual-usar.md:21-26` + medição acima |
| A2 | alto | Âncoras dos pilares ficam sob o header sticky | `index.astro:37` → `/guias/#seguranca`; sem `scroll-padding-top` |
| A3 | alto | Card parece clicável por inteiro, mas só o título é link | `ArticleCard.astro:15-19`, `global.css:397-426` |
| A4 | alto | `aria-current="page"` errado dentro de artigos | `Header.astro:14-15` (`startsWith('/guias/')`) |
| A5 | alto | Botão Menu não expõe estado expandido | `Header.astro:28-39` (tem `aria-controls`, falta `aria-expanded`) |
| M1 | médio | Entrada de página é instantânea; diretriz pede 150–300ms | `Base.astro:40-45`, `MASTER.md:196` |
| M2 | médio | Sem indicador de progresso de leitura em guias longos | `MASTER.md:179`, `global.css:521-537` |
| M3 | médio | Popover do menu abre sem transição | `Header.astro:40`, `global.css:252-272` |
| H1 | médio | Artigos longos sem sumário | `[...id].astro:14` já tem `headings` disponível |
| H2 | médio | Índice não diz quantos guias existem nem tem atalhos de tema | `guias/index.astro:18-51` |
| H3 | médio | Link de fonte externa não avisa que abre nova aba | `[...id].astro:63` |
| S1 | médio | Promessa "fontes citadas" nem sempre cumprida | `ia-para-estudar-sem-colar.md` sem `sources`; `index.astro:77` promete fonte |
| S2 | médio | "Não coleta dados pessoais" é impreciso (Vercel registra IP) | `index.astro:79` vs `privacidade.astro:32-40` |
| S3 | médio | Falta `og:image` local; público compartilha no WhatsApp | `Base.astro:31-36` |
| R1 | médio | Links do rodapé com 17px de altura | medição + `global.css:641-652` |
| R2 | baixo | `main:focus` apaga o foco visível do skip link | `global.css:341-343` |
| R3 | baixo | Botões do 404 sem espaçamento | `404.astro:18-19` |
| S4 | baixo | JS do consentimento roda mesmo com anúncios desligados | `ConsentBar.astro:22-40` |
| S5 | baixo | "Equipe Destrava Tech" soa genérico | `[...id].astro:48` vs `sobre.astro:51-56` |

Itens preventivos/condicionais: pilar vazio sem aviso (`index.astro:41`, `guias/index.astro:30`), relacionados vazios (`[...id].astro:19-21`), banner de consentimento cobrindo rodapé quando ativado, `localStorage` sem `try/catch`, texto interno do `AdSlot` vazando se ligado.

---

## 4. Direção de design

### 4.1 Tese

> No Destrava Tech, movimento deve funcionar como **virar a página de uma revista**: curto, silencioso e previsível. Ele confirma de onde você veio e onde está, e desaparece antes de você perceber.

### 4.2 Assinatura

**A linha de leitura.** Uma linha fina na cor rosa, ecoando o traço de separação das seções e do raio do logotipo. Ela fica no topo dos artigos e marca o progresso da leitura (2px, alimentado por `animation-timeline: scroll()`).

Na troca de página, **a linha não se move**: a continuidade vem de um cross-fade de ~200ms com leve subida de 6px. São mecanismos separados de propósito — a linha informa posição na leitura; a transição informa mudança de página. Mantê-los distintos evita que duas animações disputem o mesmo `transform`.

### 4.3 Sistema

| Papel | Valor | Uso |
|---|---|---|
| Cor de movimento | `--color-accent` `#EC4899` | linha de progresso, único destaque animado |
| Cor de estado | `--color-primary` `#18181B` | foco, borda de card ativo |
| Duração | entrada/transição 160–220ms; hover 120ms (exceção curta); pulse do skeleton 1.2s (loop funcional, fora da faixa) | faixa principal 150–300ms do design system; as exceções são curtas e justificadas |
| Easing | `cubic-bezier(0.2, 0, 0, 1)` para entrada; `ease` para hover | sem bounce, sem spring |
| Distância | 4–8px de `translateY` no máximo | nada de "voar" na tela |
| Propriedades | somente `opacity`, `transform`, `border-color` | evitar layout/paint pesado |
| Reduced motion | movimento **desligado**, estado final sempre visível | já existe base em `global.css:54-65` |
| Sem rede | nenhuma fonte, imagem ou script de terceiro | preserva o QA de privacidade |

### 4.4 Conteúdo

Nenhum texto de marketing inventado. Os únicos textos novos são funcionais e em português simples:

- `(abre em nova aba)` — apenas para leitores de tela.
- "Neste guia" — rótulo do sumário, quando implementado.
- "Carregando página…" — texto de status do skeleton, **só se o skeleton aparecer de verdade**.
- "10 guias em 4 temas" — número derivado do conteúdo, não chute.
- Correção honesta: "Não pede cadastro nem usa cookies; o servidor registra apenas dados técnicos de acesso."

### 4.5 Anti-direção (o que NÃO fazer)

- ❌ Reveal em todo card/section ao rolar — cansa a leitura e é marca de template genérico.
- ❌ Skeleton permanente ou delay artificial para "mostrar a animação" — seria mentira: as páginas já vêm prontas no HTML.
- ❌ Gradientes neon, glow, blur, parallax, confete, cursor customizado.
- ❌ Bounce/spring, loops decorativos, contadores animados.
- ❌ Substituir as fontes locais por Google Fonts ou qualquer CDN (quebra privacidade).
- ❌ Trocar o editorial por "dashboard escuro" ou "landing de SaaS".
- ❌ Adicionar biblioteca de animação, analytics, cookies ou domínio pago.
- ❌ Animar largura/altura/shadow — usar `transform`/`opacity`.

---

## 5. Decisão necessária: como fazer a transição de página

| Abordagem | Como funciona | Prós | Contras | Skeleton? |
|---|---|---|---|---|
| **A — Recomendada: Astro `ClientRouter` + `fallback="swap"` + CSS de transição** | `<ClientRouter />` no `<head>` do `Base.astro`; scripts encapsulados em `astro:page-load` com limpeza em `astro:before-swap`; transição CSS de 200ms; skeleton só se a navegação passar de ~300ms | Funciona também em navegadores sem View Transitions; permite controlar o skeleton de verdade; mantém a identidade | Mais cuidado com ciclo de script (ResizeObserver, listener de scroll, popover, `aria-expanded`) | ✅ honesto |
| **B — CSS puro: `@view-transition { navigation: auto }`** | Cross-fade nativo do navegador, sob `@media (prefers-reduced-motion: no-preference)` | Zero JS, zero risco de script, full reload natural corrige `aria-current` e popover | Só anima onde o navegador suporta; não dá para mostrar skeleton de verdade (o HTML já chega pronto) | ❌ seria falso |
| **C — Troca de DOM customizada / biblioteca** | Router próprio ou lib externa | Controle total | Dependência, peso, risco de quebrar navegação e privacidade; overkill para 17 páginas estáticas | ⚠️ mas não vale o custo |

**Recomendação:** **A**, com `fallback="swap"` (sem animação simulada em navegadores antigos) e o skeleton limitado a navegação lenta real.

### Regra do skeleton honesto (vale para qualquer abordagem)

1. O início da preparação (`astro:before-preparation`) começa um timer de **300ms** — cobre clique, voltar e avançar, que não têm evento de clique próprio.
2. Se a página nova estiver pronta antes disso (`astro:after-preparation`): **nada aparece**. Nenhum atraso é adicionado.
3. Se passar de 300ms: mostra um overlay com blocos neutros no formato do conteúdo esperado (linhas do título/cards), com `aria-hidden="true"` na parte visual. Um texto sr-only "Carregando página…" é inserido **somente enquanto o skeleton está visível**; não criamos outro `aria-live`, porque o próprio `ClientRouter` já anuncia a nova rota.
4. Esconde no `astro:after-swap` (DOM novo já trocado), com `astro:page-load` apenas como rede de segurança. Há também um teto duro de **3s** para limpar tudo se o fetch falhar, der offline ou o evento de conclusão não chegar.
5. Com `prefers-reduced-motion: reduce`: blocos estáticos, sem pulse.
6. Nunca mostra skeleton em navegação para a mesma URL ou âncora (`#`).

É um indicador de **rede**, não uma "animação de carregamento" decorativa. Em site estático ele quase nunca deve aparecer.

**Restrição de router:** não usar `transition:persist` no `.site-header`. O `aria-current` é calculado no servidor com base no path; persistir o header deixaria o estado errado dentro dos artigos — exatamente o bug A4 que queremos corrigir. O `<html>` também não recebe `transition:animate="none"`: o visual da transição é definido em `::view-transition-old(root)` / `::view-transition-new(root)` no CSS.

Se o proprietário preferir **B**, o item skeleton é removido do escopo e isso fica registrado como decisão consciente — não como promessa cumprida.

---

## 6. Backlog priorizado ("tudo que dá para melhorar")

### Lote 0 — Correções de base (fazer antes de qualquer animação, independente da abordagem)

| # | Item | Severidade | Arquivo |
|---|---|---|---|
| 0.1 | **Bloqueado por dado humano:** substituir placeholder por e-mail real + `mailto:`. Provisório seguro: remover a seção de e-mail e manter o texto LGPD | blocker | `contato.astro`, `site.config.ts` |
| 0.2 | Remover todos os `[PREENCHER]`; se não puder preencher agora, esconder a seção com segurança | alto | Sobre, Contato, Privacidade, Termos |
| 0.3 | Fixar `timeZone: 'UTC'` nos formatadores de data | alto | `ArticleCard.astro`, `[...id].astro` |
| 0.4 | Conter tabela com `overflow-x:auto`, wrapper focável e `aria-label` | alto | `global.css`, artigo de IA |
| 0.5 | `scroll-padding-top` no `html` + `scroll-margin-top` em `section[id]` | alto | `global.css` |
| 0.6 | Área clicável inteira do card (um único `<a>` com `::after`) | alto | `ArticleCard.astro`, `global.css` |
| 0.7 | `aria-current` correto (`page` só em correspondência exata; `location` em descendentes) | alto | `Header.astro` |
| 0.8 | `aria-expanded` sincronizado com `beforetoggle`/`toggle`; zerar no layout wide | alto | `Header.astro`, `Base.astro` |
| 0.9 | `await import()` do polyfill antes de instalar listeners | baixo | `Base.astro` |

### Lote 1 — Movimento com propósito (o pedido principal)

| # | Item | Severidade | Como |
|---|---|---|---|
| 1.1 | Transição de página escolhida em §5 | médio | A (recomendado), B ou C |
| 1.2 | Skeleton honesto da regra §5 | médio | overlay + timer + status, se abordagem A |
| 1.3 | Barra de progresso de leitura no topo dos artigos | médio | `animation-timeline: scroll()` + `aria-hidden`, sem JS |
| 1.4 | Entrada suave do conteúdo (`.hero`/`.article-header`), 180ms, só no que muda | médio | CSS `@keyframes`, sem stagger longo |
| 1.5 | Popover com `@starting-style` + `allow-discrete` + `overlay` | médio | 140ms, desligado no layout wide |
| 1.6 | Hover/foco dos cards com `:has(a:hover/:focus-visible)` e `@media (hover:hover)` | médio | evita hover grudado no touch |
| 1.7 | Botões com estado `:active` de 1px e transição curta | baixo | `.button`, `.menu-button` |
| 1.8 | Respeitar reduced motion em **todos** os itens acima, mantendo estado final visível | alto | `global.css` + regra do ClientRouter |

### Lote 2 — Hierarquia, estados e responsividade

| # | Item | Severidade |
|---|---|---|
| 2.1 | Sumário "Neste guia" usando `headings` do `render()` (desktop discreto, mobile dobrado) | médio |
| 2.2 | Índice com total derivado do conteúdo + chips-âncora de tema | médio |
| 2.3 | Aviso `(abre em nova aba)` para leitores de tela nas fontes | médio |
| 2.4 | Links isolados com mínimo 24×24px (rodapé, "Ver todos", "Avise a gente") | médio |
| 2.5 | `main:focus:not(:focus-visible)` para não apagar foco do skip link | baixo |
| 2.6 |Espaçamento entre botões do 404 | baixo |
| 2.7 | Link "Início" no rodapé | baixo |
| 2.8 | Card de pilar com 0 guias desabilitado; seção "Em breve" no índice | baixo |
| 2.9 | Relacionados com fallback para guias recentes de outros pilares | médio |
| 2.10 | Fontes obrigatórias no schema OU texto honesto quando o guia não tem fonte externa | médio |
| 2.11 | Reduzir padding inferior do `main` em telas pequenas | baixo |
| 2.12 | Conferir CLS das fontes locais (`font-display`/`size-adjust`), sem trocar por CDN | médio |
| 2.13 | Reservar espaço quando `ConsentBar` ligar + `aria-live="polite"` + `try/catch` no `localStorage` | baixo |
| 2.14 | `AdSlot.astro:18` e `ConsentBar.astro:9` **já** condicionam a `adsEnabled`; falta só envolver `localStorage` em `try/catch`, reservar espaço quando a barra ligar e adicionar `aria-live="polite"` | baixo |

### Lote 3 — Confiança e compartilhamento (podem esperar o responsável adulto)

| # | Item | Severidade |
|---|---|---|
| 3.1 | Copy honesto sobre dados técnicos de acesso em vez de "não coleta seus dados" | médio |
| 3.2 | `og:image` local (PNG gerado do SVG do logotipo, hospedado no próprio site) | médio |
| 3.3 | Trocar "Equipe Destrava Tech" por "Destrava Tech" / "Revisado por Destrava Tech" | médio |
| 3.4 | Canônica deve ser revisada se o endereço final mudar (hoje o `vercel.app` já serve) | médio |

**Fora de escopo:** login, banco, comentários, analytics, cookies de terceiros, domínio pago, AdSense ativo, busca com serviço externo, instalação de pacotes/skills.

---

## 7. Critérios de aceitação

1. **Navegação:** clique em link interno troca de página sem flash branco; voltar/avançar do navegador funciona; âncoras `/guias/#seguranca` param abaixo do header.
2. **Skeleton (se abordagem A):** com `npm run preview` e rede normal, nunca aparece; com rede simulada lenta e preparação acima de 300ms, aparece e some no `astro:after-swap`; teto de 3s; nenhum texto de status no DOM em carregamentos rápidos.
3. **Progresso de leitura:** linha acompanha a rolagem no artigo; some com reduced motion; não cobre texto.
4. **Acessibilidade:** foco visível em todos os controles — inclusive no `<main>` se o foco for parar lá após a navegação; `aria-expanded` correto; `aria-current` correto em artigo; alvos isolados ≥24px; nenhuma animação quando `prefers-reduced-motion: reduce`; estado final sempre visível; barra de progresso oculta (`display:none`) nesse modo.
5. **Responsividade:** zero overflow horizontal em 320, 375, 768, 1024, 1280 e 1440px — incluindo o artigo da tabela.
6. **Desempenho/privacidade:** continua com 0 requisições externas; nenhum novo pacote; build sem erros; console sem erros.
7. **Conteúdo:** nenhum `[PREENCHER]` em produção; data correta em UTC; contato com e-mail real ou seção removida com segurança.

---

## 8. Plano de QA (depois da implementação)

- `npm run build` — 17 páginas + sitemap.
- Playwright/Chromium em 320/375/768/1024/1280/1440px: overflow, header, menu, foco, teclado (Tab/Enter/Esc), console, requisições externas.
- Teste de reduced motion ligado no navegador: nenhuma animação, conteúdo visível.
- Teste de transição: navegar Início → Guias → Artigo → voltar; medir se o skeleton aparece (deve não aparecer em local) e se `aria-current` atualiza.
- Reexecutar as 14 checagens de `docs/qa-report.md` e atualizar o relatório com os novos resultados, incluindo a limitação de nenhum leitor de tela real.
- Só pedir autorização de deploy depois que tudo estiver verde.

---

## 9. Pendências humanas (fora do meu alcance)

- Responsável adulto (18+) precisa criar/aprovar a conta AdSense e preencher nome/e-mail legais.
- **Bloqueado por dado humano:** e-mail real de contato (hoje `contato@exemplo.invalid`), nome completo do responsável, foro da comarca e revisão dos textos legais. Ação provisória segura: remover a seção de e-mail e trocar `[PREENCHER]` por texto neutro — nunca inventar dado.
- Endereço final/canônica depende da decisão de publicação (o `vercel.app` atual já serve; não é preciso domínio pago).
- Revisão humana dos 10 guias antes de qualquer pedido de monetização.
- Escolha da abordagem A, B ou C — **já aprovada: A**.

---

## 10. Registro de aprovação

- [x] Abordagem escolhida: **A — Astro `ClientRouter` + `fallback="swap"` + skeleton honesto com limite de 300ms**
- [x] Lotes autorizados: **Lote 0 (correções de base) + Lote 1 (movimento)**, em fatias verificáveis
- [x] Posso editar código: **sim**
- [x] Posso publicar no Vercel depois do QA: **não** — decisão posterior, com autorização explícita

> Nenhum arquivo de `src/` foi modificado até esta aprovação. Lotes 2 e 3 ficam como backlog, salvo item que seja necessário para os critérios de aceitação dos Lotes 0/1.
