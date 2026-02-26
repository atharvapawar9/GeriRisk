interface ActivityRingProps {
  steps: number;
  goal: number;
}

export default function ActivityRing({ steps, goal }: ActivityRingProps) {
  const percentage = Math.min(Math.round((steps / goal) * 100), 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const caloriesBurned = Math.round(steps * 0.04);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 flex flex-col items-center justify-center relative w-full h-full min-h-[160px] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div className="absolute top-4 left-4">
        <h3 className="text-sm font-medium text-muted-foreground">Daily Activity</h3>
      </div>
      
      <div className="mt-6 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Background Ring */}
          <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary/20"
            />
            {/* Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="var(--primary)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out drop-shadow-sm"
              style={{ stroke: 'var(--primary, #3b82f6)' }}
            />
          </svg>
          
          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-foreground">{steps.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">/ {goal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center space-y-1">
        <span className="text-sm font-medium text-foreground">{percentage}% of Daily Goal</span>
        <div className="flex items-center justify-center gap-1">
          
          <span className="text-sm font-semibold text-orange-500">{caloriesBurned.toLocaleString()} cal</span>
          <span className="text-xs text-muted-foreground">burned</span>
        </div>
      </div>
    </div>
  );
}
