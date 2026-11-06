"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  FileText,
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Copy,
  Check,
  GraduationCap,
  MapPin,
  Send,
} from "lucide-react";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const email = "me@fabiozanetti.it";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills = [
    {
      category: "Linguaggi",
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      items: [
        { name: "C", level: "Avanzato" },
        { name: "C++", level: "Intermedio" },
        { name: "Java", level: "Intermedio" },
        { name: "Python", level: "Avanzato" },
        { name: "TypeScript", level: "Avanzato" },
        { name: "JavaScript", level: "Avanzato" },
        { name: "SQL", level: "Intermedio" },
      ],
    },
    {
      category: "Web & Frontend",
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      items: [
        { name: "React", level: "Avanzato" },
        { name: "Next.js (App Router)", level: "Avanzato" },
        { name: "Tailwind CSS", level: "Avanzato" },
        { name: "HTML5 & CSS3", level: "Esperto" },
        { name: "Node.js", level: "Intermedio" },
        { name: "REST APIs", level: "Avanzato" },
      ],
    },
    {
      category: "Sistemi, DevOps & Tools",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      items: [
        { name: "Linux / POSIX", level: "Avanzato" },
        { name: "Git & GitHub", level: "Avanzato" },
        { name: "Docker", level: "Intermedio" },
        { name: "Bash Scripting", level: "Intermedio" },
        { name: "GDB & Valgrind", level: "Intermedio" },
        { name: "Vercel & CI/CD", level: "Intermedio" },
      ],
    },
  ];

  const projects = [
    {
      id: "pathfinder-engine",
      title: "Algorithmic Graph & Pathfinding Engine",
      subtitle: "Simulatore di complessità computazionale e gestione memoria",
      description:
        "Engine grafico e simulatore per benchmark di algoritmi su grafi (Dijkstra, A*, BFS, DFS). Progettato con focus su allocazione efficiente della memoria cache-friendly, misurazione delle performance e visualizzazione passo-passo.",
      tags: ["C++", "C", "Algoritmi", "Strutture Dati", "Benchmark"],
      githubUrl: "https://github.com/fabiozanetti/graph-pathfinder-engine",
      demoUrl: "https://demo.fabiozanetti.it/pathfinder",
      featured: true,
    },
    {
      id: "weatherpulse",
      title: "WeatherPulse - Real-Time Weather App",
      subtitle: "Web app reattiva con Open-Meteo REST API e caching SSR",
      description:
        "Applicazione meteo moderna con geolocalizzazione automatica, grafici orari interattivi e previsioni dettagliate a 7 giorni. Caching lato server Next.js per minimizzare la latenza e interfaccia dark-mode curata con Tailwind CSS.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "Vercel"],
      githubUrl: "https://github.com/fabiozanetti/weather-pulse-app",
      demoUrl: "https://weather.fabiozanetti.it",
      featured: true,
    },
    {
      id: "unibo-telegram-bot",
      title: "UniBo Student Assistant Bot",
      subtitle: "Automazione e notifiche accademiche asincrone",
      description:
        "Bot Telegram sviluppato in Python asincrono con persistenza dati SQLite. Notifica in tempo reale variazioni d'orario delle lezioni, promemoria appelli d'esame e distribuzione rapida di appunti universitari.",
      tags: ["Python", "AsyncIO", "SQLite", "Docker", "Telegram API"],
      githubUrl: "https://github.com/fabiozanetti/unibo-telegram-bot",
      demoUrl: "https://t.me/UniBoAssistantBot",
      featured: false,
    },
    {
      id: "posix-shell",
      title: "MicroShell POSIX Unix",
      subtitle: "Interprete di comandi Unix e gestione concorrente dei processi",
      description:
        "Implementazione da zero di una shell interattiva compatibile POSIX in standard C. Gestione di fork(), execvp(), concatenazione pipeline multidirezionali (|), ridirezione stream di input/output (<, >) e segnali di interrupt.",
      tags: ["C", "Linux Syscalls", "POSIX", "Process Management", "GDB"],
      githubUrl: "https://github.com/fabiozanetti/posix-microshell",
      demoUrl: "https://github.com/fabiozanetti/posix-microshell",
      featured: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-grid-pattern glow-radial flex flex-col justify-between">
      {/* Barra di Navigazione Superiore */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090a0f]/80 border-b border-zinc-800/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-medium tracking-tight text-zinc-100 hover:text-white transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-bold text-xs text-indigo-400">
              FZ
            </span>
            <span className="text-sm font-semibold">Fabio Zanetti</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a
              href="#competenze"
              className="hover:text-zinc-100 transition-colors"
            >
              Competenze
            </a>
            <a
              href="#progetti"
              className="hover:text-zinc-100 transition-colors"
            >
              Progetti
            </a>
            <a
              href="#percorso"
              className="hover:text-zinc-100 transition-colors"
            >
              Percorso
            </a>
            <a
              href="#contatti"
              className="hover:text-zinc-100 transition-colors"
            >
              Contatti
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>CV</span>
            </a>
            <a
              href="#contatti"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30"
            >
              <span>Contattami</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contenuto Principale */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 flex-1 w-full space-y-28">
        {/* 1. Hero Section */}
        <section className="relative pt-6 md:pt-12 space-y-8">
          {/* Badge Stato / Disponibilità */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Disponibile per Tirocini / Stage Curriculari
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Fabio Zanetti
            </h1>
            <p className="text-xl sm:text-2xl text-indigo-300 font-medium tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-400 shrink-0" />
              Computer Engineering Student @ Bologna
            </p>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed pt-2">
              Appassionato di architetture software ad alte prestazioni, sistemi
              operativi e sviluppo web moderno. Unisco solide basi matematiche
              e algoritmiche con tecnologie moderne per costruire prodotti
              robusti, performanti ed eleganti.
            </p>
          </div>

          {/* CTA & Social Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#progetti"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
            >
              <span>Vedi Progetti</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-medium text-sm transition-all active:scale-95 shadow-sm"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Scarica CV</span>
            </a>

            <div className="h-6 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/fabiozanetti"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/fabiozanetti"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:me@fabiozanetti.it"
                aria-label="Email Me"
                className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* 2. Tech Stack / Competenze */}
        <section id="competenze" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Code2 className="w-4 h-4" />
              <span>Competenze Tecniche</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Tech Stack & Tooling
            </h2>
            <p className="text-sm text-zinc-400">
              Tecnologie, linguaggi e strumenti utilizzati nello sviluppo
              accademico e personale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 backdrop-blur-sm card-hover-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-xl bg-zinc-800/70 border border-zinc-700/50">
                      {skillGroup.icon}
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-base">
                      {skillGroup.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-800/60 border border-zinc-700/40 text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Stack verificato su progetti</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-3 h-3" /> Operativo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Bacheca Progetti (Portfolio Showcase) */}
        <section id="progetti" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span>Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Progetti Selezionati
              </h2>
              <p className="text-sm text-zinc-400">
                Progetti pratici e accademici focalizzati su architettura,
                performance e usabilità.
              </p>
            </div>

            <a
              href="https://github.com/fabiozanetti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              <span>Vedi tutti i repository su GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 backdrop-blur-sm card-hover-border flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wide">
                        In Evidenza
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-zinc-400">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-800/60">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Demo Live</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 text-xs font-medium transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Percorso Accademico / Chi Sono */}
        <section id="percorso" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <GraduationCap className="w-4 h-4" />
              <span>Formazione</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Percorso Accademico
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-sm card-hover-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">
                  Laurea Triennale in Ingegneria Informatica (L-8)
                </h3>
                <p className="text-sm text-indigo-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4" /> Alma Mater Studiorum – Università
                  di Bologna
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-400 bg-zinc-800/70 px-3 py-1.5 rounded-full border border-zinc-700/40 w-fit">
                2° Anno in corso (2024 - 2027)
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed">
                Il percorso unisce rigore scientifico e abilità ingegneristiche,
                approfondendo la comprensione dell&apos;hardware e del software a ogni
                livello di astrazione. Focus principale su:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>Algoritmi e Strutture Dati</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>Architettura dei Calcolatori e Microprocessori</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>Sistemi Operativi e Programmazione Concorrente</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>Basi di Dati e Sistemi Informativi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Contatti & Opportunità */}
        <section id="contatti" className="space-y-8 scroll-mt-24">
          <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 via-zinc-900/60 to-zinc-900/40 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-md">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <Mail className="w-3.5 h-3.5" />
                <span>Mettiti in contatto</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Cerchi uno stagista motivato per il tuo team?
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Sono attivamente alla ricerca di opportunità di{" "}
                <strong className="text-zinc-200">tirocinio curriculare</strong>{" "}
                o collaborazioni formative nel campo dello sviluppo software,
                ingegneria dei sistemi o web development.
              </p>

              {/* Box Email Interattivo */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-sm font-mono text-zinc-200 w-full sm:w-auto justify-between sm:justify-start">
                  <span>{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-2"
                    title="Copia email"
                    aria-label="Copia indirizzo email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${email}?subject=Opportunità%20Tirocinio%20-%20Fabio%20Zanetti`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-md shadow-indigo-600/30 active:scale-95 w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>Scrivimi un&apos;email</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#07080c] py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-zinc-300">Fabio Zanetti</span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span>Ingegneria Informatica — Università di Bologna</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/fabiozanetti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/fabiozanetti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:me@fabiozanetti.it"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
