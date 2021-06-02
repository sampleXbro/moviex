import { Effect, takeLatest } from 'redux-saga/effects'
import {
  getPlayingMoviesSaga,
  getPopularMoviesSaga,
  getMovieSaga,
  getFavoriteMoviesSaga,
} from './moviesSagas'
import { getPlayingMovies } from '../slices/playingMoviesSlice'
import { getPopularMovies } from '../slices/popularMoviesSlice'
import { getMovie } from '../slices/singleMovieSlice'
import { authRequest } from '../slices/authSlice'
import { loginSaga } from './authSagas'
import { getFavoriteMovies } from '../slices/favoriteMoviesSlice'

export function* rootSaga(): Generator<Effect> {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
  yield takeLatest(getPopularMovies.type, getPopularMoviesSaga)
  yield takeLatest(getMovie.type, getMovieSaga)
  yield takeLatest(authRequest.type, loginSaga)
  yield takeLatest(getFavoriteMovies.type, getFavoriteMoviesSaga)
}
