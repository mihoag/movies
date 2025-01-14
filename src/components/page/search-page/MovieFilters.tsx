import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { apiGetGenres } from '../../../apis/genreApi';
import { Genre } from '../../../type/movie/Genre';

import Button from '../../shared/button';

type FilterPanelProps = {
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTrending: string;
  setSelectedTrending: React.Dispatch<React.SetStateAction<string>>;
  rangeValues: [number, number];
  setRangeValues: React.Dispatch<React.SetStateAction<[number, number]>>;
};

export default function FilterPanel({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedGenres,
  setSelectedGenres,
  selectedCategories,
  setSelectedCategories,
  selectedTrending,
  setSelectedTrending,
  rangeValues,
  setRangeValues,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await apiGetGenres();
        setGenres(data);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };
  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId) ? prevGenres.filter((id) => id !== genreId) : [...prevGenres, genreId],
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category) ? prevCategories.filter((c) => c !== category) : [...prevCategories, category],
    );
  };

  const handleTrendingChange = (trending: string) => {
    setSelectedTrending((prevTrending) => (prevTrending === trending ? '' : trending));
  };

  const trendings = [
    { label: 'This Week', value: 'week' },
    { label: 'Today', value: 'day' },
  ];

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Now Playing', value: 'now_playing' },
  ];

  return (
    <div className="relative w-full max-w-[250px] mb-4">
      <Button
        className="w-full h-12 flex justify-between items-center p-4 rounded-[8px] border border-gray-200 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg  font-semibold text-dark">Filters</span>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="h-5 w-5" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 right-0 mt-1 rounded-[8px] shadow-lg z-50 max-h-[170vh]  border border-gray-200 shadow-sm bg-[#fff]"
          >
            <div className="p-4 space-y-6">
              {/* Release Dates Section */}
              <div className="space-y-3">
                <h3 className="text-base font-normal text-gray-500">Release Dates</h3>
                <div className="space-y-2">
                  <div className="grid gap-3">
                    <div className="relative flex align-center justify-between">
                      <p className="text-sm font-normal text-gray-500">From</p>
                      <input
                        type="date"
                        id="datePicker"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        className="ml-5 px-2 w-full h-8 pr-10 text-sm border rounded-[8px]"
                      />
                    </div>
                    <div className="relative flex align-center justify-between">
                      <p className="text-sm font-normal text-gray-500">To</p>
                      <input
                        type="date"
                        id="datePicker"
                        value={toDate}
                        onChange={handleToDateChange}
                        className="ml-5 px-2 w-full h-8 pr-10 text-sm border rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
              {/* Genres Section */}
              <div className="space-y-3">
                <h3 className="text-base font-normal text-gray-500">Genres</h3>
                {isLoading ? (
                  <p className="text-gray-500">Loading genres...</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreToggle(genre.id)}
                        className={`px-3 py-1 text-sm border rounded-full ${
                          selectedGenres.includes(genre.id) ? 'bg-blue-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <hr />
              {/* Categories Section */}
              <div className="space-y-3">
                <h3 className="text-base font-normal text-gray-500">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryToggle(category.value)}
                      className={`px-3 py-1 border rounded-full ${
                        selectedCategories.includes(category.value) ? 'bg-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <hr />
              {/* Trending Section */}
              <div className="space-y-3">
                <h3 className="text-base font-normal text-gray-500">Trending</h3>
                <div className="flex flex-wrap gap-2">
                  {trendings.map((trending) => (
                    <button
                      key={trending.value}
                      onClick={() => handleTrendingChange(trending.value)}
                      className={`px-3 py-1 text-sm border rounded-full ${
                        selectedTrending === trending.value ? 'bg-blue-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      {trending.label}
                    </button>
                  ))}
                </div>
              </div>
              <hr />
              {/* User Score Section */}
              <div className="space p-2">
                <h3 className="text-base font-normal text-gray-500 mb-5">User Score</h3>
                <p className="text-sm font-300 text-gray-500 mb-5">
                  Selected Range: {rangeValues[0]} - {rangeValues[1]}
                </p>
                <Slider.Root
                  className="relative flex items-center select-none w-full max-w-md h-6"
                  min={0}
                  max={10}
                  step={1}
                  value={rangeValues}
                  onValueChange={(values) => setRangeValues([values[0], values[1]])}
                >
                  {/* Track */}
                  <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full">
                    <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
                  </Slider.Track>

                  {/* Thumbs */}
                  <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-600" />
                  <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-600" />
                </Slider.Root>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
