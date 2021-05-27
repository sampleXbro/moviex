import { moviesInitData } from '../redux/slices/movieSlice'

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

export type MoviesListProps = {
  movies: Array<Movie>
}

type MoviesListResponse = typeof moviesInitData

export type MoviesState = {
  data: {
    nowPlaying: MoviesListResponse
    popular: MoviesListResponse
  }
  isLoading: boolean
}

export type FullState = {
  movies: MoviesState
}
