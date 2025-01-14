import axiosInstance from './axios';
import { DataPageResponse } from '../type/page/DataPageResponse';
import { Person } from '../type/person/Person';

export const apiGetPersons = (page: number, size: number): Promise<DataPageResponse<Person>> =>
  axiosInstance({
    url: '/persons',
    method: 'get',
    params: { page, size },
  });

export const apiGetPersonById = (id: string): Promise<Person> =>
  axiosInstance({
    url: `/persons/${id}`,
    method: 'get',
  });
