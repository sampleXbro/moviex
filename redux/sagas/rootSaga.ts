import { takeLatest } from 'redux-saga/effects'
import { getPlayingMoviesSaga, getPopularMoviesSaga } from './moviesSagas'
import { getPlayingMovies, getPopularMovies } from '../slices/movieSlice'

export function* rootSaga() {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
  yield takeLatest(getPopularMovies.type, getPopularMoviesSaga)
}
