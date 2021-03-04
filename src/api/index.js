import axios from 'axios'
import { showLoading, hideLoading } from './loading.js'
import { Notification, MessageBox } from 'element-ui'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache', 'BsmAjaxHeader': true },
  timeout: 20000
})

// 报错处理
const handleError = function(response) {
  const errorText = codeMessage[response.status] || response.statusText
  Notification({
    type: 'error',
    title: `请求错误 ${response.status}: ${response.config.url}`,
    message: errorText
  })
  const error = new Error(errorText)
  error.name = response.status
  error.response = response
  throw error
}
axiosInstance.interceptors.request.use(async config => {
  !config.isShowLoading && showLoading()
  if (config.method === 'get') {
    // 清除get缓存
    config.url = `${config.url}?t=${new Date().getTime()}`
  }
  return config
}, error => {
  hideLoading()
  return Promise.reject(error)
})
axiosInstance.interceptors.response.use(data => {
  !data.config.isShowLoading && hideLoading()
  const responseData = data.data
  const options = data.config.options || {}
  if (!responseData.success) {
    if (responseData.status === 401 || responseData.status === 509) {
      MessageBox('您已被登出，可以取消继续停留在当前页面，或者重新登录 ', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        location.href = '/'
      })
    } else if (!options.ignoreError) {
      Notification({
        message: responseData.message,
        type: 'error'
      })
    }
  }
  return responseData
}, error => {
  hideLoading()
  handleError(error.response)
  return Promise.reject(error)
})
export default axiosInstance
