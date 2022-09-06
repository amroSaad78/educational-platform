import { Change } from "../actions/types";
import { ConfirmationMessage } from "../constants/messages";

const initialState = {
  email: "",
  emailErr: "",
  errorMessage: "",
  infoMessage: ConfirmationMessage,
  busy: false,
};

const redeemReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Redeem) return { ...state, ...payload };

  return state;
};

export default redeemReducer;
