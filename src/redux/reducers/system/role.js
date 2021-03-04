import * as actionTypes from '@/redux/constants';

const searchForm = {
  roleName: '',
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
  roleList: [],
  roleDetail: {}
}
const role = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROLE_SEARCHFORM:
      if (action.data) {
        return { ...state, searchForm: { ...searchForm, ...action.data } };
      }
      return { ...state, searchForm: { ...searchForm } };
    case actionTypes.SET_ROLE_LIST:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default role;
