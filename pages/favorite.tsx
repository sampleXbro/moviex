import { withAuthCheck } from '../components/HOCs/withAuthCheck'
import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { MoviesList } from '../components/movies/MoviesList'
import React, { useEffect, useState } from 'react'
import { MoviesListResponse } from '../types/types'
import { useAuth } from '../redux/selectors/selectors'
import { getFavoriteMoviesApi } from '../components/api/api'
import { CustomCircularProgress } from '../components/common/CustomCircularProgress'
import { moviesInitData } from '../redux/slices/initData'

const Favorite = (): JSX.Element => {
  const [data, setData] = useState<MoviesListResponse>(moviesInitData)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const authData = useAuth()

  useEffect(() => {
    getFavoriteMoviesApi(authData.sessionId).then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [authData.sessionId])

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
