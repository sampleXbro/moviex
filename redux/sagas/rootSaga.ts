import { takeLatest } from 'redux-saga/effects'
import { getUserSaga } from './registerSagas'
import { getUser } from '../slices/userSlice'

export function* rootSaga(): any {
  yield takeLatest(getUser.type, getUserSaga)
}
