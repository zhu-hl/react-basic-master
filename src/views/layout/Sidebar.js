import React from 'react'
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash'
import { setCollapse } from '@/redux/actions/common';
import * as Icon from '@ant-design/icons';
const { Sider } = Layout
const { SubMenu } = Menu;

class Sidebar extends React.Component {
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={item.name}
            icon={item.icon ? React.createElement(Icon[item.icon]) : null}
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item
          key={item.path}
          icon={item.icon ? React.createElement(Icon[item.icon]) : null}>
          <Link to={item.path}>
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
  onCollapse = collapse => {
    this.props.setCollapse({ isCollapsed: collapse })
}
  render() {
    const pathname = this.props.history.location.pathname;
    const menuOpened = `/${_.trimStart(pathname, '/').split('/', 1).join('/')}`;
    const menuSelected = `/${_.trimStart(pathname, '/').split('/', 2).join('/')}`;
    const { common, userInfo } = this.props
    return (
      <Sider className="app-sidebar" collapsible collapsed={common.isCollapsed} onCollapse={this.onCollapse}>
        <Scrollbars className="sidebar-scrollbar">
          <div className="logo">
            后台管理系统
          </div>
          <Menu
            defaultOpenKeys={[menuOpened]}
            defaultSelectedKeys={[menuSelected]}
            selectedKeys={[menuSelected]}
            mode="inline"
            theme="dark">
            {this.renderMenu(userInfo.auths)}
          </Menu>
        </Scrollbars>
      </Sider>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setCollapse: data => {
    dispatch(setCollapse(data))
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));