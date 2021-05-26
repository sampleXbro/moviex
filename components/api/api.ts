import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export const getNowPlayingMoviesApi = (page = 1) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
  )
}
