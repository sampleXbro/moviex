import '../common/styles/globals.sass'
import { wrapper } from '../app/store'
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../common/styles/theme'
import App, { AppInitialProps } from 'next/app'

import MainLayout from '../common/components/common/MainLayout'

class MyApp extends App<AppInitialProps> {
  public render() {
    const { Component, pageProps } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </MuiThemeProvider>
    )
  }
}

export default wrapper.withRedux(MyApp)
