import '../styles/globals.sass'
import { SagaStore, wrapper } from '../redux/store'
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'
import App, { AppContext, AppInitialProps } from 'next/app'
import { END } from 'redux-saga'
import MainLayout from '../components/common/MainLayout'

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    }

    if (ctx.req) {
      ctx.store.dispatch(END)
      await (ctx.store as SagaStore).sagaTask?.toPromise()
    }

    return {
      pageProps,
    }
  }

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
