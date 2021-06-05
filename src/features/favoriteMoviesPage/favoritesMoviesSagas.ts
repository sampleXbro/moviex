import { put, call } from 'redux-saga/effects'
import { changeFavoritesApi, getFavoriteMoviesApi } from '../../common/api/api'
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

export function* changeFavoritesSaga(action: Action) {
  try {
    yield call(() =>
      changeFavoritesApi(
        action.payload.movieId,
        action.payload.sessionId,
        action.payload.isFavorite
      )
    )
    const { data } = yield call(() =>
      getFavoriteMoviesApi(action.payload.sessionId)
    )

    yield put(setFavoriteMovies(data))
  } catch (e) {
    console.log(e)
  }
}
