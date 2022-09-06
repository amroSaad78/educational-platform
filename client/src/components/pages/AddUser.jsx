import "../../assets/css/page_form.css";
import { onChange, onSubmit, onReset } from "../../actions/addUserActions";
import { SavedSuccessfully } from "../../constants/messages";
import { withRouter } from "../../helper/WithRouter";
import { addNewUser } from "../../constants/titles";
import * as labels from "../../constants/labels";
import FormButtonsList from "../FormButtonsList";
import { Steps } from "../../actions/types";
import OptionsField from "../OptionsField";
import FloatButton from "../FloatButton";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import TextField from "../TextField";
import PropTypes from "prop-types";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.getPayload = this.getPayload.bind(this);
  }

  getPayload() {
    return {
      tel: this.props.tel,
      role: this.props.role,
      name: this.props.name,
      email: this.props.email,
      identity: this.props.identity,
      password: this.props.password,
      confPass: this.props.confPass,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({ ...payload, nextStep: Steps.AddUser.New });
  }

  onReset() {
    if (this.props.busy) return;
    this.props.onReset();
  }

  onContinue() {
    if (this.props.busy) return;
    const payload = this.getPayload();
    this.props.onSubmit({ ...payload, nextStep: Steps.AddUser.Continue });
  }

  componentDidUpdate() {
    if (this.props.errorMessage) toast.error(this.props.errorMessage);
    if (this.props.nextStep === Steps.AddUser.New) {
      toast.success(SavedSuccessfully);
      this.onReset();
    }
  }

  componentWillUnmount() {
    this.props.onReset();
  }
  render() {
    return (
      <>
        <div className="page-form-container">
          <h1>{addNewUser}</h1>
          <form onSubmit={this.onSubmit}>
            <div className="inputs-container">
              <TextField
                error={this.props.nameErr}
                value={this.props.name}
                type="text"
                placeholder={labels.userName}
                name="name"
                maxLength={50}
                onChange={this.props.onChange}
              />
              <TextField
                error={this.props.emailErr}
                value={this.props.email}
                type="text"
                placeholder={labels.userEmail}
                name="email"
                maxLength={50}
                onChange={this.props.onChange}
              />

              <TextField
                error={this.props.identityErr}
                value={this.props.identity}
                type="text"
                placeholder={labels.userIdentity}
                name="identity"
                maxLength={10}
                onChange={this.props.onChange}
              />
              <TextField
                error={this.props.telErr}
                value={this.props.tel}
                type="text"
                placeholder={labels.userTel}
                name="tel"
                maxLength={11}
                onChange={this.props.onChange}
              />

              <TextField
                error={this.props.passwordErr}
                value={this.props.password}
                type="password"
                placeholder={labels.userPassword}
                name="password"
                maxLength={12}
                autoComplete="on"
                onChange={this.props.onChange}
              />
              <TextField
                error={this.props.confPassErr}
                value={this.props.confPass}
                type="password"
                placeholder={labels.userConfirmation}
                name="confPass"
                maxLength={12}
                autoComplete="on"
                onChange={this.props.onChange}
              />

              <OptionsField
                error={this.props.roleErr}
                value={this.props.role}
                placeholder={labels.userRole}
                name="role"
                onChange={this.props.onChange}
              />
            </div>
            <FormButtonsList
              resetValue={labels.reset}
              onReset={this.onReset}
              submitValue={labels.submit}
              continueValue={labels.submitAndContinue}
              onContinue={this.onContinue}
            />
          </form>
        </div>
        <FloatButton url="/users" icon="fas fa-angle-left" />
      </>
    );
  }
}

AddUser.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailErr: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameErr: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
  telErr: PropTypes.string.isRequired,
  identity: PropTypes.string.isRequired,
  identityErr: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordErr: PropTypes.string.isRequired,
  confPass: PropTypes.string.isRequired,
  confPassErr: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  roleErr: PropTypes.string.isRequired,
  nextStep: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  id: state.addUser.id,
  email: state.addUser.email,
  emailErr: state.addUser.emailErr,
  name: state.addUser.name,
  nameErr: state.addUser.nameErr,
  tel: state.addUser.tel,
  telErr: state.addUser.telErr,
  identity: state.addUser.identity,
  identityErr: state.addUser.identityErr,
  password: state.addUser.password,
  passwordErr: state.addUser.passwordErr,
  confPass: state.addUser.confPass,
  confPassErr: state.addUser.confPassErr,
  role: state.addUser.role,
  roleErr: state.addUser.roleErr,
  nextStep: state.addUser.nextStep,
  busy: state.addUser.busy,
  errorMessage: state.addUser.errorMessage,
});

export default connect(mapState, {
  onChange,
  onSubmit,
  onReset,
})(withRouter(AddUser));
