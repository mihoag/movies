import axiosInstance from './axios';
import { NavigationDto } from '../type/navigation/Navigation';

export const apiNavigationAI = (query: string, threshold?: number): Promise<NavigationDto> =>
  axiosInstance({
    url: '/navigation',
    method: 'get',
    params: { query, threshold },
  });
