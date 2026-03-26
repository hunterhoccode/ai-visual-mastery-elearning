import Link from "next/link";
import { notFound } from "next/navigation";
import { getModules, getModuleBySlug, getLessons, getModuleIconName } from "@/lib/content";
import ModuleIcon from "@/components/ModuleIcon";
import { ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return getModules().map((m) => ({ moduleSlug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const mod = getModuleBySlug(moduleSlug);
  return { title: mod ? `Module ${mod.number}: ${mod.title}` : "Not Found" };
}

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) notFound();

  const lessons = getLessons(moduleSlug);
  const iconName = getModuleIconName(mod.number);

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-1.5 text-[10px] text-muted mb-6 uppercase tracking-wider font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/modules" className="hover:text-primary transition-colors">Modules</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">Module {mod.number}</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <ModuleIcon name={iconName} className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted font-semibold uppercase tracking-wider">Module {mod.number}</p>
            <h1 className="text-xl font-bold text-white">{mod.title}</h1>
          </div>
          <span className="ml-auto text-xs text-muted">{mod.lessonCount} lessons</span>
        </div>

        <div className="space-y-1">
          {lessons.map((lesson) => (
            <Link key={lesson.slug} href={`/modules/${moduleSlug}/${lesson.slug}`}>
              <div className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary/30 hover:bg-surface transition-colors">
                <span className="w-7 h-7 rounded-md bg-primary text-black flex items-center justify-center text-xs font-extrabold shrink-0">
                  {lesson.number}
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors flex-1">
                  {lesson.title}
                </span>
                <ChevronRight className="w-4 h-4 text-border group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
