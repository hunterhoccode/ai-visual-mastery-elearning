import {
  Layers,
  Search,
  Zap,
  Palette,
  Rocket,
  Trophy,
  ClipboardList,
  Settings,
  GitBranch,
  Microscope,
  Briefcase,
  Target,
  Eye,
  Package,
  BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Search,
  Zap,
  Palette,
  Rocket,
  Trophy,
  ClipboardList,
  Settings,
  GitBranch,
  Microscope,
  Briefcase,
  Target,
  Eye,
  Package,
  BookOpen,
};

export default function ModuleIcon({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] || BookOpen;
  return <Icon className={className} />;
}
