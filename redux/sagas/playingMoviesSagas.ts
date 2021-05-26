import { put } from 'redux-saga/effects'
import { getPlayingMovies, setPlayingMovies } from '../slices/movieSlice'
import { getNowPlayingMoviesApi } from '../../components/api/api'

type Action = {
  type: string
  payload: any
}

export function* getPlayingMoviesSaga(action: Action) {
  yield getPlayingMovies(action.payload)
  try {
    const { data } = yield getNowPlayingMoviesApi(action.payload)
    yield put(setPlayingMovies(data))
  } catch (e) {
    console.log(e)
  }
}
