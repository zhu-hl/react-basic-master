import * as actionTypes from '../constants/index';

const constant = require('@/config/constant.json')
const optionsList = [
  { serviceName: 'system', optionsName: 'sex' }
]

function refactorLanguage(source) {
  const target = {}
  for (const serviceName in source) {
    const options = source[serviceName]
    const optionObject = target[serviceName] = {}
    getList(options, optionObject)
  }
  return target
}
function getList(options, optionObject) {
  for (const optionsName in options) {
    const listObj = options[optionsName]
    const optionList = optionObject[optionsName] = []
    getLabel(listObj, optionList)
  }
}
function getLabel(listObj, optionList) {
  for (const val in listObj) {
    optionList.push({ label: listObj[val], value: val })
  }
}

const setCollapse = (data) => {
  return {
    type: actionTypes.SET_COLLAPSE,
    data
  }
};
const setConstant = () => {
  const action = data => ({
    type: actionTypes.SET_CONSTANT,
    data
  })
  return async(dispatch) => {
    const source = refactorLanguage(constant)
    optionsList.forEach(({ serviceName, optionsName }) => {
      dispatch(action({
        optionsName: serviceName + '_' + optionsName,
        list: source[serviceName][optionsName]
      }))
    })
  }
}
export { setCollapse, setConstant };
