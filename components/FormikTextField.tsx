import { TextField } from '@material-ui/core'

export const FormikTextField = ({ formik, type, name, label, ...props }) => (
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
