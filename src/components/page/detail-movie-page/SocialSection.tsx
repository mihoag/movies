import React, { useState, useRef } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Review } from '../../../type/movie/Review';

interface SocialSectionProps {
  reviews: Review[];
}

const AVATAR_REVIEWER_BASE_URL = import.meta.env.VITE_AVATAR_REVIEWER;

export const SocialSection: React.FC<SocialSectionProps> = ({ reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <div className="mt-8">
      <h2 className="text-[1.5em] font-semibold mb-4">Social</h2>
      <div className="border-b border-[#E3E3E3]">
        <div className="flex">
          <button className="px-5 py-3 text-[1em] font-semibold border-b-[3px] border-[#032541] relative">
            Reviews {reviews.length}
          </button>
          <button className="px-5 py-3 text-[1em] font-semibold text-[#666666] hover:text-[#000000]">
            Discussions
          </button>
        </div>
      </div>

      <div
        className={`mt-4 relative overflow-hidden transition-all duration-500 ease-in-out rounded-[12px] ${showAllReviews ? 'max-h-[500px]' : 'max-h-[300px]'}`}
      >
        <div
          ref={contentRef}
          className={`space-y-4 rounded-[12px] ${showAllReviews ? 'overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded' : ''}`}
          style={{ maxHeight: showAllReviews ? '500px' : 'none' }}
        >
          {reviews.map((review) => (
            <div key={review.url} className="bg-white rounded-[12px] border border-[#E3E3E3] p-5">
              <div className="flex items-start gap-4">
                <img
                  src={`${AVATAR_REVIEWER_BASE_URL}/${review.author_details.avatar_path}`}
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[1.1em] font-semibold">A review by {review.author}</h3>
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#032541] text-white rounded">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[0.9em] font-semibold">{(review.author_details?.rating ?? 0) * 10}%</span>
                    </div>
                  </div>
                  <p className="text-[0.9em] text-[#666666] mt-1">
                    Written by <span className="text-[#000000]">{review.author}</span> on {review.created_at}
                  </p>
                  <div className="mt-5 text-[1em] leading-relaxed text-justify text-[#4A4A4A]">{review.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!showAllReviews && reviews.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {reviews.length > 1 && (
        <div className="mt-4 text-center">
          <button
            onClick={toggleReviews}
            className="px-6 py-2 bg-[#032541] text-white text-sm font-semibold rounded-full hover:bg-[#01b4e4] transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            {showAllReviews ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                <span>Read All Reviews</span>
                <ChevronDown className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
