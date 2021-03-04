import React from 'react'
import { connect } from "react-redux";
import { Form, Input, Select, Space, Button } from 'antd';
import { setUserSearchForm, setUserList } from '@/redux/actions/system/user'
import BasicTable from '@/components/BasicTable'
import { EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import * as helper from '@/utils/helper'
import { deleteUser } from '@/api/system/user'

/**
 * React中组件的props更新需要经历更新过程
 * 也就是调用了componentWillReceiveProps等一系列生命周期函数才会更新this.props
 * dispatch之后还来不及同步走一遍生命周期，所以this.props没有同步更新。
 * render()中是同步更新
 */
class List extends React.Component {
  state = {
    columns: [
      {
        title: '用户工号',
        dataIndex: 'userId',
        render: (text, record) => (
          <Button style={{padding: '0px'}} type="link" onClick={() => this.detailHandler(record)}>{text}</Button>
        )
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: sex => helper.getOptioinsName(sex, this.state.common['system_sex'])
      },
      {
        title: '移动电话',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '角色',
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
    searchForm: this.props.user.searchForm
  }
  searchFromRef = React.createRef();
  handleQuery = value => {
    this.props.setUserSearchForm(value)
    this.handlePage(1)
  }
  resetFields = () => {
    this.searchFromRef.current.resetFields()
    this.props.setUserSearchForm()
  }
  handlePage = (currentPage, pageSize) => {
    const { paging } = this.props.user
    const searchForm = { ...this.props.user.searchForm, ...this.searchFromRef.current.getFieldsValue() }
    this.props.setUserList({ paging, searchForm, currentPage, pageSize })
  }
  handlePageSize = (pageSize) => {
    this.handlePage(undefined, pageSize)
  }
  addHandler = () => {
    this.props.history.push('/system/user/add')
  }
  editHandler = (row) => {
    this.props.history.push(`/system/user/edit/${row.userId}`)
  }
  detailHandler = (row) => {
    this.props.history.push(`/system/user/detail/${row.userId}`)
  }
  deleteHandler = (row) => {
    helper.confirm({
      onOk: async() => {
        const result = await deleteUser({ userId: row.userId })
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
    this.props.setUserSearchForm()
    this.handlePage(1, 10)
  }
  render() {
    const { paging, userList } = this.props.user
    return (
      <div className="wrapper-container">
        <Form
          className="search-form"
          ref={this.searchFromRef}
          layout="inline"
          autoComplete="off"
          onFinish={this.handleQuery}
        >
          <Form.Item label="用户工号" name="userId">
            <Input />
          </Form.Item>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Select>
              {this.state.common['system_sex'].map((item, index) => {
                return (
                  <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="移动电话" name="phone">
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
          rowKey={'userId'}
          data={userList}
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
      </div>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setUserSearchForm: data => {
    dispatch(setUserSearchForm(data));
  },
  setUserList: data => {
    dispatch(setUserList(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);