import {
  FullSingleMovieState,
  SingleMovieState,
} from '../../common/types/types'
import { useSelector } from 'react-redux'

export const useMovie = (): SingleMovieState =>
  useSelector((state: FullSingleMovieState) => state.singleMovie)
