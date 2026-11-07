"use client";

import React, { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";

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
    <div className="flex items-center justify-center pt-2">
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-sm font-mono text-zinc-200 shadow-sm">
        <Mail className="w-4 h-4 text-zinc-400" />
        <span className="select-all">{email}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-1.5 flex items-center gap-1.5"
          title="Copia email"
          aria-label="Copia indirizzo email"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-sans font-medium">
              <Check className="w-4 h-4" />
              <span>Copiata!</span>
            </span>
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
