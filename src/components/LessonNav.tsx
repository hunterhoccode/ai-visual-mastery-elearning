import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lesson } from "@/lib/content";

interface LessonNavProps {
  prev: Lesson | null;
  next: Lesson | null;
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-border">
      {prev ? (
        <Link
          href={`/modules/${prev.moduleSlug}/${prev.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-2 transition-colors group text-sm font-semibold text-foreground"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-primary" />
          Previous
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/modules/${next.moduleSlug}/${next.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-200 transition-all text-sm font-semibold"
        >
          Next Lesson
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
