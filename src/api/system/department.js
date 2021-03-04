import service from '../index'
import Mock from 'mockjs'

Mock.mock(/\/department\/list/, 'get', require('../data/system/departmentList.json'))
Mock.mock(/\/department\/add/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/department\/update/, 'post', { success: true, message: 'Successfully' })
Mock.mock(/\/department\/delete/, 'post', { success: true, message: 'Successfully' })

export const getDepartmentList = (params) => {
  console.log(params)
  return service.get('/department/list', params)
}
export const addDepartment = (params) => {
  console.log(params)
  return service.post('/department/add', params)
}
export const updateDepartment = (params) => {
  console.log(params)
  return service.post('/department/update', params)
}
export const deleteDepartment = (params) => {
  return service.post('/department/delete', params)
}
