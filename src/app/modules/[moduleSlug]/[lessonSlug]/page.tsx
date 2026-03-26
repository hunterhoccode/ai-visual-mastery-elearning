import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getModules, getModuleBySlug, getLessons, getLessonContent } from "@/lib/content";
import LessonSidebar from "@/components/LessonSidebar";
import LessonNav from "@/components/LessonNav";
import ReadingProgress from "@/components/ReadingProgress";
import TranslateToggle from "@/components/TranslateToggle";
import MobileNav from "@/components/MobileNav";

export function generateStaticParams() {
  const allParams: { moduleSlug: string; lessonSlug: string }[] = [];
  for (const mod of getModules()) {
    for (const lesson of getLessons(mod.slug)) {
      allParams.push({ moduleSlug: mod.slug, lessonSlug: lesson.slug });
    }
  }
  return allParams;
}

export async function generateMetadata({ params }: { params: Promise<{ moduleSlug: string; lessonSlug: string }> }) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = await getLessonContent(moduleSlug, lessonSlug);
  const mod = getModuleBySlug(moduleSlug);
  return { title: lesson ? `${lesson.title} - Module ${mod?.number}` : "Not Found" };
}

export default async function LessonPage({ params }: { params: Promise<{ moduleSlug: string; lessonSlug: string }> }) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = await getLessonContent(moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const mod = getModuleBySlug(moduleSlug);
  if (!mod) notFound();

  const lessons = getLessons(moduleSlug);
  const idx = lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <main className="flex-1">
      <ReadingProgress />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-[10px] text-muted uppercase tracking-wider font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/modules" className="hover:text-primary transition-colors">Modules</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/modules/${moduleSlug}`} className="hover:text-primary transition-colors">Module {mod.number}</Link>
          </div>
          <TranslateToggle />
        </div>

        <MobileNav lessons={lessons} moduleSlug={moduleSlug} moduleTitle={mod.title} moduleNumber={mod.number} />

        <div className="flex gap-5">
          <LessonSidebar lessons={lessons} moduleSlug={moduleSlug} moduleTitle={mod.title} moduleNumber={mod.number} />

          <div className="flex-1 min-w-0">
            <article className="bg-white rounded-lg p-5 md:p-7 animate-fade-in-up">
              <div className="mb-6 pb-4 border-b border-zinc-200">
                <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mb-1.5">
                  Module {mod.number} &middot; Lesson {idx + 1} of {lessons.length}
                </p>
                <h1 className="text-[1.5rem] leading-[1.25] font-bold tracking-[-0.025em] text-zinc-950" style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>{lesson.title}</h1>
              </div>
              <div className="prose prose-light" dangerouslySetInnerHTML={{ __html: lesson.htmlContent }} />
              <LessonNav prev={prev} next={next} />
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
