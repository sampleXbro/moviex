import { FullState, MoviesState } from '../../common/types/types'
import { useSelector } from 'react-redux'

export const useTopRatedMovies = (): MoviesState =>
  useSelector((state: FullState) => state.topRatedMovies)
