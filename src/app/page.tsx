import Link from "next/link";
import { getModules, getLessons } from "@/lib/content";
import ModuleCard from "@/components/ModuleCard";
import { GraduationCap, Zap, Rocket } from "lucide-react";

export default function HomePage() {
  const modules = getModules();
  const totalLessons = modules.reduce((sum, m) => sum + m.lessonCount, 0);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            Free E-Learning Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight max-w-xl uppercase" style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif', letterSpacing: '-0.04em' }}>
            Master AI Visual <span className="text-primary">Creation</span>
          </h1>
          <p className="mt-4 text-muted max-w-lg leading-relaxed text-sm">
            From foundation to mastery — learn professional AI image creation,
            prompt engineering, and creative direction.
          </p>
          <div className="flex items-center gap-6 mt-6 text-sm font-bold">
            <span className="text-white">{modules.length} Modules</span>
            <span className="text-border">|</span>
            <span className="text-white">{totalLessons} Lessons</span>
            <span className="text-border">|</span>
            <span className="text-primary">Free</span>
          </div>
          <Link
            href="/modules"
            className="inline-block mt-6 px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-colors text-sm"
          >
            Start Learning
          </Link>
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wide" style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>Course Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modules.map((m) => (
            <ModuleCard key={m.slug} module={m} lessons={getLessons(m.slug)} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, title: "Structured Learning", desc: "14 modules from foundation to mastery." },
              { icon: <Zap className="w-6 h-6" />, title: "Practical Skills", desc: "Real-world templates and workflows." },
              { icon: <Rocket className="w-6 h-6" />, title: "Career Ready", desc: "Freelancing and monetization guides." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-5 rounded-lg bg-surface border border-border">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{f.title}</h3>
                  <p className="text-sm text-muted mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
