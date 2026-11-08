"use client";

import { useEffect } from "react";

export function CodeCopyHandler() {
  useEffect(() => {
    const handleCopyClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".copy-code-btn");
      if (!target) return;

      const container = target.closest(".code-block-container");
      if (!container) return;

      const pre = container.querySelector(".code-block-content pre") || container.querySelector("pre");
      if (!pre) return;

      const codeText = pre.textContent || "";

      navigator.clipboard.writeText(codeText).then(() => {
        const textSpan = target.querySelector(".copy-text");
        const icon = target.querySelector(".copy-icon");

        const originalText = textSpan ? textSpan.textContent : "Copia";

        if (textSpan) {
          textSpan.textContent = "Copiato!";
        }
        target.classList.add("text-emerald-400", "border-emerald-500/40", "bg-emerald-500/10");

        if (icon) {
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />`;
        }

        setTimeout(() => {
          if (textSpan) {
            textSpan.textContent = originalText || "Copia";
          }
          target.classList.remove("text-emerald-400", "border-emerald-500/40", "bg-emerald-500/10");
          if (icon) {
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />`;
          }
        }, 2000);
      });
    };

    document.addEventListener("click", handleCopyClick);
    return () => {
      document.removeEventListener("click", handleCopyClick);
    };
  }, []);

  return null;
}
