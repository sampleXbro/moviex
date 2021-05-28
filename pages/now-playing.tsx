import Head from 'next/head'
import { wrapper } from '../redux/store'
import {
  getPlayingMovies,
  setPlayingMovies,
} from '../redux/slices/playingMoviesSlice'
import { useDispatch } from 'react-redux'
import { getNowPlayingMoviesApi } from '../components/api/api'
import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { MoviesList } from '../components/movies/MoviesList'
import { usePlayingMovies } from '../redux/selectors/selectors'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

export default function NowPlaying(): React.ReactElement {
  const router = useRouter()
  const { data } = usePlayingMovies()

  const page = Number(router.query.page) || 1

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlayingMovies(page))
  }, [page])

  return (
    <>
      <Head>
        <title>Moviex | Now playing</title>
      </Head>

      <Typography variant={'h4'} align={'center'}>
        NOW PLAYING
      </Typography>
      <MoviesList data={data} page={page} />
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const { data }: AxiosResponse = await getNowPlayingMoviesApi(1)
  store.dispatch(setPlayingMovies(data))
})
