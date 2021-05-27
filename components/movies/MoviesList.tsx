import { Box, Divider, Link, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { getGenresApi } from '../api/api'
import { CustomCircularProgress } from '../common/CustomCircularProgress'

type MoviesListProps = {
  movies: Array<any>
}

export const MoviesList = ({ movies }: MoviesListProps) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    getGenresApi().then((res: any) => setGenres(res.data.genres))
  }, [])

  const getGenresByIds = (ids: Array<number>) => {
    return genres
      .filter((genre: any) => ids.includes(genre.id))
      .map((genre: any) => genre.name)
      .join(', ')
  }

  if (!movies) return <CustomCircularProgress />

  return (
    <>
      {movies.map((mov: any) => (
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
                  <Typography
                    variant={'body2'}
                    style={{ alignSelf: 'flex-end' }}
                  >
                    Release date: {mov.release_date}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      ))}
    </>
  )
}
