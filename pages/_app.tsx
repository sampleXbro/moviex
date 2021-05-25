import '../styles/globals.sass'
import { Provider } from 'react-redux'
import store from '../redux/configStore'
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
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </MuiThemeProvider>
    </Provider>
  )
}

export default MyApp
