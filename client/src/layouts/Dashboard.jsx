import "../assets/css/dashboard.css";
import { getUserBasicData } from "../actions/dashboardActions";
import { withRouter } from "../helper/WithRouter";
import { ToastContainer } from "react-toastify";
import SidebarMap from "../helper/SidebarMap";
import * as names from "../constants/menus";
import { Outlet } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from "../components/Menu";
import PropTypes from "prop-types";

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.state.toggle
      ? this.setState({ toggle: false })
      : this.setState({ toggle: true });
  }
  componentDidMount() {
    this.props.getUserBasicData();
  }
  componentDidUpdate() {
    const path = this.props.routePath;
    if (path) {
      this.props.navigate(path);
    }
  }
  render() {
    return (
      <div className={`dash-container ${this.state.toggle ? "active" : ""}`}>
        <div className="main">
          <div className="menuBox">
            <Menu
              iconClass="far fa-comment-alt"
              number={1500}
              name={names.messages}
            />
            <Menu iconClass="far fa-bell" number={320} name={names.alerts} />
            <Menu iconClass="far fa-user" number={20} name={names.visitors} />
            <Menu
              iconClass="fas fa-photo-video"
              number={1950}
              name={names.media}
            />
          </div>
          <div className="pageBox">
            <Outlet />
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </div>
        </div>
        <div className="side-bar">
          <div className="side-bar-toggle">
            <span onClick={this.onClick} />
          </div>
          <div className="img-container profile-img">
            <img alt="" src={this.props.imageURL} />
          </div>
          {SidebarMap.get(this.props.userRole)}
          <div className="img-container brand-logo">
            <img alt="" src="images/logo.png" />
          </div>
        </div>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  getUserBasicData: PropTypes.func.isRequired,
  imageURL: PropTypes.string,
  userRole: PropTypes.string,
  routePath: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  imageURL: state.dashboard.imageURL,
  userRole: state.dashboard.userRole,
  routePath: state.dashboard.routePath,
  busy: state.dashboard.busy,
});

export default connect(mapState, {
  getUserBasicData,
})(withRouter(DashboardLayout));
