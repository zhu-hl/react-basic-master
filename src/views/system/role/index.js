import React from 'react'
import { connect } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import RoleList from '@/views/system/role/list';

class User extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect from="/system/role" exact to="/system/role/list" />
        <Route path='/system/role/list' component={RoleList} />
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