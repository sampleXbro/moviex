import '../styles/globals.sass'
import { wrapper } from '../redux/store'
import React from 'react'
import dynamic from 'next/dynamic'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
const MainLayout = dynamic(() => import('../components/common/MainLayout'))

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <MuiThemeProvider theme={theme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </MuiThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
