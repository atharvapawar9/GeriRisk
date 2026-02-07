import { AlertCircle } from "lucide-react";

interface Alert {
  time: string;
  category: string;
  message: string;
  level: string;
}

export default function AlertPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="bg-card/60 backdrop-blur-md rounded-lg border border-white/20 p-6 h-full shadow-sm">
      <h3 className="font-semibold text-foreground mb-6">Alerts</h3>
      


      <div className="space-y-6">
        {alerts.length === 0 ? (
           <div className="text-sm text-muted-foreground py-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              No active alerts
           </div>
        ) : (
            alerts.map((alert, idx) => (
            <div key={idx} className="flex gap-3 items-start">
                <div className={`mt-0.5 shrink-0 ${alert.level === 'Critical' ? 'text-destructive' : 'text-amber-500'}`}>
                    <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                <div className="text-xs font-bold text-foreground flex items-center gap-2">
                    {alert.time} <span className="text-muted-foreground font-normal">· {alert.category}</span>
                </div>
                <p className="text-sm text-foreground/80 mt-1 leading-snug">
                    {alert.message}
                </p>
                </div>
            </div>
            ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-border space-y-3">
        <button className="w-full bg-primary text-primary-foreground text-sm font-medium py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
            Download Risk Report
            <span className="block text-xs font-normal opacity-80">(CSV / PDF)</span>
        </button>
      </div>
    </div>
  );
}
