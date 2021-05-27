import Head from 'next/head'
import { wrapper } from '../redux/store'
import { getPlayingMovies, setPlayingMovies } from '../redux/slices/movieSlice'
import { useDispatch } from 'react-redux'
import { getNowPlayingMoviesApi } from '../components/api/api'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Pagination } from '@material-ui/lab'
import { MoviesList } from '../components/movies/MoviesList'
import { useMovies } from '../redux/selectors/selectors'
import { CustomCircularProgress } from '../components/common/CustomCircularProgress'

export default function NowPlaying() {
  const { data, isLoading } = useMovies()
  const dispatch = useDispatch()

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(getPlayingMovies(value))
  }

  if (isLoading || !Object.keys(data.nowPlaying).length) {
    return <CustomCircularProgress />
  }

  return (
    <>
      <Head>
        <title>Moviex | Now playing</title>
      </Head>
      <Typography variant={'h4'} align={'center'}>
        NOW PLAYING
      </Typography>
      <MoviesList movies={data.nowPlaying.results} />
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          onChange={handlePaginationChange}
          count={data.nowPlaying.total_pages}
          variant='outlined'
          color='primary'
        />
      </Box>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const { data } = await getNowPlayingMoviesApi(1)

    store.dispatch(setPlayingMovies(data))
  }
)
