import { Effect, takeLatest } from 'redux-saga/effects'
import { loginSaga, authRequest } from '../features/authPage'
import {
  getPlayingMoviesSaga,
  getPlayingMovies,
} from '../features/nowPlayingPage'
import { getPopularMoviesSaga, getPopularMovies } from '../features/popularPage'
import { getMovieSaga, getMovie } from '../features/singleMoviePage'
import {
  changeFavoritesSaga,
  getFavoriteMoviesSaga,
  getFavoriteMovies,
  changeFavorites,
} from '../features/favoriteMoviesPage'

export function* rootSaga(): Generator<Effect> {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
  yield takeLatest(getPopularMovies.type, getPopularMoviesSaga)
  yield takeLatest(getMovie.type, getMovieSaga)
  yield takeLatest(authRequest.type, loginSaga)
  yield takeLatest(getFavoriteMovies.type, getFavoriteMoviesSaga)
  yield takeLatest(changeFavorites.type, changeFavoritesSaga)
}
