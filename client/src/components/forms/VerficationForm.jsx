import { withRouter } from "../../helper/WithRouter";
import * as titles from "../../constants/titles";
import React, { Component } from "react";
import DoubleBtns from "../DoubleBtns";
import { connect } from "react-redux";
import AuthField from "../AuthField";
import PropTypes from "prop-types";
import {
  onSubmit,
  codeRequest,
  onChange,
} from "../../actions/verficationActions";

class VerficationForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.codeRequest = this.codeRequest.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = {
      email: this.props.email,
      code: this.props.code,
      verficationPath: this.props.verficationPath,
    };
    this.props.onSubmit(payload);
  }

  codeRequest() {
    if (this.props.busy) return;
    const payload = {
      email: this.props.email,
      codeRequestPath: this.props.codeRequestPath,
    };
    this.props.codeRequest(payload);
  }

  componentDidUpdate() {
    const path = this.props.routePath;
    if (path) {
      this.props.navigate(path);
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={`auth-form ${this.props.direction}`}
      >
        <h2 className="title">{titles.verficationForm}</h2>
        <p className={`message ${this.props.errorMessage ? "error" : "info"}`}>
          {this.props.errorMessage
            ? this.props.errorMessage
            : this.props.infoMessage}
        </p>
        <AuthField
          error={this.props.codeErr}
          type="text"
          placeholder={titles.verfCode}
          name="code"
          value={this.props.code}
          icon="fa-key"
          maxLength="15"
          onChange={this.props.onChange}
        />
        <DoubleBtns
          leftBtn={titles.reSendBtn}
          rightBtn={titles.verficationBtn}
          onClick={this.codeRequest}
        />
      </form>
    );
  }
}

VerficationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  codeRequest: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  codeErr: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  verficationPath: PropTypes.string.isRequired,
  codeRequestPath: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  email: state.verfication.email,
  code: state.verfication.code,
  codeErr: state.verfication.codeErr,
  infoMessage: state.verfication.infoMessage,
  errorMessage: state.verfication.errorMessage,
  verficationPath: state.verfication.verficationPath,
  codeRequestPath: state.verfication.codeRequestPath,
  routePath: state.verfication.routePath,
  busy: state.verfication.busy,
});

export default connect(mapState, { onChange, onSubmit, codeRequest })(
  withRouter(VerficationForm)
);
