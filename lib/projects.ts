import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import { codeToHtml } from "shiki";

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export interface ProjectMetadata {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  order?: number;
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  date?: string;
  category?: "core" | "side";
}

export interface ProjectWithContent extends ProjectMetadata {
  contentHtml: string;
  rawContent: string;
}

const markedInstance = new Marked({
  async: true,
  walkTokens: async (token) => {
    if (token.type === "code") {
      const rawLang = token.lang ? token.lang.trim().split(/\s+/)[0] : "text";
      const normalizedLang = rawLang.toLowerCase();
      try {
        (token as unknown as Record<string, unknown>).highlighted = await codeToHtml(token.text, {
          lang: normalizedLang,
          theme: "tokyo-night",
        });
      } catch {
        (token as unknown as Record<string, unknown>).highlighted = await codeToHtml(token.text, {
          lang: "text",
          theme: "tokyo-night",
        });
      }
    }
  },
  renderer: {
    code(token) {
      const rawLang = (token.lang || "").trim().split(/\s+/)[0] || "code";
      const highlighted = (token as unknown as Record<string, unknown>).highlighted;
      if (typeof highlighted === "string") {
        return `<div class="code-block-container relative group my-6 rounded-xl overflow-hidden border border-zinc-800 bg-[#1a1b26] shadow-xl">
          <div class="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-[#16161e] text-xs text-zinc-400 font-mono">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-500/80 inline-block"></span>
              <span class="text-indigo-300 font-semibold uppercase tracking-wider text-[11px]">${rawLang}</span>
            </div>
            <button type="button" class="copy-code-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium text-zinc-400 hover:text-zinc-100 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/50 transition-all cursor-pointer" aria-label="Copia codice">
              <svg class="w-3.5 h-3.5 copy-icon text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span class="copy-text">Copia</span>
            </button>
          </div>
          <div class="code-block-content text-sm overflow-x-auto p-4 font-mono leading-relaxed">
            ${highlighted}
          </div>
        </div>`;
      }
      return `<pre><code>${token.text}</code></pre>`;
    },
  },
});

/**
 * Legge tutti i progetti dalla cartella content/projects/
 * e li restituisce ordinati per 'order' o per data.
 */
export function getAllProjects(): ProjectMetadata[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        subtitle: data.subtitle || "",
        description: data.description || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        order: typeof data.order === "number" ? data.order : 99,
        featured: Boolean(data.featured),
        githubUrl: data.githubUrl || "",
        demoUrl: data.demoUrl || "",
        date: data.date || "",
        category: data.category === "side" ? "side" : "core",
      } as ProjectMetadata;
    });

  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/**
 * Recupera un singolo progetto tramite il suo slug
 * e converte il markdown del corpo in HTML pulito con syntax highlighting.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithContent | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markedInstance.parse(content);

  return {
    slug,
    title: data.title || slug,
    subtitle: data.subtitle || "",
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    order: typeof data.order === "number" ? data.order : 99,
    featured: Boolean(data.featured),
    githubUrl: data.githubUrl || "",
    demoUrl: data.demoUrl || "",
    date: data.date || "",
    category: data.category === "side" ? "side" : "core",
    contentHtml,
    rawContent: content,
  };
}
