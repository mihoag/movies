import { useState, useEffect } from 'react';
import MoviePreview from './MoviePreview';
import { MovieCast } from '../../../type/person/MovieCast';

interface FilmographyProps {
  movieCast: MovieCast[];
}

export const Filmography: React.FC<FilmographyProps> = ({ movieCast }) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<{ entry: MovieCast; position: { x: number; y: number } } | null>(
    null,
  );
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const sortedMovieCast = [...movieCast].sort((a, b) => {
    const dateA = new Date(a.release_date).getTime();
    const dateB = new Date(b.release_date).getTime();
    return dateB - dateA;
  });

  const handleCircleClick = (entry: MovieCast, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    if (selectedEntry?.entry.title === entry.title) {
      setSelectedEntry(null);
    } else {
      setSelectedEntry({
        entry,
        position: {
          x: rect.left,
          y: rect.top,
        },
      });
    }
  };

  // Close preview when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (selectedEntry) {
        setSelectedEntry(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedEntry]);

  // Close preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedEntry && !(event.target as Element).closest('.movie-preview')) {
        setSelectedEntry(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedEntry]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedMovieCast = sortedMovieCast.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Acting</h2>
      </div>
      <div className="overflow-x-auto border rounded-[10px] shadow-lg">
        <div className="relative">
          <table className="w-full">
            <tbody>
              {paginatedMovieCast.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 transition-colors duration-200 hover:bg-blue-50/50"
                  onMouseEnter={() => setHoveredRow(`${index}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="py-4 pr-4 whitespace-nowrap font-medium text-[15px] w-24">
                    <div className="flex items-center ml-4">
                      <span className="text-gray-900 mr-6">{entry.release_date.substring(0, 4)}</span>
                      <button onClick={(e) => handleCircleClick(entry, e)} className="relative group">
                        <div
                          className={`w-[18px] h-[18px] rounded-full border-2 transition-colors
                            ${selectedEntry?.entry.title === entry.title ? 'border-blue-600' : 'border-gray-400'}
                          `}
                        />
                        <div
                          className={`absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 
                            rounded-full transition-opacity
                            ${
                              selectedEntry?.entry.title === entry.title
                                ? 'bg-blue-600 opacity-100'
                                : hoveredRow === `${index}`
                                  ? 'bg-gray-400 opacity-100'
                                  : 'opacity-0'
                            }
                          `}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 pr-6">
                    <div
                      className={`font-medium text-[15px] transition-colors cursor-pointer
                        ${hoveredTitle === `${index}` ? 'text-blue-600' : 'text-gray-900'}
                      `}
                      onMouseEnter={() => setHoveredTitle(`${index}`)}
                      onMouseLeave={() => setHoveredTitle(null)}
                    >
                      {entry.title}
                    </div>
                    <div className="text-[13px] ml-3 text-gray-500 mt-0.5">as {entry.character || 'Unknown'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(sortedMovieCast.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {selectedEntry && (
        <MoviePreview
          id={selectedEntry.entry.id}
          title={selectedEntry.entry.title}
          description={selectedEntry.entry.overview || ''}
          rating={selectedEntry.entry.vote_average}
          image={selectedEntry.entry.poster_path}
          style={{
            top: `${selectedEntry.position.y - 190}px`,
            left: `${selectedEntry.position.x - 250}px`,
          }}
        />
      )}
    </section>
  );
};
