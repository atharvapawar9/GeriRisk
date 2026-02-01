"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

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
      <h3 className="text-sm font-medium text-gray-700 mb-4">{label}</h3>
      <div className="flex-1 w-full min-h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }} 
              interval="preserveStartEnd"
            />
            <YAxis 
              hide={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              domain={['auto', 'auto']}
              width={30}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: color, fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#6b7280', fontSize: '10px' }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${Math.round(Number(value))}${unit}`, label]}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              fill="url(#gradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
