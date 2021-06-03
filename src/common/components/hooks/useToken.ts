import dayjs from 'dayjs'
import { useAuth } from '../../selectors/selectors'

export const useToken = () => {
  const { token } = useAuth()

  const isValidToken: boolean = dayjs(token.expires_at).diff(dayjs()) > 0

  return { isValidToken, token }
}
