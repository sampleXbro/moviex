import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import { SESSION_NAME } from '../../utils/constants'
import { authResponse } from '../../../features/authPage'
import SignIn from '../../../pages/sign-in'
import { useToken } from '../hooks/useToken'

export const withAuthCheck = (Component: NextPage): NextPage => {
  return function Wrapper(props): JSX.Element | null {
    const dispatch = useDispatch()
    const { isValidToken } = useToken()

    useEffect(() => {
      if (!isValidToken && localStorage.getItem(SESSION_NAME)) {
        dispatch(
          authResponse({
            ...JSON.parse(localStorage.getItem(SESSION_NAME) || '{}'),
          })
        )
      }
    }, [isValidToken, dispatch])

    if (!isValidToken) {
      return <SignIn />
    }

    return <Component {...props} />
  }
}
