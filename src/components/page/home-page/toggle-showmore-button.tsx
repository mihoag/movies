import Button from '../../shared/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ToggleShowMoreButtonProps {
  isVisible: boolean;
  onClick: () => void;
  showMore: boolean;
}

const ToggleShowMoreButton: React.FC<ToggleShowMoreButtonProps> = ({ isVisible, onClick, showMore }) => {
  if (!isVisible) return null;

  return (
    <Button
      onClick={onClick}
      className="flex items-center bg-tmdb-primary hover:bg-tmdb-secondary text-white px-6 py-2 rounded-full"
    >
      {showMore ? 'Show More' : 'Show Less'}
      {showMore ? <ChevronDown className="ml-2 w-4 h-4" /> : <ChevronUp className="ml-2 w-4 h-4" />}
    </Button>
  );
};
export default ToggleShowMoreButton;
