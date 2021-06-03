import { put, call } from 'redux-saga/effects'
import { setPlayingMovies } from './playingMoviesSlice'
import { getNowPlayingMoviesApi } from '../../common/api/api'
import { Action } from '../../common/types/types'

export function* getPlayingMoviesSaga(action: Action) {
  try {
    const { data } = yield call(() => getNowPlayingMoviesApi(action.payload))
    yield put(setPlayingMovies(data))
  } catch (e) {
    console.log(e)
  }
}
