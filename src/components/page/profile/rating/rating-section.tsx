import HeaderList from '../header-list';
import MovieCardList from '../movie-card-list';
import RatingsChart from './rating-chart';
import { ResponseProfileDTO } from '../../../../type/profile/ResponseProfileDTO';
import { useState } from 'react';
interface RatingSectionProps {
  profile: ResponseProfileDTO;
}

interface DataPoint {
  year: number;
  movieCount: number;
}

const RatingSection: React.FC<RatingSectionProps> = ({ profile }) => {
  const [movies, setMovies] = useState(
    profile.ratings.map((movieRating) => {
      return {
        title: movieRating.title,
        date: movieRating.release_date,
        description: movieRating.overview,
        rating: movieRating.vote_average,
        image: movieRating.poster_path,
        isFavorite: profile.favoriteList.some((watch) => watch.tmdb_id === movieRating.tmdb_id),
        isInWatchlist: profile.watchlist.some((watch) => watch.tmdb_id === movieRating.tmdb_id),
        tmdbId: movieRating.tmdb_id,
        userRating: movieRating.score,
        ratedAt: new Date(movieRating.rated_at).getFullYear(),
      };
    }),
  );

  const handleRemove = (tmdbId: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.tmdbId !== tmdbId));
  };

  const ratingsByYear: Record<any, number> = movies.reduce(
    (acc, movie) => {
      const year = movie.ratedAt;
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year]++;
      return acc;
    },
    {} as { [year: number]: number },
  );

  const dataPoints: DataPoint[] = Object.keys(ratingsByYear).map((year) => ({
    year: parseInt(year, 10),
    movieCount: ratingsByYear[year],
  }));

  //console.log(dataPoints);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl py-4 mx-4">
        <RatingsChart data={dataPoints} />
        <HeaderList title={'Ratings'} totalMovie={movies.length} />
        <div className="space-y-8">
          {movies.map((movie) => (
            <MovieCardList section="rating" key={movie.tmdbId} {...movie} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
