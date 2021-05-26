import '../styles/globals.sass'
import { wrapper } from '../redux/store'
import { NextPage } from 'next'
import React, { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'
const MainLayout = dynamic(() => import('../components/common/MainLayout'))

type AppProps = {
  Component: NextPage
  pageProps: PropsWithChildren<any>
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </MuiThemeProvider>
    </MuiThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
