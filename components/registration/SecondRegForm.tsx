import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Button, Box } from '@material-ui/core'
import * as Yup from 'yup'
import {
  ConfirmButtonText,
  NextRegFormsProps,
  SecondRegFormData,
} from '../../types/types'
import { FormikTextField } from '../common/FormikTextField'
import { regData } from './regData'
import { BaseSchema } from 'yup'

const RegSchema: BaseSchema = Yup.object({
  age: Yup.number()
    .min(16, 'You are too young!')
    .max(150, 'Are sure?!')
    .required('Age is required'),
  favFilm: Yup.string()
    .min(2, 'Title is too short!')
    .max(150, 'Title is too Long!')
    .required('Favorite film is required'),
})

const SecondRegForm: React.FC<NextRegFormsProps> = ({ maxSteps }) => {
  const router = useRouter()

  const step = Number(router.query.step)

  if (window.history.state.options._h) {
    router.replace('/register/1')
  }

  const sessionData: SecondRegFormData = JSON.parse(
    sessionStorage.getItem('moviex/reg') ?? ''
  )

  const formik = useFormik({
    initialValues: {
      age: sessionData?.age || '',
      favFilm: sessionData?.favFilm || '',
    },
    validationSchema: RegSchema,
    onSubmit: () => {
      if (step === maxSteps) {
        //send req to database
        console.log(
          'Data has been sent',
          JSON.parse(sessionStorage.getItem('moviex/reg') ?? '{}')
        )
      } else {
        router.replace('/register/3')
      }
    },
  })

  useEffect(() => {
    sessionStorage.setItem(
      'moviex/reg',
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('moviex/reg') ?? '{}'),
        ...formik.values,
      })
    )
  })

  const renderInputs = regData[step].map((d, i) => (
    <FormikTextField
      key={i}
      fullWidth
      formik={formik}
      name={d.name}
      label={d.label}
      type={d.type}
    />
  ))

  const prevHandler = (): void => {
    router.replace('/register/1')
  }

  const confirmButtonText: ConfirmButtonText =
    step === maxSteps ? 'Complete' : 'NEXT'

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        overflow={'auto'}
        display={'flex'}
        height={'600px'}
        flexDirection={'column'}
        justifyContent={'space-between'}
      >
        {renderInputs}
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

export default SecondRegForm
