import * as actionTypes from '@/redux/constants';
import * as departmentApi from '@/api/system/department'
import _ from 'lodash'

const setDepartmentSearchForm = (data) => {
  return {
    type: actionTypes.SET_DEPARTMENT_SEARCHFORM,
    data
  }
};
const setDepartmentList = (params) => {
  const action = data => ({
    type: actionTypes.SET_DEPARTMENT_LIST,
    data
  })
  return async(dispatch) => {
    const paging = {
      ...params.paging,
      ..._.omitBy(params, _.isUndefined)
    }
    const { pageSize } = paging
    const args = { ...params.searchForm, pageSize, pageNumber: paging.currentPage }
    const result = await departmentApi.getDepartmentList(_.omitBy(args, val => !val))
    if (result.success) {
      paging.total = result.data.total
      dispatch(action({
        paging: _.pick(paging, ['currentPage', 'pageSize', 'total']),
        departmentList: _.get(result, 'data.list', []) }))
    }
  }
};

export { setDepartmentSearchForm, setDepartmentList };
