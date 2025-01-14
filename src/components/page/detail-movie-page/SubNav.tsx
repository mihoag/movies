import React from 'react';
import { ChevronDown } from 'lucide-react';

export const SubNav: React.FC = () => {
  return (
    <div className="border-b">
      <div className="max-w-[1300px] mx-auto px-4">
        <nav className="flex gap-8 overflow-x-auto">
          {['Overview', 'Media', 'Fandom', 'Share'].map((item) => (
            <button
              key={item}
              className="flex items-center gap-1 px-2 py-4 text-sm font-semibold hover:text-gray-600 relative group whitespace-nowrap"
            >
              {item}
              <ChevronDown className="w-4 h-4" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#032541] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
