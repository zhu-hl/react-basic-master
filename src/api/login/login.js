import service from '../index'
import Mock from 'mockjs'

Mock.mock(/\/auth\/login/, 'post', require('../data/login/login.json'))
Mock.mock(/\/auth\/logout/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/auth\/userInfo/, 'post', require('../data/login/login.json'))

/**
 * service.get('/auth/userInfo', { params })
 * service.post('/auth/userInfo', params)
 * axios的get请求参数放在params里面
 */
export const authLogin = (params) => {
  return service.post('/auth/login', params)
}
export const authLogout = (params) => {
  return service.post('/auth/logout', params)
}
export const getUserInfo = (params) => {
  return service.post('/auth/userInfo', params)
}
