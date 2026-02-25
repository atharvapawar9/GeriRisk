export default function SleepTimeline({ data }: { data?: Record<string, number> }) {
  
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 min-h-[160px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-medium">No sleep data available for this timeframe.</p>
      </div>
    );
  }

  // Map real data to stages
  const stages = [
      { type: 'awake', width: `${data.awake || 0}%`, color: 'bg-[#E0E0FF]', label: 'Awake' },
      { type: 'light', width: `${data.light || 0}%`, color: 'bg-[#8C8CFF]', label: 'Light' },
      { type: 'deep', width: `${data.deep || 0}%`, color: 'bg-[#0000C9]', label: 'Deep' },
      { type: 'rem', width: `${data.rem || 0}%`, color: 'bg-[#5353FF]', label: 'REM' },
  ].filter(s => parseFloat(s.width) > 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
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
