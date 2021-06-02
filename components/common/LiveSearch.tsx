import { Box, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Movie } from '../../types/types'
import { getSearchedMoviesApi } from '../../api/api'
import { CustomDivider } from './CustomDivider'

type LiveSearchProps = {
  searchStr: string
}

export const LiveSearch: React.FC<LiveSearchProps> = ({ searchStr }) => {
  const router = useRouter()
  const [movies, setMovies] = React.useState<Array<Movie>>([])
  const ref: React.Ref<HTMLDivElement> = useRef(null)
  const scrollVarsRef = useRef({ page: 2, isFetched: false })

  const handleScroll = useCallback(() => {
    // infinite scroll
    const el = ref.current
    const scrollVars = scrollVarsRef.current

    if (el && el.scrollTop > el.scrollHeight - el.clientHeight - 150) {
      if (!scrollVars.isFetched) {
        scrollVars.page++
        getSearchedMoviesApi(searchStr, scrollVars.page).then((res) => {
          setMovies((prev) => {
            // prevent duplications from backend
            const data = res.data.results.filter(
              (mov: Movie) => !prev.some((m) => m.id === mov.id)
            )
            return [...prev, ...data]
          })
        })
        scrollVars.isFetched = true
      }
    } else {
      scrollVars.isFetched = false
    }
  }, [searchStr])

  useEffect(() => {
    const el = ref.current

    if (searchStr.length > 2) {
      getSearchedMoviesApi(searchStr).then((res) => setMovies(res.data.results))
    } else {
      setMovies([])
    }

    el?.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [searchStr, handleScroll])

  const handleSearchItemClick = (id: number): void => {
    router.push(`/movies/${id}`)
  }

  const renderMovies = (): JSX.Element[] => {
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
        <CustomDivider />
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
