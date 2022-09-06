import { VerficationMessage } from "../constants/messages";
import { Verfication } from "../models/verfication";
import { config } from "../config/configurations";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";
import { Basic } from "../models/basic";
import { Change } from "./types";

export const onSubmit =
  ({ email, code, verficationPath }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .isValidEmail(email, "errorMessage", errors.invalidEmail)
      .required(email, "errorMessage", errors.requiredEmail)
      .required(code, "codeErr", errors.requiredVerfCode)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.Verfication, payload: { ...error } });
    }
    dispatch({
      type: Change.Verfication,
      payload: { busy: true, errorMessage: "", infoMessage: "", routePath: "" },
    });
    const payload = new Verfication(email, code);
    const response = await Proxy.PostJsonData(verficationPath, payload);
    dispatch({ type: Change.Verfication, payload: { busy: false } });
    if (response?.errMessage) {
      return dispatch({
        type: Change.Verfication,
        payload: {
          ...response,
          errorMessage: response.errMessage,
          infoMessage: "",
        },
      });
    }
    localStorage.setItem(config.TOKEN_NAME, response.token);
    dispatch({
      type: Change.Verfication,
      payload: { routePath: "/" },
    });
  };

export const codeRequest =
  ({ email, codeRequestPath }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .isValidEmail(email, "errorMessage", errors.invalidEmail)
      .required(email, "errorMessage", errors.requiredEmail)
      .result();
    if (Object.keys(error).length) {
      return dispatch({ type: Change.Verfication, payload: { ...error } });
    }
    dispatch({
      type: Change.Verfication,
      payload: { busy: true, errorMessage: "", infoMessage: "" },
    });
    const payload = new Basic(email);
    const response = await Proxy.PostJsonData(codeRequestPath, payload);
    dispatch({ type: Change.Verfication, payload: { busy: false } });
    if (response?.errMessage) {
      return dispatch({
        type: Change.Verfication,
        payload: {
          ...response,
          errorMessage: response.errMessage,
          infoMessage: "",
        },
      });
    }
    dispatch({
      type: Change.Verfication,
      payload: {
        ...response,
        errorMessage: "",
        infoMessage: VerficationMessage,
      },
    });
  };

export const onChange = (e) => (dispatch) => {
  dispatch({
    type: Change.Verfication,
    payload: { [e.target.name]: e.target.value, [e.target.name + "Err"]: "" },
  });
};
