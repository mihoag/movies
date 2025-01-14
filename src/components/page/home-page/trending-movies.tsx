import TimeWindowButton from './time-window-button';
import { MovieCard } from '../home-page/movie-card';
import ToggleShowMoreButton from './toggle-showmore-button';
import { useState, useEffect } from 'react';
import { apiGetTrendingMovies } from '../../../apis/movieApi';
import { Movie } from '../../../type/movie/Movie';

export function TrendingMovie() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [timeWindowTrending, setTimeWindowTrending] = useState<'day' | 'week'>('day');
  const [visibleMovies, setVisibleMovies] = useState(6);
  const [initialVisibleMovies] = useState(6);
  useEffect(() => {
    const fetchTrendingMovie = async () => {
      //console.log(timeWindowTrending);
      const response = await apiGetTrendingMovies(timeWindowTrending, 0, 20); // Adjust page and size as needed
      const movies = response.data;
      //console.log(movies);
      //console.log(movies);
      const transformedMovies = movies.map((movie) => ({
        ...movie,
        poster_path: movie.poster_path
          ? `${import.meta.env.VITE_IMAGE_MOVIE_TRENDING_CARD}${movie.poster_path}`
          : '/placeholder.svg',
        vote_average: movie.vote_average,
      }));
      setTrendingMovies(transformedMovies);
      setVisibleMovies(initialVisibleMovies);
    };
    fetchTrendingMovie();
  }, [timeWindowTrending]);

  const handleSeeMore = () => {
    setVisibleMovies((prev) => prev + 6);
  };

  const handleSeeLess = () => {
    setVisibleMovies(initialVisibleMovies);
  };

  return (
    <>
      <section className="py-8">
        <div className="container px-10">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-[1.5rem] font-semibold">Trending</h2>
            <div className="relative inline-flex h-[34px] pb-[0.8px] pt-[1.4px] px-[1.3px]  rounded-full  bg-[#042541]/95">
              <div className="flex w-full h-full rounded-full bg-[#FFFF]">
                <TimeWindowButton
                  label="Today"
                  isActive={timeWindowTrending === 'day'}
                  onClick={() => setTimeWindowTrending('day')}
                />
                <TimeWindowButton
                  label="This Week"
                  isActive={timeWindowTrending === 'week'}
                  onClick={() => setTimeWindowTrending('week')}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {trendingMovies.slice(0, visibleMovies).map((movie) => (
              <MovieCard key={movie._id} {...movie} />
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <ToggleShowMoreButton
              isVisible={visibleMovies < trendingMovies.length}
              onClick={handleSeeMore}
              showMore={true}
            />
            <ToggleShowMoreButton
              isVisible={visibleMovies >= trendingMovies.length && visibleMovies > initialVisibleMovies}
              onClick={handleSeeLess}
              showMore={false}
            />
          </div>
        </div>
      </section>
    </>
  );
}
