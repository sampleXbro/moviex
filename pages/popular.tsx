import Head from 'next/head'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { wrapper } from '../redux/store'
import { getPopularMoviesApi } from '../components/api/api'
import { getPopularMovies, setPopularMovies } from '../redux/slices/movieSlice'
import { useDispatch } from 'react-redux'
import { MoviesList } from '../components/movies/MoviesList'
import { Pagination } from '@material-ui/lab'
import { useMovies } from '../redux/selectors/selectors'

export default function Popular(): React.ReactElement {
  const { data } = useMovies()
  const dispatch = useDispatch()

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    dispatch(getPopularMovies(value))
  }

  return (
    <>
      <Head>
        <title>Moviex | Popular</title>
      </Head>
      <Typography variant={'h4'} align={'center'}>
        POPULAR
      </Typography>
      <MoviesList movies={data.popular.results} />
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          onChange={handlePaginationChange}
          count={data.popular.total_pages}
          variant='outlined'
          color='primary'
        />
      </Box>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const { data } = await getPopularMoviesApi(1)

  store.dispatch(setPopularMovies(data))
})
