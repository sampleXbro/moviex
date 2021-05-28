import { put } from 'redux-saga/effects'
import {
  getPlayingMovies,
  setPlayingMovies,
} from '../slices/playingMoviesSlice'
import {
  getMovieApi,
  getNowPlayingMoviesApi,
  getPopularMoviesApi,
} from '../../components/api/api'
import {
  getPopularMovies,
  setPopularMovies,
} from '../slices/popularMoviesSlice'
import { getMovie, setMovie } from '../slices/singleMovieSlice'

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

export function* getPopularMoviesSaga(action: Action) {
  yield getPopularMovies(action.payload)
  try {
    const { data } = yield getPopularMoviesApi(action.payload)
    yield put(setPopularMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getMovieSaga(action: Action) {
  yield getMovie(action.payload)
  try {
    const { data } = yield getMovieApi(action.payload)
    yield put(setMovie(data))
  } catch (e) {
    console.log(e)
  }
}
