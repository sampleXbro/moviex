import { createSlice } from '@reduxjs/toolkit'
import { SESSION_NAME } from '../../common/utils/constants'
import { initialAuthState } from '../../common/utils/initData'

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authRequest(state, action) {
      state.error = null
      state.isLoading = true
    },

    authResponse(state, action) {
      state.error = null
      state.token = action.payload.token
      state.sessionId = action.payload.sessionId
      state.isLoading = false
    },

    authClear(state) {
      state.token = initialAuthState.token
      state.sessionId = initialAuthState.sessionId
      localStorage.removeItem(SESSION_NAME)
    },

    authError(state, action) {
      state.error = action.payload
    },
  },
})

export const { authRequest, authResponse, authError, authClear } =
  authSlice.actions

export default authSlice.reducer
