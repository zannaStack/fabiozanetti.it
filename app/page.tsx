import React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getAllProjects } from "@/lib/projects";
import { ContactBox } from "@/app/components/ContactBox";
import { Navbar } from "@/app/components/Navbar";
import {
  FileText,
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  Globe,
  Bot,
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
  const projects = getAllProjects();
  const coreProjects = projects.filter((p) => p.category === "core");
  const sideProjects = projects.filter((p) => p.category === "side");

  const getSkillCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 1:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-grid-pattern glow-radial flex flex-col justify-between">
      {/* Header Sticky con Navbar responsive e menu mobile */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 flex-1 w-full space-y-28">
        {/* 1. Hero Section */}
        <section className="relative pt-6 md:pt-12 space-y-8">
          {siteConfig.personal.status.available && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {siteConfig.personal.status.text}
            </div>
          )}

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {siteConfig.personal.name}
            </h1>
            <p className="text-xl sm:text-2xl text-indigo-300 font-medium tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-400 shrink-0" />
              {siteConfig.personal.role}
            </p>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              {siteConfig.personal.shortBio}
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed border-l-2 border-indigo-500/60 pl-4 py-1 italic">
              &quot;{siteConfig.personal.objective}&quot;
            </p>
          </div>

          {/* Azioni Rapide & Social */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#progetti"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
            >
              <span>Vedi Progetti</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.links.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-medium text-sm transition-all active:scale-95 shadow-sm"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>Scarica CV (PDF)</span>
            </a>

            <div className="h-6 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
                title="Profilo GitHub zannaStack"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
                title="Profilo LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.personal.email}`}
                aria-label="Email Me"
                className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
                title="Invia Email"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* 2. Tech Stack & Competenze */}
        <section id="competenze" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Code2 className="w-4 h-4" />
              <span>Competenze Tecniche</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Tech Stack & Metodologie
            </h2>
            <p className="text-sm text-zinc-400">
              Linguaggi, concetti ingegneristici e strumenti consolidati nel percorso accademico e nei progetti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 backdrop-blur-sm card-hover-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-xl bg-zinc-800/70 border border-zinc-700/50">
                      {getSkillCategoryIcon(index)}
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-base">
                      {skillGroup.category}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {skillGroup.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 border border-zinc-700/30 text-xs"
                      >
                        <span className="font-medium text-zinc-200">{item.name}</span>
                        {"level" in item && item.level ? (
                          <span className="text-zinc-400 font-mono text-[11px]">{item.level}</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Progetti Selezionati con Markdown nativo */}
        <section id="progetti" className="space-y-12 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span>Showcase Progetti</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Progetti
              </h2>
              <p className="text-sm text-zinc-400">
                Software, algoritmi e strumenti personali sviluppati in C, Java, Python e React.
              </p>
            </div>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              <span>Vedi tutti i repository su GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Sotto-sezione 1: Progetti Ingegneria & Core */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-zinc-800/60">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Software & Sistemi (C / Java)</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Algoritmi, gestione della memoria e programmazione orientata agli oggetti.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 backdrop-blur-sm card-hover-border flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                        <Link href={`/progetti/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wide">
                          In Evidenza
                        </span>
                      )}
                    </div>

                    {project.subtitle && (
                      <p className="text-xs font-medium text-zinc-400">
                        {project.subtitle}
                      </p>
                    )}

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

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-800/60">
                    <Link
                      href={`/progetti/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>Leggi scheda completa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-all"
                          title="Demo Live"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs transition-all"
                          title="Repository GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sotto-sezione 2: Side Projects & Automazioni */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 pb-2 border-b border-zinc-800/60">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Web App & Automazioni (Python / React)</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Applicazioni e script nati per risolvere esigenze pratiche e quotidiane.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sideProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 backdrop-blur-sm card-hover-border flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                        <Link href={`/progetti/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                          In Evidenza
                        </span>
                      )}
                    </div>

                    {project.subtitle && (
                      <p className="text-xs font-medium text-zinc-400">
                        {project.subtitle}
                      </p>
                    )}

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

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-800/60">
                    <Link
                      href={`/progetti/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>Leggi scheda completa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-all"
                          title="Demo Live"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs transition-all"
                          title="Repository GitHub"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Formazione Accademica & Esami di Eccellenza */}
        <section id="formazione" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <GraduationCap className="w-4 h-4" />
              <span>Istruzione & Risultati Accademici</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Percorso di Studi Universitario
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-sm card-hover-border space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-100">
                  {siteConfig.education.degree}
                </h3>
                <p className="text-sm text-indigo-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {siteConfig.education.university}
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full w-fit">
                {siteConfig.education.period}
              </div>
            </div>

            {/* Esami con Lode / Valutazione Massima */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Esami Rilevanti con Valutazione di Eccellenza</span>
              </h4>

              <div className="grid grid-cols-1 gap-3 pt-1">
                {siteConfig.education.highlightExams.map((exam, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-semibold text-zinc-100 text-sm">
                        {exam.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 w-fit">
                        {exam.grade}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {exam.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Argomenti Fondamentali */}
            <div className="pt-2 border-t border-zinc-800/60">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Competenze Chiave del Percorso Ingegneristico</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-zinc-300">
                {siteConfig.education.coreTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scuola Superiore */}
            <div className="pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 gap-2">
              <div>
                <span className="text-zinc-300 font-medium">{siteConfig.education.highSchool.title}</span> — {siteConfig.education.highSchool.school}
              </div>
              <div className="font-mono text-zinc-500">
                Votazione: <strong className="text-zinc-300">{siteConfig.education.highSchool.grade}</strong> ({siteConfig.education.highSchool.period})
              </div>
            </div>
          </div>
        </section>

        {/* 5. Lingue & Certificazioni */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Globe className="w-4 h-4" />
              <span>Certificazioni & Soft Skills</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Lingue & Esperienze Pratiche
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.languagesAndCerts.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 backdrop-blur-sm card-hover-border flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-zinc-100 text-sm flex items-center gap-2">
                    {idx === 0 ? (
                      <Globe className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                    )}
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Contatti & Opportunità */}
        <section id="contatti" className="space-y-8 scroll-mt-24">
          <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/20 via-zinc-900/60 to-zinc-900/40 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-md">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Opportunità & Collaborazioni</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interessato a una collaborazione?
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Sono disponibile per collaborazioni <strong className="text-white">part-time (~20h settimanali)</strong> o progetti formativi compatibili con le lezioni universitarie. Desidero inserirmi in un team dinamico per applicare le mie competenze in programmazione strutturata, OOP e backend.
              </p>

              {/* Box Email Interattivo con Copia Rapida */}
              <ContactBox email={siteConfig.personal.email} />

              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
                <span>•</span>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub zannaStack</span>
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
            <span className="font-semibold text-zinc-300">{siteConfig.personal.name}</span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span>{siteConfig.personal.role}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.personal.email}`}
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

function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
