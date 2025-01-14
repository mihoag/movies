import { ResponseWatchListDTO } from '../user-movie/ResponseWatchListDTO';
import { ResponseFavoriteListDTO } from '../user-movie/ResponseFavoriteListDTO';
import { ResponseRatingDTO } from '../user-movie/ResponseRatingDTO';

export interface ResponseProfileDTO {
  userId: string;
  username: string;
  email: string;
  profile: string;
  createdAt: string;
  watchlist: ResponseWatchListDTO[];
  favoriteList: ResponseFavoriteListDTO[];
  ratings: ResponseRatingDTO[];
}
