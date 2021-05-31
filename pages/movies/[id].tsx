import { wrapper } from '../../redux/store'
import { setMovie } from '../../redux/slices/singleMovieSlice'
import { useMovie } from '../../redux/selectors/selectors'
import { getMovieApi, getMovieVideosApi } from '../../components/api/api'
import { Box, Divider, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import ReactPlayer from 'react-player/youtube'
import { withAuthCheck } from '../../components/HOCs/withAuthCheck'
import { Star, StarBorder } from '@material-ui/icons'

function MoviePage(): JSX.Element {
  const { data, videos } = useMovie()

  const favorites: Array<string> = JSON.parse(
    localStorage.getItem('moviex/favorites') || '[]'
  )
  const isFavorite = favorites.includes(String(data.id))

  const [favorite, setFavorite] = useState(isFavorite)
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
    if (isFavorite) {
      localStorage.setItem(
        'moviex/favorites',
        JSON.stringify(
          favorites.filter((fav: string) => Number(fav) !== data.id)
        )
      )
      setFavorite(false)
    } else {
      favorites.push(String(data.id))
      localStorage.setItem('moviex/favorites', JSON.stringify(favorites))
      setFavorite(true)
    }
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
              {favorite ? (
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
