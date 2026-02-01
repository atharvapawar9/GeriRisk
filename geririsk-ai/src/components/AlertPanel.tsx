import { AlertCircle } from "lucide-react";

interface Alert {
  time: string;
  category: string;
  message: string;
  level: string;
}

export default function AlertPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-6">Alerts</h3>
      
      <div className="flex gap-2 mb-6 text-xs font-medium text-gray-500 border-b border-gray-100 pb-2">
        <span className="bg-gray-100 text-gray-900 px-2 py-1 rounded">Last 24h</span>
        <span className="px-2 py-1">7 days</span>
        <span className="px-2 py-1">30 d</span>
      </div>

      <div className="space-y-6">
        {alerts.length === 0 ? (
           <div className="text-sm text-gray-400 py-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              No active alerts
           </div>
        ) : (
            alerts.map((alert, idx) => (
            <div key={idx} className="flex gap-3 items-start">
                <div className={`mt-0.5 shrink-0 ${alert.level === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>
                    <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                <div className="text-xs font-bold text-gray-900 flex items-center gap-2">
                    {alert.time} <span className="text-gray-400 font-normal">· {alert.category}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1 leading-snug">
                    {alert.message}
                </p>
                </div>
            </div>
            ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
        <button className="w-full bg-[#3b82f6] text-white text-sm font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            Download Risk Report
            <span className="block text-xs font-normal opacity-80">(CSV / PDF)</span>
        </button>
        <button className="w-full bg-[#3b82f6] text-white text-sm font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            Download Processed Data
        </button>
      </div>
    </div>
  );
}
