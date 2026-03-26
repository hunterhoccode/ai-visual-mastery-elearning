import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lesson } from "@/lib/content";

export default function LessonNav({ prev, next }: { prev: Lesson | null; next: Lesson | null }) {
  return (
    <div className="flex items-center justify-between gap-3 mt-8 pt-4 border-t border-gray-200">
      {prev ? (
        <Link href={`/modules/${prev.moduleSlug}/${prev.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Previous
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`/modules/${next.moduleSlug}/${next.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-bold hover:bg-black transition-colors">
          Next Lesson <ChevronRight className="w-4 h-4" />
        </Link>
      ) : <div />}
    </div>
  );
}
