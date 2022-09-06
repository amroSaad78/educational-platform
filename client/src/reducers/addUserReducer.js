import { Change, Reset } from "../actions/types";

const initialState = {
  id: "",
  name: "",
  nameErr: "",
  email: "",
  emailErr: "",
  tel: "",
  telErr: "",
  identity: "",
  identityErr: "",
  password: "",
  passwordErr: "",
  confPass: "",
  confPassErr: "",
  errorMessage: "",
  role: "",
  roleErr: "",
  nextStep: "",
  busy: false,
};

const addUserReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Change.AddUser:
      return { ...state, ...payload };
    case Reset.AddUser:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default addUserReducer;
