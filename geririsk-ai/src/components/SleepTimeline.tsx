export default function SleepTimeline({ data }: { data?: Record<string, number> }) {
  
  // Default fallback if no data
  const defaultStages = [
    { type: 'awake', width: '15%', color: 'bg-[#E0E0FF]', label: 'Awake' }, 
    { type: 'light', width: '35%', color: 'bg-[#8C8CFF]', label: 'Light' }, 
    { type: 'deep', width: '30%', color: 'bg-[#0000C9]', label: 'Deep' },   
    { type: 'rem', width: '20%', color: 'bg-[#5353FF]', label: 'REM' },     
  ];

  // Map real data to stages if available
  let stages = defaultStages;

  if (data && Object.keys(data).length > 0) {
      stages = [
          { type: 'awake', width: `${data.awake || 0}%`, color: 'bg-[#E0E0FF]', label: 'Awake' },
          { type: 'light', width: `${data.light || 0}%`, color: 'bg-[#8C8CFF]', label: 'Light' },
          { type: 'deep', width: `${data.deep || 0}%`, color: 'bg-[#0000C9]', label: 'Deep' },
          { type: 'rem', width: `${data.rem || 0}%`, color: 'bg-[#5353FF]', label: 'REM' },
      ].filter(s => parseFloat(s.width) > 0);
  }

  return (
    <div className="bg-card/60 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground mb-4">Sleep Timeline</h3>
      
      <div className="relative pt-6 pb-2">
        <span className="absolute top-0 left-0 text-xs font-medium text-muted-foreground"></span>
        
        {/* Timeline Bar */}
        <div className="flex h-12 w-full overflow-hidden rounded-md">
          {stages.map((stage, idx) => (
            <div 
              key={idx} 
              style={{ width: stage.width }} 
              className={`h-full ${stage.color} first:rounded-l-md last:rounded-r-md`}
              title={`${stage.label}: ${stage.width}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {stages.map((stage) => (
                <div key={stage.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${stage.color}`}></div>
                    <span className="text-xs font-medium text-muted-foreground">{stage.label} ({stage.width})</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
