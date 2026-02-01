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
        return "bg-red-50 border-red-200 text-red-900";
      case "Moderate":
        return "bg-amber-50 border-amber-200 text-amber-900";
      default:
        return "bg-blue-50 border-blue-200 text-[#0000c9]";
    }
  };

  const getBadgeColors = () => {
    switch (level) {
      case "High":
        return "bg-[#d32f2f] text-white";
      case "Moderate":
        return "bg-[#f59e0b] text-white"; // Fixed amber color
      default:
        return "bg-[#a8bcff] text-[#0000c9]";
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
    <div className={`rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${getColors()}`}>
      <div className="flex items-center gap-2 mb-4 opacity-80">
        {getIcon()}
        <span className="font-semibold text-sm uppercase tracking-wider">{label}</span>
      </div>

      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-5xl font-bold tracking-tighter">{score}%</span>
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${getBadgeColors()}`}>
          {level}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm font-medium opacity-90 border-t border-current/10 pt-3">
        <span>{events} Events Today <span className="opacity-50 ml-1">{events}</span></span>
      </div>
      
      <p className="mt-2 text-xs opacity-70">
        {subtext}
      </p>
    </div>
  );
}
