import { FullState, MoviesState } from '../../common/types/types'
import { useSelector } from 'react-redux'

export const usePopularMovies = (): MoviesState =>
  useSelector((state: FullState) => state.popularMovies)
