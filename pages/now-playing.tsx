import Head from 'next/head'
import { wrapper } from '../redux/store'
import {
  getPlayingMovies,
  setPlayingMovies,
} from '../redux/slices/playingMoviesSlice'
import { useDispatch } from 'react-redux'
import { getNowPlayingMoviesApi } from '../components/api/api'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Pagination } from '@material-ui/lab'
import { MoviesList } from '../components/movies/MoviesList'
import { usePlayingMovies } from '../redux/selectors/selectors'

export default function NowPlaying(): React.ReactElement {
  const { data } = usePlayingMovies()
  const dispatch = useDispatch()

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    dispatch(getPlayingMovies(value))
  }
  return (
    <>
      <Head>
        <title>Moviex | Now playing</title>
      </Head>

      <Typography variant={'h4'} align={'center'}>
        NOW PLAYING
      </Typography>
      <MoviesList movies={data.results} />
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          onChange={handlePaginationChange}
          count={data.total_pages}
          variant='outlined'
          color='primary'
        />
      </Box>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const { data } = await getNowPlayingMoviesApi(1)

  store.dispatch(setPlayingMovies(data))
})
