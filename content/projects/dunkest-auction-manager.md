---
title: "Dunkest Auction Manager"
subtitle: "Web app in React per gestire budget e vincoli durante l'asta del fantabasket"
description: "Single Page Application sviluppata in React e Vite per coordinare in tempo reale l'asta del fantabasket Dunkest. Calcola all'istante l'offerta massima sicura, monitora i crediti residui degli avversari e verifica il rispetto degli slot di ruolo del roster."
tags: ["React", "Vite", "JavaScript", "State Management", "Tailwind CSS"]
order: 4
featured: true
category: "side"
githubUrl: "https://github.com/zannaStack"
demoUrl: ""
date: "2026"
---

## Il Problema Reale

Chi fa il fantabasket con gli amici (in particolare con il regolamento ufficiale di **Dunkest**) sa quanto sia caotica l'asta dal vivo:
1. Devi tenere d'occhio il tuo budget residuo, sapendo che devi obbligatoriamente tenere almeno 1 credito da parte per ogni giocatore ancora da acquistare.
2. Devi rispettare i vincoli di ruolo (Guardie, Ali, Centri, Coach) senza riempire slot sbagliati.
3. Devi ricordarti a mente quanti crediti rimangono a ciascun avversario per capire se possono rilanciare o se hai la vittoria assicurata.

Farlo su carta o con un foglio Excel al volo porta quasi sempre a distrazioni o conti sbagliati nei minuti finali. Ho quindi sviluppato questa web app per automatizzare tutti i calcoli matematici e concentrarmi solo sulla strategia dell'asta.

---

## Cosa Fa l'Applicazione

### 1. Calcolo dell'Offerta Massima Sicura (Max Bid)
Ad ogni acquisto, l'algoritmo calcola in tempo reale la cifra massima che puoi offrire per un giocatore:
$$\text{Max Bid} = \text{Crediti Residui} - (\text{Giocatori Mancanti} - 1)$$
In questo modo è impossibile rimanere senza fondi per completare la rosa regolamentare di 10 giocatori + coach.

### 2. Radar degli Avversari
Un pannello dedicato mostra tutte le squadre della lega con:
- Crediti ancora disponibili.
- Giocatori acquistati e posti ancora liberi.
- Offerta massima che ciascun avversario può fare: se il tuo rilancio supera il loro Max Bid, sai con certezza matematica che non possono più rilanciare.

### 3. Ricerca e Filtraggio Rapido Giocatori
- Ricerca istantanea per nome del giocatore o squadra NBA/LBA.
- Filtri per ruolo (Guardie, Ali, Centri) e fascia di prezzo.
- Modal di assegnazione rapida con un clic: aggiorna all'istante il budget del compratore e sposta il giocatore tra i "non più disponibili".

### 4. Salvataggio Locale Antidisastro (`localStorage`)
Durante un'asta dal vivo, ricaricare la pagina per sbaglio non deve far perdere i dati. Tutto lo stato della sessione (squadre, giocatori acquistati, crediti spesi) viene sincronizzato su `localStorage`, permettendo di riprendere immediatamente da dove ci si era interrotti.

---

## Dettagli Tecnici
- **Stack**: React (con Vite per build istantaneo), JavaScript moderno ed utility CSS per un layout fluido anche da tablet o portatile.
- **Gestione dello Stato**: custom hook dedicato (`useDunkestApp`) che centralizza tutte le mutazioni (assegnazione giocatori, svincoli, ricalcolo budget).
- **Esperienza d'uso**: layout ottimizzato per operare velocemente a colpi di clic e scorciatoie, fondamentale durante i secondi concitati di un rilancio.
