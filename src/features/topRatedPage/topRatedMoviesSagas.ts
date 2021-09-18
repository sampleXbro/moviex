import { put, call } from 'redux-saga/effects'
import { setTopRatedMovies } from './topRatedMoviesSlice'
import { getTopRatedMoviesApi } from '../../common/api/api'
import { Action } from '../../common/types/types'

export function* getTopRatedMoviesSaga(action: Action) {
  try {
    const { data } = yield call(() => getTopRatedMoviesApi(action.payload))
    yield put(setTopRatedMovies(data))
  } catch (e) {
    console.log(e)
  }
}
