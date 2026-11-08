"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";
import {
  FileText,
  Menu,
  X,
  Code2,
  Sparkles,
  GraduationCap,
  Mail,
} from "lucide-react";

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

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const isHome = pathname === "/";

  // Chiudi il menu automaticamente se il percorso cambia durante la navigazione
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Chiudi il menu premendo ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Competenze", href: isHome ? "#competenze" : "/#competenze", icon: Code2 },
    { label: "Progetti", href: isHome ? "#progetti" : "/#progetti", icon: Sparkles },
    { label: "Formazione", href: isHome ? "#formazione" : "/#formazione", icon: GraduationCap },
    { label: "Contatti", href: isHome ? "#contatti" : "/#contatti", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090a0f]/85 border-b border-zinc-800/80 transition-all">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-medium tracking-tight text-zinc-100 hover:text-white transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-bold text-xs text-indigo-400 shadow-inner">
            FZ
          </span>
          <span className="text-sm font-semibold tracking-tight">{siteConfig.personal.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-zinc-100 transition-colors text-xs font-medium uppercase tracking-wider text-zinc-300/80 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={siteConfig.links.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all shadow-sm hover:border-zinc-600"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Scarica CV</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={siteConfig.links.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700/60"
            title="Scarica CV (PDF)"
          >
            <FileText className="w-3 h-3 text-indigo-400" />
            <span>CV</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-700/80 transition-colors"
            aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#090a0f]/95 backdrop-blur-xl px-6 py-6 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-3">
              Navigazione
            </span>
            <div className="space-y-1 pt-1">
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-indigo-400" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2.5">
            <a
              href={siteConfig.links.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/60 text-xs font-medium transition-all"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Scarica Curriculum Vitae (PDF)</span>
            </a>

            <a
              href={isHome ? "#contatti" : "/#contatti"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30"
            >
              <Mail className="w-4 h-4" />
              <span>Contattami via Email</span>
            </a>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-around text-xs text-zinc-400">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-zinc-700">•</span>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-500">{siteConfig.personal.location}</span>
          </div>
        </div>
      )}
    </header>
  );
}
