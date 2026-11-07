---
title: "C Memory Analyzer & Heap Profiler con SQLite"
subtitle: "Analisi hardware a basso livello del sistema operativo, Canary Bytes anti-corruption e metriche SQL"
description: "Tool di analisi della memoria scritto in C standard (C11). Interroga le API Win32/POSIX per metriche di RAM e Working Set dei processi, implementa un tracciatore heap personalizzato con Canary Bytes per rilevare buffer overflow e memorizza gli snapshot su SQLite nativo."
tags: ["C", "C11", "Win32 API", "Heap Allocator", "Canary Bytes", "Memory Leaks", "SQLite C API"]
order: 1
featured: true
category: "core"
githubUrl: "https://github.com/zannaStack/CMemoryAnalyzer"
demoUrl: ""
date: "2026"
---

## Panoramica del Progetto

Sviluppato in **C standard (C11)**, questo software esplora il funzionamento intimo della gestione della memoria nei sistemi operativi moderni attraverso due componenti chiave:
1. **Analizzatore di Sistema & Processi**: Ispezione in tempo reale delle risorse hardware della macchina (RAM fisica, Virtual Memory, file di paging) e del consumo granulare di ogni singolo processo (Working Set, Private Bytes, Page Faults).
2. **Heap Memory Profiler ("Mini-Valgrind")**: Allocatore personalizzato con intercettazione di `malloc`/`free`, protezione tramite **Canary Guard Bytes** contro Buffer Overflow/Underflow e rilevamento automatico dei Memory Leaks.
3. **Persistenza su Database SQLite Nativo**: Salvataggio degli snapshot e delle metriche tramite l'amalgamazione ufficiale della libreria SQLite C API.

---

## Architettura Software

```
                     [C MEMORY ANALYZER]
                              │
       ┌──────────────────────┼──────────────────────┐
       ▼                                             ▼
[System & Process Inspector]               [Heap Memory Profiler]
 ├── RAM Totale / Disponibile (Win32)       ├── Header con metadati (File, Riga, Size)
 ├── Working Set per PID (PSAPI)            ├── Lista doppiamente linkata (O(1) remove)
 ├── Private Bytes & Heap Allocation        ├── Canary Guard Bytes (0xDEADBEEF / 0xC0DEDEAD)
 └── Page Fault Tracking                    └── Audit e report leaks a fine esecuzione
       │                                             │
       └──────────────────────┬──────────────────────┘
                              ▼
                 [SQLite C API Integration]
                  ├── Tabella system_snapshots
                  ├── Tabella process_metrics
                  └── Tabella heap_profiles
```

---

## Caratteristiche Tecniche di Rilievo

### 1. Interfacciamento a Basso Livello con il Sistema Operativo
- **Memoria di Sistema**: Interroga `GlobalMemoryStatusEx` per estrarre con precisione i byte di memoria fisica totale e disponibile, carico percentuale e capacità del file di paging.
- **Ispezione Processi**: Si interfaccia con le librerie Win32 `psapi.h` (`GetProcessMemoryInfo`) per analizzare il **Working Set** (memoria residente in RAM) e i **Private Bytes** di qualsiasi processo in esecuzione dato il suo PID.

### 2. Allocatore Heap Strumentato & Rilevamento Memory Leak
- Le macro `TRACK_MALLOC`, `TRACK_CALLOC`, `TRACK_REALLOC` e `TRACK_FREE` iniettano automaticamente un header opaco contenente dimensione, puntatori e coordinate sorgente (`__FILE__`, `__LINE__`).
- Tutti i blocchi attivi sono mantenuti in una lista doppiamente linkata per inserimento e rimozione in tempo costante $O(1)$.
- A fine esecuzione, `mem_track_report_leaks()` analizza la lista e stampa la lista esatta di tutti i blocchi dimenticati, con indirizzo di memoria esatto, dimensione e riga di codice in cui sono stati allocati.

### 3. Protezione da Corruzione tramite Canary Bytes
- All'inizio del blocco viene inserito il canary `0xDEADBEEF`, e alla fine del payload utente viene posto il canary `0xC0DEDEAD`.
- Se un algoritmo corrompe la memoria scrivendo oltre i limiti consentiti (**Buffer Overflow**) o prima del blocco (**Buffer Underflow**), il tracker lo rileva istantaneamente durante la scansione o all'atto della `free()`, prevenendo crash silenti o vulnerabilità di sicurezza.

### 4. Persistenza Relazionale con SQLite C API
- Integrazione diretta con `sqlite3.c` e `sqlite3.h` compilati staticamente nel binario senza alcuna dipendenza esterna.
- Utilizzo di Prepared Statements parametrizzati (`sqlite3_prepare_v2`, `sqlite3_bind_*`, `sqlite3_step`) per salvare snapshot periodici ed eseguire query storiche.

---

## Competenze Ingegneristiche Dimostrate
- Gestione granulare di puntatori, aritmetica dei puntatori, alignment della memoria e casting a basso livello.
- Conoscenza delle architetture dei sistemi operativi e della gestione della memoria virtuale/paging.
- Utilizzo avanzato di GCC (flag `-std=c11 -O2 -Wall -Wextra`) e linking di librerie di sistema (`-lpsapi`).
