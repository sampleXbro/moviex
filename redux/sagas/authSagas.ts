import { put, call } from 'redux-saga/effects'
import { authApi, createSessionApi } from '../../api/api'
import { authError, authResponse } from '../slices/authSlice'
import { LoginData } from '../../types/types'
import { SESSION_NAME } from '../../utils/constants'
import { AxiosResponse } from 'axios'

type Action = {
  type: string
  payload: LoginData
}

export function* loginSaga(action: Action) {
  try {
    const { data: token }: AxiosResponse = yield call(() =>
      authApi(action.payload)
    )
    const {
      data: { session_id: sessionId },
    }: AxiosResponse = yield call(() => createSessionApi(token.request_token))

    localStorage.setItem(SESSION_NAME, JSON.stringify({ token, sessionId }))

    yield put(authResponse({ token, sessionId }))
  } catch (e) {
    yield put(authError('Login or password is incorrect'))
  }
}
