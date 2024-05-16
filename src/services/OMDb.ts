import { isNumber } from 'lodash';
import axios from 'axios';
import { MovieSummariesResponse } from '../interfaces/MovieSummariesResponse';
import { MoviesFilter } from '../interfaces/MoviesFilter';

// TODO: Move to environment variables
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
