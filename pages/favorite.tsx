import { withAuthCheck } from '../components/HOCs/withAuthCheck'
import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { MoviesList } from '../components/movies/MoviesList'
import React, { useEffect } from 'react'
import { useAuth, useFavoriteMovies } from '../redux/selectors/selectors'

import { CustomCircularProgress } from '../components/common/CustomCircularProgress'
import { useDispatch } from 'react-redux'
import { getFavoriteMovies } from '../redux/slices/favoriteMoviesSlice'

const Favorite = (): JSX.Element => {
  const { data, isLoading } = useFavoriteMovies()
  const authData = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoriteMovies(authData.sessionId))
  }, [dispatch, authData.sessionId])

  if (isLoading) return <CustomCircularProgress />

  return (
    <>
      <Head>
        <title>Moviex | Favorite</title>
      </Head>

      <Typography variant={'h4'} align={'center'}>
        YOUR FAVORITE MOVIES
      </Typography>
      {!data.results.length && (
        <Typography align={'center'}>
          You have no favorite movies at the moment
        </Typography>
      )}
      <MoviesList data={data} reversed />
    </>
  )
}

export default withAuthCheck(Favorite)
