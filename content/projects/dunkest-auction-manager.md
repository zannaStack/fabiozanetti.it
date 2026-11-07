---
title: "Dunkest Auction Manager - Web App Fantabasket"
subtitle: "Applicazione web in React con gestione dello stato complessa per la conduzione di aste live del fantabasket"
description: "Piattaforma interattiva sviluppata in React e Vite per coordinare in tempo reale l'asta del fantabasket Dunkest. Include calcolo dinamico dei crediti, vincoli sui roster, pannello avversari e storico acquisti."
tags: ["React", "JavaScript", "Vite", "State Management", "CSS3 / Modulare", "Algoritmi di Allocazione"]
order: 5
featured: true
category: "side"
githubUrl: "https://github.com/zannaStack"
demoUrl: ""
date: "2026"
---

## Il Problema Risolto

Durante l'asta del fantabasket (in particolare con il regolamento ufficiale di Dunkest), gestire contemporaneamente:
1. Il proprio budget residuo e i crediti massimi spendibili per giocatore;
2. Il rispetto dei vincoli di ruolo del roster (Guardie, Ali, Centri e Coach);
3. La stima dei crediti rimasti a ciascuno degli avversari per prevedere i rilanci;
4. La consultazione rapida delle statistiche e delle fasce di prezzo dei giocatori;

risulta estremamente caotico se fatto su fogli di calcolo tradizionali o su carta, rischiando errori di calcolo fatali sul finale d'asta.

Per questo ho realizzato **Dunkest Auction Manager**, una web application reattiva progettata specificamente per supportare il processo decisionale strategico durante tutte le fasi dell'asta dal vivo.

---

## Architettura e Gestione dello Stato

L'applicazione è sviluppata come Single Page Application (SPA) ad alte prestazioni con **React** e **Vite**:

```
[useDunkestApp Hook - State Store]
   ├── Database Giocatori & Quotazioni (Statistiche, Ruoli, Squadre)
   ├── Roster Personale (Controllo slot occupati e slot obbligatori)
   ├── Registro Squadre Avversarie (Crediti residui, posti liberi, max bid possibile)
   └── Log Transazioni & Storico Asta
            │
            ▼
   [Interfaccia Utente Reattiva]
   ├── Tabella Giocatori & Ricerca con filtri multi-parametro
   ├── Purchase Modal (Assegnazione rapida e aggiornamento automatico crediti)
   ├── Pannello Analisi Avversari (Stima aggressività e potenziale di rilancio)
   └── Pannello Roster con visualizzazione grafica della squadra
```

---

## Caratteristiche Principali

### 1. Engine di Calcolo e Validazione Vincoli
- Algoritmo per determinare in tempo reale la **Puntata Massima Sicura**: calcola quanti crediti è possibile spendere su un singolo giocatore garantendo di poter completare il roster obbligatorio (acquistando i rimanenti a prezzo minimo di 1 credito).
- Validazione automatica dei limiti di ruolo previsti dal regolamento (massimale di giocatori per ruolo).

### 2. Monitoraggio Strategico degli Avversari
- Monitoraggio parallelo dei budget di tutte le squadre partecipanti alla lega.
- Calcolo del "Max Bid" per ogni avversario, indicando immediatamente se un concorrente può rilanciare o se è matematicamente tagliato fuori dalla contesa.

### 3. Ricerca, Ordinamento e Filtri Rapidi
- Motore di ricerca rapido per nome giocatore, squadra reale NBA/LBA e fascia di quotazione iniziale.
- Filtraggio per stato (disponibile, acquistato da me, acquistato da avversario).

### 4. Persistenza Locale e Resilienza
- Salvataggio dello stato dell'asta in `localStorage`, consentendo il recupero immediato di tutti i dati in caso di ricaricamento involontario della pagina durante la diretta dell'asta.

---

## Competenze Pratiche Dimostrate
- Progettazione di architetture a componenti modulari e riutilizzabili in React.
- Gestione di stati complessi interdipendenti tramite custom hook (`useDunkestApp`) e flussi di dati unidirezionali.
- Ottimizzazione delle performance di rendering su elenchi di centinaia di elementi e calcoli matematici reattivi ad ogni acquisto.
