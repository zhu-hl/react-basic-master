import React from 'react'
import { connect } from "react-redux";
import { Form, Input, Radio, Space, Button, Row, Col } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { addUser, updateUser, getUserDetail } from '@/api/system/user'
import * as helper from '@/utils/helper'
import _ from 'lodash'
import validate from '@/utils/validate'

class Add extends React.Component {
  state = {
    common: this.props.common,
    userData: {
      userId: '',
      username: '',
      sex: '01',
      phone: '',
      email: '',
      remark: ''
    }
  }
  addFromRef = React.createRef();
  get isAdding() {
    return this.props.match.params.id === undefined
  }
  async init() {
    const userId = this.props.match.params.id
    if (userId) {
      const result = await getUserDetail({ userId })
      if (result.success) {
        this.setState({
          userData: { ..._.pick(result.data, [..._.keys(this.state.userData), 'id']) }
        })
        this.addFromRef.current.setFieldsValue(this.state.userData)
      }
    }
  }
  checkValidate = async(values) => {
    let result
    if (this.isAdding) {
      result = await addUser(values)
    } else {
      result = await updateUser(values)
    }
    if (result.success) {
      helper.notify({ message: '提交成功' })
      this.goBack()
    }
  }
  goBack = (cancel) => {
    if (this.isAdding && !cancel) {
      this.props.history.push('/system/user/list')
      return
    }
    this.props.history.push('/system/user/list?cancel=true')
  }
  componentDidMount() {
    this.init()
  }
  render() {
    return (
      <div className="wrapper-container">
        <div className="page-title">
          {this.isAdding ? '添加用户' : '编辑用户'}
        </div>
        <Form
          className="add-edit-form"
          ref={this.addFromRef}
          autoComplete="off"
          colon={false}
          initialValues={this.state.userData}
          onFinish={this.checkValidate}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="用户工号" name="userId" validateFirst={true} rules={validate({ required: true, options: ['an'], maxLength: 10 })}>
                <Input disabled={!this.isAdding} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="用户名" name="username" rules={validate({ required: true })}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="性别" name="sex" rules={validate({ required: true })}>
                <Radio.Group>
                  {this.state.common['system_sex'].map((item, index) => {
                    return (
                      <Radio value={item.value} key={index}>{item.label}</Radio>
                    )
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="移动电话" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮箱" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注" name="remark">
                <Input.TextArea row={4} />
              </Form.Item>
            </Col>
          </Row>
          <div className="submit-btn-area">
            <Space size="middle">
              <Button icon={<CheckOutlined />} type="primary" htmlType="submit">
                提交
              </Button>
              <Button icon={<CloseOutlined />} onClick={() => this.goBack('cancel')}>
                取消
              </Button>
            </Space>
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
)(Add);