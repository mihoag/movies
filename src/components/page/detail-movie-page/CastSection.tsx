import React from 'react';
import { Cast } from '../../../type/movie/Cast';
import { Link } from 'react-router-dom';

interface CastSectionProps {
  cast: Cast[];
}

const AVATAR_CAST_BASE_URL = import.meta.env.VITE_AVATAR_CAST_URL;

export const CastSection: React.FC<CastSectionProps> = ({ cast }) => {
  return (
    <div id="cast" className="max-w-[900px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Series Cast</h2>
        <button className="text-sm text-[#01b4e4] font-semibold hover:text-[#032541]">Full Cast</button>
      </div>
      <div className="relative">
        <div className="flex gap-[12px] overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded">
          {cast.map((member) => (
            <Link
              to={`/tmdb-frontend/person/${member.id}`}
              key={member.id}
              className="flex-shrink-0 w-[160px] rounded-[12px] bg-white shadow-[0_2px_8px_rgb(0,0,0,0.1)] 
                       hover:shadow-[0_2px_8px_rgb(0,0,0,0.2)] transition-shadow duration-300"
            >
              <img
                src={`${AVATAR_CAST_BASE_URL}/${member.profile_path}`}
                alt={member.name}
                className="w-[160px] h-[175px] object-cover rounded-[12px]"
              />
              <div className="p-3">
                <h3 className="font-bold text-[1em] leading-tight hover:text-[#01b4e4] cursor-pointer">
                  {member.name}
                </h3>
                <p className="text-[0.9em] text-[#666666] mt-1">{member.character}</p>
              </div>
            </Link>
          ))}
        </div>
        <div
          className="absolute right-0 top-0 bottom-4 w-[60px] pointer-events-none
                      bg-gradient-to-l from-white via-white/70 to-transparent"
        />
      </div>
    </div>
  );
};
