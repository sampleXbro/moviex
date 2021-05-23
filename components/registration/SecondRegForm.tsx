import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import {
  TextField,
  Button,
  FormHelperText,
  Typography,
  Input,
  Box,
} from '@material-ui/core'
import * as Yup from 'yup'
import {
  ConfirmButtonText,
  NextRegFormsProps,
  SecondRegFormData,
} from '../../types/types'

const RegSchema = Yup.object({
  age: Yup.number()
    .min(16, 'You are too young!')
    .max(150, 'Are sure?!')
    .required('Age is required'),
  favFilm: Yup.string()
    .min(2, 'Title is too short!')
    .max(150, 'Title is too Long!')
    .required('Favorite film is required'),
})

export default function SecondRegForm({
  setIsLoading,
  maxSteps,
}: NextRegFormsProps): React.ReactNode {
  const router = useRouter()

  const step: number = +router.query.step

  if (window.history.state.options._h) {
    router.push('/register/1')
  }

  const sessionData: SecondRegFormData = JSON.parse(
    sessionStorage.getItem('moviex/reg')
  )

  const formik = useFormik({
    initialValues: {
      age: sessionData?.age || '',
      favFilm: sessionData?.favFilm || '',
    },
    validationSchema: RegSchema,
    onSubmit: (values) => {
      if (step === maxSteps) {
        //send req to database
        console.log('Data has been sent')
      } else {
        router.replace('/register/3')
      }
    },
  })

  useEffect(() => {
    sessionStorage.setItem(
      'moviex/reg',
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('moviex/reg')),
        ...formik.values,
      })
    )
  })

  const prevHandler = () => {
    router.replace('/register/1')
  }

  const confirmButtonText: ConfirmButtonText =
    step === maxSteps ? 'Complete' : 'NEXT'

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: 'flex',
        height: '600px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto',
      }}
    >
      <Box style={{ overflow: 'auto' }}>
        <Typography>Type your age:*</Typography>
        <Input
          fullWidth
          margin={'dense'}
          id={'age'}
          name={'age'}
          type={'number'}
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && Boolean(formik.errors.age)}
        />
        <FormHelperText error>{formik.errors.age}</FormHelperText>
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'favFilm'}
          name={'favFilm'}
          label={'What is your favorite film?*'}
          value={formik.values.favFilm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.favFilm && Boolean(formik.errors.favFilm)}
          helperText={formik.touched.favFilm && formik.errors.favFilm}
        />
      </Box>

      <Box display={'flex'} justifyContent={'space-between'}>
        <Button color='primary' variant='contained' onClick={prevHandler}>
          &#8678; PREV
        </Button>

        <Button color='primary' variant='contained' type={'submit'}>
          {confirmButtonText} &#8680;
        </Button>
      </Box>
    </form>
  )
}
