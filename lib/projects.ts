import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

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
 * e converte il markdown del corpo in HTML pulito.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithContent | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await marked.parse(content);

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
