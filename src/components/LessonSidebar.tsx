"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { Lesson } from "@/lib/content";

interface Props {
  lessons: Lesson[];
  moduleSlug: string;
  moduleTitle: string;
  moduleNumber: number;
}

export default function LessonSidebar({ lessons, moduleSlug, moduleTitle, moduleNumber }: Props) {
  const pathname = usePathname();
  const activeIdx = lessons.findIndex((l) => pathname === `/modules/${moduleSlug}/${l.slug}`);

  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      <div className="sticky top-16 rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-xs text-muted font-semibold uppercase tracking-wider">Module {moduleNumber}</p>
          <h3 className="text-base font-bold text-white mt-0.5">{moduleTitle}</h3>
          <div className="mt-2.5 h-1 bg-surface-3 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((activeIdx + 1) / lessons.length) * 100}%` }} />
          </div>
          <p className="text-xs text-muted mt-1.5">{activeIdx + 1} / {lessons.length}</p>
        </div>
        <nav className="p-1.5 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {lessons.map((lesson, i) => {
            const href = `/modules/${moduleSlug}/${lesson.slug}`;
            const isActive = pathname === href;
            const isPast = i < activeIdx;

            return (
              <Link key={lesson.slug} href={href}>
                <div className={`flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary font-semibold" : isPast ? "text-muted/60" : "text-muted hover:text-white hover:bg-surface"
                }`}>
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isActive ? "bg-primary text-black" : isPast ? "bg-surface-3 text-muted" : "bg-surface-3 text-muted"
                  }`}>
                    {isPast ? <Check className="w-3.5 h-3.5" /> : lesson.number}
                  </span>
                  <span className="leading-snug">{lesson.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
