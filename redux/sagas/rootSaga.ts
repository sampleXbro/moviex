import { takeLatest } from 'redux-saga/effects'
import { getPlayingMoviesSaga } from './playingMoviesSagas'
import { getPlayingMovies } from '../slices/movieSlice'

export function* rootSaga() {
  yield takeLatest(getPlayingMovies.type, getPlayingMoviesSaga)
}
