import * as actionTypes from '@/redux/constants';
import * as roleApi from '@/api/system/role'
import _ from 'lodash'

const setRoleSearchForm = (data) => {
  return {
    type: actionTypes.SET_ROLE_SEARCHFORM,
    data
  }
};
const setRoleList = (params) => {
  const action = data => ({
    type: actionTypes.SET_ROLE_LIST,
    data
  })
  return async(dispatch) => {
    const paging = {
      ...params.paging,
      ..._.omitBy(params, _.isUndefined)
    }
    const { pageSize } = paging
    const args = { ...params.searchForm, pageSize, pageNumber: paging.currentPage }
    const result = await roleApi.getRoleList(_.omitBy(args, val => !val))
    if (result.success) {
      paging.total = result.data.total
      dispatch(action({
        paging: _.pick(paging, ['currentPage', 'pageSize', 'total']),
        roleList: _.get(result, 'data.list', []) }))
    }
  }
};

export { setRoleSearchForm, setRoleList };
