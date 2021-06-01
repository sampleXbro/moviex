import { Box, Divider, Link, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { getGenresApi } from '../api/api'
import { Genre, Movie, MoviesListResponse } from '../../types/types'

type MoviesListProps = {
  data: MoviesListResponse
  reversed?: boolean
}

export const MoviesList = ({
  data,
  reversed,
}: MoviesListProps): React.ReactElement => {
  const [genres, setGenres] = useState<Array<Genre>>([])

  useEffect(() => {
    getGenresApi().then((res) => setGenres(res.data.genres))
  }, [])

  const getGenresByIds = (ids: Array<number>): string => {
    return genres
      .filter((genre: Genre) => ids.includes(genre.id))
      .map((genre: Genre) => genre.name)
      .join(', ')
  }

  return (
    <Box
      display={'flex'}
      flexDirection={reversed ? 'column-reverse' : 'column'}
    >
      {data.results.map((mov: Movie) => (
        <Paper
          key={mov.id}
          style={{ margin: '10px auto', maxWidth: '1200px', width: '100%' }}
        >
          <Box
            display={'flex'}
            minHeight={'250px'}
            padding={'10px'}
            justifyContent={'center'}
          >
            <Image
              src={'https://image.tmdb.org/t/p/w300' + mov.poster_path}
              width={250}
              height={350}
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
                <NextLink href={`/movies/${mov.id}`}>
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
    </Box>
  )
}
