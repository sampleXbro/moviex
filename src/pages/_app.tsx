import '../common/styles/globals.sass'
import { wrapper } from '../app/store'
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../common/styles/theme'
import { AppProps } from 'next/app'

import MainLayout from '../common/components/common/MainLayout'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <MuiThemeProvider theme={theme}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </MuiThemeProvider>
)

export default wrapper.withRedux(MyApp)
