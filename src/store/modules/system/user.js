import _ from 'lodash'
import * as userApi from '@/api/system/user'
const searchForm = {
  userId: '',
  username: '',
  sex: '',
  phone: ''
}
const user = {
  namespaced: true,
  state: {
    paging: {
      total: 0,
      currentPage: 1,
      pageSize: 10
    },
    searchForm: { ...searchForm },
    userList: [],
    userDetail: {}
  },
  mutations: {
    updatePaging(state, data) {
      state.paging = {
        ...state.paging,
        ...data
      }
    },
    updateSearchForm(state, data) {
      if (data) {
        state.searchForm = {
          ...state.searchForm,
          ...data
        }
        return
      }
      state.searchForm = { ...searchForm }
    },
    updateUserList(state, data) {
      state.userList = [...data]
    },
    updateUserDetail(state, data) {
      state.userDetail = { ...state.userDetail, [data.userId]: data }
    }
  },
  actions: {
    // User List
    async getUserList({ dispatch, commit, state }, params) {
      const paging = {
        ...state.paging,
        ..._.omitBy(params, _.isUndefined)
      }
      const { pageSize } = paging
      const args = { ...state.searchForm, pageSize, pageNumber: paging.currentPage }
      const result = await userApi.getUserList(_.omitBy(args, val => val === ''))
      if (result.success) {
        paging.total = result.data.total
        commit('updatePaging', paging)
        commit('updateUserList', _.get(result, 'data.list', []))
      }
      return result
    },
    // User Detail
    async getUserDetail({ commit, state }, params) {
      const result = await userApi.getUserDetail(params)
      if (result.success) {
        commit('updateUserDetail', result.data)
      }
      return result
    },
    // Add User
    async addUser({ commit, state }, params) {
      const data = await userApi.addUser(params)
      return data
    },
    // Update User
    async updateUser({ commit, state }, params) {
      const data = await userApi.updateUser(params)
      return data
    },
    // Disable User
    async deleteUser({ commit, state }, params) {
      const data = await userApi.deleteUser(params)
      return data
    }
  }
}
export default user
