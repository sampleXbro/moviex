import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MoviesState } from '../../types/types'

const hydrate = createAction<MoviesState>(HYDRATE)

export const moviesInitData = {
  dates: { maximum: '', minimum: '' },
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 1,
}

const initialState: MoviesState = {
  data: {
    nowPlaying: moviesInitData,
    popular: moviesInitData,
  },
  isLoading: false,
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPlayingMovies(state, action) {
      state.isLoading = true
    },

    setPlayingMovies(state, action) {
      state.data.nowPlaying = action.payload
      state.isLoading = false
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPopularMovies(state, action) {
      state.isLoading = true
    },

    setPopularMovies(state, action) {
      state.data.popular = action.payload
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[movieSlice.name],
      }
    })
  },
})

export const {
  getPlayingMovies,
  setPlayingMovies,
  getPopularMovies,
  setPopularMovies,
} = movieSlice.actions

export default movieSlice.reducer
