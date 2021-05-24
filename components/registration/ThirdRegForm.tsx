import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Button, Box } from '@material-ui/core'
import * as Yup from 'yup'
import {
  ConfirmButtonText,
  NextRegFormsProps,
  ThirdRegFormData,
} from '../../types/types'
import { FormikTextField } from '../FormikTextField'
import { regData } from './regData'
import { BaseSchema } from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegSchema: BaseSchema = Yup.object({
  bilName: Yup.string()
    .min(2, 'Name is too short!')
    .max(100, 'Name is too Long!')
    .required('Name is required'),
  taxNumber: Yup.string()
    .min(8, 'Must be exactly 8 digits')
    .min(8, 'Must be exactly 8 digits')
    .required('Tax number is required'),
  bilEmail: Yup.string().email('Invalid email').required('Email is required'),
  bilPhone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  zip: Yup.string()
    .min(5, 'Zip must be exactly 5 chars')
    .max(5, 'Zip must be exactly 5 chars')
    .required('Zip code is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
})

export default function ThirdRegForm({
  maxSteps,
}: NextRegFormsProps): React.ReactElement {
  const router = useRouter()

  const step = Number(router.query.step)

  if (window.history.state.options._h) {
    router.push('/register/1')
  }

  const sessionData: ThirdRegFormData = JSON.parse(
    sessionStorage.getItem('moviex/reg') ?? ''
  )

  const formik = useFormik({
    initialValues: {
      bilName: sessionData?.bilName || '',
      taxNumber: sessionData?.taxNumber || '',
      bilEmail: sessionData?.bilEmail || '',
      bilPhone: sessionData?.bilPhone || '',
      zip: sessionData?.zip || '',
      country: sessionData?.country || '',
      city: sessionData?.city || '',
    },
    validationSchema: RegSchema,
    onSubmit: () => {
      if (step === maxSteps) {
        //send req to database
        console.log(
          'Data has been sent',
          JSON.parse(sessionStorage.getItem('moviex/reg') ?? '')
        )
      }
    },
  })

  useEffect(() => {
    sessionStorage.setItem(
      'moviex/reg',
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('moviex/reg') ?? ''),
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

  const prevHandler = () => {
    router.replace('/register/2')
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
      <Box style={{ overflow: 'auto' }}>{renderInputs}</Box>

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
