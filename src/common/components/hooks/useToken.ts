import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAuth } from '../../selectors/selectors'
dayjs.extend(utc)

export const useToken = () => {
  const { token } = useAuth()

  const utcDateExpires = token.expires_at.split(' ').slice(0, -1).join(' ')

  const isValidToken: boolean = dayjs.utc(utcDateExpires).diff(dayjs.utc()) > 0

  return { isValidToken, token }
}
