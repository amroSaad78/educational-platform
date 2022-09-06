import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";

class Home extends Component {
  render() {
    return <h1>مرحبا بك فى المنصة التعليمية</h1>;
  }
}

Home.propTypes = {};

const mapState = (state) => ({});

export default connect(mapState)(Home);
