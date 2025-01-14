export interface RequestSearchFilterMovie {
  query: string;
  type: string;
  release_date_begin: string;
  release_date_end: string;
  genres: number[];
  categories: string[];
  trending: string;
  user_score_begin: number;
  user_score_end: number;
  threshold: number;
}
