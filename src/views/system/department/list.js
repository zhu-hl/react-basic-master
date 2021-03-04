import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Form, Input, Space, Button } from 'antd';
import { setDepartmentSearchForm, setDepartmentList } from '@/redux/actions/system/department'
import BasicTable from '@/components/BasicTable'
import { EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import * as helper from '@/utils/helper'
import { deleteDepartment } from '@/api/system/department'

function List(props) {
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'departmentName'
    },
    {
      title: '部门经理',
      dataIndex: 'departmentManager'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      render: (text, record) => (
          <div className="table-operation">
            <Button icon={<EditOutlined />} type="link" onClick={() => editHandler(record)}>编辑</Button>
            <Button icon={<DeleteOutlined />} type="link" onClick={() => deleteHandler(record)}>删除</Button>
          </div>
      )
    }
  ]
  const [searchFromRef] = useState(React.createRef())
  const [searchForm] = useState(props.department.searchForm)
  function addHandler() {
  }
  function editHandler(row) {
    console.log(row)
  }
  function deleteHandler(row) {
    helper.confirm({
      onOk: async() => {
        const result = await deleteDepartment({ departmentId: row.departmentId })
        if (result.success) {
          helper.notify({ message: '删除记录成功' })
          handlePage()
        }
      }
    })
  }
  function resetFields() {
    searchFromRef.current.resetFields()
    props.setDepartmentSearchForm()
  }
  function handlePage(currentPage, pageSize) {
    const { paging } = props.department
    const searchForm = { ...props.department.searchForm, ...searchFromRef.current.getFieldsValue() }
    props.setDepartmentList({ paging, searchForm, currentPage, pageSize })
  }
  function handlePageSize(pageSize) {
    handlePage(undefined, pageSize)
  }
  function handleQuery(value) {
    props.setDepartmentSearchForm(value)
    handlePage(1)
  }
  useEffect(() => {
    if (props.location.search === '?cancel=true') {
      searchFromRef.current.setFieldsValue(searchForm)
      handlePage()
      return
    }
    props.setDepartmentSearchForm()
    handlePage(1, 10)
  }, [searchForm])
  const { paging, departmentList } = props.department
  return (
    <div className="wrapper-container">
      <Form
          className="search-form"
          ref={searchFromRef}
          layout="inline"
          autoComplete="off"
          onFinish={handleQuery}
      >
        <Form.Item label="部门名称" name="departmentName">
          <Input />
        </Form.Item>
        <Form.Item label="部门描述" name="remark">
          <Input />
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
              查询
            </Button>
            <Button icon={<ReloadOutlined />} onClick={resetFields}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <BasicTable
        columns={columns}
        rowKey={'departmentId'}
        data={departmentList}
        paging={paging}
        pageChangeHandler={handlePage}
        pageSizeChangeHandler={handlePageSize}
      >
        <div className="operation-area">
          <Button icon={<PlusOutlined />} type="primary" onClick={addHandler}>
            新增
          </Button>
        </div>
      </BasicTable>
    </div>
  )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setDepartmentSearchForm: data => {
    dispatch(setDepartmentSearchForm(data));
  },
  setDepartmentList: data => {
    dispatch(setDepartmentList(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);