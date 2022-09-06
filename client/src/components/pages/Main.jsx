import { LeftFormMap, RightFormMap } from "../../helper/MainMaps";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Main extends Component {
  render() {
    return (
      <div className="forms-container">
        <div className="signin-signup">
          {LeftFormMap.get(this.props.leftForm)}
          {RightFormMap.get(this.props.rightForm)}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  rightForm: PropTypes.string.isRequired,
  leftForm: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  rightForm: state.main.rightForm,
  leftForm: state.main.leftForm,
});

export default connect(mapState, {})(Main);
