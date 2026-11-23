// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL de produção provisória (subdomínio gratuito). Trocar quando o deploy for decidido.
// Ver docs/decisions/ADR-001-plataforma.md e docs/pending-actions.md.
export default defineConfig({
  site: 'https://destrava-tech.pages.dev',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});