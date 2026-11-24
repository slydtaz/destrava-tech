# Ícones Lucide + botão de animações — desenho curto

## Intenção

Substituir os 24 SVGs abstratos e os decores CSS feitos à mão por ícones da biblioteca Lucide, copiados inline no projeto. O proprietário achou os elementos de imagem "meio desalinhados". O recon mostrou que os containers estão alinhados (`dx=0` em todas as páginas): o problema é o desenho interno — traços assimétricos que escapam do `viewBox` — e a falta de consistência entre os decores (seta, losango, badge, marcadores).

O proprietário também relatou que não vê animações no site e pediu um botão para ligar/desligar. A tarefa cresceu e passa a incluir esse controle.

## Metas

- Consistência visual: mesma grade 24×24, mesmo traço, mesma família em todas as páginas e idiomas.
- Alinhamento: ícones centrados no `viewBox`, sem traços que vazem para a borda.
- Tema: `stroke` por tokens/CSS custom properties, sem hex fixo; claro e escuro funcionando.
- Zero dependência, zero pacote, zero CDN, zero requisição externa nova.
- Crédito de licença no repositório.
- Botão de animações visível no header, com estado persistido e textos nos três idiomas.

## Causa das animações invisíveis (investigada)

Evidência coletada no ar em 2026-11-23:

- Com `prefers-reduced-motion: no-preference`: `.card` tem `animationName: reveal-up`, `animationTimeline: view()`, barra de progresso com `transform: scaleX(0.39)` em `scrollY=900`. As animações **existem e funcionam**.
- Com `prefers-reduced-motion: reduce`: `.card` tem `animationName: none`, `animationTimeline: auto`, barra com `display: none`, `.hero` com `animationName: none`. Tudo desligado — comportamento intencional de acessibilidade.

Conclusão: a preferência de movimento reduzido do sistema/navegador do proprietário está desligando as animações. **Decisão do proprietário (2026-11-23): animações ligadas por padrão**, sobrescrevendo a preferência do sistema. O botão serve para desligar. Aviso registrado: isso diverge da recomendação de acessibilidade de respeitar `prefers-reduced-motion` por padrão. Mitigação mantida: nenhum conteúdo fica escondido de forma permanente — o estado final sempre visível continua valendo, e o movimento é apenas uma melhora passageira. Quem precisar desligar tem o botão no header.

## Não-metas

- Não mudar layout, conteúdo, textos, rotas, sitemap ou i18n.
- Não instalar pacote nem usar `<img>` para ícone.
- Não alterar a identidade preto+rosa nem os tamanhos atuais (144 / 352 / 112 px).

## Restrições

- Lucide usa licença **ISC** (confirmada em `raw.githubusercontent.com/lucide-icons/lucide/main/LICENSE`, 2026-11-23). Alguns ícones são derivados do Feather e usam **MIT**; ambos os avisos precisam constar no crédito.
- `Illustration.astro` já injeta SVG inline via `import.meta.glob(..., { query: '?raw' })` — reaproveitar esse mecanismo.
- WCAG 2.2 AA: ícones decorativos com `aria-hidden`, contraste dos tokens, foco visível; botão novo e controles de 44 px, com exceção documentada do seletor de idioma em telas ≤ 30 rem, reduzido para 36 px para caber no header sem overflow (acima do mínimo WCAG 2.2 de 24 px). `prefers-reduced-motion` deixa de ser o padrão por decisão explícita do proprietário; o botão oferece a saída e o estado final do conteúdo continua sempre visível.
- Cada mudança termina com `npm run build` limpo e commit local. Deploy **não** autorizado nesta rodada.

## Abordagens

1. **Lucide inline (escolhida).** Copiar os SVG dos ícones para `public/illustrations/`, trocar `stroke="currentColor"` por tokens, manter `viewBox="0 0 24 24"`. Consistência máxima, custo zero em runtime, compatível com a regra de zero dependência.
2. **Heroicons (MIT).** Também consistente, mas menos variedade para temas específicos (Pix, Wi-Fi, bateria, tradução).
3. **Ajustar a geometria dos desenhos atuais.** Rejeitada: não resolve a percepção de amadorismo/alinhamento que motivou o pedido.

## Desenho

- Grade única nos SVGs: `viewBox="0 0 24 24"`, `fill="none"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `stroke` por `var(--color-primary)` com detalhes em `var(--color-accent)`.
- `Illustration.astro` continua inline; wrapper mantém `inline-size: min(100%, var(--illustration-size))`, `aria-hidden` quando decorativo e `data-astro-cid`.
- Mapeamento por tema dos 24 arquivos:
  - `home-cover` → `trending-up`
  - `pillar-seguranca` → `shield-check`; `pillar-whatsapp` → `message-circle`; `pillar-celular` → `smartphone`; `pillar-ia` → `sparkles`
  - `about` → `users`; `contact` → `mail`; `privacy` → `lock-keyhole`; `terms` → `file-text`; `notfound` → `compass`
  - 16 guias → um ícone por assunto (`key-round` senhas, `battery-charging` bateria, `languages` tradução, `graduation-cap` estudos, `wifi` Wi-Fi público, `globe` exterior, `circle-alert` golpes, `message-circle-warning` falso suporte, etc.)
- Decores CSS substituídos por ícones inline: logo → `zap`; marcadores do "como funciona" → `chevron-right`; exemplo animado → `arrow-right` (linha) e `check` (passo); voltar ao topo → `arrow-up`; copiar link → `link`/`check`.
- O badge com canto cortado permanece: é forma, não imagem.
- Crédito em `docs/third-party-credits.md` com os avisos ISC e MIT na íntegra.

### Botão de animações

- Novo `MotionToggle.astro` no header, ao lado do alternador de tema, com ícone Lucide e alvo ≥ 44 px, `aria-pressed` e rótulo localizado (`motion.toggle`, `motion.on`, `motion.off` em PT/EN/ES).
- Estado em `localStorage['dt-motion']`: ausente = **ligado por padrão** (decisão do proprietário); `'off'` = desligar; `'on'` = religar explicitamente. Atributo `data-motion` no `<html>`, preservado pelo ClientRouter nos eventos `astro:before-swap` / `astro:after-swap`, igual ao tema.
- O padrão ligado sobrescreve `prefers-reduced-motion: reduce`. Isso é uma escolha consciente do proprietário, registrada acima; o botão permite desligar a qualquer momento.
- O controle afeta todas as animações do site: transição de página (280 ms), revelação ao rolar, barra de progresso, skeleton, popover do menu, hover e as entradas da home. A regra injetada pelo ClientRouter do Astro sob `prefers-reduced-motion` usa `animation: none !important` nas pseudo-elementos de transição; as regras `data-motion='on'` usam `!important` para vencer essa regra quando o proprietário liga as animações. Textos animados não usam `opacity` abaixo de 1.
- Reestruturação do CSS: trocar as media queries `prefers-reduced-motion` por seletores baseados em `data-motion`, mantendo o estado final sempre visível quando desligado.

## Decisões do construtor

- Lucide pela licença explícita e grade consistente.
- Tamanhos atuais preservados para não mexer no layout.
- Nenhuma requisição em runtime: os SVG entram no bundle como texto.
- Botão no header ao lado do tema; `localStorage` com padrão ligado e estados `on`/`off`, conforme decisão do proprietário.

## Status

Aprovado pelo proprietário, virado no plano `docs/superpowers/plans/2026-11-23-icones-lucide-motion-toggle.md` e implementado em quatro tarefas (commits `b8e0c81`, `dd61b39`, `b28361a`, `80e3adf`). Preparado como 0.2.3, sem deploy autorizado nesta rodada.
