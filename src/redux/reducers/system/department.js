import * as actionTypes from '@/redux/constants';

const searchForm = {
  departmentName: '',
  remark: '',
  orderBy: 'modifyTime',
}
const defaultState = {
  paging: {
    total: 0,
    currentPage: 1,
    pageSize: 10
  },
  searchForm: { ...searchForm },
  departmentList: [],
  departmentDetail: {}
}
const department = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEPARTMENT_SEARCHFORM:
      if (action.data) {
        return { ...state, searchForm: { ...searchForm, ...action.data } };
      }
      return { ...state, searchForm: { ...searchForm } };
    case actionTypes.SET_DEPARTMENT_LIST:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default department;
