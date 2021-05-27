import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

type Movies = {
  data: any
  isLoading: boolean
}

const hydrate = createAction<Movies>(HYDRATE)

const initialState: Movies = {
  data: {
    nowPlaying: {},
    popular: {},
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
      console.log('HYDRATE', state, action.payload)

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
