import "../assets/css/auth.css";
import React, { Component } from "react";
import Panel from "../components/Panel";
import { Outlet } from "react-router-dom";
import * as titles from "../constants/titles";
import * as messages from "../constants/messages";

class AuthLayout extends Component {
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
  render() {
    return (
      <div
        className={`auth-container ${this.state.toggle ? "sign-up-mode" : ""}`}
      >
        <Outlet />

        <div className="panels-container">
          <Panel
            position="left-panel"
            title={titles.leftPanel}
            body={messages.PanelBody}
            btnId="sign-up-btn"
            btnVal={titles.registerBtn}
            imgSrc="images/log.svg"
            onClick={this.onClick}
          />

          <Panel
            position="right-panel"
            title={titles.rightPanel}
            body={messages.PanelBody}
            btnId="sign-in-btn"
            btnVal={titles.loginBtn}
            imgSrc="images/register.svg"
            onClick={this.onClick}
          />
        </div>
      </div>
    );
  }
}

export default AuthLayout;
