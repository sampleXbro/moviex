import { put, call } from 'redux-saga/effects'
import { getPopularMoviesApi } from '../../common/api/api'
import { setPopularMovies } from './popularMoviesSlice'

import { Action } from '../../common/types/types'

export function* getPopularMoviesSaga(action: Action) {
  try {
    const { data } = yield call(() => getPopularMoviesApi(action.payload))
    yield put(setPopularMovies(data))
  } catch (e) {
    console.log(e)
  }
}
