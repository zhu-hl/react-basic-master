import service from '../index'
import Mock from 'mockjs'

Mock.mock(/\/role\/list/, 'get', require('../data/system/roleList.json'))
Mock.mock(/\/role\/add/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/role\/update/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/role\/delete/, 'post', { success: true, message: 'Successfully' })

export const getRoleList = (params) => {
  return service.get('/role/list', params)
}
export const addRole = (params) => {
  console.log(params)
  return service.post('/role/add', params)
}
export const updateRole = (params) => {
  console.log(params)
  return service.post('/role/update', params)
}
export const deleteRole = (params) => {
  return service.post('/role/delete', params)
}
