import React from 'react';

interface UserScoreProps {
  score: number;
}

const getRatingColor = (value: number) => {
  if (value >= 70) return '#21d07a';
  if (value >= 40) return '#d2d531';
  return '#db2360';
};

export const UserScore: React.FC<UserScoreProps> = ({ score }) => {
  const percentage = score;
  const circumference = 2 * Math.PI * 25;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[65px] h-[65px] bg-[#081c22] rounded-full">
      <svg className="w-full h-full -rotate-90">
        <circle cx="32.5" cy="32.5" r="26" stroke="#204529" strokeWidth="4" fill="#081c22" />
        <circle
          cx="32.5"
          cy="32.5"
          r="26"
          stroke={getRatingColor(score)}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
        {score}
        <span className="text-xs">%</span>
      </div>
    </div>
  );
};
