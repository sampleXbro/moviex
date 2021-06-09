import React from 'react'
import { useRouter } from 'next/router'
import {
  setPlayingMovies,
  usePlayingMovies,
} from '../../../features/nowPlayingPage'
import Head from 'next/head'
import { Box, Typography } from '@material-ui/core'
import { MoviesList } from '../../../common/components/common/MoviesList'
import { wrapper } from '../../../app/store'
import { AxiosResponse } from 'axios'
import { getNowPlayingMoviesApi } from '../../../common/api/api'
import { Pagination } from '@material-ui/lab'
import { useScrollMemory } from '../../../common/components/hooks/useScrollMemory'
import { withAuthCheck } from '../../../common/components/HOCs/withAuthCheck'
import { GetStaticPathsResult } from 'next'
import { Paths } from '../../../common/types/types'

function NowPlaying(): JSX.Element {
  const router = useRouter()
  const { data } = usePlayingMovies()
  useScrollMemory()

  const page = Number(router.query.page) || 1
  const pagePath = router.asPath.split('/').slice(0, -1).join('/')

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    router.push(pagePath + '/' + value).then(() => {
      sessionStorage.clear()
    })
  }

  return (
    <div>
      <Head>
        <title>Moviex | Now playing</title>
      </Head>

      <Typography variant={'h4'} align={'center'}>
        NOW PLAYING
      </Typography>
      <MoviesList data={data} />
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          page={page}
          onChange={handlePaginationChange}
          count={data.total_pages}
          variant='outlined'
          color='primary'
        />
      </Box>
    </div>
  )
}

export default withAuthCheck(NowPlaying)

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }) => {
    const { data }: AxiosResponse = await getNowPlayingMoviesApi(
      Number(params?.page)
    )
    store.dispatch(setPlayingMovies(data))
    return { revalidate: 60 }
  }
)

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const { data }: AxiosResponse = await getNowPlayingMoviesApi(1)
  const paths: Paths = []

  for (let i = 0; i < data.total_pages; i++) {
    paths.push({ params: { page: String(i + 1) } })
  }

  return {
    paths,
    fallback: false,
  }
}
