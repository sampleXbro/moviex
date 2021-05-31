import { put } from 'redux-saga/effects'
import { authApi, createSessionApi } from '../../components/api/api'
import { authError, authRequest, authResponse } from '../slices/authSlice'
import { LoginData } from '../../types/types'
import { SESSION_NAME } from '../../utils/constants'
import { AxiosResponse } from 'axios'

type Action = {
  type: string
  payload: LoginData
}

export function* loginSaga(action: Action) {
  yield authRequest(action.payload)

  try {
    const { data: token }: AxiosResponse = yield authApi(action.payload)
    const {
      data: { session_id: sessionId },
    }: AxiosResponse = yield createSessionApi(token.request_token)

    localStorage.setItem(SESSION_NAME, JSON.stringify({ token, sessionId }))

    yield put(authResponse({ token, sessionId }))
  } catch (e) {
    yield put(authError('Login or password is incorrect'))
  }
}
