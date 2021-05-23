import { Checkbox, TextField } from '@material-ui/core'
import React from 'react'

export const FormikCheckbox = ({ formik, name, ...props }) => (
  <Checkbox
    id={name}
    name={name}
    checked={formik.values[name]}
    onChange={formik.handleChange}
    inputProps={{ 'aria-label': 'secondary checkbox' }}
    {...props}
  />
)
