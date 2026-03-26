import Link from "next/link";
import { Module, getModuleIconName, getModuleColor } from "@/lib/content";
import ModuleIcon from "./ModuleIcon";
import { BookOpen, ChevronRight } from "lucide-react";

export default function ModuleCard({ module }: { module: Module }) {
  const iconName = getModuleIconName(module.number);
  const gradient = getModuleColor(module.number);

  return (
    <Link href={`/modules/${module.slug}`}>
      <div className="group relative bg-white rounded-2xl border border-border p-6 card-hover overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}
        />
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
        />

        <div className="relative flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0`}
          >
            <ModuleIcon name={iconName} className="w-7 h-7" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-bold text-white bg-primary/80 px-2 py-0.5 rounded-full mb-2">
              Module {module.number}
            </span>
            <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              {module.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full w-fit">
              <BookOpen className="w-3.5 h-3.5" />
              {module.lessonCount} Lessons
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
        </div>
      </div>
    </Link>
  );
}
