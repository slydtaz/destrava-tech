// Configuração central do site.
// adsEnabled: NUNCA ativar antes de (1) conta AdSense aprovada no nome do responsável
// adulto, (2) código do publisher configurado, (3) banner de consentimento LGPD ativo.
// Ver docs/pending-actions.md.
export const SITE = {
  name: 'Destrava Tech',
  tagline: 'Tecnologia explicada sem complicação',
  description:
    'Guias práticos de tecnologia em português simples: segurança digital, WhatsApp, inteligência artificial e celular. Passo a passo testável, sem jargão.',
  // Provisório — trocar pela URL real após o deploy.
  url: 'https://destrava-tech-rho.vercel.app',
  locale: 'pt-BR',
  adsEnabled: false,
  // E-mail público de contato do responsável, informado pelo proprietário.
  contactEmail: 'macedoartur1250@gmail.com',
} as const;

export const PILLARS = {
  seguranca: {
    label: 'Segurança digital',
    description: 'Golpes, senhas e proteção no dia a dia',
  },
  whatsapp: {
    label: 'WhatsApp',
    description: 'Recursos, privacidade e Meta AI',
  },
  ia: {
    label: 'IA na prática',
    description: 'Inteligência artificial para estudos e tarefas',
  },
  celular: {
    label: 'Celular',
    description: 'Armazenamento, bateria, dados e apps',
  },
} as const;

export type PillarKey = keyof typeof PILLARS;