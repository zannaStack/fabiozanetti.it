import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/site.config";
import { Navbar } from "@/app/components/Navbar";
import { CodeCopyHandler } from "@/app/components/CodeCopyHandler";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
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

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Progetto non trovato | Fabio Zanetti",
    };
  }

  return {
    title: `${project.title} | Fabio Zanetti`,
    description: project.description || project.subtitle,
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090a0f] flex items-center justify-center text-zinc-500 font-mono text-sm">
          Caricamento scheda progetto...
        </div>
      }
    >
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="relative min-h-screen bg-grid-pattern glow-radial flex flex-col justify-between">
      <CodeCopyHandler />

      {/* Header con Navbar responsive e menu mobile */}
      <Navbar />

      {/* Sotto-barra breadcrumb e ritorno */}
      <div className="border-b border-zinc-800/60 bg-[#090a0f]/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between text-xs">
          <Link
            href="/#progetti"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            <span>Torna all&apos;elenco progetti</span>
          </Link>
          <span className="text-zinc-600 hidden sm:inline">
            Progetto {currentIndex + 1} di {allProjects.length}
          </span>
        </div>
      </div>

      {/* Contenuto Dettaglio Progetto */}
      <main className="max-w-4xl mx-auto px-6 pt-8 pb-24 flex-1 w-full">
        {/* Intestazione del Progetto */}
        <div className="space-y-6 pb-8 border-b border-zinc-800/80">
          <div className="space-y-3">
            {project.date && (
              <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{project.date}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg sm:text-xl text-indigo-300/90 font-medium leading-relaxed">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-700/60 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Pulsanti Link Repository / Demo */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 text-xs font-medium transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repository GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-indigo-600/30"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visualizza Demo Live</span>
              </a>
            )}
          </div>
        </div>

        {/* Corpo Markdown renderizzato con Shiki */}
        <article className="mt-8 rounded-2xl border border-zinc-800/90 bg-zinc-900/30 p-6 sm:p-10 backdrop-blur-sm">
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </article>

        {/* Navigazione Progetto Successivo / Precedente */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Esplora gli altri progetti</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Torna in cima ↑
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                href={`/progetti/${prevProject.slug}`}
                className="group p-5 rounded-2xl border border-zinc-800/90 bg-zinc-900/40 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all flex flex-col justify-between"
              >
                <span className="text-[11px] font-mono text-zinc-500 group-hover:text-indigo-400 flex items-center gap-1.5 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Progetto Precedente
                </span>
                <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors mt-2 text-sm line-clamp-1">
                  {prevProject.title}
                </span>
                <span className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                  {prevProject.subtitle || prevProject.description}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextProject ? (
              <Link
                href={`/progetti/${nextProject.slug}`}
                className="group p-5 rounded-2xl border border-zinc-800/90 bg-zinc-900/40 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all flex flex-col justify-between text-right"
              >
                <span className="text-[11px] font-mono text-zinc-500 group-hover:text-indigo-400 flex items-center justify-end gap-1.5 transition-colors">
                  Progetto Successivo
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors mt-2 text-sm line-clamp-1">
                  {nextProject.title}
                </span>
                <span className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                  {nextProject.subtitle || nextProject.description}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#07080c] py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>{siteConfig.personal.name} — {siteConfig.personal.role}</span>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.personal.email}`}
              className="hover:text-zinc-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
