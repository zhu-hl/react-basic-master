import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as helper from '@/utils/helper'
import { getUserInfo } from '@/api/login/userInfo';
import './login.scss'

class Login extends React.Component {
  handleSubmit = async (value) => {
    const result = await getUserInfo(value)
    if (result.success) {
      helper.setItem('userInfo', result.data)
      this.props.history.push('/home/dashboard')
    }
  }
  render() {
    return (
      <div className="login-container">
        <Form onFinish={this.handleSubmit} className="login-form" autoComplete="off">
          <div className="form-title">后台管理系统</div>
          <Form.Item name="userName" rules={[{ required: true, message: '请填写用户名！' }]}>
            <Input prefix={<UserOutlined />} size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请填写密码！' }]}>
            <Input.Password prefix={<UnlockOutlined />} size="large" placeholder="密码" />
          </Form.Item>
          <div className="form-area">
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);