import { withAuthCheck } from '../common/components/HOCs/withAuthCheck'
import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { MoviesList } from '../common/components/common/MoviesList'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  getFavoriteMovies,
  useFavoriteMovies,
} from '../features/favoriteMoviesPage'
import { useAuth } from '../features/authPage'

const Favorite = (): JSX.Element => {
  const { data } = useFavoriteMovies()
  const authData = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoriteMovies(authData.sessionId))
  }, [dispatch, authData.sessionId])

  return (
    <>
      <Head>
        <title>Moviex | Избранное</title>
      </Head>

      <Typography variant={'h5'} align={'center'}>
        ИЗБРАННОЕ
      </Typography>
      {!data.results.length && (
        <Typography align={'center'}>В избранном пока пусто...</Typography>
      )}
      <MoviesList data={data} reversed />
    </>
  )
}

export default withAuthCheck(Favorite)
