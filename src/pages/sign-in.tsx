import Head from 'next/head'
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FormikTextField } from '../common/components/common/FormikTextField'
import { useFormik } from 'formik'
import { BaseSchema } from 'yup'
import * as Yup from 'yup'
import { createRequestTokenApi } from '../common/api/api'
import { useRouter } from 'next/router'
import { Token } from '../common/types/types'
import { useDispatch } from 'react-redux'
import { authRequest, useAuth } from '../features/authPage'
import { useToken } from '../common/components/hooks/useToken'

const SignInSchema: BaseSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Имя пользователя слишком короткое!')
    .max(50, 'Имя пользователя слишком длинное')
    .required('Введите имя пользователя'),
  password: Yup.string()
    .required('Введите пароль')
    .min(
      8,
      'Пароль слишком короткий. Он должен быть не менее 8 символов в длину.'
    )
    .matches(/[a-zA-Z1-9]/, 'Пароль может содержать только буквы и цифры'),
})

export default function SignIn(): JSX.Element {
  const router = useRouter()
  const dispatch = useDispatch()
  const { error, isLoading } = useAuth()
  const { isValidToken } = useToken()
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
    if (isValidToken) {
      if (router.asPath === '/sign-in') {
        router.push('/movies/top-rated/1')
      } else {
        router.push(router.asPath)
      }
    } else {
      createRequestTokenApi().then(({ data }) => {
        setToken(data)
      })
    }
  }, [router, router.asPath, isValidToken])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box maxWidth={'450px'} margin={'0 auto'}>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={3}>
            <Box padding={'15px'} margin={'50% 10px 10px 10px'}>
              <Typography variant={'h5'} align={'center'}>
                Войти в Moviex
              </Typography>
              <FormHelperText error>{error}</FormHelperText>
              <FormikTextField
                fullWidth
                formik={formik}
                name={'username'}
                label={'Логин'}
                type={'text'}
              />
              <FormikTextField
                fullWidth
                formik={formik}
                name={'password'}
                label={'Пароль'}
                type={'password'}
              />

              <Button
                fullWidth
                color='primary'
                variant='contained'
                type={'submit'}
                disabled={!token.request_token || isLoading}
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
