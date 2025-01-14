export interface DataPageResponse<T> {
  page: number;
  totalResults: number;
  totalPages: number;
  perPage: number;
  data: T[];
}
