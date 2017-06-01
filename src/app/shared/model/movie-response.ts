import { Movie } from './movie';

export interface MovieResponse {
  page: number;
  results: Movie[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}
