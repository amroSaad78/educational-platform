import { connect } from "react-redux";
import React, { Component } from "react";
import FloatButton from "../FloatButton";

class Users extends Component {
  render() {
    return (
      <>
        <div className="users-container"></div>
        <FloatButton url="/add-user" icon="fas fa-user-plus" />
      </>
    );
  }
}

Users.propTypes = {};

const mapState = (state) => ({});

export default connect(mapState)(Users);
