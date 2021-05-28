import { wrapper } from '../../redux/store'
import { setMovie } from '../../redux/slices/singleMovieSlice'
import { useMovie } from '../../redux/selectors/selectors'
import { getMovieApi, getMovieVideosApi } from '../../components/api/api'
import { Box, Divider, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import React from 'react'
import axios, { AxiosResponse } from 'axios'
import ReactPlayer from 'react-player/youtube'

export default function MoviePage() {
  const { data, videos } = useMovie()
  const genres: string = data.genres.map((g) => g.name).join(', ')

  const renderVideos = () => {
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
            <Typography variant={'h4'}>{data.title}</Typography>
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

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    const res: Array<AxiosResponse> = await axios.all([
      getMovieApi(Number(params?.id)),
      getMovieVideosApi(Number(params?.id)),
    ])

    store.dispatch(setMovie({ data: res[0].data, videos: res[1].data.results }))
  }
)
