import { ProcessResponse } from "@/lib/api";

export default function DataTable({ data }: { data: ProcessResponse }) {
  if (!data || !data.aggregates) return null;

  const { avgHeartRate, maxHeartRate, minHeartRate, minSpO2, totalSteps, recordCount } = data.aggregates;

  const getHeartRateStatus = (bpm: number, type: 'avg' | 'min' | 'max') => {
    if (type === 'max' && bpm > 110) return 'High';
    if (type === 'min' && bpm < 45) return 'Low';
    if (type === 'avg') {
      if (bpm > 100) return 'High';
      if (bpm < 60) return 'Low';
    }
    return 'Normal';
  };

  const getSpO2Status = (value: number) => {
    if (value < 90) return 'Warning';
    if (value < 95) return 'Low';
    return 'Normal';
  };

  const getStepsStatus = (steps: number) => {
    if (steps > 10000) return 'Excellent';
    if (steps > 7000) return 'Good';
    if (steps > 4000) return 'Fair';
    return 'Low';
  };

  const rows = [
    { label: "Avg Heart Rate", value: `${Math.round(avgHeartRate)} bpm`, status: getHeartRateStatus(avgHeartRate, 'avg') },
    { label: "Max Heart Rate", value: `${Math.round(maxHeartRate)} bpm`, status: getHeartRateStatus(maxHeartRate, 'max') },
    { label: "Min Heart Rate", value: `${Math.round(minHeartRate)} bpm`, status: getHeartRateStatus(minHeartRate, 'min') },
    { label: "Min SpO2", value: `${Math.round(minSpO2)}%`, status: getSpO2Status(minSpO2) },
    { label: "Total Steps", value: totalSteps.toLocaleString(), status: getStepsStatus(totalSteps) },
    { label: "Record Count", value: recordCount.toLocaleString(), status: "Info" },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-white/5">
            <h3 className="font-semibold text-foreground">Detailed Metrics</h3>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {rows.map((row, idx) => (
          <div key={idx} className="bg-white/10 rounded-lg py-8 px-6 flex flex-col items-start justify-center text-left space-y-4 hover:bg-white/15 transition-all duration-300 border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
            <span className="text-3xl font-bold text-foreground tracking-tight">{row.value}</span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold 
              ${row.status === 'High' || row.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 
                row.status === 'Low' ? 'bg-blue-500/10 text-blue-500' : 
                'bg-green-500/10 text-green-500'}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
