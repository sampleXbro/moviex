import { getPlayingMoviesSaga } from './playingMoviesSagas'
import { usePlayingMovies } from './selectors'
import reducer, {
  getPlayingMovies,
  setPlayingMovies,
} from './playingMoviesSlice'

export {
  reducer,
  getPlayingMoviesSaga,
  getPlayingMovies,
  setPlayingMovies,
  usePlayingMovies,
}
