import Axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { usePersistStore } from '@/stores/persistStore'

const baseURL = 'http://localhost:4000/api'
import router from '../router'
const axios = Axios.create({
  baseURL,
  timeout: 30000
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    //注意useDataStore必须放在这个位置，见官方文档：https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
    const store = usePersistStore()
    const { token } = store
    //获取并设置token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    if (response.config.method !== 'get') {
      ElMessage({
        message: '操作成功',
        grouping: true,
        type: 'success'
      })
    }

    return response
  },
  (error) => {
    const code = error.response.status
    //unauthorized
    if (code === 401) {
      ElNotification({
        title: '发生错误',
        message: '登录已过期',
        type: 'error'
      })
      router.push('/login')
    } else if (code === 204) {
      ElMessage.warning('未找到任何数据')
    } else {
      const data = error.response.data
      if (data.errors) {
        ElMessage.error(`发生错误:${JSON.stringify(data.errors)}`)
      } else {
        const isString = typeof data === 'string'
        ElMessage.error(`发生错误:${isString ? data : `发生错误，${code}`}`)
      }
    }

    return Promise.reject(error)
  }
)

export default axios
