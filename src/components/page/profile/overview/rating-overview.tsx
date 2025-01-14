import React, { useState } from 'react';
import { ResponseRatingDTO } from '../../../../type/user-movie/ResponseRatingDTO';

interface RatingOverviewProps {
  ratings: ResponseRatingDTO[];
}

const RatingOverview: React.FC<RatingOverviewProps> = ({ ratings }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  // Count the number of ratings for each score
  const ratingCounts = ratings.reduce(
    (acc, rating) => {
      acc[rating.score] = (acc[rating.score] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  // Create array of all possible ratings 1-10
  const allRatings = Array.from({ length: 10 }, (_, i) => {
    return { rating: i + 1, count: ratingCounts[i + 1] || 0 };
  });

  const totalCount = ratings.length;

  return (
    <div className="w-full">
      <h3 className="text-lg mb-4">Rating Overview</h3>

      <div className="relative">
        <div className="flex items-end h-32 gap-[11px] mb-2">
          {allRatings.map((item) => (
            <div
              key={item.rating}
              className="relative flex-1 group"
              onMouseEnter={() => setHoveredRating(item.rating)}
              onMouseLeave={() => setHoveredRating(null)}
            >
              <div
                className={`w-full transition-all duration-300 ${
                  item.count > 0 ? 'bg-[#E91E63] group-hover:bg-[#FF4081]' : 'bg-transparent'
                }`}
                style={{
                  height: item.count > 0 ? 200 * (item.count / totalCount) + 'px' : '0',
                }}
              />

              {/* Hover tooltip */}
              {hoveredRating === item.rating && item.count > 0 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a2b3b] text-white rounded-[12px] p-3 whitespace-nowrap animate-fadeIn z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl text-[#FFD700]">★</span>
                    <span className="font-semibold">{item.rating}</span>
                  </div>
                  <div className="text-sm opacity-90">{item.count} Ratings</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between px-[6px]">
          {allRatings.map((item) => (
            <div key={item.rating} className="text-sm text-gray-600">
              {item.rating}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
