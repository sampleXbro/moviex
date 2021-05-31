import { MoviesListResponse, MoviesState } from '../../types/types'

export const moviesInitData: MoviesListResponse = {
  dates: { maximum: '', minimum: '' },
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
}

export const initialMoviesState: MoviesState = {
  data: moviesInitData,
  isLoading: false,
}
