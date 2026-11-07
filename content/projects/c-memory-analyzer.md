---
title: "C Memory Leak Detector"
subtitle: "Tracciatore leggero delle allocazioni dinamiche e rilevamento memory leak in C standard"
description: "Libreria leggera in C standard (C99) per monitorare lo heap e identificare automaticamente le free() mancanti. Sviluppata per facilitare il debugging di strutture dati dinamiche durante i progetti universitari."
tags: ["C", "C99", "Gestione Memoria", "Heap", "Strutture Dati", "Debugging", "GCC"]
order: 1
featured: true
category: "core"
githubUrl: "https://github.com/zannaStack/CMemoryAnalyzer"
demoUrl: ""
date: "2026"
---

## Perché Questo Progetto?

Durante lo studio e le esercitazioni di **Informatica 1** (esame superato con **30 e Lode** presso l'Università di Bologna), uno degli aspetti più formativi ma al contempo insidiosi è stata la gestione manuale della memoria dinamica tramite puntatori (`malloc`, `realloc`, `free`). 

Quando si sviluppano strutture dati dinamiche (come liste concatenate, pile, code e alberi binari), è facile dimenticare una deallocazione o perdere il riferimento a un nodo, generando un **memory leak**. 

Su Linux lo standard è affidarsi a **Valgrind**, ma sviluppando in ambiente Windows con GCC/MinGW non è disponibile in modo nativo. Invece di ricorrere a macchine virtuali o tool pesanti, ho voluto creare una soluzione minimale, autonoma e portabile: un piccolo modulo in C standard che si integra facilmente in qualsiasi programma e segnala a fine esecuzione dove e quanti byte sono rimasti orfani.

---

## L'Idea e il Funzionamento

Il tracciatore si concentra su una sola funzionalità essenziale, implementata in modo pulito e trasparente: **intercetta le allocazioni e ne tiene traccia fino alla deallocazione**.

### 1. Intercettazione Trasparente con Macro
Includendo l'header `leak_detector.h`, le funzioni standard di allocazione vengono ridefinite tramite macro del preprocessore:
```c
#define malloc(size)       leak_malloc(size, __FILE__, __LINE__)
#define calloc(num, size)  leak_calloc(num, size, __FILE__, __LINE__)
#define realloc(ptr, size) leak_realloc(ptr, size, __FILE__, __LINE__)
#define free(ptr)          leak_free(ptr, __FILE__, __LINE__)
```
Grazie alle macro speciali `__FILE__` e `__LINE__`, il compilatore inietta le coordinate del codice sorgente nel punto esatto della chiamata, senza dover modificare a mano la logica del programma.

### 2. Struttura Dati Interna (Lista Concatenata)
All'interno del modulo, ogni blocco allocato viene registrato come nodo in una lista concatenata:
- Indirizzo di memoria restituito (`void* ptr`)
- Dimensione richiesta in byte (`size_t size`)
- File sorgente e numero di riga (`const char* file`, `int line`)

Quando viene invocata `free(ptr)`, il tracker cerca il puntatore nella lista, aggiorna i contatori di byte liberati e rimuove il nodo. Se il puntatore non viene trovato, emette un avviso di possibile puntatore non valido o tentativo di *double free*.

### 3. Report Finale Dettagliato
Al termine del programma, la funzione `leak_report()` esamina i nodi rimasti nella lista e stampa un riepilogo a terminale:
- Se tutti i blocchi sono stati liberati, conferma l'assenza totale di leak.
- Se ci sono blocchi orfani, elenca ogni leak con la **riga di codice esatta**, il nome del file sorgente e i byte dimenticati.

---

## Esempio di Utilizzo

```c
#include <stdio.h>
#include "leak_detector.h"

int main(void) {
    // 1. Allocazione corretta
    int *vettore = (int *)malloc(10 * sizeof(int));
    free(vettore);

    // 2. Allocazione con deallocazione dimenticata (simulazione leak)
    char *buffer = (char *)malloc(64 * sizeof(char));
    // Dimentichiamo intenzionalmente di chiamare free(buffer)...

    // 3. Stampa il resoconto finale prima di uscire
    leak_report();
    leak_reset();
    return 0;
}
```

Output a terminale:
```text
==================================================
             REPORT STATISTICHE MEMORIA           
==================================================
 Allocazioni effettuate : 2 (104 byte totali)
 Deallocazioni eseguite : 1 (40 byte liberati)
 Picco di memoria usato : 104 byte
--------------------------------------------------
 [!] ATTENZIONE: Rilevati blocchi non liberati:

  #1 -> 64 byte dimenticati
         Allocato in : main.c, riga 11
         Indirizzo   : 0000018df67114e0

 Totale memoria persa : 64 byte in 1 blocchi.
==================================================
```

---

## Competenze Pratiche Dimostrate
- **Aritmetica e manipolazione di puntatori** (`void*`, casting esplicito, puntatori a strutture).
- **Macro avanzate del preprocessore** per meta-programmazione e diagnostica non invasiva.
- **Portabilità completa**: solo C standard (C99), compilabile con qualsiasi toolchain (`gcc -std=c99`).
- **Approccio pratico al problem solving**: comprendere a fondo le problematiche dello heap creando un proprio strumento anziché affidarsi a strumenti preconfezionati.
