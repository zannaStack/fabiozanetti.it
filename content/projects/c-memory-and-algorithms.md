---
title: "Algoritmi e Gestione Dinamica della Memoria in C"
subtitle: "Studio e implementazione a basso livello di strutture dati, puntatori e file I/O"
description: "Progetto sviluppato nell'ambito dell'esame di Informatica 1 (valutato 30 e Lode). Include manipolazione avanzata di puntatori, allocazione dinamica sicura e analisi algoritmica."
tags: ["C", "GCC", "Algoritmi", "Strutture Dati"]
order: 3
featured: false
category: "core"
githubUrl: "https://github.com/zannaStack"
demoUrl: ""
date: "2024-2025"
---

## Panoramica del Progetto

Questo progetto rappresenta il consolidamento pratico delle nozioni apprese durante il corso di **Informatica 1** (superato con votazione **30/30 e Lode** presso l'Università di Bologna).

L'obiettivo principale è stato sviluppare una serie di moduli in linguaggio **C standard** capaci di gestire collezioni di dati complesse con la massima efficienza in termini di tempo di esecuzione e consumo di memoria.

---

## Competenze e Soluzioni Implementate

### 1. Allocazione Dinamica della Memoria
- Gestione granulare dello heap tramite `malloc()`, `calloc()`, `realloc()` e `free()`.
- Adozione di policy rigorose di deallocazione per garantire l'assenza totale di memory leak o dangling pointer.
- Tracciamento della memoria verificato tramite **Valgrind** e debugging con **GDB**.

### 2. Strutture Dati Realizzate
- **Liste concatenate** (singole e doppie) con inserimento ordinato e rimozione in tempo costante.
- **Pile e code** implementate sia tramite vettori a dimensione dinamica sia tramite nodi collegati.
- **Alberi binari di ricerca (BST)** per lookup efficiente e attraversamenti (pre-order, in-order, post-order).

### 3. File I/O e Persistenza
- Lettura e scrittura di file sia in formato testo sia binario (tramite `fread()` e `fwrite()`).
- Parsing robusto di stream di input con gestione rigorosa di buffer overflow e formati di riga errati.

---

## Esempio di Architettura del Codice

La struttura del progetto segue i principi di modularizzazione del C:
- Separazione netta tra header file (`.h`) con contratti di interfaccia e file di implementazione (`.c`).
- Utilizzo di `Makefile` per compilazione incrementale e flag di controllo rigidi (`-Wall -Wextra -pedantic -std=c11 -O2`).

```c
/* Definizione opaca per information hiding */
typedef struct LinkedListNode {
    void* data;
    struct LinkedListNode* next;
} LinkedListNode;

typedef struct {
    LinkedListNode* head;
    size_t size;
    int (*compare)(const void*, const void*);
} List;
```

---

## Risultati Accademici
- **Esame collegato**: Informatica 1 (L-8 Ingegneria Informatica UniBo).
- **Valutazione conseguita**: **30/30 e Lode**.
