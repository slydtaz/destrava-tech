# ADR-001 — Plataforma: site estático com Astro, hospedagem gratuita

Data: 2026-11-23 · Status: ativa

## Contexto
Produto é um site de conteúdo (guias/tutoriais) monetizável com AdSense. Proprietário quer custo zero. Precisa ser rápido no celular, bom em SEO e fácil de manter/crescer com novos artigos.

## Decisão
- **Astro** (gerador de site estático) + Markdown para artigos (content collections).
- Hospedagem gratuita: **Cloudflare Pages ou Vercel** (decisão final na hora do deploy, com aprovação do proprietário).
- Sem backend, sem banco de dados, sem login.

## Alternativas consideradas
- HTML puro sem build: mais simples, mas duplica cabeçalho/rodapé a cada artigo e dificulta sitemap/SEO consistente conforme o site cresce.
- WordPress: exige hospedagem paga ou conta wordpress.com com limitações; manutenção e segurança maiores.
- Next.js: poderoso, mas exagerado para conteúdo estático (mais JS, mais complexidade).

## Consequências
- (+) Build gera HTML puro → rápido, seguro, hospedável grátis, fácil de aprovar no AdSense (acesso total ao HTML).
- (+) Artigos em Markdown → fáceis de escrever/revisar pelo proprietário.
- (–) Requer Node.js para build (já instalado, v24.19.0).
- (–) Deploy em subdomínio gratuito (.pages.dev / .vercel.app); domínio próprio fica para depois (AdSense aceita, mas domínio próprio ajuda na aprovação — hipótese, não regra oficial).