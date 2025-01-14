import React from 'react';

interface AlertBoxProps {
  header: string; // Header message
  children: React.ReactNode; // Child content for the detailed message
}

export const InfoAlert: React.FC<AlertBoxProps> = ({ header, children }) => {
  return (
    <div className="w-full bg-[#01b4e4] text-white py-8 mb-8">
      <div className="max-w-[1200px] mx-auto px-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">{header}</h2>
        {children}
      </div>
    </div>
  );
};
