import React from 'react'
import { Layout } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined, MessageOutlined, LockOutlined, ExportOutlined } from '@ant-design/icons';
import * as helper from '@/utils/helper'
import { logout } from '@/api/login/userInfo';
const { Header } = Layout

class TopHeader extends React.Component {
  handleCommand = (params) => {
    if (params.key === '3') {
      this.logout()
    }
  }
  async logout () {
    const result = await logout()
    if (result.success) {
      helper.removeItem('userInfo')
      window.location.href = '/'
    }
  }
  render() {
    const userInfo = this.props.userInfo
    const menu = (
      <Menu onClick={this.handleCommand}>
        <Menu.Item key="0" icon={<MessageOutlined />}>
          用户信息
        </Menu.Item>
        <Menu.Item key="1" icon={<LockOutlined />}>
          修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" icon={<ExportOutlined />}>
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="app-header">
        <div className="header-personal">
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="ant-dropdown-link">
              <UserOutlined />
              {userInfo.user.name} <DownOutlined />
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
