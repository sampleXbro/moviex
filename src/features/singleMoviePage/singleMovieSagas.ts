import { put, call } from 'redux-saga/effects'
import { getMovieApi } from '../../common/api/api'
import { setMovie } from './singleMovieSlice'
import { Action } from '../../common/types/types'

export function* getMovieSaga(action: Action) {
  try {
    const { data } = yield call(() => getMovieApi(action.payload))
    yield put(setMovie(data))
  } catch (e) {
    console.log(e)
  }
}
