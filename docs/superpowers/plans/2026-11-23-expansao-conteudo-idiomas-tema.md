# Expansão de conteúdo, idiomas, tema e home — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expandir o Destrava Tech de 17 para ~61 páginas estáticas: 4 guias novos, 14 guias em PT/EN/ES, interface e páginas legais traduzidas, tema claro/escuro, ilustrações locais, home capa de revista e 404 personalizada — preservando privacidade, acessibilidade e as URLs atuais em português.

**Architecture:** Astro 5 SSG, `build.format: 'directory'`, `ClientRouter fallback="swap"` em `Base.astro`. PT-BR vive na raiz; EN/ES em `/en/` e `/es/` espelhando os mesmos caminhos. Um único collection `guias` com glob `**/*.md` sobre `src/content/guias/` produz ids `pt/<slug>`, `en/<slug>`, `es/<slug>`; um campo `lang` no schema e um helper de slug derivam a URL por idioma. Textos de interface moram em `src/i18n/` com `t(lang, chave)` sem biblioteca nova. Tema aplicado por script inline no `<head>` antes da pintura, com `data-theme` no `<html>` e botão no header. Todo movimento em `motion.css` sob `prefers-reduced-motion` e `@supports (animation-timeline: view())`, com estado final visível por padrão. Nenhuma requisição externa, nenhum pacote novo, `SITE.adsEnabled` continua `false`.

**Tech Stack:** Astro 5.10, TypeScript inline, CSS nativo, fontes locais `@fontsource-variable`, `@oddbird/popover-polyfill` (já instalados). Playwright para QA. Sem dependências novas.

**Spec de origem:** `docs/superpowers/specs/2026-11-23-expansao-conteudo-idiomas-tema-design.md` (aprovada).

**Restrições de redação:** antes de escrever qualquer texto novo, aplicar as regras de `unslop` (sem frase de preenchimento, metáfora vazia, lista forçada de três, adjetivo sem informação) e conferir alinhamento/hierarquia/contraste com `ui-ux-pro-max`. Nunca inventar nome, cidade/UF, foro, depoimento, fonte, número ou estatística.

---

## Tasks

### Fase 1 — Base de i18n, tema e rotas

### Task 1: Mover os 10 guias atuais para `src/content/guias/pt/` e estender o schema
  - Criar `src/content/guias/pt/`, `en/` e `es/`; mover os 10 guias atuais para `pt/` com `git mv` (spec §6.1 é explícita sobre as três pastas).
  - Em `src/content.config.ts`: manter `glob({ pattern: '**/*.md', base: './src/content/guias' })` — ele alcança as três pastas; adicionar `lang: z.enum(['pt','en','es'])` (sem default, obrigatório) e manter `title`, `description`, `pillar`, `updated`, `sources`, `draft`.
  - Adicionar `lang: pt` ao frontmatter dos 10 arquivos movidos.
  - Os ids do collection passam a ser `pt/<slug>`; a Task 10 remove o prefixo na rota para preservar as URLs públicas atuais. Nesta task o build pode refletir URLs temporárias `/guias/pt/<slug>/` — o importante é estar limpo.
  - **Verificar:** `npm run build` → 17 páginas, zero erro.

### Task 2: Criar o módulo de rotas e idioma `src/i18n/index.ts`
  - Exportar `type Lang = 'pt' | 'en' | 'es'`, `LANGS` (array ordenado `['pt','en','es']`).
  - `langPrefix(lang: Lang): string` → `''` para pt, `/en` / `/es` para os demais.
  - `localizedPath(lang: Lang, path: string): string` → prefixo + path (path sempre começa com `/`; raiz vira `/en/` etc.). Na raiz, `localizedPath('pt','/') === '/'`.
  - `pathLang(pathname: string): Lang` → detecta pelo prefixo `/en/` ou `/es/`, senão `pt`.
  - `slugFromId(id: string): string` → remove o prefixo `pt/`, `en/` ou `es/` do id do collection.
  - `alternateUrl(lang: Lang, pathname: string): string` → usa `SITE.url` + `localizedPath`, para `hreflang`.
  - **Verificar:** arquivo compila no build (importado a partir da Task 3); funções puras, sem DOM.

### Task 3: Criar os dicionários `src/i18n/{pt,en,es}.ts` e a função `t()`
  - Cada arquivo exporta um objeto `const dict = { ... } satisfies Record<string,string>` com chaves para: `nav.home`, `nav.guides`, `nav.about`, `nav.contact`, `footer.tagline`, `footer.rights`, `footer.guides`, `footer.about`, `footer.contact`, `footer.privacy`, `footer.terms`, `skip.link`, `theme.toggle`, `theme.light`, `theme.dark`, `lang.label`, `lang.pt`, `lang.en`, `lang.es`, `translation.notice`, `translation.link`, `article.updated`, `article.sources`, `article.aboutSources`, `article.related`, `article.newTab`, `guides.kicker`, `guides.title`, `guides.lead`, `guides.count`, `home.kicker`, `home.title`, `home.lead`, `home.cta`, `home.pillars`, `home.how`, `home.howLine`, `home.recent`, `home.trust`, `home.trust1` … `home.trust4`, `notfound.kicker`, `notfound.title`, `notfound.lead`, `notfound.home`, `notfound.guides`, `consent.text`, `consent.accept`, `consent.reject`.
  - `home.trust1` em PT é exatamente: `"Conteúdo direto. Cada guia é escrito para responder uma dúvida real e traz passos que você pode conferir."` (sem menção a revisão humana).
  - `src/i18n/index.ts`: `export function t(lang: Lang, key: keyof typeof pt): string` com `dicts = { pt, en, es }`;EN/ES traduzidos de forma direta e honesta; se faltar chave, cair para pt (fail-safe visível).
  - **Verificar:** nenhuma chave faltante entre os três dicionários (comparar `Object.keys`); build limpo.

### Task 4: Tema claro/escuro — CSS, script inline e botão
  - Em `src/styles/global.css`: adicionar bloco `[data-theme='dark']` redefinindo os papéis de cor do `:root` para fundo `#09090B`, texto `#FAFAFA`, cartão `#18181B`, borda `#3F3F46`, `--color-ring: #ffffff`; `--color-accent` permanece `#EC4899` com `--color-on-accent: #000000`. Ajustar `--color-accent-text` no escuro para um rosa com contraste ≥4,5:1 sobre fundo escuro (medir; sugestão `#F472B6`). **Ambos os papéis de texto secundário precisam mudar no escuro:** `--color-secondary: #94A3B8` e `--color-muted-foreground: #94A3B8` (o valor claro `#475569` dá ~2,6:1 sobre `#09090B`). Como `--color-primary` é usado como cor de texto de títulos e de fundo de botões, invertê-lo no escuro (`--color-primary: #fafafa`, `--color-on-primary: #09090b`) evita botão escuro sobre fundo escuro; meça também o contraste não textual de bordas e controles. Manter `.badge`, links, `.consent-bar` legíveis nos dois temas (usar `color-mix` já presente).
  - Em `src/layouts/Base.astro`, dentro de `<head>` ANTES de qualquer CSS/link: script inline curto que lê `localStorage.getItem('dt-theme')`, cai para `matchMedia('(prefers-color-scheme: dark)').matches`, e aplica `document.documentElement.dataset.theme`. Envolvido em `try/catch` para localStorage bloqueado.
  - Criar `src/components/ThemeToggle.astro`: `<button type="button" class="theme-toggle" aria-label={t(lang,'theme.toggle')}>` com ícone SVG inline (sol/lua), alvo 44×44 px, `aria-pressed` ou `title` com o estado. Script module escopo do componente: alterna `data-theme`, grava `dt-theme`, atualiza rótulo; reage a `astro:page-load` (re-registro via `setupPageLifecycle` ou listener próprio com cleanup em `astro:before-swap`).
  - Adicionar estilos de `.theme-toggle` e do ícone em `global.css`; garantir foco visível nos dois temas.
  - **Verificar:** build limpo; medição manual dos pares de contraste claro/escuro ≥4,5:1 registrada em `docs/qa-report.md`.

### Task 5: Internacionalizar `Base.astro`, `Header.astro` e `Footer.astro`
  - `Base.astro`: aceitar `lang?: Lang` (default `pt`) e `path?: string` (default `Astro.url.pathname`); `<html lang={lang === 'pt' ? 'pt-BR' : lang}>`; emitir `<link rel="alternate" hreflang="x-default" href={alternateUrl('pt', path)} />` e um `alternate` por idioma; `<meta property="og:locale">` por idioma (`pt_BR`/`en_US`/`es_ES`); canonical já usa `Astro.url.pathname`. Passar `lang` para Header/Footer/ConsentBar.
  - `Header.astro`: aceitar `lang`; links via `localizedPath(lang, ...)`; rótulos via `t()`; adicionar `<LanguageSelect lang={lang} currentPath={Astro.url.pathname} />` e `<ThemeToggle lang={lang} />` ao lado do menu. Nenhum `transition:persist` no header (aria-current vem do servidor).
  - Criar `src/components/LanguageSelect.astro`: `<nav aria-label={t(lang,'lang.label')}>` com três `<a hreflang={...} lang={...} href={localizedPath(l, currentPath)} aria-current={l===lang ? 'true' : undefined}>`. Rótulos curtos `PT / EN / ES`. Alvo ≥44 px. Troca só o prefixo, preserva o caminho.
  - `Footer.astro`: aceitar `lang`, usar `t()` para tagline/direitos/links e `localizedPath`. A chave `footer.rights` contém o marcador literal `{year}` — substituí-lo pelo ano ao renderizar (contrato documentado pelo implementador da Task 3).
  - `ConsentBar.astro`: aceitar `lang` e usar `t()` (ainda inerte pois `adsEnabled=false`).
  - **Verificar:** build limpo; em `/`, `/en/`, `/es/` o `<html lang>`, `aria-current` e links de idioma refletem a rota.

### Task 6: Rotas espelhadas `/en/` e `/es/` para páginas fixas
  - Criar `src/pages/en/index.astro`, `src/pages/en/sobre.astro`, `src/pages/en/contato.astro`, `src/pages/en/privacidade.astro`, `src/pages/en/termos.astro` e o equivalente em `src/pages/es/`. **Não criar os índices de guias aqui** — eles pertencem à Task 11. Cada página importa o conteúdo PT correspondente como fonte de tradução (ou reescreve o texto traduzido diretamente) e passa `lang`/`path` ao Base.
  - Páginas legais traduzidas mantêm a estrutura jurídica exata e acrescentam, no topo, aviso de tradução automática + aviso de que a versão em português prevalece, com link para a versão PT. Mesmo aviso em todas as páginas EN/ES (componente `TranslationNotice.astro` com `lang` e `ptHref`).
  - A versão EN/ES de "Sobre" NÃO pode repetir a afirmação de que os guias são "revisados por uma pessoa" — a revisão humana está pendente em `docs/pending-actions.md` e a Task 17 remove essa frase também da versão PT. Traduzir a versão honesta equivalente ao bloco de confiança. Dados pendentes (nome completo, cidade/UF, foro) permanecem como pendência explícita, sem invenção.
  - Criar `src/components/TranslationNotice.astro`: `<aside role="note">` visível, sem JS, texto via `t(lang,'translation.notice')` + `<a href={ptHref}>` com `t(lang,'translation.link')`. Usar em todas as páginas EN/ES (incluindo artigos e home).
  - **Verificar:** build limpo; `/en/privacidade/` e `/es/termos/` mostram aviso e estrutura igual à PT.

### Fase 2 — Guias novos e conteúdo traduzido

### Task 7: Pesquisar e validar fontes públicas reais para os 4 guias novos
  - Para cada guia: `celular-no-exterior-sem-gastar-muito` (celular), `ia-para-traduzir-textos-com-seguranca` (IA), `wifi-publico-como-proteger-seus-dados` (segurança), `golpe-de-falso-suporte-no-whatsapp` (WhatsApp), pesquisar 1–3 fontes públicas oficiais/reconhecidas. Cada URL deve responder com sucesso no momento da checagem (usar `webfetch`/`websearch`). Registrar nome + URL + data da checagem em `docs/qa-report.md` (tabela de fontes). Se não houver fonte pública adequada, o guia não inventa: usa a seção "Sobre as fontes" honesta já prevista na spec.
  - **Verificar:** todas as URLs listadas responderam com sucesso; nenhuma fonte inventada.

### Task 8: Escrever os 4 guias novos em PT
  - Arquivos `src/content/guias/pt/<slug>.md` com frontmatter completo (`lang: pt`, título, descrição, pilar, `updated: 2026-11-23`, `sources` validados, `draft: false`).
  - Corpo em português simples, passos verificáveis, sem estatística inventada, sem depoimento. Seguir a estrutura do guia `golpe-do-pix-sinais-de-alerta.md` (introdução curta, seções com passos, "o que fazer" e fontes no frontmatter), **mas não copiar seus vícios de redação**: evitar "a boa notícia", "regra de ouro", fechos motivacionais e lista forçada de três.
  - Não usar links internos embutidos no corpo dos 4 guias novos. A Task 9 traduz o corpo para EN/ES e linksfixos `/guias/...` exigiriam reescrita por idioma; as fontes ficam apenas no frontmatter `sources`.
  - **Verificar:** `npm run build` → 31 páginas (27 da Task 6 + 4 guias novos); os 4 guias renderizam com fontes e data.

### Task 9: Traduzir os 14 guias para EN e ES
  - Para cada slug, criar `src/content/guias/en/<slug>.md` e `src/content/guias/es/<slug>.md` com `lang: en`/`es`, mesmo `pillar`, mesma `updated`, mesmo `slug` (id), e título/descrição/corpo traduzidos.
  - Fontes permanecem as originais em PT, com `name` e `url` IDÊNTICOS aos do arquivo PT (inclusive o `(em inglês)` das fontes Apple/Google/WhatsApp). Em EN/ES cada entrada de `sources` ganha sufixo visível no texto de renderização indicando que o material está em português — implementado no template `GuidePage.astro` (Task 10), não no dado. Nenhuma fonte estrangeira inventada e nenhuma tradução de título de fonte.
  - Traduzir título, descrição e corpo de forma direta e honesta, sem inventar dado, estatística, depoimento ou fonte. Não afirmar em EN/ES que a tradução foi revisada por pessoa (spec §3.7); o aviso de tradução automática é do template `TranslationNotice`. Preservar os passos verificáveis e a estrutura do original PT, sem acrescentar links internos no corpo.
  - **Não replicar vícios de redação** do guia Pix de referência nem do original PT: sem "a boa notícia", "regra de ouro", fecho motivacional, lista forçada de três ou adjetivo sem informação. Em EN/ES, "naturalidade" não pode custar fidelidade: se o PT não afirma algo, a tradução também não afirma.
  - **Verificar:** 42 arquivos de guia no total (14×3); ids por idioma corretos; build sem erro de schema.

### Fase 3 — Rotas de artigos e índice por idioma

### Task 10: Refatorar `src/pages/guias/[...id].astro` para multi-idioma
  - Criar `src/components/GuidePage.astro` com o template completo do artigo (props `entry`, `lang`). Cada rota fina chama esse componente:
    - `src/pages/guias/[...id].astro` → PT, **`getStaticPaths()` filtra `data.lang === 'pt'`**, `params: { id: slugFromId(entry.id) }`;
    - `src/pages/en/guias/[...id].astro` e `src/pages/es/guias/[...id].astro` → **`getStaticPaths()` filtra `data.lang === 'en'`/`'es'`**, `params: { id: slugFromId(entry.id) }`.
  - O filtro por idioma é obrigatório nas três rotas: sem ele, os 42 arquivos produzem 42 ids e o mesmo slug aparece três vezes em `getStaticPaths()`, causando colisão de rotas. O mesmo filtro vale para a lista de artigos relacionados — `related` só pode conter guias do idioma atual, senão um artigo PT linka para `/en/guias/...`.
  - Um único arquivo `[...id].astro` em `src/pages/guias/` não gera `/en/guias/<slug>/` porque o prefixo da rota é fixo; por isso as três rotas.
  - Renderizar `<Base lang={lang} path={Astro.url.pathname} jsonLd={...}>`, `<TranslationNotice>` quando `lang !== 'pt'`, `<Illustration>` no cabeçalho com `src={`/illustrations/guide-${slugFromId(entry.id)}.svg`}` e um `<AnimatedExample>` com exemplo genérico e honesto, usando uma chave nova `article.example` nos três dicionários (PT `Exemplo do passo`, EN `Step example`, ES `Ejemplo del paso`). A Task 14 troca esse conteúdo genérico por exemplos específicos por pilar. Nenhum guia fica sem o componente entre as tasks.
  - `GuidePage.astro` recebe `entry` e `lang`, chama `render(entry)` internamente e é usado pelas três rotas finas; `inLanguage` do JSON-LD usa `pt-BR`/`en-US`/`es-ES`. Link "Avise a gente" passa a usar `localizedPath(lang, '/contato/')`.
  - Para aplicar o aviso de que a fonte está em português no template, acrescentar UMA chave nova nos três dicionários (`article.sourceLanguage`: PT `Texto em português`, EN `Source in Portuguese`, ES `Fuente en portugués`) e usá-la como sufixo visível em cada `<li>` de `sources` das versões EN/ES. Em PT, não exibir sufixo. A chave entra em `pt.ts` primeiro para que `t()` a aceite; paridade dos três dicionários é obrigatória.
  - Para que o template inteiro do artigo seja localizado em EN/ES — e não só o corpo — acrescentar também, nos três dicionários (sempre `pt.ts` primeiro), as chaves: `pillar.seguranca`/`pillar.whatsapp`/`pillar.ia`/`pillar.celular` (PT `Segurança digital`/`WhatsApp`/`IA na prática`/`Celular`; EN/ES tradução direta) para o badge do cabeçalho; `article.sourcesFallback` (PT `Este guia usa passos gerais dos aplicativos. Confira sempre o suporte oficial.`); `article.stepsNote` (PT `Os passos podem variar um pouco conforme a versão do aplicativo e o modelo do aparelho. Encontrou algo diferente?`); `article.reportLink` (PT `Avise a gente`). A Task 11 reusa as quatro chaves `pillar.*` — não as recria. Nenhuma dessas textos inventa dado, fonte ou afirmação de revisão humana; são só rótulos de interface.
  - Como a Task 10 precisa de cards de artigos relacionados já localizados, ela pode acrescentar em `ArticleCard.astro` apenas as props opcionais e retrocompatíveis `lang?: Lang` (default `pt`) e `href?: string` (default calculado pelo comportamento atual). A Task 11 depois completa a refatoração do componente — não faça nela mudança de layout nem de rótulo além do necessário para os links.
  - JSON-LD: `headline/description` do frontmatter, `inLanguage` por idioma, `mainEntityOfPage` via `Astro.url.pathname`; manter `set:html` (coberto pela auditoria como sink de mesmo princípio — conteúdo é frontmatter do próprio autor, sem input de leitor).
  - Formatação de data por idioma (`pt-BR`/`en-US`/`es-ES`).
  - **Verificar:** build gera 14 artigos por idioma; `/en/guias/<slug>/` e `/es/guias/<slug>/` renderizam; `hreflang` aponta para as 3 versões.

### Task 11: Refatorar índice de guias e home para multi-idioma
  - Criar `src/pages/en/guias/index.astro` e `es/guias/index.astro` (ou parâmetro de rota equivalente) filtrando `data.lang`.
  - **Ajustar também `src/pages/guias/index.astro` (PT):** hoje ele lista todas as entradas e passa `id={g.id}` ao card; após a Task 1 isso gera links `/guias/pt/<slug>/`. Filtrar `data.lang === 'pt'` e usar `slugFromId(g.id)` no href.
  - `ArticleCard.astro`: aceitar `lang?: Lang` (default `pt`) e `href?: string`; se `href` não vier, calcular `localizedPath(lang, '/guias/' + id + '/')` — assim o chamador passa só `id={slugFromId(g.id)}` e `lang`, sem duplicar lógica de URL. Rótulo "Atualizado em" via `t(lang,'article.updated')`; formato de data por idioma (`pt-BR`/`en-US`/`es-ES`, `timeZone: 'UTC'`). O badge do pilar hoje vem de `PILLARS[pillar].label` em PT fixo: trocar por `t(lang, 'pillar.' + pillar)` usando as quatro chaves já criadas na Task 10 — não recriá-las. A home (Task 15) reusa o mesmo componente.
  - As páginas de índice também precisam de interface localizada: `Base title={t(lang,'guides.title')} description={t(lang,'guides.lead')} lang={lang}`, kicker/h1/lead via `guides.kicker`/`guides.title`/`guides.lead` (chaves já existentes nos 3 idiomas) e `<TranslationNotice>` nas versões EN/ES. As descrições dos quatro pilares hoje vêm de `PILLARS[key].description` em PT fixo — acrescentar quatro chaves novas nos três dicionários (`pillar.seguranca.description`, `pillar.whatsapp.description`, `pillar.ia.description`, `pillar.celular.description`) com o texto PT atual (`Golpes, senhas e proteção no dia a dia` / `Recursos, privacidade e Meta AI` / `Inteligência artificial para estudos e tarefas` / `Armazenamento, bateria, dados e apps`) e tradução direta em EN/ES, sempre inserindo em `pt.ts` primeiro.
  - **Verificar:** `/en/guias/` e `/es/guias/` listam 14 guias cada com links internos corretos, nenhuma descrição de pilar em PT e `hreflang` apontando para as três versões.

### Fase 4 — Ilustrações e movimento

### Task 12: Criar ilustrações SVG locais em `public/illustrations/`
  - Conjunto (~24 arquivos, cada um < 2 kB): 4 de pilar (`pillar-seguranca.svg`, `pillar-whatsapp.svg`, `pillar-ia.svg`, `pillar-celular.svg`), 5 de páginas fixas (`about.svg`, `contact.svg`, `privacy.svg`, `terms.svg`, `notfound.svg`), 1 da home (`home-cover.svg`) e 1 por guia nomeado pelo slug (`guide-<slug>.svg`, 14 arquivos — reaproveitar uma ilustração de pilar quando fizer sentido, mantendo o total perto de 24).
  - SVG sem `<text>`, sem `<script>`, sem `on*`, sem referência externa; forma geométrica simples em preto/rosa/fundo, compatível com o estilo "Swiss Modernism 2.0" (grade, formas racionais, sem neon/emoji/skeuomorfismo). Decorativas recebem `aria-hidden="true"`; se alguma transmitir informação, precisa de texto equivalente visível. Nenhuma ilustração pode mostrar tela de aplicativo que o projeto não verificou. Validado via `ui-ux-pro-max` (`--domain icons 'decorative icon aria hidden'`).
  - **Verificar:** nenhum SVG passa de 2 kB; soma total medida; zero requisição externa no build.

### Task 13: Criar componentes `Illustration.astro` e `AnimatedExample.astro`, e movimento de revelação
  - `src/components/Illustration.astro`: props `src`, `alt?`, `class?`; se `alt` ausente, `aria-hidden="true"`; atributos `loading="lazy"`/`decoding="async"` quando apropriado; wrapper com classe `reveal`. Os SVGs da Task 12 já trazem fundo próprio `#09090B` e funcionam nos dois temas; não aplique filtro, `mix-blend-mode` ou inversão CSS neles. Componente deve aceitar os 24 caminhos `/illustrations/<nome>.svg` e controlar largura/altura pelo wrapper/CSS, sem `width`/`height` embutidos no SVG.
  - `src/components/AnimatedExample.astro`: props `label`, `variant?`; texto do passo em HTML, animação só com `transform`/`opacity`, estado final visível sem JS e sob `prefers-reduced-motion`. Criado aqui para que a Task 10 possa importá-lo.
  - Em `src/styles/motion.css`: regra `.reveal` com estado final visível por padrão; dentro de `@supports ((animation-timeline: view()) and (animation-range: entry))` aplicar `animation: reveal-up 200ms ease both; animation-timeline: view(); animation-range: entry 0% cover 30%;` (declaração `animation-timeline` DEPOIS da abreviatura). `@keyframes` usa só `opacity`/`transform`. Com `prefers-reduced-motion: reduce`, estado final visível e sem animação. Nenhum laço/carrossel/parallax/neon; só o pulso do skeleton permanece em 1,2 s.
  - Padrão validado por `ui-ux-pro-max` ("Scroll-Triggered Storytelling"): o estado final legível existe no HTML/CSS por padrão; o movimento só o melhora. Ordem de leitura do DOM permanece completa; sob `prefers-reduced-motion`, sem parallax e sem scroll-scrub. Nenhuma fonte vinda de CDN — a recomendação da skill de `@import` do Google Fonts é rejeitada pela spec §3.3.
  - **Verificar:** build limpo; com reduced motion as ilustrações aparecem paradas e visíveis.

### Task 14: Exemplos animados por artigo
  - A Task 10 já deixou um `<AnimatedExample label={t(lang,'article.example')}>` com texto genérico em `article.exampleText`. Esta task troca esse conteúdo por um exemplo curto por pilar, sem inventar dado nem afirmação: escolher `variant="steps"` para `seguranca`/`ia` e `variant="line"` para `whatsapp`/`celular`, e acrescentar quatro chaves nos três dicionários (`example.seguranca`, `example.whatsapp`, `example.ia`, `example.celular`) com uma frase de interface que descreva o que o movimento mostra, não um fato sobre o app. Exemplos de tom: PT `Cada ajuste aparece como um passo separado.` / `A configuração acontece em etapas curtas.` — cortar lista forçada de três itens, adjetivo vazio e metáfora de preenchimento (regras `unslop`). Inserir em `pt.ts` primeiro; paridade dos três dicionários é obrigatória.
  - Manter o rótulo via `t(lang,'article.example')`; `article.exampleText` pode ser removido se ficar sem uso, desde que nenhuma chave órfã permaneça. Texto do passo continua em HTML no slot, nunca dentro de SVG.
  - **Verificar:** nenhuma animação > 220 ms (exceto skeleton); estado final visível sem JS e sob `prefers-reduced-motion`; nenhuma frase nova afirma revisão humana, estatística ou fonte.

### Fase 5 — Home, 404 e páginas fixas

### Task 15: Reescrever a home como capa de revista (PT) e espelhar EN/ES
  - Antes de escrever, ler `design-system/destrava-tech/MASTER.md` (já persistido e citado em `src/styles/global.css:3`) e a spec aprovada; em conflito, a spec prevalece. A paleta, as fontes locais e os tokens do MASTER já estão no CSS — não criar novos tokens nem importar fonte de CDN.
  - Para não triplicar CSS e markup, seguir o padrão já usado nos artigos: criar `src/components/HomePage.astro` com props `{ lang: Lang }` contendo a capa inteira e os estilos escopados; `src/pages/index.astro`, `src/pages/en/index.astro` e `src/pages/es/index.astro` ficam como rotas finas que só chamam `<HomePage lang={...} />`. O `Base` continua chamado dentro do componente com `title={SITE.name}`/`description` localizada via chave `home.metaDescription` (nova, nos 3 idiomas) e `lang`/`path`. Toda string nova entra em `pt.ts` primeiro.
  - Em `HomePage.astro`: herói com título em Libre Bodoni e entrada por palavras; palavra "complicado" riscada cedendo a "simples" via `opacity`/`transform` ligados ao scroll (`animation-timeline: view()` com fallback estado final); 4 cards de pilar em cascata com ilustração; bloco "como funciona" com linha rosa que se desenha; guias recentes (texto atual, traduzido); bloco de confiança com `home.trust1` exato da spec (sem revisão humana) e os outros 3 itens traduzidos. A chave `home.trust4` guarda texto simples: reaplicar o link para a Política de Privacidade no markup, como no site atual. **Não reconstruir o link com `indexOf`/`slice` sobre a frase do dicionário** (faz isso a home provisória da Task 6): separar em chave de texto + chave do rótulo do link, ou dividir o item em prefixo/link/sufixo, para não corromper a frase se o texto mudar. Reutilizar `ArticleCard` nos guias recentes, estendendo-o com `lang`/`href`, em vez de duplicar markup nas três homes.
  - `<TranslationNotice lang={lang} ptHref="/" />` aparece nas versões EN/ES do componente, perto do começo; a rota PT não exibe. A estrutura é compartilhada, então basta um único lugar para conferir a paridade.
  - Anti direção: sem contador, neon, emoji-ícone, gradiente genérico, carrossel, laço, parallax.
  - Detalhes de implementação já decididos para evitar retrabalho: (a) `home.title` permanece o `<h1>` acessível e canônico; a assinatura visual fica num elemento editorial à parte, com `home.swapFrom`/`home.swapTo` (PT `complicado`/`simples`, EN `complicated`/`simple`, ES `complicado`/`simple`) — a palavra riscada cede à outra por `opacity`/`transform`, estado final visível por padrão e sob `reduce`. (b) "Entrada por palavras" pode dividir `t(lang,'home.title')` por espaços só para gerar `<span>` visuais — a ordem e o texto integral permanecem no DOM; não é o caso de `home.trust4`, onde `indexOf`/`slice` corromperia o link. (c) Bloco "como funciona": linha rosa decorativa com 3 nós (`aria-hidden="true"`) ligados a três passos curtos via novas chaves `home.how1`/`home.how2`/`home.how3` (PT `Abra o guia` / `Siga os passos` / `Confira a fonte e a data`), sem afirmar fato novo. (d) Para `home.trust4`, NÃO usar `indexOf`/`slice`: dividir em `home.trust4Text` e `home.trust4Link`, mantendo o conector `Veja a ` no texto (valor atual em `pt.ts:76`: `...apenas dados técnicos de acesso. Veja a Política de Privacidade.` → `trust4Text` termina em `...acesso. Veja a ` com espaço final; `trust4Link` = `Política de Privacidade`), montando o `<a href="/privacidade/">` no markup sem perder palavras. `home.trust1` continua byte-exato e sem link. (e) Cards de pilar reutilizam `pillar.*` e `pillar.*.description` (Task 11) e a contagem via `guides.count`; guias recentes reutilizam `ArticleCard` com `lang`/`id={slugFromId(...)}` e filtro `data.lang === lang`. Defeito real a corrigir: a home PT atual (até `101df85`) passa `id={g.id}` bruto (`pt/<slug>`) e não filtra idioma, então os 6 cards geram links `/guias/pt/<slug>/` e podem mostrar guias EN/ES. Não existe string literal `/guias/pt/` no código — o prefixo vem do id do Content Collection. Todas as chaves novas entram em `pt.ts` primeiro, com paridade nos três idiomas.
  - **Verificar:** build; 320/375/768/1024/1280/1440 px sem overflow; reduced motion mostra o estado final; `home.trust1` confere byte a byte com a spec.

### Task 16: 404 personalizada única na raiz
  - Em `src/pages/404.astro` (única, na raiz; `<html lang="pt-BR">` vem do default do `Base`): ilustração local `<Illustration src="/illustrations/notfound.svg" />` (decorativa, sem `alt`), três blocos curtos PT/EN/ES. Chaves JÁ existentes nos três dicionários (não recriar): `notfound.kicker`/`notfound.title`/`notfound.lead`/`notfound.home`/`notfound.guides` e `lang.pt`/`lang.en`/`lang.es`. Cada bloco tem dois links: `localizedPath(lang,'/')` com `notfound.home` e `localizedPath(lang,'/guias/')` com `notfound.guides`. Nenhuma rota `/en/404` ou `/es/404`.
  - **Verificar:** `/pagina-inexistente/` mostra ilustração, três idiomas e seis links (home+guias × 3); `git diff --check` limpo.

### Task 17: Ilustrações e ajustes finais nas páginas fixas
  - Sobre/contato/privacidade/termos nos 12 arquivos (`src/pages/{sobre,contato,privacidade,termos}.astro` e os mesmos em `src/pages/en/` e `src/pages/es/`) recebem `<Illustration src="/illustrations/{about,contact,privacy,terms}.svg" />` no cabeçalho, sem `alt` (decorativa).
  - Em `src/pages/sobre.astro:32-35`, remover `<strong>revisados por uma pessoa</strong> antes de publicação` — a revisão humana ainda está pendente em `docs/pending-actions.md`. Substituir por texto honesto equivalente ao bloco de confiança da home (texto direto, fontes citadas, data visível), sem afirmar revisão feita. Ajustar também o `description` do `<Base>` na linha 8, que diz "como os guias são produzidos e revisados". As versões EN/ES de Sobre já foram corrigidas na Task 6 e NÃO contêm a afirmação — não alterar essa parte delas.
  - Aviso de tradução: as páginas fixas EN/ES já receberam `<TranslationNotice>` na Task 6 — conferir que permaneceu; não duplicar.
  - Falsos positivos a preservar: menções a "revisão" em `privacidade.astro:16,26,83`, `es/privacidade.astro:24` e `termos.astro:55` são honestas ("será revisado", "após a revisão final", data da última atualização). Só `sobre.astro:33` e seu `description` na linha 8 afirmam revisão humana feita.
  - **Verificar:** nenhuma página afirma revisão humana feita; nenhum dado novo inventado; build limpo; nenhuma ilustração com requisição externa.

### Fase 6 — SEO, QA e documentação

### Task 18: Sitemap com hreflang e arquivos públicos
  - **Ação obrigatória (já confirmada por inspeção do `dist/sitemap-0.xml` após a Task 11): o sitemap atual NÃO emite `xhtml:link`.** Configurar `sitemap({ i18n: { defaultLocale: 'pt-BR', locales: { 'pt-BR':'pt-BR', en:'en', es:'es' } } })` em `astro.config.mjs` e validar o XML. Documentação atual do Astro confirmada via Context7 (`/withastro/docs`, guia `@astrojs/sitemap`): o objeto `i18n` é o que gera os `<xhtml:link rel="alternate" hreflang>`; os `<link rel="alternate">` do `Base` não bastam. Validar que cada `<loc>` tenha alternates para `pt-BR`, `en` e `es` apontando para o mesmo caminho com o prefixo trocado.
  - Confirmar `public/ads.txt`, `public/robots.txt`, `public/favicon.svg` e `public/googlee2e464378dc22f96.html` no `dist` (conteúdo do Google inalterado). `SITE.adsEnabled` continua `false`.
  - **Verificar:** `npm run build` → ~61 páginas; `sitemap-index.xml` e os sitemaps por idioma contêm `hreflang`; arquivo de verificação na raiz do `dist`.

### Task 19: QA completo e relatório
  - Rodar build; QA Playwright em 320, 375, 768, 1024, 1280, 1440 px; 5 navegações seguidas (incluindo troca de idioma); teclado e foco visível; `prefers-reduced-motion`; rede lenta com skeleton; console sem erro; zero requisição externa; dois temas; `hreflang`; 404; links internos das 3 versões.
  - Atualizar `docs/qa-report.md` com resultados, tabela de fontes validadas (Task 7) e lista explícita do que não foi verificado. Atualizar `docs/changelog.md`, `docs/central-de-links.md`, `docs/pending-actions.md` (revisão humana dos 14 guias e docs legais continua pendente) e `docs/evidence-ledger.md`.
  - **Verificar:** todos os critérios de aceite da spec marcados; nenhuma pendência registrada como pendente foi marcada como feita sem evidência.

### Task 20: Pedir autorização final de publicação (sem publicar)
  - Apresentar ao proprietário o resumo do build/QA e pedir, em mensagem separada e explícita, a autorização para substituir o site no ar. NÃO executar deploy sem essa confirmação.
  - **Verificar:** nenhum comando de deploy executado nesta rodada; `git status` mostra só mudanças locais.

---

## Sequência de execução e checkpoint

1. Fase 1 (Tasks 1–6) → build limpo + checagem de rotas/hreflang/tema.
2. Fase 2 (Tasks 7–9) → fontes validadas + 42 guias.
3. Tasks 12–13 (Fase 4) → ilustrações e componentes de movimento; executadas ANTES dos artigos porque `GuidePage.astro` (Task 10) importa `Illustration.astro` e `AnimatedExample.astro`.
4. Tasks 10–11 (Fase 3) e 14 (Fase 4) → artigos, índices por idioma e wiring dos exemplos animados.
5. Fase 5 (Tasks 15–17) → home, 404, páginas fixas.
6. Fase 6 (Tasks 18–20) → SEO, QA, docs, pedido de autorização.

Cada fase termina com `npm run build` sem erro e um commit. Nada é publicado antes da Task 20. Se qualquer build falhar, corrigir antes de avançar.
