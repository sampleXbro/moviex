import Head from 'next/head'
import { Typography } from '@material-ui/core'

export default function Popular() {
  return (
    <>
      <Head>
        <title>Moviex | Popular</title>
      </Head>
      <Typography variant={'h4'} align={'center'}>
        POPULAR
      </Typography>
    </>
  )
}
