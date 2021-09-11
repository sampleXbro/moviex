import { wrapper } from '../../app/store'
import { setMovie, useMovie } from '../../features/singleMoviePage'
import { getMovieApi, getMovieVideosApi } from '../../common/api/api'
import { Box, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import React, { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import ReactPlayer from 'react-player/youtube'
import { Star, StarBorder } from '@material-ui/icons'
import { Movie } from '../../common/types/types'
import { CustomDivider } from '../../common/components/common/CustomDivider'
import {
  changeFavorites,
  getFavoriteMovies,
  useFavoriteMovies,
} from '../../features/favoriteMoviesPage'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../features/authPage'

function MoviePage(): JSX.Element {
  const { data, videos } = useMovie()
  const authData = useAuth()
  const favorites = useFavoriteMovies()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoriteMovies(authData.sessionId))
  }, [authData.sessionId, dispatch])

  const genres: string = data.genres.map((g) => g.name).join(', ')

  const isFavorite = favorites.data.results.some(
    (fav: Movie) => fav.id === data.id
  )

  const renderVideos = (): JSX.Element[] => {
    return videos.map((vid) => (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        margin={'10px'}
        key={vid.id}
      >
        <Typography>{vid.name}</Typography>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${vid.key}`} />
      </Box>
    ))
  }

  const handleFavoriteClick = (): void => {
    const payload = {
      movieId: String(data.id),
      sessionId: authData.sessionId,
      isFavorite: !isFavorite,
    }
    dispatch(changeFavorites(payload))
  }

  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'center'}
      margin={'10px auto'}
      maxWidth={'1200px'}
    >
      <Paper>
        <Box display={'flex'} padding={'10px'}>
          <Image
            src={'https://image.tmdb.org/t/p/w300' + data.poster_path}
            width={300}
            height={450}
            layout={'intrinsic'}
          />
          <Box
            display={'flex'}
            flexDirection={'column'}
            flex={1}
            padding={'0 10px'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'flex-end'}
            >
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                width={'100%'}
                alignItems={'center'}
              >
                <Typography variant={'h4'}>{data.title}</Typography>
                {isFavorite ? (
                  <Star
                    color={'primary'}
                    fontSize={'large'}
                    cursor={'pointer'}
                    onClick={handleFavoriteClick}
                  />
                ) : (
                  <StarBorder
                    fontSize={'large'}
                    cursor={'pointer'}
                    onClick={handleFavoriteClick}
                  />
                )}
              </Box>
            </Box>
            <CustomDivider />
            <Typography variant={'h6'}>
              {data.budget
                ? `Budget: ${data.budget} USD`
                : 'Budget not specified'}
            </Typography>

            <Typography variant={'body1'}>{data.overview}</Typography>
            <Typography variant={'subtitle2'}>Genre: {genres}</Typography>
          </Box>
        </Box>
        <CustomDivider />
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Typography variant={'h6'}>Official videos:</Typography>
          {renderVideos()}
        </Box>
      </Paper>
    </Box>
  )
}

export default MoviePage

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const res: Array<AxiosResponse> = await axios.all([
      getMovieApi(Number(params?.id)),
      getMovieVideosApi(Number(params?.id)),
    ])

    store.dispatch(setMovie({ data: res[0].data, videos: res[1].data.results }))
  }
)
