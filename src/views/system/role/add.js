import React from 'react'
import { connect } from "react-redux";
import { Form, Input } from 'antd';
import CommonModal from '@/components/CommonModal'
import _ from 'lodash'
import * as helper from '@/utils/helper'
import { addRole, updateRole } from '@/api/system/role'
import validate from '@/utils/validate'

/**
 * React的setState方法是个异步方法.所以,若是在setState之后立即访问state,往往是不能得到更新之后的state值的
 * 有以下三个方法可解决
 * 1.利用setTimeout
 * 2.利用setState的回调函数：setState(updater, [callback])
 * 例：this.setState(({value}=>{
        value:value+1
      }),()=>{
        console.log(this.state.value);
      });
 * 3.利用Promise,进一步封装方法2
 * 例：setStatePromise(updator) {
        return new Promise( function (resolve,reject){
          this.setState(updator,resolve);
        }.bind(this))
      }
     componentDidMount(){
      this.setStatePromise(({value}) => ({
        value:value+1
      })).then(() => {
        console.log(this.state.value);
      });
     }
 */
class Add extends React.Component {
  roleData = {
    roleName: '',
    remark: ''
  }
  state = {
    visible: false,
    roleData: this.roleData
  }
  addFromRef = React.createRef();
  show = (row) => {
    this.setState(() => ({
      visible: true,
      title: row ? '编辑角色' : '新增角色',
      roleData: { ...this.state.roleData, ..._.pick(row, [..._.keys(this.state.roleData), 'roleId']) }
    }), () => {
      setTimeout(() => {
        this.addFromRef.current.setFieldsValue(this.state.roleData)
      })
    })
  }
  handleOk = () => {
    this.addFromRef.current.validateFields()
      .then(async(values) => {
        let result
        if (this.state.title === '新增角色') {
          result = await addRole({ ...this.state.roleData, ...values })
        } else {
          result = await updateRole({ ...this.state.roleData, ...values })
        }
        if (result.success) {
          helper.notify({ message: '提交成功' })
          this.handleCancel()
        }
      }).catch(() => {
        return
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      roleData: this.roleData
    })
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  render() {
    return (
      <CommonModal
        width="40%"
        title={this.state.title}
        visible={this.state.visible}
        handleOk={this.handleOk}
        handleCancel={this.handleCancel}
      >
        <Form
          className="modal-form"
          ref={this.addFromRef}
          autoComplete="off"
          colon={false}
        >
          <Form.Item label="角色名称" name="roleName" rules={validate({ required: true })}>
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea row={4} />
          </Form.Item>
        </Form>
      </CommonModal>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);