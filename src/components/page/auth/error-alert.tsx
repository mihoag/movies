import React from 'react';

interface AlertBoxProps {
  header: string; // Header message
  children: React.ReactNode; // Child content for the detailed message
}

export const AlertBox: React.FC<AlertBoxProps> = ({ header, children }) => {
  return (
    <div className="w-full my-4 shadow-md rounded-[10px]">
      {/* Red banner with icon and main message */}
      <div className="flex items-center gap-2 bg-[#DC004E] text-white px-6 py-4 rounded-t-[10px]">
        <div className="w-5 h-5 flex items-center justify-center bg-white text-[#DC004E] rounded-full font-bold">!</div>
        <span className="font-sans text-[15px] font-semibold">{header}</span>
      </div>

      {/* Details message with children */}
      <div className="px-6 py-4 bg-white rounded-b-[10px] shadow-sm border border-t-0 border-gray-100">
        <div className="text-[14px] text-gray-900 font-sans">{children}</div>
      </div>
    </div>
  );
};
