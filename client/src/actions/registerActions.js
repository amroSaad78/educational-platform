import { config } from "../config/configurations";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Register } from "../models/register";
import { Change, RightForm } from "./types";
import { Proxy } from "../services/proxy";

export const onSubmit =
  ({ name, email, password, confPass }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .between(name, 3, 50, "nameErr", errors.invalidName)
      .required(name, "nameErr", errors.requiredName)
      .isValidEmail(email, "emailErr", errors.invalidEmail)
      .required(email, "emailErr", errors.requiredEmail)
      .isSecure(password, "passwordErr", errors.weakPassword)
      .required(password, "passwordErr", errors.requiredPassword)
      .isEqual(password, confPass, "confPassErr", errors.invalidConfirmation)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.Register, payload: { ...error } });
    }
    dispatch({
      type: Change.Register,
      payload: { busy: true, errorMessage: "" },
    });
    const payload = new Register(name, email, password);
    const response = await Proxy.PostJsonData("auth/register", payload);
    dispatch({ type: Change.Register, payload: { busy: false } });
    if (response?.errMessage) {
      return dispatch({
        type: Change.Register,
        payload: { ...response, errorMessage: response.errMessage },
      });
    }
    dispatch({
      type: Change.Main,
      payload: { rightForm: RightForm.Verfication },
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
    type: Change.Register,
    payload: { busy: true, errorMessage: "", routePath: "" },
  });
  const response = await Proxy.PostJsonData("auth/google", payload);
  dispatch({ type: Change.Register, payload: { busy: false } });
  if (response?.errMessage) {
    return dispatch({
      type: Change.Register,
      payload: { ...response, errorMessage: response.errMessage },
    });
  }
  if (response?.token) {
    localStorage.setItem(config.TOKEN_NAME, response.token);
    dispatch({
      type: Change.Register,
      payload: { routePath: "/" },
    });
  }
};

export const onFailure = () => (dispatch) => {
  dispatch({
    type: Change.Register,
    payload: { errorMessage: errors.googleService },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.Register,
    payload: { [e.target.name]: e.target.value, [e.target.name + "Err"]: "" },
  });
};
