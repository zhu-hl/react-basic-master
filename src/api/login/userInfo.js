import service from '../index'
import Mock from 'mockjs'

Mock.mock(/\/auth\/userInfo/, 'post', require('../data/login/userInfo.json'))
Mock.mock(/\/auth\/logout/, 'post', { success: true, message: 'Successfully' })

/**
 * axios的get请求参数放在params里面
 * service.get('/auth/userInfo', { params })
 * service.post('/auth/userInfo', params)
 * isHideLoading:是否隐藏Loading
 * service.post('/auth/userInfo', params, { isHideLoading: true })
 */
export const getUserInfo = (params) => {
  return service.post('/auth/userInfo', params)
}

export const logout = (params) => {
  return service.post('/auth/logout', params)
}