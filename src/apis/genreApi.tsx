import axiosInstance from './axios';
import { Genre } from '../type/movie/Genre';
export const apiGetGenres = (): Promise<Genre[]> =>
  axiosInstance({
    url: '/genres',
    method: 'get',
  });
