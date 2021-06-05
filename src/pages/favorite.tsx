import { withAuthCheck } from '../common/components/HOCs/withAuthCheck'
import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { MoviesList } from '../common/components/common/MoviesList'
import React, { useEffect } from 'react'
import { CustomCircularProgress } from '../common/components/common/CustomCircularProgress'
import { useDispatch } from 'react-redux'
import { getFavoriteMovies } from '../features/favoriteMoviesPage'
import { useAuth, useFavoriteMovies } from '../common/selectors/selectors'

const Favorite = (): JSX.Element => {
  const { data, isLoading } = useFavoriteMovies()
  const authData = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoriteMovies(authData.sessionId))
  }, [dispatch, authData.sessionId])

  return (
    <>
      <Head>
        <title>Moviex | Favorite</title>
      </Head>

      <Typography variant={'h4'} align={'center'}>
        YOUR FAVORITE MOVIES
      </Typography>
      {isLoading ? (
        <CustomCircularProgress />
      ) : (
        !data.results.length && (
          <Typography align={'center'}>
            You have no favorite movies at the moment
          </Typography>
        )
      )}
      <MoviesList data={data} reversed />
    </>
  )
}

export default withAuthCheck(Favorite)
