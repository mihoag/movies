import React from 'react';
import { UserScore } from '../../shared/UserScore';
import { Movie } from '../../../type/movie/Movie';
const base_poster_url = import.meta.env.VITE_IMAGE_MOVIE_POSTER;
const base_backdrop_url = import.meta.env.VITE_IMAGE_MOVIE_BACKDROP;
import DropdownInteraction from '../home-page/dropdown-interaction';
interface ShowHeaderProps {
  movieDetail: Movie;
}

export const ShowHeader: React.FC<ShowHeaderProps> = ({ movieDetail }) => {
  return (
    <div className="min-h-[500px] relative bg-[#DBE2E9]">
      <div className="absolute inset-0">
        <img
          src={`${base_backdrop_url}${movieDetail.backdrop_path}`}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,33,61,0.9)] via-[rgba(20,33,61,0.8)] to-[rgba(20,33,61,0.8)]" />
      </div>
      <div className="max-w-[1300px] mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[300px] overflow-hidden shadow-lg">
            <img
              src={`${base_poster_url}${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="w-full rounded-[12px] h-auto object-cover"
            />
          </div>

          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold">
              {movieDetail.title} <span className="font-normal text-white">({movieDetail.release_date})</span>
            </h1>

            <div className="mt-2 text-md font-semibold">
              {/* <span className="border border-gray-400 px-1 rounded mr-2">TV-MA</span>  */}
              {
                movieDetail.release_date
              } <span className="mx-2"> • </span> {movieDetail.genres.map((genre) => genre.name).join(', ')}
            </div>
            <div className="mt-6 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <UserScore score={Math.round(movieDetail.vote_average * 10)} />

                <span className="text-lg font-semibold mr-2">
                  User <br></br> Score
                </span>
                <DropdownInteraction tmdb_id={movieDetail.tmdbId} />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-2 text-[1.1em] font-normal italic opacity-70">{movieDetail.tagline}</h3>
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="mt-2 text-white font-500px text-justify">{movieDetail.overview}</p>
            </div>
            <div className="grid grid-cols-6 mt-6 gap-6">
              {movieDetail.credits.crew.slice(0, 12).map((person) => (
                <div>
                  <h4 className="text-md font-bold">{person.name}</h4>
                  <p className="text-sm mt-1">{person.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
