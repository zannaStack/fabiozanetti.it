---
title: "Sudoku Game & Solver in Java"
subtitle: "Applicazione desktop con interfaccia JavaFX, risolutore a backtracking e database SQLite"
description: "Gioco e risolutore di Sudoku sviluppato in Java con GUI moderna in JavaFX. Include un generatore di schemi a soluzione unica, risolutore automatico con backtracking ed euristica MRV, storico mosse (Undo/Redo) e salvataggio delle partite su SQLite via JDBC."
tags: ["Java", "JavaFX", "Algoritmi", "Backtracking", "OOP", "SQLite", "JDBC"]
order: 2
featured: true
category: "core"
githubUrl: "https://github.com/zannaStack/SudokuEngineJava"
demoUrl: ""
date: "2026"
---

## Perché Questo Progetto?

Dopo aver superato l'esame di **Sistemi Software a Oggetti (30/30)** all'Università di Bologna, volevo realizzare un'applicazione autonoma completa in Java che andasse oltre i tipici esercizi da laboratorio. 

Il Sudoku è un terreno di prova perfetto: richiede sia una solida architettura a oggetti per gestire lo stato della partita, sia algoritmi efficienti per la generazione e la risoluzione automatica delle griglie, il tutto racchiuso in una GUI interattiva con **JavaFX** e persistenza locale su database.

---

## Architettura del Progetto

Il codice è organizzato separando la logica di dominio, l'interfaccia utente e l'accesso ai dati:

```
[Interfaccia Utente (JavaFX GUI / CLI da terminale)]
                    │
                    ▼
          [SudokuController]
           ├── Validazione mosse legali
           ├── Storico Undo/Redo
           └── Cronometro di gioco
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
[Algoritmi & Motore]       [Modello & Dati]
 ├── Backtracking (MRV)     ├── Grid (matrice 9x9)
 ├── Generatore schemi      ├── GameSession & Move
 └── Verifica unicità       └── Salvataggio SQLite (JDBC)
```

### Struttura Principale:
1. **Modello (`Grid`, `Move`, `GameSession`)**: incapsula la scacchiera 9x9, il calcolo dei numeri validi per riga, colonna e riquadro 3x3, e lo stato della sessione.
2. **Storico Mosse (Undo/Redo)**: ogni mossa dell'utente (cella, valore precedente, nuovo valore) viene memorizzata in uno stack dedicato, permettendo di annullare e ripristinare le giocate all'infinito.
3. **Persistenza con SQLite (`DatabaseManager`, `GameRepository`)**: memorizza le partite interrotte, lo storico delle mosse e i tempi migliori per ciascuna difficoltà tramite query parametrizzate JDBC.

---

## Gli Algoritmi di Risoluzione e Generazione

### 1. Risolutore a Backtracking con Euristica MRV
Un backtracking "ingenuo" esplora le celle una dopo l'altra dall'alto a sinistra, rischiando di esplorare rami morti troppo a lungo. Per ottimizzarlo ho implementato l'euristica **MRV (Minimum Remaining Values)**:
- A ogni passo, l'algoritmo individua la cella vuota che ha il **minor numero di candidati legali possibili**.
- Se una cella non ha alcun candidato valido, l'algoritmo torna indietro immediatamente (*fail-first*).
- Questo riduce lo spazio di ricerca e permette di risolvere anche le griglie più complesse in pochissimi millisecondi.

### 2. Generatore di Schemi a Soluzione Unica
Un buon puzzle di Sudoku deve avere **una e una sola soluzione valida**:
- Il generatore parte da una griglia completa generata casualmente.
- Rimuove progressivamente le cifre una ad una in base al livello di difficoltà selezionato (*Facile, Medio, Difficile, Esperto*).
- Ad ogni rimozione, il risolutore conta quante soluzioni ammette la griglia: se rimuovere un numero porta a 2 o più soluzioni possibili, il numero viene rimesso al suo posto. In questo modo si garantisce che lo schema sia risolvibile per logica senza tirare a indovinare.

---

## Interfaccia Grafica (JavaFX)
- Griglia dinamica interattiva con evidenziazione della cella selezionata e dei numeri uguali sulla scacchiera.
- Tastierino numerico a schermo o input rapido da tastiera.
- Timer di gioco in tempo reale, conteggio errori e pulsante "Risolvi / Suggerimento".
- Possibilità di avviare il gioco anche in modalità **CLI da terminale** con caratteri ANSI.

---

## Competenze Approfondite
- Progettazione orientata agli oggetti (incapsulamento, responsabilità singola, gestione delle eccezioni).
- Algoritmi di ricerca e ricorsione con potatura (backtracking con euristiche).
- Sviluppo GUI desktop con JavaFX e gestione degli eventi utente.
- Integrazione di database relazionali in Java tramite JDBC e SQLite.
