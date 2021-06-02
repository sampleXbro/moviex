import Head from 'next/head'
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FormikTextField } from '../components/common/FormikTextField'
import { useFormik } from 'formik'
import { BaseSchema } from 'yup'
import * as Yup from 'yup'
import { createRequestTokenApi } from '../api/api'
import { useRouter } from 'next/router'
import { Token } from '../types/types'
import { useDispatch } from 'react-redux'
import { authRequest } from '../redux/slices/authSlice'
import dayjs from 'dayjs'
import { SESSION_NAME } from '../utils/constants'
import { useAuth } from '../redux/selectors/selectors'

const SignInSchema: BaseSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too Long!')
    .required('First name is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - it should be at least 8 chars length.')
    .matches(
      /[a-zA-Z1-9]/,
      'Password can only contain latin letters and digits.'
    ),
})

export default function SignIn(): JSX.Element {
  const router = useRouter()
  const dispatch = useDispatch()
  const { error } = useAuth()
  const [token, setToken] = useState<Token>({
    request_token: '',
    expires_at: '',
    success: false,
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: ({ username, password }) => {
      dispatch(
        authRequest({ username, password, request_token: token.request_token })
      )
    },
  })

  useEffect(() => {
    const token: Token = JSON.parse(localStorage.getItem(SESSION_NAME) || '{}')
    const isValidToken: boolean = dayjs(token.expires_at).diff(dayjs()) > 0

    if (isValidToken) {
      if (router.asPath === '/sign-in') {
        router.push('/movies/now-playing/1')
      } else {
        router.push(router.asPath)
      }
    } else {
      createRequestTokenApi().then(({ data }) => {
        setToken(data)
      })
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box maxWidth={'450px'} margin={'0 auto'}>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={3}>
            <Box padding={'15px'} marginTop={'20px'}>
              <Typography variant={'h5'} align={'center'}>
                Login
              </Typography>
              <FormHelperText error>{error}</FormHelperText>
              <FormikTextField
                fullWidth
                formik={formik}
                name={'username'}
                label={'Login'}
                type={'text'}
              />
              <FormikTextField
                fullWidth
                formik={formik}
                name={'password'}
                label={'Password'}
                type={'password'}
              />

              <Button
                fullWidth
                color='primary'
                variant='contained'
                type={'submit'}
                disabled={!token.request_token}
              >
                SIGN IN
              </Button>
            </Box>
          </Paper>
        </form>
      </Box>
    </>
  )
}
