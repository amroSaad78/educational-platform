import { combineReducers } from "redux";
import { Reset } from "../actions/types";
import mainReducer from "./mainReducer";
import loginReducer from "./loginReducer";
import redeemReducer from "./redeemReducer";
import registerReducer from "./registerReducer";
import verficationReducer from "./verficationReducer";
import dashboardReducer from "./dashboardReducer";
import addUserReducer from "./addUserReducer";

const appReducer = combineReducers({
  main: mainReducer,
  login: loginReducer,
  redeem: redeemReducer,
  register: registerReducer,
  verfication: verficationReducer,
  dashboard: dashboardReducer,
  addUser: addUserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === Reset.AllReducers) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
