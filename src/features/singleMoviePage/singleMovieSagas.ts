import { put, call } from 'redux-saga/effects'
import { getMovieApi, getMovieVideosApi } from '../../common/api/api'
import { setMovie } from './singleMovieSlice'
import { Action } from '../../common/types/types'

export function* getMovieSaga(action: Action) {
  try {
    const { data } = yield call(getMovieApi, action.payload)

    const {
      data: { results },
    } = yield call(getMovieVideosApi, action.payload)

    yield put(setMovie({ data, videos: results }))
  } catch (e) {
    console.log(e)
  }
}
