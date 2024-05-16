import { MovieType } from './MovieType';

export interface MovieDetails {
  imdbID: string;
  type: MovieType;
  title: string;
  imdbRating: string;
  imdbVotes: string;
  country: string;
  year: string;
  runtime: string;
  posterUrl: string;
  genre: string;
  language: string;
  writer: string;
  actors: string;
  plot: string;
}
