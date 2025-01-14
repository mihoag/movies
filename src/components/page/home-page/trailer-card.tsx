import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DropdownInteraction from './dropdown-interaction';
import { Trailer } from '../../../type/movie/Trailer';

const MOVIE_TRAILER = import.meta.env.VITE_MOVIE_TRAILER;

function TrailerCard({
  tmdb_id,
  title,
  trailer,
  poster_path,
  onHover,
  onLeave,
}: {
  tmdb_id: number;
  title: string;
  trailer: Trailer;
  poster_path: string;
  onHover: () => void;
  onLeave: () => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tmdb-frontend/movie/${tmdb_id}`);
  };
  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };
  return (
    <motion.div className="flex-none w-[300px] rounded-[10px] group" onHoverStart={onHover} onHoverEnd={onLeave}>
      <div className="relative aspect-video rounded-[10px] overflow-auto ">
        <img
          src={MOVIE_TRAILER + poster_path}
          alt={title}
          className="relative z-10 w-full h-full object-cover rounded-[10px]"
        />
        <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
            <Play onClick={handleClick} className="w-8 h-8 text-white fill-white cursor-pointer" />
          </div>
        </div>
        <div className="absolute top-2 right-2 z-30">
          <DropdownInteraction tmdb_id={tmdb_id} />
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-white font-medium">{truncateName(trailer.name, 20)}</h3>
        <p className="text-white/80 text-sm">{title}</p>
      </div>
    </motion.div>
  );
}
export { TrailerCard };
