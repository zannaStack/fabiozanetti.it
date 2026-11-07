---
title: "Bot Telegram Bandi UniBo & Opportunità"
subtitle: "Script di monitoraggio automatico in Python con avvisi istantanei su smartphone"
description: "Script in Python che monitora periodicamente i bandi dell'Università di Bologna e le opportunità di tirocinio o lavoro part-time, filtrando per parole chiave e inviando una notifica immediata via Telegram con link diretto."
tags: ["Python", "Web Scraping", "Telegram Bot API", "BeautifulSoup", "Automazione"]
order: 3
featured: true
category: "side"
githubUrl: "https://github.com/zannaStack"
demoUrl: ""
date: "2026"
---

## Il Problema Reale

All'Università di Bologna vengono pubblicati frequentemente bandi per collaborazioni studentesche (le classiche "150 ore"), borse di studio e offerte di tirocinio curriculare o part-time. 

Tuttavia, questi avvisi sono sparsi tra il portale `bandi.unibo.it`, feed RSS e bacheche di facoltà: non esisteva un sistema di alert push personalizzato. Controllare manualmente le pagine ogni settimana fa rischiare di vedere una scadenza troppo tardi.

Per risolvere questo problema, ho scritto uno script in **Python** che controlla automaticamente le nuove pubblicazioni e mi invia un messaggio su **Telegram** non appena esce un bando di mio interesse.

---

## Come Funziona il Sistema

Lo script segue una sequenza lineare e robusta:

```
[Portali Web & Feed RSS UniBo]
             │
             ▼
[Download & Parsing con BeautifulSoup]
             │
             ▼
[Filtro Parole Chiave (es. ingegneria, tirocinio, part-time)]
             │
             ▼
[Controllo Duplicati su archivio locale JSON]
             │
      (Nuovo bando trovato?)
      ├── SÌ ──> [Telegram Bot API] ──> Messaggio Push su Smartphone
      └── NO ──> [Nessuna azione, fine esecuzione]
```

### 1. Estrazione dei Bandi
Interroga periodicamente il feed RSS e le pagine web di `bandi.unibo.it` utilizzando `requests` e `BeautifulSoup` per estrarre:
- Titolo del bando o dell'opportunità
- Data di pubblicazione e scadenza per la domanda
- Struttura universitaria emittente
- Link diretto alla modulistica ufficiale

### 2. Filtro per Argomento
Analizza il testo del titolo e della descrizione verificando la corrispondenza con un insieme di parole chiave configurabili (es. *ingegneria informatica*, *collaborazione*, *tutor*, *tirocinio*, *part-time*). Gli avvisi che non riguardano il mio settore vengono scartati automaticamente.

### 3. Prevenzione dei Messaggi Duplicati
Per evitare di ricevere notifiche ripetute dello stesso bando a ogni controllo, lo script salva gli identificativi dei bandi già notificati in un semplice file JSON locale (`sent_notifications.json`). Ad ogni esecuzione, i bandi già presenti nell'elenco vengono ignorati.

### 4. Notifiche Istantanee su Telegram
Quando viene individuato un bando pertinente non ancora notificato, lo script si interfaccia con le **Telegram Bot API** inviando un messaggio formattato con titolo in grassetto, data di scadenza e pulsante con link diretto per aprire la pagina del bando dal telefono.

---

## Dettagli Tecnici
- **Linguaggio**: Python 3.
- **Librerie Principali**: `requests` (chiamate HTTP), `beautifulsoup4` (parsing HTML/XML), `json` (persistenza locale).
- **Sicurezza**: il token del bot Telegram e la chat ID sono salvati in variabili d'ambiente e non tracciati nel repository pubblico.
