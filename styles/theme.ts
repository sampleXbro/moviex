import { createMuiTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { colors } from './colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors['primary-color'],
    },
    secondary: {
      main: colors['secondary-text-color'],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colors['background-color'],
    },
  },
})
export default theme
