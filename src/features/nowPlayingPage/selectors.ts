import { FullState, MoviesState } from '../../common/types/types'
import { useSelector } from 'react-redux'

export const usePlayingMovies = (): MoviesState =>
  useSelector((state: FullState) => state.playingMovies)
