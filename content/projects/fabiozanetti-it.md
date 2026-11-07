---
title: "fabiozanetti.it - Portfolio Web Personale"
subtitle: "Architettura statica e performante con Next.js App Router e Tailwind CSS"
description: "Sito web personale e portfolio sviluppato con Next.js, TypeScript e Tailwind CSS. Progettato con un'architettura headless guidata da file di configurazione e Markdown per la massima manutenibilità."
tags: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown", "Vercel"]
order: 5
featured: false
category: "core"
githubUrl: "https://github.com/zannaStack/fabiozanetti.it"
demoUrl: "https://fabiozanetti-it.vercel.app"
date: "2026"
---

## Obiettivi di Progetto

L'obiettivo di questo portfolio è presentare in modo pulito e immediato il mio profilo professionale, il percorso accademico in Ingegneria Informatica e i progetti realizzati.

I requisiti chiave di progettazione sono:
1. **Prestazioni e SEO ottimali**: caricamento istantaneo tramite generazione statica (SSG).
2. **Semplicità di manutenzione**: separazione netta tra codice e contenuti (dati configurabili da `site.config.ts` e progetti scritti in file Markdown).
3. **Responsive & Accessibile**: esperienza d'uso fluida su desktop e mobile.

---

## Architettura Tecnica

- **Framework**: Next.js (App Router con Server Components).
- **Linguaggio**: TypeScript con tipizzazione statica completa per prevenire errori a runtime.
- **Styling**: Tailwind CSS v4, dark mode nativa ad alto contrasto.
- **Content Pipeline**:
  - `site.config.ts` centralizza biografia, esami, competenze e link social.
  - `content/projects/*.md` gestisce le schede tecniche dei progetti con frontmatter e Markdown nativo.
