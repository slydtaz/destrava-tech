import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.enum(['seguranca', 'whatsapp', 'ia', 'celular']),
    lang: z.enum(['pt', 'en', 'es']),
    updated: z.coerce.date(),
    sources: z
      .array(z.object({ name: z.string(), url: z.string().url() }))
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guias };