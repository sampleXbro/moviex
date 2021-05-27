import Head from 'next/head'
import { wrapper } from '../redux/store'
import { getPlayingMovies, setPlayingMovies } from '../redux/slices/movieSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getGenresApi, getNowPlayingMoviesApi } from '../components/api/api'
import { Box, Divider, Link, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Pagination } from '@material-ui/lab'
import Image from 'next/image'
import NextLink from 'next/link'

export default function NowPlaying({ genres }: any) {
  const { data } = useSelector((state: any) => state.playingMoviesReducer)
  const dispatch = useDispatch()

  const parsedGenres = JSON.parse(genres)

  const getGenresByIds = (ids: Array<number>) => {
    return parsedGenres
      .filter((genre: any) => ids.includes(genre.id))
      .map((genre: any) => genre.name)
      .join(', ')
  }

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(getPlayingMovies(value))
  }

  console.log(data.results)

  const renderMoviesList = () => {
    return data.results?.map((mov: any) => (
      <Paper key={mov.id} style={{ margin: '10px auto', maxWidth: '1200px' }}>
        <Box display={'flex'} minHeight={'250px'} padding={'10px'}>
          <Image
            src={'https://image.tmdb.org/t/p/w300' + mov.poster_path}
            width={250}
            height={375}
            layout={'intrinsic'}
          />
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            margin={'0 10px'}
            width={'100%'}
          >
            <Link style={{ cursor: 'pointer' }}>
              <NextLink href={'/'}>
                <Typography variant={'h5'}>
                  {mov.title} / {mov.original_title}
                </Typography>
              </NextLink>
            </Link>

            <Divider
              color={'black'}
              flexItem
              style={{ height: '1px', margin: '5px 0' }}
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              width={'100%'}
              height={'100%'}
              justifyContent={'space-between'}
            >
              <Typography variant={'body2'}>{mov.overview}</Typography>
              <Typography variant={'body1'}>
                {mov.genre_ids.length > 1 ? 'Genres: ' : 'Genre: '}
                {getGenresByIds(mov.genre_ids)}
              </Typography>
              <Box display={'flex'} flexDirection={'column'}>
                <Divider
                  color={'black'}
                  flexItem
                  style={{ height: '1px', margin: '5px 0' }}
                />
                <Typography variant={'body2'} style={{ alignSelf: 'flex-end' }}>
                  Release date: {mov.release_date}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    ))
  }

  return (
    <>
      <Head>
        <title>Moviex | Now playing</title>
      </Head>
      <Typography variant={'h4'} align={'center'}>
        NOW PLAYING
      </Typography>
      {renderMoviesList()}
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          onChange={handlePaginationChange}
          count={data.total_pages}
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
    const genres = await getGenresApi()

    store.dispatch(setPlayingMovies(data))
    return {
      props: {
        genres: JSON.stringify(genres.data.genres),
      },
    }
  }
)
