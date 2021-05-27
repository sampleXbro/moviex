import { Effect, takeLatest } from 'redux-saga/effects'
import { getPlayingMoviesSaga, getPopularMoviesSaga } from './moviesSagas'
import { getPlayingMovies } from '../slices/playingMoviesSlice'
import { getPopularMovies } from '../slices/popularMoviesSlice'

export function* rootSaga(): Generator<Effect> {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
  yield takeLatest(getPopularMovies.type, getPopularMoviesSaga)
}
