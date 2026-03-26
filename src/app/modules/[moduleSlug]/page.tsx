import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getModules,
  getModuleBySlug,
  getLessons,
  getModuleIconName,
  getModuleColor,
} from "@/lib/content";
import ModuleIcon from "@/components/ModuleIcon";
import { ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return getModules().map((m) => ({ moduleSlug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const module = getModuleBySlug(moduleSlug);
  return {
    title: module
      ? `Module ${module.number}: ${module.title} - AI Visual Mastery`
      : "Module Not Found",
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const module = getModuleBySlug(moduleSlug);
  if (!module) notFound();

  const lessons = getLessons(moduleSlug);
  const iconName = getModuleIconName(module.number);
  const gradient = getModuleColor(module.number);

  return (
    <main className="flex-1">
      {/* Module Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-200/30 to-transparent rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/modules"
              className="hover:text-primary transition-colors"
            >
              Modules
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">
              Module {module.number}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
            >
              <ModuleIcon name={iconName} className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Module {module.number}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mt-1">
                {module.title}
              </h1>
              <p className="text-gray-500 mt-1">
                {module.lessonCount} lessons
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/modules/${moduleSlug}/${lesson.slug}`}
            >
              <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-border hover:shadow-lg hover:shadow-violet-50 hover:border-violet-200 transition-all">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}
                >
                  {lesson.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
