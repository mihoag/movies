import { Trailer } from './Trailer';

export interface TrailerWithMovieInfo {
  trailer: Trailer;
  tmdb_id: number;
  title: string;
  poster_path: string;
}
