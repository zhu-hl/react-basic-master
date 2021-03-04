import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
// 当前正在请求的数量
let requestCount = 0

const startLoading = () => {
  var dom = document.createElement('div')
  dom.setAttribute('id', 'loading')
  document.body.appendChild(dom)
  ReactDOM.render(<Spin tip="Loading..." size="large"/>, dom)
  setTimeout(endLoading, 10000)
}

const endLoading = () => {
  if (document.getElementById('loading')) {
    document.body.removeChild(document.getElementById('loading'))
  }
}

// 显示loading
export function showLoading () {
  if (requestCount === 0) {
    startLoading()
  }
  requestCount++
}

// 隐藏loading
export function hideLoading () {
  requestCount--
  if (requestCount === 0) {
    endLoading()
  }
}