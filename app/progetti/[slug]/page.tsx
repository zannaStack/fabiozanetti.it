import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/site.config";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  FileText,
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-grid-pattern glow-radial flex flex-col justify-between">
      {/* Header compatto con navigazione */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090a0f]/80 border-b border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            <span>Torna alla Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.links.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Scarica CV</span>
            </a>
            <a
              href={`mailto:${siteConfig.personal.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/30"
            >
              <span>Contattami</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contenuto Dettaglio Progetto */}
      <main className="max-w-4xl mx-auto px-6 pt-10 pb-24 flex-1 w-full">
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

        {/* Corpo Markdown renderizzato */}
        <article className="mt-8 rounded-2xl border border-zinc-800/90 bg-zinc-900/30 p-6 sm:p-10 backdrop-blur-sm">
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </article>

        {/* Navigazione Footer Articolo */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna all&apos;elenco progetti</span>
          </Link>
          <a
            href="#"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Torna all&apos;inizio ↑
          </a>
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
