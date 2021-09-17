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
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Persistor } from 'redux-persist/es/types'

type PersistStore = {
  __PERSISTOR?: Persistor
} & Store

const rootReducer = combineReducers({
  playingMovies,
  popularMovies,
  singleMovie,
  favoriteMovies,
  auth,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: [
    'favoriteMovies',
    'playingMovies',
    'popularMovies',
    'singleMovie',
  ],
}

export const makeStore = (): PersistStore => {
  const sagaMiddleware = createSagaMiddleware()

  let store: PersistStore

  const isClient = typeof window !== 'undefined'

  if (isClient) {
    store = configureStore({
      reducer: persistReducer(persistConfig, rootReducer),
      middleware: [
        ...getDefaultMiddleware({
          thunk: false,
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        sagaMiddleware,
      ],
    })

    store.__PERSISTOR = persistStore(store)
  } else {
    store = configureStore({
      reducer: rootReducer,
      middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
    })
  }

  sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: false })
