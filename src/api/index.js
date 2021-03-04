import axios from 'axios'
import baseURL from './baseUrl'
import { showLoading, hideLoading } from './loading.js'
import { notification } from 'antd'

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
// 报错处理
const handleError = function(response) {
  console.log(response)
  const errorText = codeMessage[response.status] || response.statusText
  notification.error({
    message: errorText,
    description: `请求错误 ${response.status}: ${response.config.url}`,
  });
}

const service = axios.create({
  baseURL: baseURL,
  headers: { 'Cache-Control': 'no-cache', 'BsmAjaxHeader': true },
  timeout: 20000,
  withCredentials: true
})

service.interceptors.request.use(config => {
  !config.isHideLoading && showLoading()
  if (config.method === 'get') {
    // 清除get缓存
    config.url = `${config.url}?t=${new Date().getTime()}`;
  }
  return config;
}, err => {
  return Promise.reject(err)
})

service.interceptors.response.use(
  response => {
    !response.config.isHideLoading && hideLoading()
    const res = response.data
    if (!res.success) {
      notification.error({
        message: response.config.url,
        description: res.message,
      });
    }
    return res
  },
  error => {
    hideLoading()
    handleError(error.response)
    return Promise.reject(error)
  }
)
export default service