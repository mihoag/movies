import { Movie } from '../../../type/movie/Movie';
import { Link } from 'react-router-dom';
const IMAGE_MOVIE_POSTER = import.meta.env.VITE_IMAGE_MOVIE_POSTER;
const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_MOVIE_POSTER}/${movie.poster_path}`
    : 'https://via.placeholder.com/500';

  return (
    <div className="flex flex-col sm:flex-row mb-[20px] rounded-[10px] shadow-md overflow-hidden bg-white">
      <div className="w-full sm:w-[94px] h-[141px] sm:h-auto flex-shrink-0">
        <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col p-4 sm:p-3 flex-grow">
        <h2 className="mb-1">
          <Link
            to={`/tmdb-frontend/movie/${movie.id}`}
            className="text-[1.1em] sm:text-[1.2em] font-bold leading-[1.1] text-black no-underline hover:text-[#01b4e4]"
          >
            {movie.title}
          </Link>
        </h2>
        <p className="mb-[10px] text-[0.9em] sm:text-[1em] text-[#999]">{movie.release_date}</p>
        <p className="text-[0.9em] sm:text-[1em] leading-[1.4] text-justify text-[#4d4d4d]">
          {movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview}
        </p>
      </div>
    </div>
  );
};
export default MovieCard;
