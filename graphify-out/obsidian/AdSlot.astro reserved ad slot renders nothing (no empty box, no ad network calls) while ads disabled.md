---
source_file: "src/components/AdSlot.astro"
type: "code"
community: "Config, conteúdo e design system"
tags:
  - graphify/code
  - graphify/INFERRED
  - community/Config_conteúdo_e_design_system
---

# AdSlot.astro: reserved ad slot renders nothing (no empty box, no ad network calls) while ads disabled

## Connections
- [[ConsentBar.astro LGPD acceptreject banner shown only when SITE.adsEnabled is true]] - `shares_data_with` [INFERRED]
- [[SITE.adsEnabled = false (never enable before adult-owned approved AdSense account, publisher code, LGPD banner)]] - `references` [EXTRACTED]
- [[TODO(ads) load AdSense script ONLY in click handler when consent === 'accepted']] - `shares_data_with` [INFERRED]

#graphify/code #graphify/INFERRED #community/Config_conteúdo_e_design_system