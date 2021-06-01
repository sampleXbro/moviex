import { useSelector } from 'react-redux'
import {
  AuthFullState,
  AuthState,
  FullFavoriteMoviesState,
  FullSingleMovieState,
  FullState,
  MoviesState,
  SingleMovieState,
} from '../../types/types'

export const usePlayingMovies = (): MoviesState =>
  useSelector((state: FullState) => state.playingMovies)

export const usePopularMovies = (): MoviesState =>
  useSelector((state: FullState) => state.popularMovies)

export const useMovie = (): SingleMovieState =>
  useSelector((state: FullSingleMovieState) => state.singleMovie)

export const useAuth = (): AuthState =>
  useSelector((state: AuthFullState) => state.auth)

export const useFavoriteMovies = (): MoviesState =>
  useSelector((state: FullFavoriteMoviesState) => state.favoriteMovies)
