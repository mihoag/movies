import HeaderList from '../header-list';
import MovieCardList from '../movie-card-list';
import { ResponseProfileDTO } from '../../../../type/profile/ResponseProfileDTO';
import { useState } from 'react';
interface WatchingSectionProps {
  profile: ResponseProfileDTO;
}

const WatchlistSection: React.FC<WatchingSectionProps> = ({ profile }) => {
  const [movies, setMovies] = useState(
    profile.watchlist.map((watchlist) => {
      const userRating = profile.ratings.find((rating) => rating.tmdb_id === watchlist.tmdb_id)?.score || null;
      return {
        title: watchlist.title,
        date: watchlist.release_date,
        description: watchlist.overview,
        rating: watchlist.vote_average,
        image: watchlist.poster_path,
        isFavorite: profile.favoriteList.some((watch) => watch.tmdb_id === watchlist.tmdb_id),
        isInWatchlist: profile.watchlist.some((watch) => watch.tmdb_id === watchlist.tmdb_id),
        tmdbId: watchlist.tmdb_id,
        userRating: userRating,
      };
    }),
  );
  const handleRemove = (tmdbId: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.tmdbId !== tmdbId));
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl py-4 mx-4">
        <HeaderList title={'My Watchlist'} totalMovie={movies.length} />
        <div className="space-y-8">
          {movies.map((movie) => (
            <MovieCardList section="watchlist" key={movie.title} {...movie} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistSection;
