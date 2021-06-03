import { put, call } from 'redux-saga/effects'
import { getFavoriteMoviesApi } from '../../common/api/api'

import { setFavoriteMovies } from './favoriteMoviesSlice'
import { Action } from '../../common/types/types'

export function* getFavoriteMoviesSaga(action: Action) {
  try {
    const { data } = yield call(() => getFavoriteMoviesApi(action.payload))
    yield put(setFavoriteMovies(data))
  } catch (e) {
    console.log(e)
  }
}
