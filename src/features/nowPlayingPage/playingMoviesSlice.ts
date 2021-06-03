import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MoviesState } from '../../common/types/types'
import { initialMoviesState } from '../../common/utils/initData'

const hydrate = createAction<MoviesState>(HYDRATE)

const playingMoviesSlice = createSlice({
  name: 'playingMovies',
  initialState: initialMoviesState,
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
      return {
        ...state,
        ...(action.payload as any)[playingMoviesSlice.name],
      }
    })
  },
})

export const { getPlayingMovies, setPlayingMovies } = playingMoviesSlice.actions

export default playingMoviesSlice.reducer
