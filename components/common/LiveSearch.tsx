import { Box, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Movie } from '../../types/types'
import { getSearchedMoviesApi } from '../api/api'

type LiveSearchProps = {
  searchStr: string
}

let page = 2
let isFetched = false

export const LiveSearch = ({
  searchStr,
}: LiveSearchProps): React.ReactElement => {
  const router = useRouter()
  const [movies, setMovies] = React.useState<Array<Movie>>([])
  const ref: React.Ref<HTMLDivElement> = useRef(null)

  useEffect(() => {
    const el = ref.current

    if (searchStr.length > 2) {
      getSearchedMoviesApi(searchStr).then((res) => setMovies(res.data.results))
    } else {
      setMovies([])
    }

    el?.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [searchStr])

  const handleScroll = () => {
    // infinite scroll
    const el = ref.current

    if (el && el.scrollTop > el.scrollHeight - el.clientHeight - 150) {
      if (!isFetched) {
        page++
        getSearchedMoviesApi(searchStr, page).then((res) => {
          setMovies((prev) => {
            // prevent duplications from backend
            const data = res.data.results.filter(
              (mov: Movie) => !prev.some((m) => m.id === mov.id)
            )
            return [...prev, ...data]
          })
        })
        isFetched = true
      }
    } else {
      isFetched = false
    }
  }

  const handleSearchItemClick = (id: number): void => {
    router.push(`/movies/${id}`)
  }

  const renderMovies = (): React.ReactNode => {
    return movies.map((mov) => (
      <div key={mov.id}>
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
    overflow: 'auto',
    zIndex: 999,
  }

  return (
    <div style={styles} ref={ref}>
      {movies.length ? renderMovies() : <Typography>No results :(</Typography>}
    </div>
  )
}
