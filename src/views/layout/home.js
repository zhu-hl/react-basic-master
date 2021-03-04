import React from 'react'
import { connect } from "react-redux";
import { setUserInfo } from '@/redux/actions/userInfo';
import * as helper from '@/utils/helper'
import './index.scss'
import { Layout } from 'antd';
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'
import MainContent from './MainContent'

class Home extends React.Component{
  UNSAFE_componentWillMount() {
    this.props.setUserInfo(helper.getItem('userInfo'))
  }
  render(){
    return (
      <Layout className="app-wrapper">
        <Sidebar />
        <Layout>
          <TopHeader />
          <MainContent route={this.props.route} />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setUserInfo: data => {
    dispatch(setUserInfo(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);