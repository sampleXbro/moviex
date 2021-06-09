import { getPopularMoviesSaga } from './popularMoviesSagas'
import { usePopularMovies } from './selectors'
import reducer, {
  getPopularMovies,
  setPopularMovies,
} from './popularMoviesSlice'

export {
  reducer,
  getPopularMoviesSaga,
  getPopularMovies,
  setPopularMovies,
  usePopularMovies,
}
