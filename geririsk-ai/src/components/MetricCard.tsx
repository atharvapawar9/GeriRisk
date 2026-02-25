import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
}

export default function MetricCard({ title, value, unit, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 flex items-center justify-between w-full h-full transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
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
