"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface SparklinePoint {
  time: string;
  value: number;
}

interface SparklineChartProps {
  data: SparklinePoint[];
  dataKey: string;
  color: string;
  label: string;
  unit?: string;
}

export default function SparklineChart({ data, dataKey, color, label, unit = "" }: SparklineChartProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{label}</h3>
      <div className="flex-1 w-full min-h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${label.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} 
              interval="preserveStartEnd"
            />
            <YAxis 
              hide={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              domain={['auto', 'auto']}
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: 'var(--radius)', 
                border: '1px solid var(--border)', 
                boxShadow: 'var(--shadow-sm)',
                backgroundColor: 'var(--card)',
                color: 'var(--card-foreground)'
              }}
              itemStyle={{ color: color, fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--muted-foreground)', fontSize: '10px' }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${Math.round(Number(value))}${unit}`, label]}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2} 
              fillOpacity={1} 
              fill={`url(#gradient-${label.replace(/[^a-zA-Z0-9]/g, '')})`} 
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
