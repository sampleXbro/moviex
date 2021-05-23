import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import {
  TextField,
  Container,
  Button,
  FormHelperText,
  Checkbox,
  Link,
  Box,
} from '@material-ui/core'
import * as Yup from 'yup'
import axios from 'axios'
import { FirstRegFormData } from '../../types/types'

const RegSchema = Yup.object({
  login: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too Long!')
    .required('First name is required'),
  nickname: Yup.string()
    .min(2, 'Last name s too short!')
    .max(50, 'Last name is too Long!')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - it should be at least 8 chars length.')
    .matches(
      /[a-zA-Z1-9]/,
      'Password can only contain latin letters and digits.'
    ),
  passwordConfirmation: Yup.string()
    .required('Confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  isAcceptRules: Yup.bool().oneOf(
    [true],
    'You must read and accept terms and conditions'
  ),
})

export type RegFormProps = {
  setIsLoading: (val: boolean) => void
  setIsUploader: (val: boolean) => void
}

export default function FirstRegForm({
  setIsLoading,
  setIsUploader,
}: RegFormProps): React.ReactNode {
  const router = useRouter()

  const sessionData: FirstRegFormData = JSON.parse(
    sessionStorage.getItem('moviex/reg')
  )

  const formik = useFormik({
    initialValues: {
      login: sessionData?.login || '',
      nickname: sessionData?.nickname || '',
      email: sessionData?.email || '',
      password: sessionData?.password || '',
      passwordConfirmation: sessionData?.passwordConfirmation || '',
      isUploader: sessionData?.isUploader || false,
      isAcceptRules: sessionData?.isAcceptRules || false,
    },
    validationSchema: RegSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      const data = axios.post('https://api.dev.tigerq.com/api/check-email/', {
        email: values.email,
      })
      data.then((res) => {
        setIsLoading(false)
        if (res.status === 200) {
          router.replace('/register/2')
        }
      })
    },
  })

  useEffect(() => {
    setIsUploader(formik.values.isUploader)
    sessionStorage.setItem(
      'moviex/reg',
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('moviex/reg')),
        ...formik.values,
      })
    )
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: 'flex',
        height: '600px',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box style={{ overflow: 'auto' }}>
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'login'}
          name={'login'}
          label={'Login*'}
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'nickname'}
          name={'nickname'}
          label={'Nickname*'}
          value={formik.values.nickname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'email'}
          name={'email'}
          label={'Email*'}
          type={'email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'password'}
          name={'password'}
          type={'password'}
          label={'Password*'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'passwordConfirmation'}
          name={'passwordConfirmation'}
          type={'password'}
          label={'Confirm password*'}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
        <Container>
          <FormHelperText>
            <Checkbox
              id={'isUploader'}
              name={'isUploader'}
              checked={formik.values.isUploader}
              onChange={formik.handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            I want to upload films
          </FormHelperText>

          <FormHelperText>
            <Checkbox
              id={'isAcceptRules'}
              name={'isAcceptRules'}
              checked={formik.values.isAcceptRules}
              onChange={formik.handleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            I've read{' '}
            <Link
              target={'_blank'}
              href={
                'https://portal.dev.tigerq.com/assets/legal/terms-and-conditions.pdf'
              }
            >
              terms and conditions*
            </Link>
          </FormHelperText>
          <FormHelperText error>
            {formik.touched.isAcceptRules && formik.errors.isAcceptRules}
          </FormHelperText>
        </Container>
      </Box>

      <Button fullWidth color='primary' variant='contained' type={'submit'}>
        NEXT &#8680;
      </Button>
    </form>
  )
}
