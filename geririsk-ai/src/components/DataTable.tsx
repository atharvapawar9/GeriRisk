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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-700">Detailed Metrics</h3>
        </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
          <tr>
            <th className="px-6 py-3">Metric</th>
            <th className="px-6 py-3">Value</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{row.label}</td>
              <td className="px-6 py-4 text-gray-600 font-mono">{row.value}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold 
                  ${row.status === 'High' || row.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 
                    row.status === 'Low' ? 'bg-blue-100 text-blue-700' : 
                    'bg-green-100 text-green-700'}`}>
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
