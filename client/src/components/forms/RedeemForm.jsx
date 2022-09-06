import { onSubmit, goBack, onChange } from "../../actions/redeemActions";
import * as titles from "../../constants/titles";
import * as labels from "../../constants/labels";
import React, { Component } from "react";
import DoubleBtns from "../DoubleBtns";
import { connect } from "react-redux";
import AuthField from "../AuthField";
import PropTypes from "prop-types";

class RedeemForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = {
      email: this.props.email,
    };
    this.props.onSubmit(payload);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="auth-form left-form">
        <h2 className="title">{titles.redeemForm}</h2>
        <p className={`message ${this.props.errorMessage ? "error" : "info"}`}>
          {this.props.errorMessage
            ? this.props.errorMessage
            : this.props.infoMessage}
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
        <DoubleBtns
          leftBtn={titles.backBtn}
          rightBtn={titles.sendBtn}
          onClick={this.props.goBack}
        />
      </form>
    );
  }
}

RedeemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailErr: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  email: state.redeem.email,
  emailErr: state.redeem.emailErr,
  errorMessage: state.redeem.errorMessage,
  infoMessage: state.redeem.infoMessage,
  busy: state.redeem.busy,
});

export default connect(mapState, { onChange, onSubmit, goBack })(RedeemForm);
