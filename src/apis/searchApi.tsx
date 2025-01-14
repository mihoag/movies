import axiosInstance from './axios';
import { DataPageResponse } from '../type/page/DataPageResponse';
import { SearchedFilteredMovie } from '../type/search/Searched&FilteredMovie.tsx';
import { RequestSearchFilterMovie } from '../type/search/RequestSearch&FilterMovie.tsx';

export const apiSearchAndFilterMovie = (
  data: RequestSearchFilterMovie,
  page: number,
  size: number,
): Promise<DataPageResponse<SearchedFilteredMovie>> =>
  axiosInstance({
    url: '/search/movie',
    method: 'post',
    data,
    params: { page, size },
  });
