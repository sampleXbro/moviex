import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useAuth } from '../../redux/selectors/selectors'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { SESSION_NAME } from '../../utils/constants'
import { authResponse } from '../../redux/slices/authSlice'
import SignIn from '../../pages/sign-in'

export const withAuthCheck = (Component: NextPage): NextPage => {
  return function Wrapper(props): JSX.Element | null {
    const authData = useAuth()
    const dispatch = useDispatch()

    const isTokenValid: boolean =
      dayjs(authData.token.expires_at || '').diff(dayjs()) >= 0

    useEffect(() => {
      if (!isTokenValid && localStorage.getItem(SESSION_NAME)) {
        dispatch(
          authResponse({
            ...JSON.parse(localStorage.getItem(SESSION_NAME) || '{}'),
          })
        )
      }
    }, [isTokenValid, dispatch])

    if (!isTokenValid) {
      return <SignIn />
    }

    return <Component {...props} />
  }
}
