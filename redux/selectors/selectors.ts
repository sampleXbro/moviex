import { useAppSelector } from '../hooks'

export const useUser = () => useAppSelector((state) => state.userReducer)
