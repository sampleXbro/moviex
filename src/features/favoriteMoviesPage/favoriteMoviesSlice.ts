import { createSlice } from '@reduxjs/toolkit'
import { initialMoviesState } from '../../common/utils/initData'

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

    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    changeFavorites(state, action) {
      state.isLoading = true
    },
  },
})

export const { getFavoriteMovies, setFavoriteMovies, changeFavorites } =
  favoriteMoviesSlice.actions

export default favoriteMoviesSlice.reducer
