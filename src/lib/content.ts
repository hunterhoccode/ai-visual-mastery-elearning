import fs from "fs";
import path from "path";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content");

export interface Module {
  slug: string;
  number: number;
  title: string;
  lessonCount: number;
}

export interface Lesson {
  slug: string;
  number: number;
  title: string;
  moduleSlug: string;
}

export interface LessonContent extends Lesson {
  htmlContent: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractNumber(name: string): number {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function extractTitle(dirName: string): string {
  return dirName
    .replace(/^\d+-\s*/, "")
    .replace(/^Module \d+-?\s*/, "")
    .replace(/^\d+\s*Module \d+-?\s*/, "")
    .trim();
}

function extractLessonTitle(fileName: string): string {
  return fileName
    .replace(/\.md$/, "")
    .replace(/^\d+-\s*/, "")
    .trim();
}

export function getModules(): Module[] {
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const modules: Module[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirName = entry.name;
    const modulePath = path.join(contentDir, dirName);
    const lessons = fs
      .readdirSync(modulePath)
      .filter((f) => f.endsWith(".md"));

    modules.push({
      slug: slugify(dirName),
      number: extractNumber(dirName),
      title: extractTitle(dirName),
      lessonCount: lessons.length,
    });
  }

  return modules.sort((a, b) => a.number - b.number);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return getModules().find((m) => m.slug === slug);
}

export function getLessons(moduleSlug: string): Lesson[] {
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const moduleDir = entries.find(
    (e) => e.isDirectory() && slugify(e.name) === moduleSlug
  );

  if (!moduleDir) return [];

  const modulePath = path.join(contentDir, moduleDir.name);
  const files = fs
    .readdirSync(modulePath)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files.map((f) => ({
    slug: slugify(f.replace(/\.md$/, "")),
    number: extractNumber(f),
    title: extractLessonTitle(f),
    moduleSlug,
  }));
}

export async function getLessonContent(
  moduleSlug: string,
  lessonSlug: string
): Promise<LessonContent | null> {
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const moduleDir = entries.find(
    (e) => e.isDirectory() && slugify(e.name) === moduleSlug
  );

  if (!moduleDir) return null;

  const modulePath = path.join(contentDir, moduleDir.name);
  const files = fs.readdirSync(modulePath).filter((f) => f.endsWith(".md"));
  const file = files.find((f) => slugify(f.replace(/\.md$/, "")) === lessonSlug);

  if (!file) return null;

  const filePath = path.join(modulePath, file);
  const rawContent = fs.readFileSync(filePath, "utf-8");

  const htmlContent = await marked(rawContent);

  return {
    slug: lessonSlug,
    number: extractNumber(file),
    title: extractLessonTitle(file),
    moduleSlug,
    htmlContent,
  };
}

export function getWelcomeContent(): string | null {
  const welcomeFile = path.join(
    contentDir,
    "00-Welcome to AI Production Mastery Pro.md"
  );
  if (!fs.existsSync(welcomeFile)) return null;
  return fs.readFileSync(welcomeFile, "utf-8");
}

// Module icon names (Lucide icon names)
export function getModuleIconName(number: number): string {
  const icons: Record<number, string> = {
    1: "Layers",
    2: "Search",
    3: "Zap",
    4: "Palette",
    5: "Rocket",
    6: "Trophy",
    7: "ClipboardList",
    8: "Settings",
    9: "GitBranch",
    10: "Microscope",
    11: "Briefcase",
    12: "Target",
    13: "Eye",
    14: "Package",
  };
  return icons[number] || "BookOpen";
}

// Module color mapping for cards
export function getModuleColor(number: number): string {
  const colors: Record<number, string> = {
    1: "from-violet-500 to-purple-600",
    2: "from-blue-500 to-indigo-600",
    3: "from-cyan-500 to-blue-600",
    4: "from-pink-500 to-rose-600",
    5: "from-orange-500 to-red-500",
    6: "from-emerald-500 to-teal-600",
    7: "from-amber-500 to-orange-600",
    8: "from-indigo-500 to-violet-600",
    9: "from-teal-500 to-cyan-600",
    10: "from-purple-500 to-pink-600",
    11: "from-green-500 to-emerald-600",
    12: "from-red-500 to-pink-600",
    13: "from-sky-500 to-blue-600",
    14: "from-fuchsia-500 to-purple-600",
  };
  return colors[number] || "from-gray-500 to-gray-600";
}
