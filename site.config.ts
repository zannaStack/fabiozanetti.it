/**
 * ===============================================================================
 * CONFIGURAZIONE SITO PERSONALE - FABIO ZANETTI
 * ===============================================================================
 * Questo file contiene tutti i tuoi dati, testi, competenze e link.
 * Puoi modificare qualsiasi valore qui sotto per aggiornare il sito in tempo reale
 * senza dover toccare il codice HTML o React!
 */

export const siteConfig = {
  // DATI PERSONALI & INTESTAZIONE
  personal: {
    name: "Fabio Zanetti",
    role: "Studente di Ingegneria Informatica @ Università di Bologna",
    location: "Bologna / Anzola dell'Emilia (BO)",
    email: "fabio06ap@gmail.com",
    
    // Mostra/Nascondi il badge di disponibilità lavorativa
    status: {
      available: true,
      text: "Disponibile per collaborazione part-time (~20h/settimana)",
    },

    // Breve descrizione nella schermata iniziale (Hero)
    shortBio:
      "Studente al secondo anno di Ingegneria Informatica presso l'Università di Bologna "+ 
      "con solide competenze di programmazione in C (30 e Lode), Java (30) e Python."+ 
      "Appassionato di sviluppo backend, logica e algoritmi.",

    // Obiettivo professionale / motivazione
    objective:
      "Ricerco una collaborazione part-time compatibile con le lezioni universitarie,"+
      " desideroso di inserirmi in un team di sviluppo strutturato per consolidare"+
      " le mie competenze pratiche su programmazione ad oggetti (OOP) e database.",
  },

  // LINK SOCIAL & CURRICULUM
  links: {
    github: "https://github.com/zannaStack",
    linkedin: "https://linkedin.com/in/fabio-zanetti-68b8a1279",
    email: "mailto:fabio06ap@gmail.com",
    
    // Per aggiornare il CV: basta sostituire il file "cv.pdf" dentro la cartella "public/"!
    // Oppure puoi inserire qui un link a Google Drive / Dropbox se preferisci.
    cvUrl: "/CV_Fabio_Zanetti.pdf",
  },

  // COMPETENZE TECNICHE (Raggruppate per categoria)
  skills: [
    {
      category: "Linguaggi di Programmazione",
      items: [
        { name: "C", level: "Avanzato (Esame: 30 e Lode)" },
        { name: "Java", level: "Intermedio/Avanzato (Esame: 30)" },
        { name: "Python", level: "Intermedio" },
        { name: "HTML5 / CSS3", level: "Base" },
        { name: "SQL", level: "Base" },
      ],
    },
    {
      category: "Strumenti, Ambienti & OS",
      items: [
        { name: "Git & GitHub", level: "Intermedio" },
        { name: "Linux / Bash", level: "Intermedio" },
        { name: "VS Code", level: "Avanzato" },
        { name: "Valgrind & GDB", level: "Intermedio" },
        { name: "Windows", level: "Avanzato" },
      ],
    },
    {
      category: "Metodologie & Concetti Chiave",
      items: [
        { name: "Programmazione ad Oggetti (OOP)", level: "Approfondito" },
        { name: "Algoritmi e Strutture Dati", level: "Approfondito" },
        { name: "Programmazione Strutturata", level: "Approfondito" },
        { name: "Gestione Memoria & Puntatori", level: "Approfondito" },
        { name: "Design Pattern", level: "Intermedio" },
      ],
    },
  ],

  // FORMAZIONE ACCADEMICA & ESAMI DI PUNTA
  education: {
    degree: "Laurea Triennale in Ingegneria Informatica (L-8)",
    university: "Alma Mater Studiorum – Università di Bologna",
    period: "Settembre 2025 – In corso (2° Anno)",
    statusNote: "2° Anno in corso",
    
    // Esami chiave superati con esito eccellente
    highlightExams: [
      {
        name: "Informatica 1 (Linguaggio C)",
        grade: "30/30 e Lode",
        description:
          "Programmazione strutturata, aritmetica dei puntatori, allocazione dinamica della"+
          " memoria (heap/stack), gestione file e modularizzazione del codice.",
      },
      {
        name: "Sistemi Software a Oggetti (Linguaggio Java)",
        grade: "30/30",
        description:
          "Programmazione orientata agli oggetti (OOP), incapsulamento, ereditarietà,"+
          " polimorfismo, interfacce, design pattern e Java Collections Framework.",
      },
      {
        name: "Analisi Matematica 1",
        grade: "30/30",
        description:
          "Sviluppo di elevate capacità analitiche, logiche, dimostrative e attitudine "+
          "al problem solving rigoroso.",
      },
    ],

    // Materie e macro-argomenti del percorso
    coreTopics: [
      "Algoritmi e Strutture Dati",
      "Architettura dei Calcolatori",
      "Sistemi Operativi e Programmazione Concorrente",
      "Basi di Dati e Sistemi Informativi",
      "Metodologie di Ingegneria del Software",
    ],

    // Scuola superiore
    highSchool: {
      title: "Diploma di Liceo Scientifico Scienze Applicate",
      school: "Liceo Sabin, Bologna",
      period: "Settembre 2020 – Giugno 2025",
      grade: "85/100",
    },
  },

  // LINGUE E CERTIFICAZIONI
  languagesAndCerts: [
    {
      title: "Certificazione Lingua Inglese (Livello C1)",
      description:
        "Conseguita al termine di un soggiorno e percorso di studio di 3 settimane in Irlanda.",
    },
    {
      title: "Patente di Guida B",
      description: "Automunito.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
