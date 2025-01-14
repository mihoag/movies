import { useNavigate } from 'react-router-dom';
interface MoviePreviewProps {
  title: string;
  description: string;
  rating?: number;
  image?: string;
  style?: React.CSSProperties;
}
interface MoviePreviewProps {
  id: number;
  title: string;
  description: string;
  rating?: number;
  image?: string;
  style?: React.CSSProperties;
}

const MOVIE_PREVIEW_URL = import.meta.env.VITE_MOVIE_PREVIEW;

export default function MoviePreview({ id, title, description, rating, image, style }: MoviePreviewProps) {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => () => {
    navigate(`/tmdb-frontend/movie/${id}`);
  };
  return (
    <div
      className="fixed z-[9999] max-w-[535px] max-h-[170px] bg-[#051829] text-white rounded-[10px] overflow-hidden shadow-xl movie-preview"
      style={style}
    >
      {/* Arrow pointer */}
      <div className="absolute  bottom-0 right-[80px] translate-y-[100%]">
        <div className="w-3 h-3 bg-[#051829] transform rotate-45" />
      </div>

      <div className="flex p-3 gap-4">
        <div className="w-39 h-48 flex-shrink-0">
          <img
            onClick={handleNavigate(id)}
            src={MOVIE_PREVIEW_URL + image || '/placeholder.svg?height=192&width=144'}
            alt={title}
            className="w-[94px] h-[141px]  object-cover rounded-[10px]  cursor-pointer hover:opacity-80 transition-opacity duration-200"
          />
        </div>
        <div className="flex-1 ml-3 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3
              onClick={handleNavigate(id)}
              className="text-2xl font-bold truncate  cursor-pointer hover:text-blue-500"
            >
              {title}
            </h3>
            {rating && (
              <span className="px-2 py-1 bg-[rgb(1,180,228)] text-black rounded-[8px] text-sm text-white font-medium whitespace-nowrap">
                ★ {rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-gray-300 text-sm mb-4 line-clamp-5 text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
}
