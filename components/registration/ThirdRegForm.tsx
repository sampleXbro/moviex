import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { TextField, Button, Box } from '@material-ui/core'
import * as Yup from 'yup'
import { ConfirmButtonText, ThirdRegFormData } from '../../types/types'

const phoneRegExp: RegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegSchema = Yup.object({
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

export default function ThirdRegForm({ setIsLoading, maxSteps }) {
  const router = useRouter()

  const step: number = +router.query.step

  if (window.history.state.options._h) {
    router.push('/register/1')
  }

  const sessionData: ThirdRegFormData = JSON.parse(
    sessionStorage.getItem('moviex/reg')
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
    onSubmit: (values) => {
      if (step === maxSteps) {
        //send req to database
        console.log('Data has been sent')
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
      <Box style={{ overflow: 'auto' }}>
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'bilName'}
          name={'bilName'}
          label={'Billing name*'}
          value={formik.values.bilName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bilName && Boolean(formik.errors.bilName)}
          helperText={formik.touched.bilName && formik.errors.bilName}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          type={'number'}
          id={'taxNumber'}
          name={'taxNumber'}
          label={'TAX number*'}
          value={formik.values.taxNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.taxNumber && Boolean(formik.errors.taxNumber)}
          helperText={formik.touched.taxNumber && formik.errors.taxNumber}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'bilEmail'}
          name={'bilEmail'}
          label={'Billing email*'}
          type={'email'}
          value={formik.values.bilEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bilEmail && Boolean(formik.errors.bilEmail)}
          helperText={formik.touched.bilEmail && formik.errors.bilEmail}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'bilPhone'}
          name={'bilPhone'}
          label={'Billing phone*'}
          value={formik.values.bilPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bilPhone && Boolean(formik.errors.bilPhone)}
          helperText={formik.touched.bilPhone && formik.errors.bilPhone}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'zip'}
          name={'zip'}
          type={'number'}
          label={'ZIP code*'}
          value={formik.values.zip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zip && Boolean(formik.errors.zip)}
          helperText={formik.touched.zip && formik.errors.zip}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'country'}
          name={'country'}
          label={'Your country*'}
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        <TextField
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          id={'city'}
          name={'city'}
          label={'Your city*'}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
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
