import * as actionTypes from '@/redux/constants';

const searchForm = {
  userId: '',
  username: '',
  sex: '',
  phone: '',
  orderBy: 'modifyTime',
}
const defaultState = {
  paging: {
    total: 0,
    currentPage: 1,
    pageSize: 10
  },
  searchForm: { ...searchForm },
  userList: [],
  userDetail: {}
}
const user = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_SEARCHFORM:
      if (action.data) {
        return { ...state, searchForm: { ...searchForm, ...action.data } };
      }
      return { ...state, searchForm: { ...searchForm } };
    case actionTypes.SET_USER_LIST:
      return { ...state, ...action.data };
    case actionTypes.SET_USER_DETAIL:
      return { ...state, userDetail: { ...state.userDetail, [action.data['userId']]: action.data } };
    default:
      return state;
  }
};

export default user;
