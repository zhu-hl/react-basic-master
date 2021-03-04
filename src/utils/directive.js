import Vue from 'vue'
import * as _ from 'lodash'
/**
 * 自定义指令 v-debounce
 * 调用方法 <button v-debounce="fn"/>
 * 空闲控制
 */
Vue.directive('debounce',
  {
    bind: (el, binding) => {
      const fn = binding.value
      const arg = binding.arg || '600'
      const wait = Number(arg)
      // 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 600ms 才会执行
      el.addEventListener('click', _.debounce(fn, wait, { leading: true, trailing: false }), false)
    }
  }
)
