import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  Store,
} from '@reduxjs/toolkit'
import createSagaMiddleware, { Task } from 'redux-saga'
import { rootSaga } from './rootSaga'
import { reducer as playingMovies } from '../features/nowPlayingPage'
import { reducer as popularMovies } from '../features/popularPage'
import { reducer as singleMovie } from '../features/singleMoviePage'
import { reducer as auth } from '../features/authPage'
import { reducer as favoriteMovies } from '../features/favoriteMoviesPage'
import { createWrapper } from 'next-redux-wrapper'

export interface SagaStore extends Store {
  sagaTask?: Task
}

const reducer = combineReducers({
  playingMovies,
  popularMovies,
  singleMovie,
  auth,
  favoriteMovies,
})

export const makeStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  })

  ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: false })