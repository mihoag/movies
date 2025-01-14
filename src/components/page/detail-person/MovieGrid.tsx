import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Movie {
  id: number;
  title: string;
  posterPath: string;
  year: string;
}

interface MovieGridProps {
  movies: Movie[];
}

const truncateName = (name: string, maxLength: number) => {
  return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
};

const BASE_URL = import.meta.env.VITE_MOVIE_ACTOR;

export function MovieGrid({ movies }: MovieGridProps) {
  const [maxWidth, setMaxWidth] = useState(870);
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const delta = prevWidth - currentWidth;
      console.log(delta);
      const newWidth = Math.max(870 - delta, 320); // Ensure a minimum width of 320px
      setMaxWidth(newWidth);
      setPrevWidth(currentWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the correct width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (id: number) => () => {
    navigate(`/tmdb-frontend/movie/${id}`);
  };

  return (
    <section style={{ maxWidth: `${maxWidth}px` }}>
      <h2 className="text-xl font-semibold my-3">Known for</h2>
      <div className="relative">
        <div className="flex gap-[12px] overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded">
          {movies.map((movie) => (
            <div onClick={handleNavigate(movie.id)} key={movie.id} className="flex-shrink-0 w-[130px]">
              <img
                src={BASE_URL + movie.posterPath}
                alt={movie.title}
                className="h-[195px] object-cover rounded-[10px] shadow-sm cursor-pointer hover:opacity-80 transition-opacity duration-200"
              />
              <h3 className="text-sm font-medium cursor-pointer hover:text-blue-500">
                {truncateName(movie.title, 20)}
              </h3>
            </div>
          ))}
        </div>
        <div
          className="absolute right-0 top-0 bottom-4 w-[60px] pointer-events-none
                      bg-gradient-to-l from-white via-white/70 to-transparent"
        />
      </div>
    </section>
  );
}
