import Link from "next/link";
import { getModules } from "@/lib/content";
import ModuleCard from "@/components/ModuleCard";
import { GraduationCap, Zap, Rocket } from "lucide-react";

export default function HomePage() {
  const modules = getModules();
  const totalLessons = modules.reduce((sum, m) => sum + m.lessonCount, 0);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-purple-300/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-primary rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Free E-Learning Platform
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              Master{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                AI Visual
              </span>{" "}
              Creation
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From foundation to mastery — learn professional AI image creation,
              prompt engineering, and creative direction with our comprehensive
              studio suite course.
            </p>

            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary">{modules.length}</p>
                <p className="text-sm text-gray-500 mt-1">Modules</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary">{totalLessons}</p>
                <p className="text-sm text-gray-500 mt-1">Lessons</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary">Free</p>
                <p className="text-sm text-gray-500 mt-1">Forever</p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/modules"
                className="inline-block px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-violet-200 transition-all hover:-translate-y-0.5 text-lg"
              >
                Start Learning Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-foreground">Course Modules</h2>
          <p className="text-gray-500 mt-3 text-lg">Progress through our structured learning path</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-b from-surface to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <GraduationCap className="w-8 h-8" />, title: "Structured Learning", desc: "14 modules from foundation to mastery, each building on the previous." },
              { icon: <Zap className="w-8 h-8" />, title: "Practical Skills", desc: "Real-world prompt templates, workflows, and professional techniques." },
              { icon: <Rocket className="w-8 h-8" />, title: "Career Ready", desc: "Business strategies, freelancing guides, and monetization blueprints." },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-8 bg-white rounded-2xl border border-border card-hover">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mt-5">{feature.title}</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
