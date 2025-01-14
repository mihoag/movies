import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  year: number;
  movieCount: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0 && payload[0].payload) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a2b4b] text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 animate-fade-in">
        <p className="font-medium text-sm">
          {data.year}: {data.movieCount} Movies
        </p>
      </div>
    );
  }
  return null;
};

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
}

const CustomDot: React.FC<DotProps> = ({ cx, cy, payload }) => {
  if (!cx || !cy || !payload || payload.movieCount <= 0) {
    return null;
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="white"
      stroke="#ff4d94"
      strokeWidth={2}
      className="transition-all duration-300 hover:r-6"
    />
  );
};

interface RatingsChartProps {
  data: DataPoint[];
}

const RatingsChart: React.FC<RatingsChartProps> = ({ data }) => {
  return (
    <div className="w-full bg-white">
      <h2 className="text-xl font-bold ml-2 mb-6">Ratings By Year</h2>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d94" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff4d94" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
            <YAxis
              domain={[0, 7]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="movieCount"
              stroke="#ff4d94"
              fillOpacity={1}
              fill="url(#colorRating)"
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: 'white', stroke: '#ff4d94', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingsChart;
