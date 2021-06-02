import { createSlice } from '@reduxjs/toolkit'
import { initialMoviesState } from './initData'

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState: initialMoviesState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFavoriteMovies(state, action) {
      state.isLoading = true
    },

    setFavoriteMovies(state, action) {
      state.data = action.payload
      state.isLoading = false
    },

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeFavorites() {},
  },
})

export const { getFavoriteMovies, setFavoriteMovies } =
  favoriteMoviesSlice.actions

export default favoriteMoviesSlice.reducer
