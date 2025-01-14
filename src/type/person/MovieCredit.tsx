import { MovieCast } from './MovieCast';
import { MovieCrew } from './MovieCrew';

export interface MovieCredit {
  cast: MovieCast[];
  crew: MovieCrew[];
}
