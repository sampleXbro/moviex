export type NextRegFormsProps = {
  setIsLoading: (val: boolean) => void
  maxSteps: number
}

export type ConfirmButtonText = 'Complete' | 'NEXT'

export type FirstRegFormData = {
  login: string
  nickname: string
  email: string
  password: string
  passwordConfirmation: string
  isUploader: boolean
  isAcceptRules: boolean
}

export type SecondRegFormData = {
  age: string
  favFilm: string
} & FirstRegFormData

export type ThirdRegFormData = {
  bilName: string
  taxNumber: string
  bilEmail: string
  bilPhone: string
  zip: string
  country: string
  city: string
} & SecondRegFormData

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type Genre = {
  id: number
  name: string
}

export type MoviesListResponse = {
  dates: { maximum: string; minimum: string }
  page: number
  results: Array<Movie>
  total_pages: number
  total_results: number
}

export type MoviesState = {
  data: MoviesListResponse
  isLoading: boolean
}

export type MoviesListProps = {
  movies: Array<Movie>
}

export type FullState = {
  playingMovies: MoviesState
  popularMovies: MoviesState
}

export type FullFavoriteMoviesState = {
  favoriteMovies: MoviesState
}

export type SingleMovie = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: Array<Genre>
  homepage: string
  id: number
  imdb_id: string | number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: []
  production_countries: []
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: []
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type Video = {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

export type SingleMovieState = {
  data: SingleMovie
  videos: Array<Video>
  isLoading: boolean
}

export type FullSingleMovieState = {
  singleMovie: SingleMovieState
}

export type Token = {
  request_token: string
  expires_at: string
  success: boolean
}

export type LoginData = {
  username: string
  password: string
  request_token: string
}

export type AuthState = {
  token: {
    success: boolean
    request_token: string
    expires_at: string
  }
  sessionId: string
  isLoading: boolean
  error: string | null
}

export type AuthFullState = {
  auth: AuthState
}

export type Paths = Array<{ params: { page: string } }>
