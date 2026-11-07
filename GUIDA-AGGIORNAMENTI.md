# Guida Rapida agli Aggiornamenti del Sito (Senza bisogno dell'AI)

Questa guida spiega come aggiornare facilmente il tuo sito in completa autonomia.  
**Tutto è stato separato dal codice:** non devi toccare file complessi né codice React/HTML.

---

## 1. Come modificare i tuoi Dati Personali, Competenze e Formazione

Apri il file [`site.config.ts`](./site.config.ts) che trovi nella cartella principale del progetto.  
È un file di configurazione con commenti chiari in italiano:

- **Cambiare bio, email, disponibilità:**
  Modifica i testi all'interno di `personal: { ... }`.
- **Modificare o aggiungere competenze:**
  Modifica la lista `skills: [ ... ]`.
- **Aggiornare esami superati o media:**
  Modifica `education: { highlightExams: [ ... ] }`.
- **Link social (GitHub, LinkedIn):**
  Modifica `links: { github: "...", linkedin: "..." }`.

Salva il file (`Ctrl + S`) e vedrai subito il risultato aggiornato.

---

## 2. Come Aggiungere o Modificare un Progetto

Tutti i progetti si trovano nella cartella [`content/projects/`](./content/projects/).  
Ogni progetto è un semplice file di testo in formato **Markdown (`.md`)**.

### Per modificare un progetto esistente:
Apri uno dei file (es. `c-memory-and-algorithms.md`) e cambia il testo o i link.

### Per aggiungere un nuovo progetto:
1. Crea un nuovo file dentro `content/projects/` con estensione `.md` (es. `mio-nuovo-progetto.md`).
2. Incolla all'inizio questo blocco (chiamato *Frontmatter*):

```markdown
---
title: "Nome del Tuo Progetto"
subtitle: "Breve sottotitolo o scopo del progetto"
description: "Descrizione sintetica che apparirà nella card della homepage."
tags: ["Java", "OOP", "Database", "Git"]
order: 4
featured: true
githubUrl: "https://github.com/zannaStack/tuo-repo"
demoUrl: "https://tua-demo.com"
date: "2026"
---

## Panoramica del Progetto
Scrivi qui la descrizione dettagliata...

## Architettura e Scelte Tecniche
- Punto 1
- Punto 2

## Esempio di Codice
```java
public class Esempio {
    // Il tuo codice formattato
}
```
```

3. Salva: il nuovo progetto comparirà **automaticamente** sia nella griglia della Homepage, sia nella sua pagina dedicata `https://fabiozanetti.it/progetti/mio-nuovo-progetto`!

---

## 3. Come Aggiornare il CV (Curriculum Vitae)

Il sito è configurato per scaricare direttamente il file posizionato in [`public/cv.pdf`](./public/cv.pdf).

- Quando prepari una nuova versione del tuo CV:
  1. Esportalo in PDF e chiamalo esattamente **`cv.pdf`**.
  2. Incollalo nella cartella **`public/`** sovrascrivendo quello vecchio.
- Fatto! Il pulsante **"Scarica CV"** sul sito offrirà subito il file aggiornato.

*(Nota: se preferisci usare un link a Google Drive o Dropbox, puoi incollare il link in `site.config.ts` alla voce `links.cvUrl`).*

---

## 4. Come testare le modifiche sul tuo PC

Apri il terminale in questa cartella e avvia il server locale di test:

```bash
npm run dev
```

Apri il browser su `http://localhost:3000` per vedere il tuo sito dal vivo con le modifiche.

---

## 5. Come pubblicare le modifiche online (GitHub & Vercel)

Quando sei soddisfatto delle modifiche e vuoi aggiornare il sito pubblico su internet:

```bash
git add .
git commit -m "Aggiornamento contenuti"
git push
```

Vercel ricompilerà e pubblicherà il sito online in automatico in meno di 1 minuto!
