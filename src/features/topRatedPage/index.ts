import { getTopRatedMoviesSaga } from './topRatedMoviesSagas'
import { useTopRatedMovies } from './selectors'
import reducer, {
  getTopRatedMovies,
  setTopRatedMovies,
} from './topRatedMoviesSlice'

export {
  reducer,
  getTopRatedMoviesSaga,
  getTopRatedMovies,
  setTopRatedMovies,
  useTopRatedMovies,
}
