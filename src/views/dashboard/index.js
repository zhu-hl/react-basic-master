import React from 'react'
import { connect } from "react-redux";

class Dashboard extends React.Component {
  render() {
    return (
      <div>Dashboard</div>
    )
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);