import React from 'react'
import { connect } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import UserList from '@/views/system/user/list';
import AddUser from '@/views/system/user/add';
import EditUser from '@/views/system/user/add';
import DetailUser from '@/views/system/user/detail';

class User extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect from="/system/user" exact to="/system/user/list" />
        <Route path='/system/user/list' component={UserList} />
        <Route path='/system/user/add' component={AddUser} />
        <Route path='/system/user/edit/:id' component={EditUser} />
        <Route path='/system/user/detail/:id' component={DetailUser} />
      </Switch>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);