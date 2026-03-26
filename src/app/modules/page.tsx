import { getModules } from "@/lib/content";
import ModuleCard from "@/components/ModuleCard";

export const metadata = {
  title: "All Modules - AI Visual Mastery",
};

export default function ModulesPage() {
  const modules = getModules();

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-foreground">All Modules</h1>
          <p className="text-gray-500 mt-2 text-lg">
            {modules.length} modules &middot;{" "}
            {modules.reduce((sum, m) => sum + m.lessonCount, 0)} lessons
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </div>
    </main>
  );
}
