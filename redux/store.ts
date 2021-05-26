import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  Store,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/rootSaga'
import playingMoviesReducer from './slices/movieSlice'
import { createWrapper } from 'next-redux-wrapper'

const reducer = combineReducers({
  playingMoviesReducer,
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

export const wrapper = createWrapper(makeStore, { debug: true })
