import { useState, useEffect } from 'react';
import { MovieCard } from '../home-page/movie-card';
import { apiGetCategoriesMovies } from '../../../apis/movieApi';
import { Movie } from '../../../type/movie/Movie';

export function PopularMovie() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await apiGetCategoriesMovies('popular', 1, 20); // Adjust page and size as needed
      setPopularMovies(response.data);
    };
    fetchPopularMovies();
  }, []);

  return (
    <>
      <section className="py-8">
        <div className="container px-4 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 mb-6">
            <h2 className="text-[1.5rem] font-semibold">Popular Movies</h2>
          </div>
          <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded pb-6 gap-4 no-scrollbar">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
