import axiosController from "../services/abortController";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";
import { Change, Reset } from "./types";
import { User } from "../models/user";

export const onSubmit =
  ({ name, email, tel, role, identity, password, confPass, nextStep }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .between(name, 3, 50, "nameErr", errors.invalidName)
      .required(name, "nameErr", errors.requiredName)
      .isValidEmail(email, "emailErr", errors.invalidEmail)
      .required(email, "emailErr", errors.requiredEmail)
      .isValidTel(tel, "telErr", errors.invalidTel)
      .required(tel, "telErr", errors.requiredTel)
      .isValidLength(identity, 10, "identityErr", errors.invalidIdentity)
      .required(identity, "identityErr", errors.requiredIdentity)
      .isSecure(password, "passwordErr", errors.weakPassword)
      .required(password, "passwordErr", errors.requiredPassword)
      .isEqual(password, confPass, "confPassErr", errors.invalidConfirmation)
      .required(role, "roleErr", errors.requiredRole)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.AddUser, payload: { ...error } });
    }
    dispatch({
      type: Change.AddUser,
      payload: { busy: true, errorMessage: "" },
    });
    const payload = new User(name, email, password, tel, identity, role);
    const response = await Proxy.PostJsonData("dash/user/add", payload);
    dispatch({ type: Change.AddUser, payload: { busy: false } });
    if (!response) return;
    if (response.errMessage) {
      return dispatch({
        type: Change.AddUser,
        payload: { ...response, errorMessage: response.errMessage },
      });
    }
    dispatch({
      type: Change.AddUser,
      payload: { ...response, id: response.id, nextStep: nextStep },
    });
  };

export const onReset = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.AddUser,
    payload: {},
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.AddUser,
    payload: {
      [e.target.name]: e.target.value,
      [e.target.name + "Err"]: "",
      errorMessage: "",
    },
  });
};
