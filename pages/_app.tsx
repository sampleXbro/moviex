import '../styles/globals.sass'
import { Provider } from 'react-redux'
import store from '../redux/configStore'
import { NextPage } from 'next'
import React, { PropsWithChildren } from 'react'

type AppProps = {
  Component: NextPage
  pageProps: PropsWithChildren<any>
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
