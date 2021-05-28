import React from 'react'
import { useRouter } from 'next/router'
import { usePopularMovies } from '../../../redux/selectors/selectors'
import Head from 'next/head'
import { Box, Typography } from '@material-ui/core'
import { MoviesList } from '../../../components/movies/MoviesList'
import { wrapper } from '../../../redux/store'
import { AxiosResponse } from 'axios'
import { getPopularMoviesApi } from '../../../components/api/api'
import { Pagination } from '@material-ui/lab'
import { setPopularMovies } from '../../../redux/slices/popularMoviesSlice'

export default function NowPlaying(): React.ReactElement {
  const router = useRouter()
  const { data } = usePopularMovies()

  const page = Number(router.query.page) || 1

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    router.push(`/movies/popular/${value}`)
  }

  return (
    <>
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
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }) => {
    const { data }: AxiosResponse = await getPopularMoviesApi(
      Number(params?.page)
    )
    store.dispatch(setPopularMovies(data))
    return { revalidate: 60 }
  }
)

export const getStaticPaths = async () => {
  const { data }: AxiosResponse = await getPopularMoviesApi(1)
  const paths = []

  for (let i = 0; i < data.total_pages; i++) {
    paths.push({ params: { page: String(i + 1) } })
  }

  return {
    paths,
    fallback: false,
  }
}
