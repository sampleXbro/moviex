import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: {
      success: false,
      request_token: '',
      expires_at: '',
    },
    sessionId: '',
    isLoading: false,
    error: null,
  },
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

    authError(state, action) {
      state.error = action.payload
    },
  },
})

export const { authRequest, authResponse, authError } = authSlice.actions

export default authSlice.reducer
