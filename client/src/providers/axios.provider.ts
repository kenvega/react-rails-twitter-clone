import axios, { AxiosError } from 'axios'
import { getJwt } from '../helpers/jwtHelper'

const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = getJwt()

    if (jwt) {
      config.headers && (config.headers.Authorization = `Bearer ${jwt}`)
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export { axiosInstance }
