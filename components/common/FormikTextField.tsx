import { TextField, TextFieldProps } from '@material-ui/core'
import { FormikProps } from 'formik'
import React from 'react'

type FormikTextFieldProps = {
  formik: FormikProps<any>
  type: string
  name: string
  label: string
} & TextFieldProps

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  formik,
  type,
  name,
  label,
  ...props
}) => (
  <TextField
    margin={'normal'}
    variant={'outlined'}
    type={type}
    id={name}
    name={name}
    label={label}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    {...props}
  />
)
