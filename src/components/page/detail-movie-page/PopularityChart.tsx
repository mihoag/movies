import React from 'react';

export const PopularityChart: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-[1em] font-semibold mb-2 text-[#000000]">Popularity Trend</h3>
      <div className="relative w-full h-[40px] mb-4">
        <svg className="w-full h-full" viewBox="0 0 300 40" preserveAspectRatio="none">
          <path
            d="M0 35 C50 30, 100 25, 150 15 S250 5, 300 2"
            fill="none"
            stroke="#B5E2E6"
            strokeWidth="2"
            className="popularity-line"
          />
        </svg>
      </div>
    </div>
  );
};
