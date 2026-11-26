---
source_file: "src/components/ConsentBar.astro"
type: "code"
community: "Config, conteúdo e design system"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Config_conteúdo_e_design_system
---

# ConsentBar.astro: LGPD accept/reject banner shown only when SITE.adsEnabled is true

## Connections
- [[AdSlot.astro reserved ad slot renders nothing (no empty box, no ad network calls) while ads disabled]] - `shares_data_with` [INFERRED]
- [[Consent choice persisted in localStorage key 'dt-consent' as 'accepted' or 'rejected']] - `references` [EXTRACTED]
- [[SITE.adsEnabled = false (never enable before adult-owned approved AdSense account, publisher code, LGPD banner)]] - `references` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Config_conteúdo_e_design_system