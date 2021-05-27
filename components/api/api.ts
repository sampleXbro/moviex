import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

const Axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  responseType: 'json',
})

export const getNowPlayingMoviesApi = (page = 1) => {
  return Axios.get(
    `/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
  )
}

export const getPopularMoviesApi = (page = 1) => {
  return Axios.get(
    `/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
  )
}

export const getGenresApi = () => {
  return Axios.get(`/genre/movie/list?api_key=${apiKey}&language=en-US`)
}
