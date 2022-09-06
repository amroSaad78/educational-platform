import { withRouter } from "../../helper/WithRouter";
import GoogleLoginBtns from "../GoogleLoginBtns";
import * as titles from "../../constants/titles";
import * as labels from "../../constants/labels";
import React, { Component } from "react";
import { connect } from "react-redux";
import AuthField from "../AuthField";
import PropTypes from "prop-types";
import {
  onSubmit,
  onSuccess,
  onFailure,
  onChange,
} from "../../actions/registerActions";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      confPass: this.props.confPass,
    };
    this.props.onSubmit(payload);
  }

  onSuccess({ tokenId }) {
    if (this.props.busy) return;
    this.props.onSuccess({ tokenId: tokenId });
  }

  componentDidUpdate() {
    const path = this.props.routePath;
    if (path) {
      this.props.navigate(path);
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="auth-form right-form">
        <h2 className="title">{titles.leftPanel}</h2>
        <p className="message error">
          {!this.props.busy && this.props.errorMessage}
        </p>
        <AuthField
          error={this.props.nameErr}
          type="text"
          placeholder={labels.userName}
          name="name"
          value={this.props.name}
          icon="fa-user"
          maxLength="50"
          onChange={this.props.onChange}
        />
        <AuthField
          error={this.props.emailErr}
          type="text"
          placeholder={labels.userEmail}
          name="email"
          value={this.props.email}
          icon="fa-envelope"
          maxLength="50"
          onChange={this.props.onChange}
        />
        <AuthField
          error={this.props.passwordErr}
          type="password"
          placeholder={labels.userPassword}
          name="password"
          value={this.props.password}
          icon="fa-lock"
          maxLength="12"
          onChange={this.props.onChange}
        />
        <AuthField
          error={this.props.confPassErr}
          type="password"
          placeholder={labels.userConfirmation}
          name="confPass"
          value={this.props.confPass}
          icon="fa-lock"
          maxLength="12"
          onChange={this.props.onChange}
        />
        <GoogleLoginBtns
          leftBtn={titles.googleBtn}
          rightBtn={titles.registerBtn}
          onSuccess={(e) => this.onSuccess(e)}
          onFailure={this.props.onFailure}
        />
      </form>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  nameErr: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailErr: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordErr: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  confPass: PropTypes.string.isRequired,
  confPassErr: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  name: state.register.name,
  nameErr: state.register.nameErr,
  email: state.register.email,
  emailErr: state.register.emailErr,
  password: state.register.password,
  passwordErr: state.register.passwordErr,
  errorMessage: state.register.errorMessage,
  confPass: state.register.confPass,
  confPassErr: state.register.confPassErr,
  routePath: state.register.routePath,
  busy: state.register.busy,
});

export default connect(mapState, { onSubmit, onSuccess, onFailure, onChange })(
  withRouter(RegisterForm)
);
