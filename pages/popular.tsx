import Head from 'next/head'
import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { wrapper } from '../redux/store'
import { getPopularMoviesApi } from '../components/api/api'
import {
  getPopularMovies,
  setPopularMovies,
} from '../redux/slices/popularMoviesSlice'
import { useDispatch } from 'react-redux'
import { MoviesList } from '../components/movies/MoviesList'
import { usePopularMovies } from '../redux/selectors/selectors'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

export default function Popular(): React.ReactElement {
  const { data } = usePopularMovies()
  const dispatch = useDispatch()
  const router = useRouter()

  const page = Number(router.query.page) || 1

  useEffect(() => {
    dispatch(getPopularMovies(page))
  }, [page])

  return (
    <>
      <Head>
        <title>Moviex | Popular</title>
      </Head>
      <Typography variant={'h4'} align={'center'}>
        POPULAR
      </Typography>
      <MoviesList data={data} page={page} />
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const { data }: AxiosResponse = await getPopularMoviesApi(1)

  store.dispatch(setPopularMovies(data))
})
