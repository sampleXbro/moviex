import axios, { AxiosPromise } from 'axios'
import { LoginData } from '../../types/types'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

const Axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  responseType: 'json',
})

export const getNowPlayingMoviesApi = (page = 1): AxiosPromise => {
  return Axios.get(
    `/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
  )
}

export const getPopularMoviesApi = (page = 1): AxiosPromise => {
  return Axios.get(
    `/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
  )
}

export const getGenresApi = (): AxiosPromise => {
  return Axios.get(`/genre/movie/list?api_key=${apiKey}&language=en-US`)
}

export const getMovieApi = (id: number): AxiosPromise => {
  return Axios.get(`movie/${id}?api_key=${apiKey}&language=en-US`)
}

export const getMovieVideosApi = (id: number): AxiosPromise => {
  return Axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
  )
}

export const getSearchedMoviesApi = (str = '', page = 1): AxiosPromise => {
  return Axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${str}&page=${page}&include_adult=false`
  )
}

export const createRequestTokenApi = (): AxiosPromise => {
  return Axios.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
  )
}

export const authApi = (data: LoginData): AxiosPromise => {
  return Axios.post(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    data
  )
}

export const createSessionApi = (request_token: string): AxiosPromise => {
  return Axios.post(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
    { request_token }
  )
}
