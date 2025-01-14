import HeaderList from '../header-list';
import MovieCardList from '../movie-card-list';
import { ResponseProfileDTO } from '../../../../type/profile/ResponseProfileDTO';
import { useState } from 'react';
interface FavoriteSectionProps {
  profile: ResponseProfileDTO;
}

const FavoriteSection: React.FC<FavoriteSectionProps> = ({ profile }) => {
  const [movies, setMovies] = useState(
    profile.favoriteList.map((favorite) => {
      const userRating = profile.ratings.find((rating) => rating.tmdb_id === favorite.tmdb_id)?.score || null;
      return {
        title: favorite.title,
        date: favorite.release_date,
        description: favorite.overview,
        rating: favorite.vote_average,
        image: favorite.poster_path,
        isFavorite: true,
        isInWatchlist: profile.watchlist.some((watch) => watch.tmdb_id === favorite.tmdb_id),
        tmdbId: favorite.tmdb_id,
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
        <HeaderList title={'My Favorites'} totalMovie={movies.length} />
        <div className="space-y-8">
          {movies.map((movie) => (
            <MovieCardList key={movie.tmdbId} section="favorite" {...movie} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteSection;
