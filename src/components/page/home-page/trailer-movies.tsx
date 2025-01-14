import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrailerCard } from './trailer-card';
import { trailerTabs } from '../../../data/tabs';
import { trailerMovies } from '../../../data/trailer-movies';
import { apiGetLastTrailersByCategories } from '../../../apis/movieApi';
import { TrailerWithMovieInfo } from '../../../type/movie/TrailerWithMovieInfo';
import { showError } from '../../../util/ErrorToastifyRender';

const MOVIE_TRAILER = import.meta.env.VITE_MOVIE_TRAILER;

export function TrailerSection() {
  const [activeTrailerTab, setActiveTrailerTab] = useState(trailerTabs[0].id);
  const [hoveredImage, setHoveredImage] = useState<string | null>(trailerMovies[0].image);
  const [trailers, setTrailers] = useState<TrailerWithMovieInfo[]>([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await apiGetLastTrailersByCategories(activeTrailerTab, 1, 20);
        setTrailers(response.data);
        setHoveredImage(response.data[0].poster_path ? MOVIE_TRAILER + response.data[0].poster_path : null);
      } catch (error) {
        console.error(error);
        showError('Failed to fetch trailers');
      }
    };
    fetchTrailers();
  }, [activeTrailerTab]);

  return (
    <section
      className="py-8 relative"
      style={{
        backgroundImage: hoveredImage
          ? `url(${hoveredImage}), linear-gradient(to right, rgba(4, 37, 65, 0.7), rgba(80, 83, 83, 0.7))`
          : `linear-gradient(to right, rgba(4, 37, 65, 0.7), rgba(1, 180, 228, 0.7))`,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay', // Ensures the gradient and image blend together nicely
        backdropFilter: 'blur(10px)', // Apply blur effect
        WebkitBackdropFilter: 'blur(10px)', // For Safari support
      }}
    >
      <div className="container px-4 md:px-10 mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 mb-6">
          <h2 className="text-2xl font-bold text-white">Latest Trailers</h2>
          <div className="relative inline-flex md:h-[34px] rounded-full bg-opacity-0 rounded-full border-[1px] border-[#c0fecf]/95">
            <div className="flex w-full h-full rounded-full ">
              {trailerTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTrailerTab(tab.id)}
                  className={`relative z-10 px-4 py-1 text-sm font-medium transition-colors duration-300 rounded-full whitespace-nowrap ${
                    activeTrailerTab === tab.id ? 'text-[#042541]' : 'text-white hover:text-white/80'
                  }`}
                >
                  {activeTrailerTab === tab.id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#c0fecf] to-[#1ed5a9] rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded pb-6 gap-4 no-scrollbar">
          {trailers.map((trailer, i) => (
            <TrailerCard
              key={i}
              {...trailer}
              onHover={() => {
                setHoveredImage(trailer.poster_path ? MOVIE_TRAILER + trailer.poster_path : null);
              }}
              onLeave={() => setHoveredImage(trailers[0].poster_path ? MOVIE_TRAILER + trailers[0].poster_path : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
