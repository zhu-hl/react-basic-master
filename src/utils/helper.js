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

// 弹出操作确认框
export function confirm(owner, opts = { type: 'warning' }) {
  const msgboxOptions = {
    type: 'warning',
    title: opts.title || '删除',
    message: opts.message || '确认删除该条记录吗?',
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  }
  return new Promise((resolve) => {
    owner.$msgbox(msgboxOptions).then(() => {
      resolve()
    }).catch(() => {
    })
  })
}

// Notification 通知
export function notify(owner, opts = {}) {
  opts = {
    title: '成功',
    type: 'success',
    ...opts
  }
  owner.$notify({
    title: opts.title,
    message: opts.message,
    type: opts.type
  })
}
