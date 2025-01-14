import axiosInstance from './axios';
import { ResponseProfileDTO } from '../type/profile/ResponseProfileDTO';
import { user } from '../type/user/user';

export const apiGetProfile = (): Promise<ResponseProfileDTO> =>
  axiosInstance({
    url: '/profile',
    method: 'get',
  });

export const apiGetUserByAuthorization = (token: string): Promise<user> =>
  axiosInstance({
    url: '/profile/user',
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
