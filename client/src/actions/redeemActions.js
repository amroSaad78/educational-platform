import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Change, LeftForm } from "./types";
import { Proxy } from "../services/proxy";
import { Basic } from "../models/basic";

export const onSubmit =
  ({ email }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .isValidEmail(email, "emailErr", errors.invalidEmail)
      .required(email, "emailErr", errors.requiredEmail)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.Redeem, payload: { ...error } });
    }
    dispatch({
      type: Change.Redeem,
      payload: { busy: true, errorMessage: "", infoMessage: "" },
    });
    const payload = new Basic(email);
    const response = await Proxy.PostJsonData("auth/redeem/code", payload);
    dispatch({ type: Change.Redeem, payload: { busy: false } });
    if (response?.errMessage) {
      return dispatch({
        type: Change.Redeem,
        payload: {
          ...response,
          errorMessage: response.errMessage,
          infoMessage: "",
        },
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
        verficationPath: "auth/redeem/verify",
        codeRequestPath: "auth/redeem/code",
      },
    });
  };

export const goBack = () => (dispatch) => {
  dispatch({
    type: Change.Main,
    payload: { leftForm: LeftForm.Login },
  });
};

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.Redeem,
    payload: { [e.target.name]: e.target.value, [e.target.name + "Err"]: "" },
  });
};
