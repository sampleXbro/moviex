import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MoviesState } from '../../types/types'
import { initialMoviesState } from './initData'

const hydrate = createAction<MoviesState>(HYDRATE)

const playingMovieSlice = createSlice({
  name: 'popularMovies',
  initialState: initialMoviesState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPopularMovies(state, action) {
      state.isLoading = true
    },

    setPopularMovies(state, action) {
      state.data = action.payload
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[playingMovieSlice.name],
      }
    })
  },
})

export const { getPopularMovies, setPopularMovies } = playingMovieSlice.actions

export default playingMovieSlice.reducer