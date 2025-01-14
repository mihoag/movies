import Image from '../../components/shared/image';
import Button from '../../components/shared/button';
import { Input } from '../../components/forms/input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingMovie } from '../../components/page/home-page/trending-movies';
import { TrailerSection } from '../../components/page/home-page/trailer-movies';
import { PopularMovie } from '../../components/page/home-page/popular-movies';

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/tmdb-frontend/search?query=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <main>
      <section className="relative">
        <Image
          src="https://media.themoviedb.org/t/p/w500_and_h282_face/iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg"
          alt="Hero background"
          width={1920}
          height={600}
          className="object-cover w-full h-[300px] md:h-[360px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#042541] to-[#01b4e4] opacity-85" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-10 py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Welcome.</h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="relative">
              <Input
                className="w-full h-12 pl-6 pr-32 rounded-full text-black text-base"
                placeholder="Search for a movie, tv show, person......"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <Button
                onClick={handleSearch}
                className="absolute right-0 top-0 h-12 px-6 rounded-full bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] hover:from-[#1ed5a9] hover:to-[#01b4e4] text-white font-bold rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        {/* Trending Movies */}
        <TrendingMovie />

        {/* Latest Trailers */}
        <TrailerSection />

        {/* Popular Movies */}
        <PopularMovie />

        <div
          className="absolute right-0 top-0 bottom-4 w-[90px] pointer-events-none
                      bg-gradient-to-l from-white via-white/70 to-transparent"
        />
      </div>
    </main>
  );
};

export default HomePage;
