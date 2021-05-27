import { useSelector } from 'react-redux'
import { FullState, MoviesState } from '../../types/types'

export const usePlayingMovies = (): MoviesState =>
  useSelector((state: FullState) => state.playingMovies)

export const usePopularMovies = (): MoviesState =>
  useSelector((state: FullState) => state.popularMovies)
