import { withRouter } from "../../helper/WithRouter";
import * as titles from "../../constants/titles";
import * as labels from "../../constants/labels";
import GoogleLoginBtns from "../GoogleLoginBtns";
import React, { Component } from "react";
import { connect } from "react-redux";
import AuthField from "../AuthField";
import PropTypes from "prop-types";
import {
  onSubmit,
  onSuccess,
  onFailure,
  onChange,
  redeemPassword,
} from "../../actions/loginActions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = {
      email: this.props.email,
      password: this.props.password,
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
      <form onSubmit={this.onSubmit} className="auth-form left-form">
        <h2 className="title">{titles.rightPanel}</h2>
        <p className="message error">
          {!this.props.busy && this.props.errorMessage}
        </p>
        <AuthField
          error={this.props.emailErr}
          type="text"
          placeholder={labels.userEmail}
          name="email"
          value={this.props.email}
          icon="fa-user"
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
        <GoogleLoginBtns
          leftBtn={titles.googleBtn}
          rightBtn={titles.loginBtn}
          onSuccess={(e) => this.onSuccess(e)}
          onFailure={this.props.onFailure}
        />
        <p className="forgot-password" onClick={this.props.redeemPassword}>
          {titles.forgotPassword}
        </p>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  redeemPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailErr: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordErr: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  email: state.login.email,
  emailErr: state.login.emailErr,
  password: state.login.password,
  passwordErr: state.login.passwordErr,
  errorMessage: state.login.errorMessage,
  routePath: state.login.routePath,
  busy: state.login.busy,
});

export default connect(mapState, {
  onSubmit,
  onSuccess,
  onFailure,
  onChange,
  redeemPassword,
})(withRouter(LoginForm));
