"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Lesson } from "@/lib/content";

interface Props {
  lessons: Lesson[];
  moduleSlug: string;
  moduleTitle: string;
  moduleNumber: number;
}

export default function MobileNav({ lessons, moduleSlug, moduleTitle, moduleNumber }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-primary text-black flex items-center justify-center text-[10px] font-extrabold">{moduleNumber}</span>
          <span className="text-sm font-semibold text-white">{moduleTitle}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-1 rounded-lg border border-border overflow-hidden">
          <nav className="p-1 max-h-72 overflow-y-auto">
            {lessons.map((lesson) => {
              const href = `/modules/${moduleSlug}/${lesson.slug}`;
              const isActive = pathname === href;
              return (
                <Link key={lesson.slug} href={href} onClick={() => setOpen(false)}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted hover:text-white"}`}>
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${isActive ? "bg-primary text-black" : "bg-surface-3 text-muted"}`}>{lesson.number}</span>
                    {lesson.title}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
