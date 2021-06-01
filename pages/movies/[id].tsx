import { wrapper } from '../../redux/store'
import { setMovie } from '../../redux/slices/singleMovieSlice'
import { useAuth, useMovie } from '../../redux/selectors/selectors'
import {
  changeFavoritesApi,
  getFavoriteMoviesApi,
  getMovieApi,
  getMovieVideosApi,
} from '../../components/api/api'
import { Box, Divider, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import ReactPlayer from 'react-player/youtube'
import { withAuthCheck } from '../../components/HOCs/withAuthCheck'
import { Star, StarBorder } from '@material-ui/icons'
import { Movie } from '../../types/types'

function MoviePage(): JSX.Element {
  const { data, videos } = useMovie()
  const authData = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getFavoriteMoviesApi(authData.sessionId).then((res) => {
      if (res.data.results.some((fav: Movie) => fav.id === data.id)) {
        setIsFavorite(true)
      }
    })
  }, [authData.sessionId, data.id])

  const genres: string = data.genres.map((g) => g.name).join(', ')

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
    changeFavoritesApi(String(data.id), authData.sessionId, !isFavorite).then(
      () => {
        setIsFavorite(!isFavorite)
      }
    )
  }

  return (
    <Paper style={{ margin: '10px auto', maxWidth: '1200px' }}>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        padding={'10px'}
        justifyContent={'center'}
      >
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
          <Divider
            color={'black'}
            flexItem
            style={{ height: '1px', margin: '10px 0' }}
          />
          <Typography variant={'h6'} style={{ marginBottom: '10px' }}>
            {data.budget
              ? `Budget: ${data.budget} USD`
              : 'Budget not specified'}
          </Typography>

          <Typography variant={'body1'} style={{ marginBottom: '10px' }}>
            {data.overview}
          </Typography>
          <Typography variant={'subtitle2'}>Genre: {genres}</Typography>
        </Box>
      </Box>
      <Divider
        color={'black'}
        flexItem
        style={{ height: '1px', margin: '10px' }}
      />
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Typography variant={'h6'} style={{ margin: '10px' }}>
          Official videos:
        </Typography>
        {renderVideos()}
      </Box>
    </Paper>
  )
}

export default withAuthCheck(MoviePage)

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const res: Array<AxiosResponse> = await axios.all([
      getMovieApi(Number(params?.id)),
      getMovieVideosApi(Number(params?.id)),
    ])

    store.dispatch(setMovie({ data: res[0].data, videos: res[1].data.results }))
  }
)
