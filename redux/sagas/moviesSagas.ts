import { put } from 'redux-saga/effects'
import {
  getPlayingMovies,
  setPlayingMovies,
} from '../slices/playingMoviesSlice'
import {
  getNowPlayingMoviesApi,
  getPopularMoviesApi,
} from '../../components/api/api'
import {
  getPopularMovies,
  setPopularMovies,
} from '../slices/popularMoviesSlice'

type Action = {
  type: string
  payload: any
}

export function* getPlayingMoviesSaga(action: Action) {
  yield getPlayingMovies(action.payload)
  console.log('saga')
  try {
    const { data } = yield getNowPlayingMoviesApi(action.payload)
    yield put(setPlayingMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getPopularMoviesSaga(action: Action) {
  yield getPopularMovies(action.payload)
  try {
    const { data } = yield getPopularMoviesApi(action.payload)
    yield put(setPopularMovies(data))
  } catch (e) {
    console.log(e)
  }
}
