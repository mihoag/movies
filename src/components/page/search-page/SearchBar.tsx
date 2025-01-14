import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  threshold: number;
  setThreshold: (value: number) => void;
  onSearch: (term: string) => void;
  searchOptions: { label: string; value: string }[];
}

export function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedOption,
  setSelectedOption,
  threshold,
  setThreshold,
  onSearch,
  searchOptions,
}: SearchBarProps) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const getDisplayOptionLabel = () => {
    if (selectedOption === 'movieName') {
      return 'Movie Name';
    } else if (selectedOption === 'actorName') {
      return 'Actor Name';
    } else if (selectedOption === 'naturalQuery') {
      return 'Natural Query';
    } else {
      return selectedOption; // Mặc định, hiển thị giá trị của selectedOption
    }
  };

  return (
    <>
      <div className="relative flex h-[46px] items-center">
        <Search className="absolute left-[14px] h-[20px] w-[20px] text-[#666666]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="h-full w-full border-none bg-white pl-[40px] pr-[120px] text-[16px] text-black placeholder-[#666] outline-none"
          placeholder="Search for a movie, tv show, person..."
        />
        {searchTerm && (
          <button
            className="absolute right-[100px] p-[4px] hover:text-[#01b4e4]"
            onClick={() => {
              setSearchTerm('');
            }}
          >
            <X className="h-[22px] w-[22px] text-[#666666]" />
          </button>
        )}
        <div className="absolute right-[10px]" ref={optionsRef}>
          <button
            className="flex h-[30px] items-center rounded bg-[#01b4e4] px-[10px] text-[14px] font-semibold text-white hover:bg-[#0093c4]"
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          >
            {getDisplayOptionLabel()}
            <ChevronDown className="ml-[6px] h-[16px] w-[16px]" />
          </button>
          {isOptionsOpen && (
            <div className="absolute right-0 top-[34px] z-50 w-[200px] rounded-[4px] border border-[#e3e3e3] bg-white shadow-lg">
              {searchOptions.map((option) => (
                <div
                  key={option.value}
                  className="cursor-pointer px-[20px] py-[10px] text-[14px] text-[#000] hover:bg-[#f7f7f7]"
                  onClick={() => {
                    setSelectedOption(option.value);
                    setIsOptionsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedOption === 'naturalQuery' && (
        <div className="mt-4 mb-6 flex justify-center">
          <label htmlFor="natural-query-slider" className="block text-sm font-medium text-gray-700 mb-2 mr-4">
            Threshold: {threshold}%
          </label>
          <Slider.Root
            id="natural-query-slider"
            className="relative flex items-center select-none w-full max-w-md h-6"
            min={0}
            max={100}
            step={1}
            value={[threshold]}
            onValueChange={(value) => setThreshold(value[0])}
          >
            {/* Track */}
            <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full">
              <Slider.Range className="absolute h-full bg-green-500 rounded-full" />
            </Slider.Track>

            {/* Thumb */}
            <Slider.Thumb className="block w-5 h-5 bg-green-500 rounded-full shadow-md focus:outline-none focus:ring focus:ring-green-300 hover:bg-green-600" />
          </Slider.Root>
        </div>
      )}
    </>
  );
}
