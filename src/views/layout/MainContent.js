import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
const { Content } = Layout

class MainContent extends React.Component {
  render() {
    const { route } = this.props
    return (
      <Content className="app-main">
        <Scrollbars className="custom-scrollbar">
          <Switch>
            {route.children && route.children.map((value, key) => {
              return (
                <Route
                  route={value}
                  key={key}
                  exact={value.exact ? true : false}
                  path={value.path}
                  component={value.component}
                />
              );
            })}
          </Switch>
        </Scrollbars>
      </Content>
    )
  }
}

export default withRouter(MainContent)