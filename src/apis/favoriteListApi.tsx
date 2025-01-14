import axiosInstance from './axios';
import { FavoriteList } from '../type/user-movie/FavoriteList';
import { ResponseFavoriteListDTO } from '../type/user-movie/ResponseFavoriteListDTO';
import { RequestFavoriteListDTO } from '../type/user-movie/RequestFavoriteListDTO';

export const apiAddFavoriteList = (data: RequestFavoriteListDTO): Promise<FavoriteList> =>
  axiosInstance({
    url: '/favoritelists',
    method: 'post',
    data,
  });

export const apiGetFavoriteListByUser = (): Promise<ResponseFavoriteListDTO[]> =>
  axiosInstance({
    url: '/favoritelists',
    method: 'get',
  });

export const apiRemoveFavoriteList = (movieId: number): Promise<void> =>
  axiosInstance({
    url: `/favoritelists/${movieId}`,
    method: 'delete',
  });
