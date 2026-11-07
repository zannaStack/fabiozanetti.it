---
title: "Bot Telegram & Web Scraping: Bandi UniBo e Offerte Lavoro"
subtitle: "Automazione autonoma in Python per il monitoraggio continuo di bandi universitari e opportunità di tirocinio"
description: "Agente di monitoraggio multi-piattaforma sviluppato in Python. Esegue scraping continuo su bandi UniBo, LinkedIn Jobs e altri portali, filtrando per parole chiave e inviando alert istantanei via Bot Telegram."
tags: ["Python", "Telegram Bot API", "Web Scraping", "BeautifulSoup", "Automazione", "REST API"]
order: 4
featured: true
category: "side"
githubUrl: "https://github.com/zannaStack"
demoUrl: ""
date: "2026"
---

## Il Problema Risolto

Spesso i bandi universitari per borse di studio, collaborazioni e le opportunità di tirocinio o lavoro part-time a Bologna sono sparsi tra diversi portali (sito dell'Università di Bologna, feed RSS, piattaforme di lavoro esterne). Verificare manualmente questi siti ogni giorno richiede tempo e aumenta il rischio di perdere scadenze critiche.

Per risolvere questo problema concreto, ho progettato e sviluppato un **agente autonomo in Python** in grado di raccogliere, filtrare e notificare in tempo reale tutte le nuove opportunità pertinenti direttamente sul mio smartphone tramite **Telegram**.

---

## Architettura del Sistema

L'applicazione è strutturata su un'architettura modulare con esecuzione programmata:

```
[Portali Web & Feed RSS]
   ├── UniBo Bandi (RSS/XML & HTML)
   ├── LinkedIn Guest API
   └── Portali Lavoro Locali
              │
              ▼
   [Scraping & Parsing Engine (BeautifulSoup)]
              │
              ▼
   [Filtering & Normalization Pipeline]
   (Controllo Keyword, Località Bologna, Data recente)
              │
              ▼
   [State & Deduplication Layer (JSON)]
   (Verifica se l'annuncio è già stato notificato)
              │
              ▼
   [Telegram Bot Service] ────> Push Alert su Smartphone
              ▲
              │
   [Telegram Command Listener] <─── Comandi utente (/status, /keywords)
```

---

## Funzionalità Principali

### 1. Scraping Multi-Sorgente Flessibile
- **UniBo Bandi**: Estrazione automatica tramite parsing strutturato del feed RSS XML di `bandi.unibo.it` con fallback tramite scraping HTML per schede dettagliate.
- **Portali di Lavoro & LinkedIn**: Rilevamento di posizioni junior, part-time e tirocini a Bologna interfacciandosi con endpoint e selettori HTML dedicati.

### 2. Pipeline di Filtraggio Intelligente
- Analisi testuale per corrispondenza di parole chiave mirate (*studente*, *tirocinio*, *stage*, *ingegneria informatica*, *sviluppatore*, *part-time*).
- Calcolo automatico della freschezza temporale dell'annuncio (scarto automatico di bandi o annunci scaduti o più vecchi di N giorni).
- Normalizzazione di caratteri speciali e codifiche UTF-8 per console e notifiche mobili.

### 3. Persistenza e Prevenzione Duplicati
- Tracciamento univoco degli annunci già elaborati mediante un layer di persistenza JSON (`sent_notifications.json`).
- Prevenzione assoluta dello spam di notifiche duplicate anche in caso di riavvio del processo.

### 4. Interfaccia Telegram Bidirezionale
- **Notifiche Push**: Invio di messaggi formattati in HTML con titolo in evidenza, anteprima della descrizione, data e link diretto per candidarsi.
- **Bot Interattivo**: Polling asincrono tramite l'endpoint `getUpdates` della Telegram Bot API per ricevere comandi dall'utente e modificare dinamicamente i parametri di ricerca o verificare lo stato dell'agente.

---

## Competenze Pratiche Dimostrate
- Padronanza delle librerie Python standard e di terze parti (`requests`, `beautifulsoup4`, `re`, `json`, `logging`).
- Gestione robusta delle eccezioni di rete, timeout e formati di risposta imprevisti.
- Configurazione esterna e separazione delle credenziali sensibili da file di configurazione protetti.
