import lodash from 'lodash'
import * as helper from './helper'
import components from '@/components'
import rules from './validate'
const install = function(Vue, opts = {}) {
  if (install.installed) return
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  Vue.prototype._ = lodash
  Vue.prototype.$helper = helper
  Vue.prototype.$rules = rules
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ...components,
  install
}
