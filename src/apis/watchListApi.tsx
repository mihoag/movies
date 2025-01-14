import axiosInstance from './axios';
import { WatchList } from '../type/user-movie/WatchList';
import { ResponseWatchListDTO } from '../type/user-movie/ResponseWatchListDTO';
import { RequestWatchListDTO } from '../type/user-movie/RequestWatchListDTO';

export const apiAddWatchlist = (data: RequestWatchListDTO): Promise<WatchList> =>
  axiosInstance({
    url: '/watchlists',
    method: 'post',
    data,
  });

export const apiGetWatchlistByUser = (): Promise<ResponseWatchListDTO[]> =>
  axiosInstance({
    url: '/watchlists',
    method: 'get',
  });

export const apiRemoveWatchlist = (movieId: number): Promise<void> =>
  axiosInstance({
    url: `/watchlists/${movieId}`,
    method: 'delete',
  });
