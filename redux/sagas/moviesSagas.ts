import { put } from 'redux-saga/effects'
import { setPlayingMovies } from '../slices/playingMoviesSlice'
import {
  getFavoriteMoviesApi,
  getMovieApi,
  getNowPlayingMoviesApi,
  getPopularMoviesApi,
} from '../../components/api/api'
import { setPopularMovies } from '../slices/popularMoviesSlice'
import { setMovie } from '../slices/singleMovieSlice'
import { setFavoriteMovies } from '../slices/favoriteMoviesSlice'

type Action = {
  type: string
  payload: any
}

export function* getPlayingMoviesSaga(action: Action) {
  try {
    const { data } = yield getNowPlayingMoviesApi(action.payload)
    yield put(setPlayingMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getPopularMoviesSaga(action: Action) {
  try {
    const { data } = yield getPopularMoviesApi(action.payload)
    yield put(setPopularMovies(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getMovieSaga(action: Action) {
  try {
    const { data } = yield getMovieApi(action.payload)
    yield put(setMovie(data))
  } catch (e) {
    console.log(e)
  }
}

export function* getFavoriteMoviesSaga(action: Action) {
  try {
    const { data } = yield getFavoriteMoviesApi(action.payload)
    yield put(setFavoriteMovies(data))
  } catch (e) {
    console.log(e)
  }
}
