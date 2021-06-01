import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  Store,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/rootSaga'
import playingMovies from './slices/playingMoviesSlice'
import popularMovies from './slices/popularMoviesSlice'
import singleMovie from './slices/singleMovieSlice'
import auth from './slices/authSlice'
import favoriteMovies from './slices/favoriteMoviesSlice'
import { createWrapper } from 'next-redux-wrapper'

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

  sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: false })
