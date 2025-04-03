import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 获取当前环境的 baseURL
const isServer = typeof window === 'undefined'
// const baseURL = isServer
//   ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' // 服务器端
//   : window.location.origin // 客户端

const baseURL = 'https://agent-official-h5.7f5h2k9l.com'

// 创建 Axios 实例
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'vi-VN,vi;',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 这里可以添加 Token
    // const token =
    //   typeof window !== 'undefined' ? localStorage.getItem('token') : null
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 请求错误:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// 通用的 API 响应结构
interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

// 封装 POST 请求
export const apiPost = async <T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.post(
      url,
      body,
      config
    )
    return response.data
  } catch (error: any) {
    throw error.response?.data || { code: 500, message: 'Unknown error' }
  }
}

// 封装 GET 请求
export const apiGet = async <T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.get(url, {
      params,
      ...config,
    })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { code: 500, message: 'Unknown error' }
  }
}

export default api
