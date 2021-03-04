import React from 'react'
import { connect } from "react-redux";
import { setUserDetail } from '@/redux/actions/system/user'
import CommonDetail from '@/components/CommonDetail'
import { getOptioinsName } from '@/utils/helper'

const detailSetting = (that) => ({
  title: '用户详情',
  columns: [
    { label: '用户工号', value: 'userId' },
    { label: '用户名', value: 'username' },
    { label: '性别', value: 'sex', filter: getOptioinsName, arg: that.props.common['system_sex'] },
    { label: '移动电话', value: 'phone' },
    { label: '邮箱', value: 'email' },
    { label: '角色', value: 'roleName' },
    { label: '备注', value: 'remark' }
  ]
})
class Detail extends React.Component {
  state = {
    pageId: this.props.match.params.id
  }
  get userDetail() {
    return this.props.user.userDetail[this.state.pageId] || {}
  }
  getUserDetail(userId) {
    this.props.setUserDetail({ userId })
  }
  goBack = ()=> {
    this.props.history.push('/system/user/list?cancel=true')
  }
  componentDidMount() {
    if (this.state.pageId) {
      this.getUserDetail(this.state.pageId)
    }
  }
  render() {
    return (
      <div className="wrapper-container">
        <CommonDetail
          setting={detailSetting(this)}
          data={this.userDetail}
          goBack={this.goBack}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setUserDetail: data => {
    dispatch(setUserDetail(data))
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);