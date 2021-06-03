import { Effect, takeLatest } from 'redux-saga/effects'
import { getFavoriteMoviesSaga } from '../features/favoriteMoviesPage'
import { getPlayingMovies } from '../features/nowPlayingPage'
import { getPopularMovies } from '../features/popularPage'
import { getMovie } from '../features/singleMoviePage'
import { authRequest } from '../features/authPage'
import { loginSaga } from '../features/authPage'
import { getFavoriteMovies } from '../features/favoriteMoviesPage'
import { getPlayingMoviesSaga } from '../features/nowPlayingPage'
import { getPopularMoviesSaga } from '../features/popularPage'
import { getMovieSaga } from '../features/singleMoviePage'

export function* rootSaga(): Generator<Effect> {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
  yield takeLatest(getPopularMovies.type, getPopularMoviesSaga)
  yield takeLatest(getMovie.type, getMovieSaga)
  yield takeLatest(authRequest.type, loginSaga)
  yield takeLatest(getFavoriteMovies.type, getFavoriteMoviesSaga)
}
