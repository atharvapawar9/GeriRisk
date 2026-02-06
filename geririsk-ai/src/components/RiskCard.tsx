import { Activity, AlertTriangle, Moon } from "lucide-react";

interface RiskCardProps {
  type: "cardiac" | "fall" | "respiratory";
  score: number;
  level: "High" | "Moderate" | "Low";
  events?: number;
  label: string;
  subtext: string;
}

export default function RiskCard({ type, score, level, events, label, subtext }: RiskCardProps) {
  const getColors = () => {
    switch (level) {
      case "High":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      case "Moderate":
        return "bg-amber-500/10 border-amber-500/20 text-amber-600";
      default:
        return "bg-primary/5 border-primary/10 text-primary";
    }
  };

  const getBadgeColors = () => {
    switch (level) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Moderate":
        return "bg-amber-500 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "cardiac":
        return <Activity className="h-5 w-5" />;
      case "fall":
        return <AlertTriangle className="h-5 w-5" />;
      case "respiratory":
        return <Moon className="h-5 w-5" />;
    }
  };

  return (
    <div className={`rounded-lg border p-6 shadow-sm transition-all hover:shadow-md backdrop-blur-md border-white/20 ${getColors()}`}>
      <div className="flex items-center gap-2 mb-4 opacity-90">
        {getIcon()}
        <span className="font-semibold text-sm uppercase tracking-wider">{label}</span>
      </div>

      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-5xl font-bold tracking-tighter">{score}%</span>
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${getBadgeColors()}`}>
          {level}
        </span>
      </div>


      
      <p className="mt-2 text-xs opacity-70">
        {subtext}
      </p>
    </div>
  );
}
