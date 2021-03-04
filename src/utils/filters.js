import _ from 'lodash'
export function dictLabel(value, constants, options = {}) {
  if (!value) return value
  const dict = _.keyBy(constants, options.keyName || 'value')
  return _.get(dict[value], options.labelName || 'label')
}
