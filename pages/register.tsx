import { getUser } from '../redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useUser } from '../redux/selectors/selectors'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik'
import { TextField, Container, Button } from '@material-ui/core'
import * as Yup from 'yup'

const RegisterSchema = Yup.object({
  firstName: Yup.string().min(2, 'Name is too short!').max(50, 'Name is too Long!').required('First name is required'),
  lastName: Yup.string().min(2, 'Last name s too short!').max(50, 'Last name is too Long!').required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - it should be at least 8 chars lenght.')
    .matches(/[a-zA-Z1-9]/, 'Password can only contain latin letters and digits.'),
  passwordConfirmation: Yup.string()
    .required('Confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export default function Register() {
  const user = useUser()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Container maxWidth={'sm'}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id={'firstName'}
          name={'firstName'}
          label={'First name'}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id={'lastName'}
          name={'lastName'}
          label={'Last name'}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          id={'email'}
          name={'email'}
          label={'Email'}
          type={'email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id={'password'}
          name={'password'}
          type={'password'}
          label={'Password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          id={'passwordConfirmation'}
          name={'passwordConfirmation'}
          type={'password'}
          label={'Confirm password'}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        />
        <Button fullWidth color='primary' variant='contained' type='submit' >
          Submit
        </Button>
      </form>
    </Container>
  )
}
