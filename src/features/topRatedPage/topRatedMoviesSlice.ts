import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { MoviesState } from '../../common/types/types'
import { initialMoviesState } from '../../common/utils/initData'

const hydrate = createAction<MoviesState>(HYDRATE)

const topRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState: initialMoviesState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTopRatedMovies(state, action) {
      state.isLoading = true
    },

    setTopRatedMovies(state, action) {
      state.data = action.payload
      state.isLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...(action.payload as any)[topRatedMoviesSlice.name],
      }
    })
  },
})

export const { getTopRatedMovies, setTopRatedMovies } =
  topRatedMoviesSlice.actions

export default topRatedMoviesSlice.reducer
