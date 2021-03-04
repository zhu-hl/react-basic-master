import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch  } from "react-router-dom";
import routes from './route'
import renderRoutes from './route/renderRoutes'

class App extends React.Component {
  render() {
    const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置
    let authed = this.props.userInfo.user || localStorage.getItem('userInfo') // 如果登陆之后可以利用redux修改该值
    return (
      <Router>
        <Switch>
          {renderRoutes(routes, authed, authPath)}
        </Switch>
      </Router>
    )
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps
)(App);
