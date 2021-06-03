import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MoviesState } from '../../common/types/types'
import { initialMoviesState } from '../../common/utils/initData'

const hydrate = createAction<MoviesState>(HYDRATE)

const popularMovieSlice = createSlice({
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
        ...(action.payload as any)[popularMovieSlice.name],
      }
    })
  },
})

export const { getPopularMovies, setPopularMovies } = popularMovieSlice.actions

export default popularMovieSlice.reducer
