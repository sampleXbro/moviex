import { useSelector } from 'react-redux'

export const useMovies = () => useSelector((state: any) => state.movies)
