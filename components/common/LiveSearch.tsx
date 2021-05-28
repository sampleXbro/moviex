import { Box, Divider, Typography } from '@material-ui/core'
import { MoviesListProps } from '../../types/types'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const LiveSearch = ({ movies }: MoviesListProps): React.ReactElement => {
  const router = useRouter()

  const handleSearchItemClick = (id: number): void => {
    router.push(`/movies/${id}`)
  }

  const renderMovies = (): React.ReactNode => {
    return movies.map((mov) => (
      <div id={'searchList'} key={mov.id}>
        <Box
          display={'flex'}
          alignItems={'center'}
          onClick={() => handleSearchItemClick(mov.id)}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={'https://image.tmdb.org/t/p/w200' + mov.poster_path}
            width={50}
            height={75}
            layout={'intrinsic'}
          />
          <Typography style={{ marginLeft: '10px' }}>{mov.title}</Typography>
        </Box>
        <Divider
          color={'black'}
          flexItem
          style={{ height: '1px', margin: '5px 0' }}
        />
      </div>
    ))
  }

  const styles: React.CSSProperties = {
    top: 40,
    left: 0,
    position: 'absolute',
    width: '100%',
    minWidth: '100%',
    maxHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '5px',
    overflowX: 'auto',
    zIndex: 999,
  }

  return (
    <div style={styles}>
      {movies.length ? renderMovies() : <Typography>No results :(</Typography>}
    </div>
  )
}
