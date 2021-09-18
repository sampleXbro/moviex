import { getMovie, useMovie } from '../../features/singleMoviePage'
import { Box, Paper, Typography, useMediaQuery } from '@material-ui/core'
import Image from 'next/image'
import React, { useEffect } from 'react'
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
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useTheme } from '@material-ui/core/styles'
import { CustomCircularProgress } from '../../common/components/common/CustomCircularProgress'
import { useToken } from '../../common/components/hooks/useToken'
import { Rating } from '@material-ui/lab'

function MoviePage(): JSX.Element {
  const { data, videos } = useMovie()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const authData = useAuth()
  const { isValidToken } = useToken()
  const favorites = useFavoriteMovies()
  const dispatch = useDispatch()
  const { query } = useRouter()

  useEffect(() => {
    dispatch(getMovie(query.id))
    dispatch(getFavoriteMovies(authData.sessionId))
  }, [authData.sessionId, query.id, dispatch])

  const genres: string = data?.genres.map((g) => g.name).join(', ')

  const isFavorite = favorites.data.results.some(
    (fav: Movie) => fav.id === data.id
  )

  const renderVideos = (): JSX.Element[] => {
    return videos
      ?.map((vid) => (
        <React.Fragment key={vid.id}>
          <Typography align={'center'} variant={'subtitle2'}>
            {vid.name}
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            textAlign={'center'}
            margin={'10px'}
            position={'relative'}
            width={'100%'}
            paddingTop={'56.25%'}
            key={vid.id}
          >
            <ReactPlayer
              style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}
              width={'100%'}
              height={'100%'}
              controls={true}
              light={true}
              url={`https://www.youtube.com/watch?v=${vid.key}`}
            />
          </Box>
        </React.Fragment>
      ))
      .reverse()
  }

  const handleFavoriteClick = (): void => {
    const payload = {
      movieId: String(data.id),
      sessionId: authData.sessionId,
      isFavorite: !isFavorite,
    }
    dispatch(changeFavorites(payload))
  }

  if (!data.id) return <CustomCircularProgress />

  return (
    <>
      <Head>
        <title>{`${data.title} | Moviex`}</title>
      </Head>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        margin={'10px auto'}
        maxWidth={'1200px'}
      >
        <Paper style={{ width: '100%' }}>
          <Box
            display={'flex'}
            padding={'10px'}
            flexDirection={isSm && 'column'}
            alignItems={isSm && 'center'}
          >
            <Box width={'100%'} maxWidth={'300px'}>
              <Image
                src={'https://image.tmdb.org/t/p/w300' + data?.poster_path}
                width={300}
                height={450}
                layout={'responsive'}
              />
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              flex={1}
              padding={'0 10px'}
              alignItems={isSm && 'center'}
              textAlign={isSm && 'center'}
            >
              <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Typography variant={'h4'}>{data?.title}</Typography>
                  {isValidToken ? (
                    isFavorite ? (
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
                    )
                  ) : null}
                </Box>
              </Box>
              <CustomDivider />
              <Box
                display={'flex'}
                justifyContent={isSm ? 'center' : 'flex-end'}
                width={'100%'}
              >
                <Rating
                  name={'rating'}
                  value={data.vote_average}
                  max={10}
                  readOnly
                  precision={0.1}
                />
              </Box>

              <Typography variant={'subtitle2'}>Жанры: {genres}</Typography>
              <hr />

              <Typography variant={'h6'}>
                {data?.budget
                  ? `Бюджет: ${data.budget} USD`
                  : 'Бюджет не указан'}
              </Typography>
              <hr />

              <Typography variant={'body1'}>{data?.overview}</Typography>
            </Box>
          </Box>
          <CustomDivider />
          <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Typography variant={'h6'}>Официальные видео:</Typography>
            {renderVideos()}
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default MoviePage
