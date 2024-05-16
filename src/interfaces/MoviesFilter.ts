import { MovieType } from './MovieType';

export interface MoviesFilter {
  name: string;
  page: number;
  type?: MovieType;
  year?: number;
}
