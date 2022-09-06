import { config } from "../config/configurations";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Change, LeftForm } from "./types";
import { Proxy } from "../services/proxy";
import { Login } from "../models/login";

export const onSubmit =
  ({ email, password }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .isValidEmail(email, "emailErr", errors.invalidEmail)
      .required(email, "emailErr", errors.requiredEmail)
      .required(password, "passwordErr", errors.requiredPassword)
      .result();
    if (Object.keys(error).length) {
      return dispatch({
        type: Change.Login,
        payload: { ...error },
      });
    }
    dispatch({
      type: Change.Login,
      payload: { busy: true, errorMessage: "", routePath: "" },
    });
    const payload = new Login(email, password);
    const response = await Proxy.PostJsonData("auth/login", payload);
    dispatch({ type: Change.Login, payload: { busy: false } });
    if (response?.errMessage) {
      return dispatch({
        type: Change.Login,
        payload: { ...response, errorMessage: response.errMessage },
      });
    }
    if (response?.token) {
      localStorage.setItem(config.TOKEN_NAME, response.token);
      return dispatch({
        type: Change.Login,
        payload: { routePath: "/" },
      });
    }
    dispatch({
      type: Change.Main,
      payload: { leftForm: LeftForm.Verfication },
    });
    dispatch({
      type: Change.Verfication,
      payload: {
        email: email,
        verficationPath: "auth/verify",
        codeRequestPath: "auth/code",
      },
    });
  };

export const onSuccess = (payload) => async (dispatch) => {
  dispatch({
    type: Change.Login,
    payload: { busy: true, errorMessage: "", routePath: "" },
  });
  const response = await Proxy.PostJsonData("auth/google", payload);
  dispatch({ type: Change.Login, payload: { busy: false } });
  if (response?.errMessage) {
    return dispatch({
      type: Change.Login,
      payload: { ...response, errorMessage: response.errMessage },
    });
  }
  if (response?.token) {
    localStorage.setItem(config.TOKEN_NAME, response.token);
    dispatch({
      type: Change.Login,
      payload: { routePath: "/" },
    });
  }
};

export const onFailure = () => (dispatch) => {
  dispatch({
    type: Change.Login,
    payload: { errorMessage: errors.googleService },
  });
};

export const redeemPassword = () => (dispatch) => {
  dispatch({
    type: Change.Main,
    payload: { leftForm: LeftForm.Redeem },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.Login,
    payload: { [e.target.name]: e.target.value, [e.target.name + "Err"]: "" },
  });
};
