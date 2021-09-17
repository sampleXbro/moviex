import '../common/styles/globals.sass'
import { makeStore, wrapper } from '../app/store'
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../common/styles/theme'
import { AppProps } from 'next/app'

import MainLayout from '../common/components/common/MainLayout'
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from 'redux-persist/es/types'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = makeStore()
  return (
    <MuiThemeProvider theme={theme}>
      <MainLayout>
        <PersistGate persistor={store.__PERSISTOR as Persistor} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </MainLayout>
    </MuiThemeProvider>
  )
}

export default wrapper.withRedux(App)
