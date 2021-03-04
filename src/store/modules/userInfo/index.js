import { authLogin, authLogout, getUserInfo } from '@/api/login/login'
import * as helper from '@/utils/helper'

const userInfo = {
  namespaced: true,
  state: {
    user: {},
    roles: []
  },
  mutations: {
    initUser(state, data) {
      state.user = {
        ...state.user,
        ...data
      }
    },
    initRoles(state, data) {
      state.roles = [
        ...state.roles,
        ...data
      ]
    }
  },
  actions: {
    async login({ commit, dispatch }, params) {
      const result = await authLogin(params)
      if (result.success) {
        helper.setItem('userInfo', result.data)
        return result
      }
    },
    async logout({ commit }, params) {
      const result = await authLogout(params)
      if (result.success) {
        helper.removeItem('userInfo')
        location.href = '/'
        return result
      }
    },
    async getUserInfo({ commit, dispatch }, params) {
      const result = await getUserInfo(params)
      if (result.success) {
        commit('initUser', result.data.user)
        commit('initRoles', result.data.roles)
        return result
      }
    }
  }
}

export default userInfo
