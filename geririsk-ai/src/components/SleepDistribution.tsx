import React from 'react';

interface SleepDistributionProps {
  breakdown?: Record<string, number>;
}

export default function SleepDistribution({ breakdown }: SleepDistributionProps) {
  if (!breakdown || Object.keys(breakdown).length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 w-full h-full min-h-[160px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No sleep stage data available.</p>
      </div>
    );
  }

  // Define colors and logical ordering for sleep stages
  const stageConfig: Record<string, { label: string; color: string }> = {
    awake: { label: "Awake", color: "bg-red-400" },
    rem: { label: "REM", color: "bg-purple-400" },
    light: { label: "Light", color: "bg-blue-300" },
    deep: { label: "Deep", color: "bg-indigo-600" },
  };

  const order = ['deep', 'light', 'rem', 'awake'];
  const stages = Object.entries(breakdown)
    .sort((a, b) => order.indexOf(a[0].toLowerCase()) - order.indexOf(b[0].toLowerCase()))
    .map(([key, value]) => ({
      key,
      value,
      config: stageConfig[key.toLowerCase()] || { label: key, color: 'bg-primary' }
    }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 flex flex-col w-full h-full min-h-[160px]">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Sleep Breakdown</h3>
      
      {/* Stacked Progress Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex mb-6 shadow-inner bg-secondary/20">
        {stages.map(({ key, value, config }) => (
          <div
            key={key}
            style={{ width: `${value}%` }}
            className={`h-full ${config.color} transition-all duration-500`}
            title={`${config.label}: ${value}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-auto">
        {stages.map(({ key, value, config }) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${config.color} shadow-sm`}></span>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground leading-none">{config.label}</span>
              <span className="text-sm font-medium text-foreground leading-none mt-1">{value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
