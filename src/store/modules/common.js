import { LABEL_SUFFIX, LABEL_WIDTH } from '@/config/constant.js'
const constant = require('@/config/constant.json')
const optionsList = [
  { serviceName: 'system', optionsName: 'sex' }
]
// 初始化枚举类
function initDictList() {
  const obj = {}
  optionsList.forEach(({ serviceName, optionsName }) => {
    obj[`${serviceName}_${optionsName}`] = []
  })
  return obj
}
function refactorLanguage(source) {
  const target = {}
  for (const serviceName in source) {
    const options = source[serviceName]
    const optionObject = target[serviceName] = {}
    getList(options, optionObject)
  }
  return target
}
function getList(options, optionObject) {
  for (const optionsName in options) {
    const listObj = options[optionsName]
    const optionList = optionObject[optionsName] = []
    getLabel(listObj, optionList)
  }
}
function getLabel(listObj, optionList) {
  for (const val in listObj) {
    optionList.push({ label: listObj[val], value: val })
  }
}

const common = {
  namespaced: true,
  state: {
    ...initDictList,
    isCollapsed: false,
    matchPath: '',
    levelIcon: '',
    LABEL_SUFFIX,
    LABEL_WIDTH
  },
  mutations: {
    setConstant(state, data) {
      state.constant = {
        ...data
      }
    },
    setOptions(state, data) {
      const { optionsName, list } = data
      state[optionsName] = list
    },
    updateCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    updateMatchPath(state, data) {
      state.matchPath = data
    },
    updateLevelIcon(state, data) {
      state.levelIcon = data
    }
  },
  actions: {
    async init(context) {
      const { dispatch } = context
      await dispatch('getConstant')
      await dispatch('getConstantsOptions')
    },
    async getConstant(context) {
      const { commit } = context
      return new Promise(res => {
        const result = refactorLanguage(constant)
        commit('setConstant', result)
        res()
      })
    },
    async getConstantsOptions(context) {
      const { dispatch, commit, state } = context
      if (state.constant == null) {
        await dispatch('getConstant')
      } else {
        optionsList.forEach(({ serviceName, optionsName }) => {
          const source = state.constant
          commit('setOptions', {
            optionsName: serviceName + '_' + optionsName,
            list: source[serviceName][optionsName]
          })
        })
      }
    }
  }
}

export default common
