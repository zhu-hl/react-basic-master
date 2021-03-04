import { notification, message, Modal } from 'antd'

// check if Json
function isJson(data) {
  try {
    if (typeof (data) === 'object' && Object.prototype.toString.call(data).toLowerCase() === '[object object]' && !data.length) {
      return true
    }
  } catch (e) {
    return false
  }
  return false
}

// check if JsonString
function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
    return false
  }
  return false
}

// localStorage set
export function setItem(itemName, data) {
  try {
    if (isJson(data)) {
      data = JSON.stringify(data)
    }
    window.localStorage.setItem(itemName, data)
  } catch (e) {
    console.warn('LocalStorage setItem failed -' + e)
  }
}

// localStorage get
export function getItem(itemName) {
  const data = window.localStorage.getItem(itemName)
  if (isJsonString(data)) {
    return JSON.parse(data)
  }
  return data
}

// localStorage remove
export function removeItem(itemName) {
  window.localStorage.removeItem(itemName)
}

// 获取枚举类的lable
export function getOptioinsName(val, list) {
  let name = ''
  if (list) {
    const currentObj = list.find(item => item.value === val)
    if (currentObj) name = currentObj.label
  }
  return name
}

// Notification 通知
export function notify(opts = {}) {
  opts = {
    title: '成功',
    type: 'success',
    ...opts
  }
  notification[opts.type]({
    message: opts.title,
    description: opts.message,
  })
}

// message 提示
export function messageFn(opts = {}) {
  opts = {
    type: 'success',
    ...opts
  }
  message[opts.type]({
    message: opts.title,
    content: opts.message,
  })
}

// 弹出操作确认框
export function confirm(opts = {}) {
  const options = {
    title: opts.title || '确认删除该条记录吗?',
    okText: opts.okText || '确认',
    cancelText: opts.cancelText || '取消',
    onOk: opts.onOk,
    onCancel: opts.onCancel
  }
  Modal.confirm(options)
}
