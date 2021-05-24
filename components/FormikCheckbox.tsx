import { Checkbox, CheckboxProps } from '@material-ui/core'
import React from 'react'
import { FormikProps } from 'formik'

type FormikCheckBoxProps = {
  formik: FormikProps<any>
  name: string
} & CheckboxProps

export const FormikCheckbox: React.FC<FormikCheckBoxProps> = ({
  formik,
  name,
  ...props
}) => (
  <Checkbox
    id={name}
    name={name}
    checked={formik.values[name]}
    onChange={formik.handleChange}
    inputProps={{ 'aria-label': 'secondary checkbox' }}
    {...props}
  />
)
