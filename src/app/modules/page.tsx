import { getModules, getLessons } from "@/lib/content";
import ModuleCard from "@/components/ModuleCard";

export const metadata = { title: "All Modules - AI Visual Mastery" };

export default function ModulesPage() {
  const modules = getModules();

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-lg font-bold text-white uppercase tracking-wide">All Modules</h1>
        <p className="text-xs text-muted mt-1 mb-6">
          {modules.length} modules &middot; {modules.reduce((s, m) => s + m.lessonCount, 0)} lessons
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modules.map((m) => (
            <ModuleCard key={m.slug} module={m} lessons={getLessons(m.slug)} />
          ))}
        </div>
      </div>
    </main>
  );
}
