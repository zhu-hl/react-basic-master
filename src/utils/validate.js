const VALIDATE_TYPE = {
  REGEXP: Symbol('regexp'),
  FUNCTION: Symbol('function'),
  COMPARE: Symbol('compare')
}
const validateList = {
  email: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    errMsg: '请输入正确邮箱'
  },
  mobile: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^1[3,4,5,6,7,8,9]\d{9}$/,
    errMsg: '请输入正确的手机号码'
  },
  min: {
    // :rules="rules({ ... , options: [{type: 'min', options: { min: min-value } }])"
    type: VALIDATE_TYPE.COMPARE,
    errMsg: '必须大于等于',
    fn: (val, min) => {
      return val >= min
    }
  },
  max: {
    // :rules="rules({ ... , options: [{type: 'max', options: { max: max-value } }])"
    type: VALIDATE_TYPE.COMPARE,
    errMsg: '必须小于等于',
    fn: (val, max) => {
      return val <= max
    }
  },
  code: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^[A-Za-z0-9-:_]*$/,
    errMsg: '编码格式不正确'
  },
  password: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^[A-Z0-9\_]*$/i,
    errMsg: '密码只能是数字字母下划线组合'
  },
  ip: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
    errMsg: '请输入正确的ip地址'
  },
  an: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^[A-Z0-9]*$/i,
    errMsg: '只能输入字母和数字'
  },
  anc: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^[A-Z\u4E00-\u9FA5\s]*$/i,
    errMsg: '只能输入中英文'
  },
  phone: {
    type: VALIDATE_TYPE.FUNCTION,
    errMsg: '请输入正确的电话号码',
    fn: (val) => {
      const reg4 = /^[0-9]{7,12}$/
      return reg4.test(val)
    }
  },
  number: {
    type: VALIDATE_TYPE.REGEXP,
    reg: /^[0-9]*$/,
    errMsg: '只能输入数字'
  },
  csv: {
    type: VALIDATE_TYPE.FUNCTION,
    errMsg: '只能是csv文件',
    fn: (val) => {
      if (!val) return true
      const reg = /^[^，,]+(,[^，,]+)*$/
      if (!reg.test(val)) return false
      const arr = val.split(',')
      const newArr = Array.from(new Set(arr))
      if (newArr.length !== arr.length) {
        return false
      }
      return true
    }
  }
}
const validateType = {
  number: '只能是数字',
  array: '至少选择一个'
}
const validate = (type, options, rule, value, callback) => {
  if (value !== null && value !== '') { // If has value
    const validateObj = validateList[type] || {}
    const errMsg = options.errMsg || validateObj.errMsg
    if (validateObj.type === VALIDATE_TYPE.REGEXP) {
      // call validateRegexp method
      validateRegexp(validateObj, value, errMsg, callback)
      return
    }
    if (validateObj.type === VALIDATE_TYPE.FUNCTION) {
      validateFunction(validateObj, value, errMsg, callback)
      return
    }
    if (validateObj.type === VALIDATE_TYPE.COMPARE) {
      validateCompare(validateObj, value, errMsg, callback, options)
      return
    }
    callback()
  } else {
    callback()
  }
}

function validateRegexp(validateObj, value, errMsg, callback) {
  if (!validateObj.reg.test(value)) {
    // if not match regexp
    callback({ message: errMsg })
  } else {
    callback()
  }
}

function validateFunction(validateObj, value, errMsg, callback) {
  if (!validateObj.fn(value)) {
    // if not match the fn result
    callback({ message: errMsg })
  } else {
    callback()
  }
}

function validateCompare(validateObj, value, errMsg, callback, options) {
  // if is compare
  if (options.compare && !options.compare.bind(this, value)()) {
    callback({ message: errMsg })
    return
  }
  if (options.hasOwnProperty('max') && !validateObj.fn.bind(this, value, options.max)()) {
    callback({ message: errMsg + options.max })
    return
  }
  if (options.hasOwnProperty('min') && !validateObj.fn.bind(this, value, options.min)()) {
    callback({ message: errMsg + options.min })
    return
  }
  callback()
}

export default function(item) {
  const rules = []
  if (item.required) {
    rules.push({ required: true, whitespace: item.whitespace, message: item.message || '必填字段', trigger: item.trigger || 'blur' })
  }
  if (item.hasOwnProperty('maxLength')) {
    rules.push({ max: item.maxLength, message: '超出最大长度' + item.maxLength, trigger: item.trigger || 'blur' })
  }
  if (item.hasOwnProperty('minLength')) {
    rules.push({ min: item.minLength, message: '小于最小长度' + item.minLength, trigger: item.trigger || 'blur' })
  }
  if (item.hasOwnProperty('type')) {
    rules.push({ type: item.type, message: validateType[item.type], trigger: item.trigger || 'blur' })
  }
  if (item.hasOwnProperty('options')) {
    item.options.forEach(i => {
      const type = i.type || i
      const options = i.options || {}
      let trigger = 'blur'
      if (i.options && i.options.trigger) {
        trigger = i.options.trigger
      }
      rules.push({ validator: validate.bind(this, type, options), trigger: trigger })
    })
  }
  return rules
}
