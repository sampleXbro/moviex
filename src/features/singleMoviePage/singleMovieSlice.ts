import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MoviesState } from '../../common/types/types'

const hydrate = createAction<MoviesState>(HYDRATE)

const initialMovieData = {
  adult: false,
  backdrop_path: '',
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: '',
  id: 0,
  imdb_id: '',
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  production_companies: [],
  production_countries: [],
  release_date: '',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
}

const singleMovieSlice = createSlice({
  name: 'singleMovie',
  initialState: {
    data: initialMovieData,
    videos: [],
    isLoading: false,
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMovie(state, action) {
      state.isLoading = true
    },

    setMovie(state, action) {
      state.data = action.payload.data
      state.videos = action.payload.videos
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[singleMovieSlice.name],
      }
    })
  },
})

export const { getMovie, setMovie } = singleMovieSlice.actions

export default singleMovieSlice.reducer
