import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import Basic from '@/utils'
import * as filters from '@/utils/filters'
require('@/utils/directive.js')

Vue.use(ElementUI, { size: 'medium' })
Vue.use(Basic)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
store.dispatch('common/init')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
