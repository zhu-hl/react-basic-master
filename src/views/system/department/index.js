import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import DepartmentList from '@/views/system/department/list';

function Department() {
  return (
    <Switch>
      <Redirect from="/system/department" exact to="/system/department/list" />
      <Route path='/system/department/list' component={DepartmentList} />
    </Switch>
  )
}
export default Department