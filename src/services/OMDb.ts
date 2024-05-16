import { isNumber } from 'lodash';
import axios from 'axios';
import { MovieSummariesResponse } from '../interfaces/MovieSummariesResponse';
import { MoviesFilter } from '../interfaces/MoviesFilter';
import { MovieDetails } from '../interfaces/MovieDetails';

const moviesUrl = 'http://www.omdbapi.com';
const apiKey = 'a02d83f1';

export const getMovieSummaries = async (
  filters: MoviesFilter,
): Promise<MovieSummariesResponse> => {
  const params: { [key: string]: string | number } = {
    s: filters.name,
    page: filters.page + 1,
    apikey: apiKey,
  };
  if (filters.type) {
    params.type = filters.type;
  }
  if (isNumber(filters.year)) {
    params.y = filters.year;
  }

  const response = await axios.get(moviesUrl, { params });

  return {
    summaries: (response.data?.Search ?? []).map((m: any) => ({
      title: m.Title,
      year: parseInt(m.Year, 10),
      imdbID: m.imdbID,
      type: m.Type,
      posterUrl: m.Poster,
    })),
    totalResults: response.data?.totalResults
      ? parseInt(response.data.totalResults, 10)
      : 0,
  };
};

export const getMovieDetails = async (
  imdbID: string,
): Promise<MovieDetails> => {
  const response = await axios.get(moviesUrl, {
    params: { i: imdbID, plot: 'full', apikey: apiKey },
  });

  if (!response.data?.Response || response.data.Response === 'False') {
    throw new Error(`Movie with IMDb ID '${imdbID}' not found!`);
  }

  return {
    imdbID,
    type: response.data.Type,
    title: response.data.Title,
    imdbRating: response.data.imdbRating,
    imdbVotes: response.data.imdbVotes,
    country: response.data.Country,
    year: response.data.Year,
    runtime: response.data.Runtime,
    posterUrl: response.data.Poster,
    genre: response.data.Genre,
    language: response.data.Language,
    writer: response.data.Writer,
    actors: response.data.Actors,
    plot: response.data.Plot,
  };
};
