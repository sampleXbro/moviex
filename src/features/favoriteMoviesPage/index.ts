import {
  getFavoriteMoviesSaga,
  changeFavoritesSaga,
} from './favoritesMoviesSagas'
import { useFavoriteMovies } from './selectors'
import reducer, {
  getFavoriteMovies,
  setFavoriteMovies,
  changeFavorites,
} from './favoriteMoviesSlice'

export {
  reducer,
  getFavoriteMoviesSaga,
  changeFavoritesSaga,
  getFavoriteMovies,
  setFavoriteMovies,
  changeFavorites,
  useFavoriteMovies,
}
