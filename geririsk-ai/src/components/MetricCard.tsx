import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
}

export default function MetricCard({ title, value, unit, icon }: MetricCardProps) {
  return (
    <div className="bg-card/60 backdrop-blur-md rounded-lg border border-white/20 shadow-sm p-4 flex items-center justify-between w-full h-full">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground mb-1">{title}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-foreground/70">{unit}</span>
        </div>
      </div>
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
  );
}
