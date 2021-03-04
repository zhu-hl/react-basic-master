import { combineReducers } from 'redux';
import common from './common';
import userInfo from './userInfo';
import system from './system'

export default combineReducers({
  common,
  userInfo,
  ...system
});