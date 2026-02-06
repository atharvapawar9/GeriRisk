export default function SleepTimeline() {
  // Mapped to theme chart colors
  const stages = [
    { type: 'awake', width: '15%', color: 'bg-chart-3', label: 'Awake' }, // Orangeish
    { type: 'light', width: '10%', color: 'bg-chart-4', label: 'Light' }, // Blue/Indigo
    { type: 'deep', width: '20%', color: 'bg-chart-1', label: 'Deep' },   // Greenish
    { type: 'deep_sleep', width: '25%', color: 'bg-chart-2', label: 'Deep Sleep' }, // Primary
    { type: 'rem', width: '10%', color: 'bg-chart-5', label: 'REM' },     // Grey/Red
    { type: 'sleep', width: '10%', color: 'bg-chart-4/80', label: 'Sleep' },
    { type: 'rem', width: '10%', color: 'bg-chart-5/80', label: 'REM' },
  ];

  return (
    <div className="bg-card/60 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground mb-4">Sleep Timeline</h3>
      
      <div className="relative pt-6 pb-2">
        <span className="absolute top-0 left-0 text-xs font-medium text-muted-foreground">12 AM</span>
        
        {/* Timeline Bar */}
        <div className="flex h-12 w-full overflow-hidden rounded-md">
          {stages.map((stage, idx) => (
            <div 
              key={idx} 
              style={{ width: stage.width }} 
              className={`h-full ${stage.color} first:rounded-l-md last:rounded-r-md`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {Array.from(new Set(stages.map(s => s.label))).map((label) => {
                const color = stages.find(s => s.label === label)?.color;
                return (
                    <div key={label} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${color}`}></div>
                        <span className="text-xs font-medium text-muted-foreground">{label}</span>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
