import React from 'react';
import { languages } from '../../../data/language';
import { Movie } from '../../../type/movie/Movie';

interface FactsSidebarProps {
  detailMovie: Movie;
}

const formatterMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2, // Ensures two decimal places
  maximumFractionDigits: 2,
});

export const FactsSidebar: React.FC<FactsSidebarProps> = ({ detailMovie }) => {
  console.log(detailMovie.keywords);
  return (
    <div className="w-full lg:w-[300px] p-0 space-y-6">
      <div className="facts-section space-y-4">
        <h2 className="text-[1.1em] font-semibold">Facts</h2>
        <div className="space-y-4">
          <div className="fact-item">
            <h3 className="text-[1em] font-semibold text-[#000000]">Status</h3>
            <p className="text-[1em] text-[#000000] mt-0.5">{detailMovie.status}</p>
          </div>

          <div className="fact-item">
            <h3 className="text-[1em] font-semibold text-[#000000]">Original Language</h3>
            <p className="text-[1em] text-[#000000] mt-0.5">
              {languages[detailMovie.original_language as keyof typeof languages]}
            </p>
          </div>
          <div className="fact-item">
            <h3 className="text-[1em] font-semibold text-[#000000]">Budget</h3>
            <p className="text-[1em] text-[#000000] mt-0.5">{formatterMoney.format(detailMovie.budget)}</p>
          </div>
          <div className="fact-item">
            <h3 className="text-[1em] font-semibold text-[#000000]">Revenue</h3>
            <p className="text-[1em] text-[#000000] mt-0.5">{formatterMoney.format(detailMovie.revenue)}</p>
          </div>
        </div>
      </div>

      <div className="keywords-section mt-6">
        <h3 className="text-[1em] font-semibold mb-2 text-[#000000]">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {detailMovie.keywords.map((keyword) => (
            <span
              key={keyword.id}
              className="px-2 py-1 bg-[#E5E5E5] text-[#000000] text-[0.9em] rounded-[4px] 
                       hover:bg-[#D7D7D7] cursor-pointer transition-colors duration-200"
            >
              {keyword.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
