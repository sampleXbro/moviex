import { loginSaga } from './authSagas'
import { useAuth } from './selectors'
import reducer, {
  authRequest,
  authResponse,
  authError,
  authClear,
} from './authSlice'

export {
  reducer,
  loginSaga,
  authRequest,
  authResponse,
  authError,
  authClear,
  useAuth,
}
