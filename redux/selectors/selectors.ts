import { useSelector } from 'react-redux'
import { FullState, MoviesState } from '../../types/types'

export const useMovies = (): MoviesState =>
  useSelector((state: FullState) => state.movies)
