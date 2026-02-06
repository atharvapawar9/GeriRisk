import { ProcessResponse } from "@/lib/api";

export default function DataTable({ data }: { data: ProcessResponse }) {
  if (!data || !data.aggregates) return null;

  const rows = [
    { label: "Avg Heart Rate", value: `${Math.round(data.aggregates.avgHeartRate)} bpm`, status: "Normal" },
    { label: "Max Heart Rate", value: `${Math.round(data.aggregates.maxHeartRate)} bpm`, status: "High" },
    { label: "Min Heart Rate", value: `${Math.round(data.aggregates.minHeartRate)} bpm`, status: "Low" },
    { label: "Min SpO2", value: `${Math.round(data.aggregates.minSpO2)}%`, status: data.aggregates.minSpO2 < 92 ? "Warning" : "Normal" },
    { label: "Total Steps", value: data.aggregates.totalSteps.toLocaleString(), status: "Good" },
    { label: "Record Count", value: data.aggregates.recordCount.toLocaleString(), status: "Info" },
  ];

  return (
    <div className="bg-card/60 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-muted/30">
            <h3 className="font-semibold text-foreground">Detailed Metrics</h3>
        </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
          <tr>
            <th className="px-6 py-3">Metric</th>
            <th className="px-6 py-3">Value</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">{row.label}</td>
              <td className="px-6 py-4 text-muted-foreground font-mono">{row.value}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold 
                  ${row.status === 'High' || row.status === 'Warning' ? 'bg-amber-500/10 text-amber-700' : 
                    row.status === 'Low' ? 'bg-blue-500/10 text-blue-700' : 
                    'bg-green-500/10 text-green-700'}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
