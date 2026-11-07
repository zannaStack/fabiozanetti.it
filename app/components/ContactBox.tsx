"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Send } from "lucide-react";

interface ContactBoxProps {
  email: string;
}

export function ContactBox({ email }: ContactBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-sm font-mono text-zinc-200 w-full sm:w-auto justify-between sm:justify-start">
        <span>{email}</span>
        <button
          onClick={handleCopy}
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
        href={`mailto:${email}?subject=Contatto%20da%20Portfolio%20-%20Fabio%20Zanetti`}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-md shadow-indigo-600/30 active:scale-95 w-full sm:w-auto"
      >
        <Send className="w-4 h-4" />
        <span>Scrivimi un&apos;email</span>
      </a>
    </div>
  );
}
