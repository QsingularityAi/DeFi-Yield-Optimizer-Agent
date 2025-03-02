
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  color?: string;
  title?: string;
}

const MarketChart = ({ data, color = "#4f46e5", title }: MarketChartProps) => {
  return (
    <div className="w-full h-[300px] p-4 rounded-xl bg-card border shadow-sm">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            stroke="var(--muted-foreground)"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            stroke="var(--muted-foreground)"
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'var(--popover)', 
              border: '1px solid var(--border)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
