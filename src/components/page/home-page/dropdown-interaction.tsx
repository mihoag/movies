import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@radix-ui/react-dropdown-menu';
import { StarRating } from './star-rating';
import { MoreHorizontal, Heart, Bookmark, Star } from 'lucide-react';
import { apiGetProfile } from '../../../apis/profileApi';
import { ResponseProfileDTO } from '../../../type/profile/ResponseProfileDTO';
import { useState } from 'react';
import { RequestFavoriteListDTO } from '../../../type/user-movie/RequestFavoriteListDTO';
import { apiRemoveFavoriteList, apiAddFavoriteList } from '../../../apis/favoriteListApi';
import { showError } from '../../../util/ErrorToastifyRender';
import { showSuccess } from '../../../util/SuccessToastifyRender';
import { apiAddWatchlist, apiRemoveWatchlist } from '../../../apis/watchListApi';
import { RequestRatingDTO } from '../../../type/user-movie/RequestRatingDTO';
import { apiAddRating, apiUpdateRating } from '../../../apis/ratingListApi';

interface DropdownInteractionProps {
  tmdb_id: number;
}

export default function DropdownInteraction({ tmdb_id }: DropdownInteractionProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      try {
        const profileData: ResponseProfileDTO = await apiGetProfile();
        const favorite = profileData.favoriteList.some((item) => item.tmdb_id === tmdb_id);
        const watchlist = profileData.watchlist.some((item) => item.tmdb_id === tmdb_id);
        const rated = profileData.ratings.find((item) => item.tmdb_id === tmdb_id);

        setIsFavorite(favorite);
        setIsInWatchlist(watchlist);
        console.log(rated);
        setRating(rated ? rated.score : null);
      } catch (error) {
        //showError('Failed to fetch profile data');
        console.error('Failed to fetch profile data:', error);
      }
    }
  };

  const handleRating = async (newRating: number) => {
    try {
      const ratingData: RequestRatingDTO = {
        tmdb_id: tmdb_id,
        score: newRating,
      };
      if (rating !== null) {
        await apiUpdateRating(ratingData);
        showSuccess('Rating updated');
      } else {
        await apiAddRating(ratingData);
        showSuccess('Rating added');
      }
      setRating(newRating);
    } catch (error) {
      showError('Failed to update rating');
      console.error('Failed to update rating:', error);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await apiRemoveFavoriteList(tmdb_id);
        setIsFavorite(false);
        showSuccess('Removed from favorite list');
      } else {
        const favoriteData: RequestFavoriteListDTO = {
          tmdb_id: tmdb_id,
        };
        await apiAddFavoriteList(favoriteData);
        setIsFavorite(true);
        showSuccess('Added to favorite list');
      }
    } catch (error) {
      showError('Failed to update favorite list');
      console.error('Failed to update favorite list:', error);
    }
  };

  const handleWatchlistClick = async () => {
    try {
      if (isInWatchlist) {
        await apiRemoveWatchlist(tmdb_id);
        setIsInWatchlist(false);
        showSuccess('Removed from watchlist');
      } else {
        const watchlistData = {
          tmdb_id: tmdb_id,
        };
        await apiAddWatchlist(watchlistData);
        setIsInWatchlist(true);
        showSuccess('Added to watchlist');
      }
    } catch (error) {
      showError('Failed to update watchlist');
      console.error('Failed to update watchlist:', error);
    }
  };

  return (
    <DropdownMenu modal={false} onOpenChange={(open) => handleOpenChange(open)}>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 z-1000 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={5}
        className="w-40 z-[1100] bg-white shadow-lg rounded-[10px] p-2 border-gray-200 bottom-2"
      >
        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 flex my-1" onClick={handleFavoriteClick}>
          <Heart className={`mr-2 mt-1 h-4 w-4 cursor-pointer ${isFavorite ? 'text-pink-500' : ''}`} />
          <span>Favorite</span>
        </DropdownMenuItem>
        <hr />
        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 flex my-1" onClick={handleWatchlistClick}>
          <Bookmark className={`mr-2 mt-1 h-4 w-4 cursor-pointer ${isInWatchlist ? 'text-pink-500' : ''}`} />
          <span>Watchlist</span>
        </DropdownMenuItem>
        <hr />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-gray-700 hover:bg-gray-100 flex my-1">
            <Star className="mr-2 mt-1 h-4 w-4" />
            <span>Your rating</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="mt-4 bg-white z-[1000] border-gray-200 rounded-[10px]">
              <StarRating onRate={handleRating} initialRating={rating ? rating / 2 : 0} />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
