import axios, { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie withain the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle 401 error here
      Cookies.remove('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
