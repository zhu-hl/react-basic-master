import React from 'react'
import { connect } from "react-redux";
import { Form, Input, Space, Button } from 'antd';
import { setRoleSearchForm, setRoleList } from '@/redux/actions/system/role'
import BasicTable from '@/components/BasicTable'
import { EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import * as helper from '@/utils/helper'
import { deleteRole } from '@/api/system/role'
import Add from './add'

class List extends React.Component {
  state = {
    columns: [
      {
        title: '角色名称',
        dataIndex: 'roleName'
      },
      {
        title: '备注',
        dataIndex: 'remark'
      },
      {
        title: '操作',
        render: (text, record) => (
            <div className="table-operation">
              <Button icon={<EditOutlined />} type="link" onClick={() => this.editHandler(record)}>编辑</Button>
              <Button icon={<DeleteOutlined />} type="link" onClick={() => this.deleteHandler(record)}>删除</Button>
            </div>
        )
      }
    ],
    common: this.props.common,
    searchForm: this.props.role.searchForm
  }
  searchFromRef = React.createRef();
  handleQuery = value => {
    this.props.setRoleSearchForm(value)
    this.handlePage(1)
  }
  resetFields = () => {
    this.searchFromRef.current.resetFields()
    this.props.setRoleSearchForm()
  }
  handlePage = (currentPage, pageSize) => {
    const { paging } = this.props.role
    const searchForm = { ...this.props.role.searchForm, ...this.searchFromRef.current.getFieldsValue() }
    this.props.setRoleList({ paging, searchForm, currentPage, pageSize })
  }
  handlePageSize = (pageSize) => {
    this.handlePage(undefined, pageSize)
  }
  addHandler = () => {
    this.addRef.show()
  }
  editHandler = (row) => {
    this.addRef.show(row)
  }
  deleteHandler = (row) => {
    helper.confirm({
      onOk: async() => {
        const result = await deleteRole({ roleId: row.roleId })
        if (result.success) {
          helper.notify({ message: '删除记录成功' })
          this.handlePage()
        }
      }
    })
  }
  componentDidMount() {
    if (this.props.location.search === '?cancel=true') {
      this.searchFromRef.current.setFieldsValue(this.state.searchForm)
      this.handlePage()
      return
    }
    this.props.setRoleSearchForm()
    this.handlePage(1, 10)
  }
  render() {
    const { paging, roleList } = this.props.role
    return (
      <div className="wrapper-container">
        <Form
          className="search-form"
          ref={this.searchFromRef}
          layout="inline"
          autoComplete="off"
          onFinish={this.handleQuery}
        >
          <Form.Item label="角色名称" name="roleName">
            <Input />
          </Form.Item>
          <Form.Item label="角色描述" name="remark">
            <Input />
          </Form.Item>
          <Form.Item>
            <Space size="middle">
              <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                查询
              </Button>
              <Button icon={<ReloadOutlined />} onClick={this.resetFields}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <BasicTable
          columns={this.state.columns}
          rowKey={'roleId'}
          data={roleList}
          paging={paging}
          pageChangeHandler={this.handlePage}
          pageSizeChangeHandler={this.handlePageSize}
        >
          <div className="operation-area">
            <Button icon={<PlusOutlined />} type="primary" onClick={this.addHandler}>
              新增
            </Button>
          </div>
        </BasicTable>
        <Add onRef={(ref)=>{ this.addRef = ref}} />
      </div>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setRoleSearchForm: data => {
    dispatch(setRoleSearchForm(data));
  },
  setRoleList: data => {
    dispatch(setRoleList(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);