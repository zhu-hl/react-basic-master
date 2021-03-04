import service from '../index'
import Mock from 'mockjs'

Mock.mock(/\/user\/list/, 'get', require('../data/system/user/list.json'))
Mock.mock(/\/user\/detail/, 'get', require('../data/system/user/detail.json'))
Mock.mock(/\/user\/add/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/user\/update/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/user\/delete/, 'post', { success: true, message: 'Successfully' })

export const getUserList = (params) => {
  return service.get('/user/list', params)
}
export const getUserDetail = (params) => {
  return service.get('/user/detail', params)
}
export const addUser = (params) => {
  return service.post('/user/add', params)
}
export const updateUser = (params) => {
  return service.post('/user/update', params)
}
export const deleteUser = (params) => {
  return service.post('/user/delete', params)
}
