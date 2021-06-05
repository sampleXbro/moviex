import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  Store,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga'
import { reducer as playingMovies } from '../features/nowPlayingPage'
import { reducer as popularMovies } from '../features/popularPage'
import { reducer as singleMovie } from '../features/singleMoviePage'
import { reducer as auth } from '../features/authPage'
import { reducer as favoriteMovies } from '../features/favoriteMoviesPage'
import { createWrapper } from 'next-redux-wrapper'

const reducer = combineReducers({
  playingMovies,
  popularMovies,
  singleMovie,
  favoriteMovies,
  auth,
})

export const makeStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  })

  sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: false })
