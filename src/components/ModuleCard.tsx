"use client";

import { useState } from "react";
import Link from "next/link";
import ModuleIcon from "./ModuleIcon";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Lesson {
  slug: string;
  number: number;
  title: string;
  moduleSlug: string;
}

interface Module {
  slug: string;
  number: number;
  title: string;
  lessonCount: number;
}

const iconNames: Record<number, string> = {
  1: "Layers", 2: "Search", 3: "Zap", 4: "Palette", 5: "Rocket", 6: "Trophy",
  7: "ClipboardList", 8: "Settings", 9: "GitBranch", 10: "Microscope",
  11: "Briefcase", 12: "Target", 13: "Eye", 14: "Package",
};

export default function ModuleCard({ module, lessons }: { module: Module; lessons: Lesson[] }) {
  const [open, setOpen] = useState(false);
  const iconName = iconNames[module.number] || "BookOpen";

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface-2 transition-colors cursor-pointer"
      >
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <ModuleIcon name={iconName} className="w-5.5 h-5.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted font-semibold uppercase tracking-wider">Module {module.number}</p>
          <h3 className="text-[15px] font-bold text-white leading-snug">
            {module.title}
          </h3>
        </div>
        <span className="text-sm font-semibold text-primary shrink-0">{module.lessonCount}</span>
        <ChevronDown className={`w-4 h-4 text-muted transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-border bg-surface/50">
          {lessons.map((lesson) => (
            <Link key={lesson.slug} href={`/modules/${module.slug}/${lesson.slug}`}>
              <div className="group flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors border-b border-border last:border-b-0">
                <span className="w-6 h-6 rounded-md bg-surface-3 text-muted flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-primary group-hover:text-black transition-colors">
                  {lesson.number}
                </span>
                <span className="text-sm text-muted group-hover:text-white transition-colors flex-1">
                  {lesson.title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-border group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
