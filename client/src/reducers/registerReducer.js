import { Change } from "../actions/types";

const initialState = {
  name: "",
  nameErr: "",
  email: "",
  emailErr: "",
  password: "",
  passwordErr: "",
  errorMessage: "",
  confPass: "",
  confPassErr: "",
  routePath: "",
  busy: false,
};

const registerReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Register) return { ...state, ...payload };

  return state;
};

export default registerReducer;
