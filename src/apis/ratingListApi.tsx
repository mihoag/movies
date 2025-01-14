import axiosInstance from './axios';
import { Rating } from '../type/user-movie/Rating';
import { ResponseRatingDTO } from '../type/user-movie/ResponseRatingDTO';
import { RequestRatingDTO } from '../type/user-movie/RequestRatingDTO';

export const apiAddRating = (data: RequestRatingDTO): Promise<Rating> =>
  axiosInstance({
    url: '/ratings',
    method: 'post',
    data,
  });

export const apiGetRatingsByUser = (): Promise<ResponseRatingDTO[]> =>
  axiosInstance({
    url: '/ratings',
    method: 'get',
  });

export const apiDeleteRating = (movieId: number): Promise<void> =>
  axiosInstance({
    url: `/ratings/${movieId}`,
    method: 'delete',
  });

export const apiUpdateRating = (data: RequestRatingDTO): Promise<void> =>
  axiosInstance({
    url: '/ratings',
    method: 'put',
    data,
  });
