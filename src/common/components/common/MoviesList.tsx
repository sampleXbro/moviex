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
      height={'100%'}
    >
      {data.results.map((mov: Movie) => (
        <Box
          margin={'10px auto'}
          maxWidth={'1200px'}
          width={'100%'}
          height={'100%'}
          key={mov.id}
        >
          <Paper>
            <Box
              display={'flex'}
              minHeight={'250px'}
              padding={'10px'}
              justifyContent={'center'}
              flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
              alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
              textAlign={{ xs: 'center', sm: 'center', md: 'left' }}
            >
              <Box maxWidth={250} width={'100%'}>
                <Image
                  src={'https://image.tmdb.org/t/p/w300' + mov.poster_path}
                  width={250}
                  height={350}
                  layout={'responsive'}
                />
              </Box>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
                margin={'0 10px'}
                width={'100%'}
                height={'100%'}
              >
                <Link style={{ cursor: 'pointer' }}>
                  <NextLink href={`/movies/${mov.id}`}>
                    <Typography variant={'h6'}>
                      {mov.title} / {mov.original_title}
                    </Typography>
                  </NextLink>
                </Link>
                <Typography variant={'body2'}>
                  {mov.genre_ids.length > 1 ? 'Жанры: ' : 'Жанр: '}
                  {getGenreNamesByIds(mov.genre_ids)}
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={{
                    xs: 'center',
                    sm: 'center',
                    md: 'flex-end',
                  }}
                  width={'100%'}
                >
                  Рейтинг: {mov.vote_average} из 10
                </Box>
                <CustomDivider />
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  width={'100%'}
                  height={'100%'}
                  minHeight={{ xs: 'auto', sm: 'auto', md: '250px' }}
                  justifyContent={'space-between'}
                >
                  <Typography variant={'body2'}>{mov.overview}</Typography>

                  <Box display={'flex'} flexDirection={'column'}>
                    <CustomDivider />
                    <Box alignSelf={'flex-end'}>
                      <Typography variant={'body2'}>
                        Дата выхода: {mov.release_date}
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
