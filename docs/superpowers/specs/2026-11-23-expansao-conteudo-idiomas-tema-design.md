# Expansão de conteúdo, idiomas, tema e home

Data: 2026-11-23
Status: aguardando aprovação do proprietário antes de qualquer edição de código
Documento anterior: `docs/superpowers/specs/2026-11-23-interface-motion-design.md`

## 1. Objetivo

O proprietário pediu, antes da publicação definitiva, mais conteúdo de aprendizado, ilustrações, modo claro e escuro, vários idiomas e uma página inicial bonita e animada. Em outra mensagem, pediu também que as demais páginas ganhem exemplos animados e imagens ilustrativas.

O público definido é brasileiro morando fora do país. Isso decide a ordem de prioridade. Esse leitor continua buscando em português quando o assunto é Pix, WhatsApp, banco brasileiro ou LGPD. O português continua sendo a versão principal e a URL atual continua valendo. Inglês e espanhol entram como complemento, não como substituição.

O site já está no ar em `https://destrava-tech-rho.vercel.app` com 17 páginas. Esta rodada aumenta o site para cerca de 60 páginas.

## 2. Metas

1. Quatro guias novos, somando 14 guias.
2. Os 14 guias em português, inglês e espanhol.
3. Interface traduzida nos três idiomas: menu, botões, rodapé, títulos de seção, mensagens de erro e textos de ajuda.
4. Privacidade e Termos traduzidos, com aviso de que a versão em português prevalece em caso de divergência.
5. Sobre, contato e o índice de guias também existem em `/en/` e `/es/`, com o mesmo conteúdo traduzido. A página 404 permanece única na raiz. Ela recebe ilustração local, mensagem em português, inglês e espanhol, e links para a home e os guias de cada idioma.
6. Tema claro e escuro, com a preferência do sistema como ponto de partida e botão para trocar.
7. Ilustrações locais em todas as páginas, com movimento leve.
8. Página inicial nova, com a direção aprovada pelo proprietário.
9. Arquivo de verificação do Search Console e `ads.txt` no build.
10. Sitemap com `hreflang` para os três idiomas.

## 3. Não metas

1. Não publicar sem autorização explícita e final do proprietário.
2. Não ativar anúncios. `SITE.adsEnabled` continua `false` e nenhum script de anúncio entra no site.
3. Não adicionar analytics, cookie de terceiro, pixel ou requisição de rede externa. A verificação do Google usa um arquivo estático em `public/`.
4. Não instalar pacote, plugin, fonte externa ou ferramenta de animação. O projeto já tem Astro 5, `@astrojs/sitemap`, fontes locais e `@oddbird/popover-polyfill`.
5. Não comprar domínio nem usar subdomínio pago.
6. Não inventar nome, endereço, cidade, foro, depoimento, fonte, número de visitas ou estatística.
7. Não afirmar que uma tradução foi revisada por pessoa. Páginas em inglês e espanhol exibem aviso visível de tradução automática, com link para a versão em português.

## 4. Restrições

1. Astro 5 estático, build com `npm run build`, sem erros.
2. Fontes locais Libre Bodoni e Public Sans.
3. Cores atuais: preto `#18181B`, rosa `#EC4899`, fundo `#FAFAFA`. Os papéis de cor moram em `global.css`.
4. WCAG 2.2 AA. Foco visível, alvos de toque com pelo menos 24 px no site e 44 px nos controles novos, contraste de 4,5 para 1 no texto.
5. `prefers-reduced-motion: reduce` desliga movimento espacial e deixa o estado final visível.
6. Nenhuma requisição externa. Todas as ilustrações ficam em arquivos SVG locais.
7. Texto em português simples. Sem jargão, sem emoji como ícone e sem frases de preenchimento.
8. O `ClientRouter` da Task 3 continua ativo. Troca de idioma passa pelo mesmo ciclo de vida de scripts.

## 5. Abordagens consideradas

### Opção escolhida: subpastas por idioma, PT-BR na raiz

O português fica nas URLs atuais, como `/guias/golpe-do-pix-sinais-de-alerta/`. Inglês e espanhol usam `/en/` e `/es/` com os mesmos caminhos internos. Cada guia tem um arquivo Markdown por idioma, com o mesmo identificador nos três. O sitemap recebe `hreflang`.

Vantagem: as URLs já indexadas continuam funcionando. O leitor brasileiro cai na versão em português por padrão. A tradução de cada guia pode ser revisada sem misturar idiomas no mesmo arquivo.

Custo: 42 arquivos de guia mais arquivos de interface. É o caminho mais trabalhoso, porém o único que preserva o que já está no ar.

### Opção rejeitada: `/pt/`, `/en/` e `/es/` para tudo

Mais simétrica, mas obriga redirecionar a raiz e troca as URLs de todos os guias publicados. Isso desfaz o trabalho de indexação da rodada anterior.

### Opção rejeitada: parâmetro `?lang=en`

Os mecanismos de busca tratam as variações como páginas duplicadas. Não permite `hreflang` útil.

### Opção rejeitada: domínios ou subdomínios separados

Exige domínio pago ou configuração de DNS que o proprietário não tem.

## 6. Estrutura de conteúdo

### 6.1 Guias

Os dez guias atuais viram a versão em português. Os quatro guias novos aprovados pelo proprietário são:

1. `celular-no-exterior-sem-gastar-muito` no pilar celular.
2. `ia-para-traduzir-textos-com-seguranca` no pilar IA.
3. `wifi-publico-como-proteger-seus-dados` no pilar segurança.
4. `golpe-de-falso-suporte-no-whatsapp` no pilar WhatsApp.

Cada guia novo segue o padrão atual: título, descrição, pilar, data, fontes quando houver fonte pública real e passos verificáveis. É autorizada a pesquisa de fontes públicas reais para esses quatro guias. Cada URL precisa responder com sucesso no momento da implementação e constar no relatório de QA. Nenhuma fonte é inventada nem copiada sem verificação. Se não houver fonte pública adequada, o guia usa a seção honesta "Sobre as fontes" criada na Task 5.

As pastas ficam em `src/content/guias/pt/`, `src/content/guias/en/` e `src/content/guias/es/`. O `content.config.ts` usa um `glob` que alcance as três pastas. Cada arquivo mantém o mesmo identificador entre idiomas, para que o seletor de idioma troque só o prefixo da URL.

As fontes citadas continuam sendo as originais em português. Nas versões em inglês e espanhol, cada fonte recebe a indicação de que o material está em português. Não vou buscar substituta estrangeira inventada, porque o proprietário pediu para não inventar fonte.

### 6.2 Textos da interface

Um arquivo por idioma em `src/i18n/`, com uma função `t(chave)` simples, sem biblioteca nova. As chaves cobrem menu, rodapé, botões, rótulos de seção, avisos de nova aba, textos do seletor de idioma e do botão de tema.

O nome "Destrava Tech" não muda. A tagline recebe versão em inglês e espanhol.

### 6.3 Páginas legais

Privacidade e Termos recebem versões em inglês e espanhol. Cada versão traduzida traz, no começo, o aviso de tradução automática e um aviso curto dizendo que a versão em português é a válida. A estrutura jurídica das páginas não muda, e nenhum dado novo é acrescentado.

Os dados que só o proprietário tem continuam pendentes em `docs/pending-actions.md`: nome completo, cidade e UF, foro e confirmação de que a conta AdSense pertence a adulto.

## 7. Tema claro e escuro

O valor inicial vem de `prefers-color-scheme`. O botão no cabeçalho alterna entre claro e escuro e salva a escolha em `localStorage`. Um script curto no `<head>` aplica o atributo `data-theme` antes da primeira pintura, para evitar piscada.

Os papéis de cor do tema escuro usam fundo `#09090B`, texto `#FAFAFA`, cartão `#18181B`, borda `#3F3F46` e texto secundário `#94A3B8`. O rosa continua `#EC4899`, com texto preto por cima, porque esse par já tem contraste suficiente nos dois temas. O anel de foco passa a branco no tema escuro.

O botão de tema tem nome acessível, estado visível e alvo de 44 px. A preferência de movimento continua independente da preferência de cor.

## 8. Ilustrações e movimento

### 8.1 Arquivos

As ilustrações ficam em `public/illustrations/` e são SVG locais, sem texto dentro, sem links externos e sem JavaScript. Cada uma recebe `aria-hidden="true"` quando é decorativa. Quando uma ilustração explica um passo, o texto do passo fica em HTML, não dentro do SVG.

Conjunto previsto: quatro ilustrações de pilar, cinco para as páginas fixas, uma para a home e uma por guia. As ilustrações são compartilhadas entre idiomas, então o total fica perto de 24 arquivos, não 72.

### 8.2 Movimento

O movimento das ilustrações usa `opacity` e `transform`, com revelação no scroll por `animation-timeline: view()` dentro de `@supports ((animation-timeline: view()) and (animation-range: entry))`. A declaração de `animation-timeline` vem depois da abreviatura `animation`, para não ser redefinida. O estado final fica visível por padrão. Navegadores sem suporte mostram a ilustração parada.

Nenhuma animação passa de 220 ms, exceto o pulso do skeleton, que já existe e tem 1,2 s. Não há laço automático, carrossel, flashing nem parallax. Com `prefers-reduced-motion: reduce`, todas as revelações adotam o estado final.

### 8.3 Páginas além da home

O índice de guias ganha as quatro ilustrações de pilar. Cada artigo ganha a ilustração do seu tema no cabeçalho e um pequeno exemplo animado ligado a um passo real do guia. Sobre, contato, privacidade, termos e página 404 ganham uma ilustração cada. Nenhuma dessas imagens inventa dado nem mostra uma tela de aplicativo que o projeto não verificou.

## 9. Home nova

A direção aprovada pelo proprietário vale para a raiz e para as versões `/en/` e `/es/`.

Tese: uma capa de revista em preto e rosa que conduz o leitor aos quatro pilares.

Assinatura: a palavra "complicado" aparece riscada e, com o scroll, cede lugar a "simples". O efeito usa só `opacity` e `transform`, sem número inventado e sem depoimento.

Estrutura, na ordem de leitura: herói com título em Libre Bodoni e entrada por palavras, quatro cards de pilar com ilustração local em cascata, bloco "como funciona" com uma linha rosa que se desenha, guias recentes e bloco de confiança. O texto dos guias recentes continua o mesmo, traduzido nos três idiomas.

O bloco de confiança perde a frase sobre revisão humana, porque `docs/pending-actions.md` ainda marca essa revisão como pendente. O primeiro item passa a dizer "Conteúdo direto. Cada guia é escrito para responder uma dúvida real e traz passos que você pode conferir." Os outros três itens continuam com o texto atual, traduzido.

Todas as páginas em inglês e espanhol mostram, perto do começo, um aviso curto no idioma da página: o texto foi traduzido automaticamente e a versão em português é a original. O aviso traz link para a página correspondente em português. Ele usa texto visível e não depende de JavaScript.

Antes de escrever, aplicar as regras de `unslop` em todo texto novo. Cortar frase de preenchimento, metáfora vazia, lista forçada de três itens e adjetivo sem informação. Usar `ui-ux-pro-max` para conferir alinhamento, hierarquia, contraste e cortar informação desnecessária.

Anti direção: nenhum contador de visitas, neon, emoji como ícone, gradiente genérico ou carrossel automático.

## 10. Idioma e navegação

O seletor de idioma fica no cabeçalho. Cada opção é um link real com `hreflang` e `lang` corretos, nome acessível e estado atual marcado com `aria-current`. O link troca apenas o prefixo da URL e mantém o caminho da página. Na raiz, a opção de português aponta para a URL sem prefixo.

A troca de idioma usa o `ClientRouter`. O `setupPageLifecycle()` da Task 3 continua cuidando do menu, da rolagem e da tabela. O `aria-current` vem do servidor em cada página, então o cabeçalho não pode usar `transition:persist`.

## 11. Verificação e publicação

Já commitado nesta rodada: `ads.txt` em `60d5abd`, e-mail do responsável em `9cbcdf2` e arquivo `googlee2e464378dc22f96.html` em `b3eee7c`. O build atual gera 17 páginas e o arquivo de verificação aparece na raiz do `dist`.

Antes de publicar, o agente deve rodar build, QA em 320, 375, 768, 1024, 1280 e 1440 px, cinco navegações seguidas, teclado, foco visível, reduced motion, rede lenta com skeleton, console sem erro, zero requisição externa, checagem de `hreflang` no sitemap e checagem dos dois temas. O relatório `docs/qa-report.md` recebe os resultados e a lista explícita do que não foi verificado.

A publicação só acontece depois de autorização final do proprietário. O comando de deploy substitui o site que já está no ar, então a confirmação é pedida separadamente, perto do fim.

## 12. Riscos

1. Tradução automática sem revisão pode publicar erro. Mitigação: aviso visível em todas as páginas em inglês e espanhol, link para a versão em português e pedido de revisão humana em `docs/pending-actions.md`.
2. Contraste do tema escuro pode ficar abaixo de 4,5 para 1. Mitigação: medir cada par no build e corrigir antes do QA.
3. Rotas por idioma podem quebrar links internos antigos. Mitigação: manter a raiz em português e conferir todos os links no Playwright.
4. O `ClientRouter` pode duplicar listeners na troca de idioma. Mitigação: reusar o ciclo de vida atual e repetir cinco navegações no QA.
5. Muitos arquivos SVG podem pesar. Mitigação: manter cada arquivo abaixo de 2 kB e medir o total no build.

## 13. Critérios de aceite

1. Build sem erro, com cerca de 60 páginas e sitemap com `hreflang`.
2. As 17 URLs atuais continuam respondendo e mostram português.
3. `/en/` e `/es/` mostram interface e guias traduzidos.
4. Seletor de idioma preserva o caminho e marca o idioma atual.
5. Tema segue o sistema, alterna por botão e guarda a escolha.
6. Todas as páginas têm ilustração local, sem requisição externa.
7. Nenhum texto novo usa padrão de slop segundo `unslop`.
8. Teclado, foco, contraste e reduced motion passam no QA.
9. Aviso de tradução automática visível em todas as páginas `/en/` e `/es/`, com link para a versão em português.
10. A 404 tem ilustração local, mensagem nos três idiomas e links para a home e os guias de cada idioma.
11. `SITE.adsEnabled` continua `false`.
12. Nenhuma publicação sem autorização final.

## 14. O que fica para o implementador

A estrutura exata de arquivos e componentes, a divisão em tarefas e a ordem de implementação. O documento decide os comportamentos e as restrições acima. Detalhes de CSS, nomes das chaves de tradução e o desenho vetorial de cada ilustração são escolhas do implementador, desde que os critérios de aceite sejam atendidos.
