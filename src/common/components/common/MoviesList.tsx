import { Box, Link, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { getGenresApi } from '../../api/api'
import { Genre, Movie, MoviesListResponse } from '../../types/types'
import { CustomDivider } from './CustomDivider'

type MoviesListProps = {
  data: MoviesListResponse
  reversed?: boolean
}

export const MoviesList: React.FC<MoviesListProps> = ({ data, reversed }) => {
  const [genres, setGenres] = useState<Array<Genre>>([])

  useEffect(() => {
    getGenresApi().then((res) => setGenres(res.data.genres))
  }, [])

  const getGenreNamesByIds = (ids: Array<number>): string => {
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
        <Box
          margin={'10px auto'}
          maxWidth={'1200px'}
          width={'100%'}
          key={mov.id}
        >
          <Paper>
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

                <CustomDivider />
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
                    {getGenreNamesByIds(mov.genre_ids)}
                  </Typography>
                  <Box display={'flex'} flexDirection={'column'}>
                    <CustomDivider />
                    <Box alignSelf={'flex-end'}>
                      <Typography variant={'body2'}>
                        Release date: {mov.release_date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  )
}
