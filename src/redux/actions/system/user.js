import * as actionTypes from '@/redux/constants';
import * as userApi from '@/api/system/user'
import _ from 'lodash'

const setUserSearchForm = (data) => {
  return {
    type: actionTypes.SET_USER_SEARCHFORM,
    data
  }
};
const setUserList = (params) => {
  const action = data => ({
    type: actionTypes.SET_USER_LIST,
    data
  })
  return async(dispatch) => {
    const paging = {
      ...params.paging,
      ..._.omitBy(params, _.isUndefined)
    }
    const { pageSize } = paging
    const args = { ...params.searchForm, pageSize, pageNumber: paging.currentPage }
    const result = await userApi.getUserList(_.omitBy(args, val => !val))
    if (result.success) {
      paging.total = result.data.total
      dispatch(action({
        paging: _.pick(paging, ['currentPage', 'pageSize', 'total']),
        userList: _.get(result, 'data.list', []) }))
    }
  }
};

const setUserDetail = (params) => {
  const action = data => ({
    type: actionTypes.SET_USER_DETAIL,
    data
  })
  return async(dispatch) => {
    const result = await userApi.getUserDetail(params)
    if (result.success) {
      dispatch(action(result.data))
    }
  }
};

export { setUserSearchForm, setUserList, setUserDetail };
