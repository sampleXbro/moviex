import { AuthFullState, AuthState } from '../../common/types/types'
import { useSelector } from 'react-redux'

export const useAuth = (): AuthState =>
  useSelector((state: AuthFullState) => state.auth)
