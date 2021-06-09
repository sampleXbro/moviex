import { FullFavoriteMoviesState, MoviesState } from '../../common/types/types'
import { useSelector } from 'react-redux'

export const useFavoriteMovies = (): MoviesState =>
  useSelector((state: FullFavoriteMoviesState) => state.favoriteMovies)
