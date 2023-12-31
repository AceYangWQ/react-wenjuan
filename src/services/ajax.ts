import { message } from 'antd'
import axios from 'axios'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 拦截请求
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

// 拦截响应
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData
    if (errno !== 0) {
      return message.error(msg)
    }

    return data as any
  },
  error => Promise.reject(error)
)

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
