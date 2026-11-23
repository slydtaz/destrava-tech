# Changelog

## 0.1.0 — 2026-11-23 (MVP, não publicado)

- Pesquisa de mercado com evidências (AdSense oficial + nichos BR) — `docs/evidence-ledger.md`.
- PRD e ADR-001 (Astro estático, hospedagem gratuita).
- Site completo: home, lista de guias por pilar, 10 artigos originais com fontes, sobre, contato, privacidade, termos, 404.
- Nav responsiva com popover nativo + polyfill condicional; header que esconde ao rolar (com fallback JS corrigido para Chromium sem query `scrolled`).
- Design system Swiss editorial (ui-ux-pro-max), fontes self-hosted, contraste AA verificado.
- Estrutura AdSense-ready desativada (AdSlot + ConsentBar LGPD) — ativa só após conta aprovada do responsável.
- QA em navegador real (Chromium 157): 14 verificações aprovadas — `docs/qa-report.md`.
- Registro automático na Central de Gerenciamento (`portfolio-registry.json`).
- Astro telemetry desativada.