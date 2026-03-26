import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getModules,
  getModuleBySlug,
  getLessons,
  getLessonContent,
  getModuleColor,
} from "@/lib/content";
import LessonSidebar from "@/components/LessonSidebar";
import LessonNav from "@/components/LessonNav";
import ReadingProgress from "@/components/ReadingProgress";
import TranslateToggle from "@/components/TranslateToggle";
import MobileNav from "@/components/MobileNav";

export function generateStaticParams() {
  const modules = getModules();
  const allParams: { moduleSlug: string; lessonSlug: string }[] = [];

  for (const mod of modules) {
    const lessons = getLessons(mod.slug);
    for (const lesson of lessons) {
      allParams.push({ moduleSlug: mod.slug, lessonSlug: lesson.slug });
    }
  }

  return allParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = await getLessonContent(moduleSlug, lessonSlug);
  const module = getModuleBySlug(moduleSlug);
  return {
    title: lesson
      ? `${lesson.title} - Module ${module?.number} - AI Visual Mastery`
      : "Lesson Not Found",
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = await getLessonContent(moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const module = getModuleBySlug(moduleSlug);
  if (!module) notFound();

  const lessons = getLessons(moduleSlug);
  const currentIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const gradient = getModuleColor(module.number);

  return (
    <main className="flex-1">
      <ReadingProgress />

      {/* Lesson Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-violet-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/modules" className="hover:text-primary transition-colors">
              Modules
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/modules/${moduleSlug}`}
              className="hover:text-primary transition-colors"
            >
              Module {module.number}
            </Link>
          </div>

          {/* Title area */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0`}
              >
                {lesson.number}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full">
                    Module {module.number}
                  </span>
                  <span className="text-xs text-gray-500">
                    Lesson {currentIndex + 1} of {lessons.length}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight">
                  {lesson.title}
                </h1>
              </div>
            </div>

            {/* Translate toggle */}
            <TranslateToggle />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile lesson nav */}
        <MobileNav
          lessons={lessons}
          moduleSlug={moduleSlug}
          moduleTitle={module.title}
          moduleNumber={module.number}
        />

        <div className="flex gap-6">
          {/* Sidebar */}
          <LessonSidebar
            lessons={lessons}
            moduleSlug={moduleSlug}
            moduleTitle={module.title}
            moduleNumber={module.number}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <article className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm animate-fade-in-up">
              {/* Content */}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: lesson.htmlContent }}
              />

              {/* Navigation */}
              <LessonNav prev={prevLesson} next={nextLesson} />
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
