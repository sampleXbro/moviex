import { Effect, takeLatest } from 'redux-saga/effects'
import {
  getPlayingMoviesSaga,
  getPopularMoviesSaga,
  getMovieSaga,
} from './moviesSagas'
import { getPlayingMovies } from '../slices/playingMoviesSlice'
import { getPopularMovies } from '../slices/popularMoviesSlice'
import { getMovie } from '../slices/singleMovieSlice'

export function* rootSaga(): Generator<Effect> {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
  yield takeLatest(getPopularMovies.type, getPopularMoviesSaga)
  yield takeLatest(getMovie.type, getMovieSaga)
}
