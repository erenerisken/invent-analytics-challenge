import { isArray, isNumber } from 'lodash';
import axios from 'axios';
import { MovieType } from '../interfaces/MovieType';
import { MovieSummariesResponse } from '../interfaces/MovieSummariesResponse';

// TODO: Move to environment variables
const moviesUrl = 'http://www.omdbapi.com';
const apiKey = 'a02d83f1';

export const getMovieSummaries = async (
  name: string,
  type?: MovieType,
  year?: number,
): Promise<MovieSummariesResponse> => {
  const params: { [key: string]: string | number } = {
    s: name,
    apikey: apiKey,
  };
  if (type) {
    params.type = type;
  }
  if (isNumber(year)) {
    params.y = year;
  }

  const response = await axios.get(moviesUrl, { params });
  if (!isArray(response.data?.Search)) {
    throw new Error(
      'Invalid response from the API: Search field is not an array',
    );
  }

  return {
    summaries: response.data.Search.map((m: any) => ({
      title: m.Title,
      year: parseInt(m.Year, 10),
      imdbID: m.imdbID,
      type: m.Type,
      posterUrl: m.Poster,
    })),
    totalResults: parseInt(response.data.totalResults, 10),
  };
};
