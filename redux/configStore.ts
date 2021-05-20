import {configureStore, applyMiddleware, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './sagas/rootSaga'
import userReducer from './slices/userSlice'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  userReducer
})

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  })

sagaMiddleware.run(rootSaga)

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch