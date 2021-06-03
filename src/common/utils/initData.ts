import { MoviesListResponse, MoviesState, TokenSession } from '../types/types'

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

export const initialTokenSessionState: TokenSession = {
  token: { success: false, request_token: '', expires_at: '' },
  sessionId: '',
}

export const initialAuthState = {
  token: {
    success: false,
    request_token: '',
    expires_at: '',
  },
  sessionId: '',
  isLoading: false,
  error: null,
}
