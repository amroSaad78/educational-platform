import { config } from "../config/configurations";
import { Proxy } from "../services/proxy";
import { Change } from "./types";

export const getUserBasicData = () => async (dispatch) => {
  dispatch({
    type: Change.Dashboard,
    payload: { busy: true, routePath: "" },
  });
  const response = await Proxy.GetData("dash/user/basic");
  dispatch({ type: Change.Dashboard, payload: { busy: false } });
  if (response?.errMessage) {
    return dispatch({
      type: Change.Dashboard,
      payload: { ...response, routePath: "/auth" },
    });
  }
  dispatch({
    type: Change.Dashboard,
    payload: {
      userRole: response?.userRole,
      imageURL: response?.imageURL
        ? `${config.API_URL}/${response.imageURL}`
        : "images/user.png",
    },
  });
};
