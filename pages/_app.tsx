import { createSlice } from '@reduxjs/toolkit'
import '../styles/globals.sass'
import {Provider} from 'react-redux'
import store from '../redux/configStore'


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
