import * as actionTypes from '../constants/index';
const defaultState = {
  isCollapsed: false,
}
const common = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLAPSE:
      return { ...state, ...action.data };
    case actionTypes.SET_CONSTANT:
      return { ...state, [action.data['optionsName']]: action.data['list'] };
    default:
      return state;
  }
};

export default common;
