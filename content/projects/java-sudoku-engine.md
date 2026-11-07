---
title: "Sudoku Engine & Solver con Persistenza SQL"
subtitle: "Engine algoritmico a oggetti (OOP) con risolutore Backtracking MRV e database relazionale SQLite"
description: "Applicazione Java complessa progettata secondo i principi OOP e design pattern (Strategy, Command, DAO). Genera schemi con soluzione unica verificata, supporta Undo/Redo illimitato e persiste sessioni e classifiche su SQLite via JDBC."
tags: ["Java", "OOP", "Backtracking MRV", "Design Patterns", "SQLite", "JDBC", "SQL"]
order: 2
featured: true
category: "core"
githubUrl: "https://github.com/zannaStack/SudokuEngineJava"
demoUrl: ""
date: "2026"
---

## Panoramica del Progetto

Il progetto implementa un **engine computazionale completo per Sudoku** sviluppato in linguaggio **Java (JDK 21+)**, focalizzato sul connubio tra complessità algoritmica, architettura orientata agli oggetti e persistenza su database relazionale SQL.

L'applicazione affronta il Sudoku come un problema classico di **Constraint Satisfaction Problem (CSP)**, implementando algoritmi di esplorazione dello spazio degli stati ad alte prestazioni e un layer di persistenza robusto basato su **SQLite**.

---

## Architettura del Sistema e Design Pattern

L'architettura segue una netta separazione delle responsabilità (Layered Architecture):

```
[CLI / Interfaccia Terminale ANSI ad Alto Contrasto]
                      │
                      ▼
            [SudokuGameService]
                      │
       ┌──────────────┴──────────────┐
       ▼                             ▼
[Generator & Solvers]         [Domain Model]
 ├── Backtracking MRV          ├── Grid (9x9 Bit/Matrix)
 ├── Soluzione Unica Garantita ├── Move (Command Pattern)
 └── Multi-Difficoltà          └── GameSession (State Machine)
                                     │
                                     ▼
                            [GameRepository & DAO]
                                     │
                                     ▼
                        [Database SQLite via JDBC]
                         ├── puzzles
                         ├── game_sessions
                         ├── moves (storico azioni)
                         └── leaderboard (classifiche)
```

### Pattern Architetturali Implementati:
1. **Strategy Pattern (`SudokuSolver`)**: Disaccoppia la rappresentazione della scacchiera dall'algoritmo di risoluzione.
2. **Command Pattern (`Move` / Stacks)**: Incapsula ogni mossa (cella, valore precedente, nuovo valore, timestamp) consentendo operazioni di **Undo** e **Redo** a runtime.
3. **Data Access Object (DAO) Pattern (`GameRepository`)**: Incapsula tutte le transazioni e le query SQL, prevenendo SQL Injection con Prepared Statements e garantendo il disaccoppiamento tra memoria volatile e storage persistente.

---

## Dettagli Algoritmici

### 1. Risolutore Backtracking con Euristica MRV
A differenza del backtracking ingenuo, il risolutore implementa l'euristica **MRV (Minimum Remaining Values / Most Constrained Variable)**:
- Ad ogni passo analizza le celle vuote e sceglie quella con il minor numero di candidati legali.
- Se una cella ha zero candidati, pota immediatamente il ramo di ricerca (*fail-first principle*).
- Risolve griglie di livello Difficile o Esperto in **meno di 2 millisecondi**.

### 2. Generatore con Garanzia di Soluzione Unica
- Genera una soluzione ground-truth valida riempiendo in modo casuale e indipendente i blocchi diagonali 3x3.
- Rimuove progressivamente le cifre in base al livello di difficoltà prescelto (*Facile, Medio, Difficile, Esperto*).
- Ad ogni rimozione esegue un test di conteggio soluzioni `countSolutions(grid, limit=2)`. Se la rimozione rende ambigua la griglia (2 o più soluzioni possibili), il numero viene ripristinato, assicurando che ogni puzzle generato sia matematicamente rigoroso.

---

## Competenze Tecniche Dimostrate
- Padronanza avanzata di Java moderno, collezioni avanzate (`Deque`, `List`, `Map`) e flussi di controllo fail-safe.
- Modellazione di database relazionali con DDL, vincoli di integrità referenziale e query SQL analitiche via JDBC.
- Suite di test integrata (`--test`) per validazione automatizzata di algoritmi, undo/redo e persistenza.
