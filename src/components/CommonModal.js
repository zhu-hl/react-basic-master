import React from 'react';
import { Modal } from 'antd';

class CommonModal extends React.Component {
  handleOk = () => {
    this.props.handleOk()
  }
  handleCancel = () => {
    this.props.handleCancel()
  }
  afterClose = () => {
    this.props.afterClose && this.props.afterClose()
  }
  render() {
    const { title, visible, okText, cancelText, width } = this.props
    return (
      <Modal
        title={title}
        visible={visible}
        width={width}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText={okText || '确认'}
        cancelText={cancelText || '取消'}
        afterClose={this.afterClose}
      >
        {this.props.children}
      </Modal>
    )
  }
}

export default CommonModal