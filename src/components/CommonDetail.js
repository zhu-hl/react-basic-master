import React from 'react';
import { Form, Space, Button, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

class CommonDetail extends React.Component {
  state = {
    defaultSpan: 8
  }
  get detailData() {
    const data = { ...this.props.data }
    this.props.setting.columns && this.props.setting.columns.forEach((item) => {
      if (item.filter) {
        data[item.value] = item.filter(data[item.value], item.arg)
      }
    })
    return data
  }
  goBack = () => {
    this.props.goBack()
  }
  render() {
    const { setting } = this.props
    return (
      <div>
        <div className="page-title">
          {setting['title']}
        </div>
        <Form className="add-edit-form">
          <Row>
            {setting.columns.map((item, index) => {
              return (
                <Col span={item.col || this.state.defaultSpan} key={index}>
                  <Form.Item label={item.label}>
                    {this.detailData[item.value]}
                  </Form.Item>
                </Col>
              )
            })}
          </Row>
          <div className="submit-btn-area">
            <Space size="middle">
              <Button icon={<LeftOutlined />} onClick={this.goBack}>
                返回
              </Button>
            </Space>
          </div>
        </Form>
        {this.props.children}
      </div>
    )
  }
}

export default CommonDetail