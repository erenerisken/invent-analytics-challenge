import { MovieSummary } from './MovieSummary';

export interface MovieSummariesResponse {
  summaries: MovieSummary[];
  totalResults: number;
}
