import { MovieType } from './MovieType';

export interface MovieSummary {
  title: string;
  year: number;
  imdbID: string;
  type: MovieType;
  posterUrl: string;
}
