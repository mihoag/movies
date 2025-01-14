import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import MovieCard from '../../components/page/search-page/MovieCard';
import Spinner from '../../components/shared/spinner';
import FilterPanel from '../../components/page/search-page/MovieFilters';
import { SearchBar } from '../../components/page/search-page/SearchBar';
import { RequestSearchFilterMovie } from '../../type/search/RequestSearch&FilterMovie.tsx';
import { apiSearchAndFilterMovie } from '../../apis/searchApi.tsx';
import { SearchedFilteredMovie } from '../../type/search/Searched&FilteredMovie.tsx';

type SearchResults = {
  results: SearchedFilteredMovie[];
  total_pages: number;
  page: number;
} | null;

const searchOptions = [
  { label: 'Movie Name', value: 'movieName' },
  { label: 'Actor Name', value: 'actorName' },
  { label: 'Natural Query', value: 'naturalQuery' },
];

type SearchPageProps = object;

const SearchPage: React.FC<SearchPageProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<SearchResults>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const comboboxRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState('movieName');
  const [naturalQueryValue, setNaturalQueryValue] = useState(50);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [rangeValues, setRangeValues] = useState<[number, number]>([0.0, 10.0]);
  const [selectedTrending, setSelectedTrending] = useState<string>('');

  useEffect(() => {
    const queryValue = searchParams.get('query');
    if (queryValue) {
      setSearchTerm(queryValue);
      handleSearch(queryValue);
    }
  }, [searchParams]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [fromDate, toDate, selectedGenres, selectedCategories, rangeValues, selectedTrending]);

  const handleSearch = async (term: string, page: number = 0, size: number = 6) => {
    const searchValue = term.trim() || searchTerm.trim();
    setLoading(true);
    try {
      const request: RequestSearchFilterMovie = {
        query: searchValue,
        type: selectedOption,
        release_date_begin: fromDate || '0000-01-01',
        release_date_end: toDate || '9999-12-31',
        genres: selectedGenres,
        categories: selectedCategories,
        trending: selectedTrending,
        user_score_begin: rangeValues[0] || 0.0,
        user_score_end: rangeValues[1] || 10.0,
        threshold: naturalQueryValue / 100 || 0.5,
      };
      //console.log(request);
      const response = await apiSearchAndFilterMovie(request, page, size);
      //console.log(response);
      if (response) {
        setResults({
          results: response.data,
          total_pages: response.totalPages,
          page: response.page,
        });
      } else {
        setResults(null);
      }
    } catch (error) {
      console.error('Error when searching and filtering', error);
    } finally {
      setLoading(false);
    }
  };

  function handlePageChange(page: number) {
    handleSearch(searchTerm, page);
  }

  const currentResults = results;

  return (
    <div className="flex flex-col h-auto">
      {/* Search Bar with Combobox */}
      <div className="relative border-b border-[#d7d7d7]" ref={comboboxRef}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          threshold={naturalQueryValue}
          setThreshold={setNaturalQueryValue}
          onSearch={handleSearch}
          searchOptions={searchOptions}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row mt-5 px-5 min-h-[180vh]">
        {/* Filter */}
        <FilterPanel
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedTrending={selectedTrending}
          setSelectedTrending={setSelectedTrending}
          rangeValues={rangeValues}
          setRangeValues={setRangeValues}
        />

        {/* Search Results */}
        <div className="flex-1 mx-2">
          {loading ? (
            <Spinner loading={true} alignStyle="flex justify-center items-center h-screen" />
          ) : currentResults?.results && currentResults.results.length > 0 ? (
            currentResults.results.map((movie: SearchedFilteredMovie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="text-center text-gray-500">No movies found.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center my-4">
            {currentResults && currentResults.total_pages > 1 && (
              <Pagination
                count={currentResults.total_pages}
                page={currentResults.page}
                variant="outlined"
                onChange={(_, value) => handlePageChange(value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
