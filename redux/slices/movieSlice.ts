import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

type PlayingMovies = {
  data: any
  isLoading: boolean
}

const hydrate = createAction<PlayingMovies>(HYDRATE)

const initialState: PlayingMovies = {
  data: {},
  isLoading: false,
}

const playingMovieSlice = createSlice({
  name: 'playingMoviesReducer',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPlayingMovies(state, action) {
      state.isLoading = true
    },

    setPlayingMovies(state, action) {
      state.data = action.payload
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE', state, action.payload)

      return {
        ...state,
        ...(action.payload as any)[playingMovieSlice.name],
      }
    })
  },
})

export const { getPlayingMovies, setPlayingMovies } = playingMovieSlice.actions

export default playingMovieSlice.reducer
