import axios from "axios"

/**
 * Таймаут ожидания ответа (мс)
 */
const REQUEST_TIMEOUT = 8000

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: "http://188.120.248.184:8000",
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json"
  }
})

export { axiosInstance }
