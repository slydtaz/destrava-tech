# Brief do Produto + PRD — Destrava Tech (nome de trabalho, alterável)

Data: 2026-11-23 · Status: aprovado pelo proprietário nas decisões abaixo

## Decisões do proprietário (registradas)
- Tema: **Tecnologia e tutoriais** (guias práticos em português simples).
- Proprietário: **menor de 18 anos** → conta AdSense precisará de titular adulto (pai/mãe/responsável). Fato oficial Google.
- Conta AdSense: **não existe ainda** (ação pendente do responsável).
- Publicação: **100% grátis** (hospedagem gratuita, sem domínio próprio por enquanto).

## Problema e público
- Público: brasileiros iniciantes em tecnologia (jovens, adultos, idosos) que precisam de passo a passo sem jargão.
- Problema: conteúdo de tecnologia em português costuma ser técnico demais, desatualizado ou fragmentado.
- Dor urgente validada: golpes digitais (Pix/WhatsApp) — alertas oficiais gov.br/SERPRO/bancos; 7 em 10 brasileiros tiram dúvidas pelo WhatsApp (Opinion Box/Mobile Time, via Canaltech).

## Proposta
Site de guias práticos, atualizados e em linguagem simples, em 4 pilares:
1. **Segurança digital** — golpes, Pix, WhatsApp, senhas, verificação em 2 etapas.
2. **WhatsApp no dia a dia** — recursos, privacidade, Meta AI.
3. **IA para estudos e vida prática** — usar IA com senso crítico, sem colar em prova.
4. **Celular sem mistério** — armazenamento, bateria, dados móveis, apps úteis.

## Diferenciação
- Passo a passo testável, com data de atualização visível.
- Linguagem simples de verdade (nada de "deploy", "framework").
- Foco no contexto brasileiro (Pix, apps e golpes locais).
- Conteúdo original revisado pelo proprietário (não publicado automaticamente sem leitura humana).

## MVP (o que vamos construir agora)
- Site estático responsivo (celular + computador), rápido e acessível.
- 10–12 artigos originais (~600–1000 palavras cada) nos 4 pilares.
- Páginas obrigatórias: Sobre, Contato, Política de Privacidade, Termos de Uso (rascunhos com campos pendentes marcados).
- Estrutura pronta para AdSense: espaços de anúncio reservados, mas **sem código de anúncio até a conta existir e ser aprovada**.
- SEO básico: títulos, descrições, sitemap, dados estruturados, URLs limpas.
- Consentimento de cookies (LGPD) preparado para quando os anúncios entrarem.

## Não-objetivos (não construir agora)
- Login, banco de dados, comentários, newsletter, app mobile, área admin, analytics pesado, pagamentos. Nada disso é necessário para o MVP.

## Monetização
- AdSense (web responsivo — elegível por tipo; aprovação depende do Google).
- Conta no nome do responsável adulto. Nenhum ganho prometido; estimativas de RPM de terceiros estão no evidence-ledger com confiança baixa.
- Fase futura possível: afiliados (não agora).

## Critérios de aceite do MVP
1. `npm run build` passa sem erros.
2. Site abre localmente; navegação, artigos e páginas legais funcionam no celular e no desktop (verificado em navegador real).
3. Nenhum conteúdo copiado de outros sites; todo artigo tem fonte/verificação quando cita fatos.
4. Nenhuma chamada de rede a serviços de anúncio/analytics antes do consentimento e da conta.
5. Documentos legais marcam claramente o que é rascunho/placeholder (identidade do controlador = responsável, a definir).
6. Lista de ações pendentes do proprietário/responsável entregue.

## Riscos
- Aprovação AdSense não garantida (conteúdo/qualidade/tráfego). Mitigação: conteúdo original substancial + páginas obrigatórias + tempo.
- Tráfego inicial ~zero; SEO leva meses. Expectativa registrada.
- Menor de idade: titular da conta e controlador LGPD devem ser o responsável adulto; documentos legais ficam como rascunho até revisão humana.
- Conteúdo assistido por IA: política do Google foca em valor/utilidade, não no método de produção; ainda assim, revisão humana obrigatória antes de publicar.

## Validação (Fase 4 — proporcional)
- Conceito ainda **não validado com usuários reais**. Validação planejada: publicar, medir busca orgânica e cliques (Search Console, ação do responsável), e coletar feedback real. Não inventar entrevistas/números.