import React from 'react';
import { Table, Pagination } from 'antd';

class BasicTable extends React.Component {
  currentPageChange = (page) => {
    this.props.pageChangeHandler(page)
  }
  pageSizeChange = (current, size) => {
    this.props.pageSizeChangeHandler(size)
  }
  render() {
    const { paging, columns, data, rowKey } = this.props
    return (
      <div className="basic-table">
        {this.props.children}
        <Table
          bordered
          size={'small'}
          rowKey={rowKey}
          pagination={false}
          columns={columns}
          dataSource={data}
        />
        <Pagination
          total={paging.total}
          showSizeChanger
          showQuickJumper
          current={paging.currentPage}
          pageSize={paging.pageSize}
          pageSizeOptions={['10', '20', '50', '100']}
          showTotal={total => `共 ${total} 条`}
          onChange={this.currentPageChange}
          onShowSizeChange={this.pageSizeChange}
        />
      </div>
    )
  }
}

export default BasicTable