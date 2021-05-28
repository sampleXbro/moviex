import { useSelector } from 'react-redux'
import {
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
