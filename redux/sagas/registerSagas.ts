import { put } from 'redux-saga/effects'
import axios from 'axios'
import { setUser } from '../slices/userSlice'

export function* getUserSaga(action: any) {
  try {
    const { data } = yield axios.get(
      'https://jsonplaceholder.typicode.com/users/1'
    )

    yield put(setUser({ ...data }))
  } catch (e) {
    console.log(e)
  }
}
