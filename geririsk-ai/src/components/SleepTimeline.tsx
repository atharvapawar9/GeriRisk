export default function SleepTimeline() {
  // Mock sleep stages for visual parity
  const stages = [
    { type: 'awake', width: '15%', color: 'bg-orange-200', label: 'Awake' },
    { type: 'light', width: '10%', color: 'bg-amber-300', label: 'Light' },
    { type: 'deep', width: '20%', color: 'bg-cyan-300', label: 'Deep' },
    { type: 'deep_sleep', width: '25%', color: 'bg-blue-600', label: 'Deep Sleep' },
    { type: 'rem', width: '10%', color: 'bg-indigo-500', label: 'REM' },
    { type: 'sleep', width: '10%', color: 'bg-indigo-300', label: 'Sleep' },
    { type: 'rem', width: '10%', color: 'bg-indigo-800', label: 'REM' },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Sleep Timeline</h3>
      
      <div className="relative pt-6 pb-2">
        <span className="absolute top-0 left-0 text-xs font-medium text-gray-500">12 AM</span>
        
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
                        <span className="text-xs font-medium text-gray-600">{label}</span>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
