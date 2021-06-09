import { getMovieSaga } from './singleMovieSagas'
import { useMovie } from './selectors'
import reducer, { getMovie, setMovie } from './singleMovieSlice'

export { reducer, getMovieSaga, getMovie, setMovie, useMovie }
