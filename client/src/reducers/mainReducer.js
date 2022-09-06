import { Change, LeftForm, RightForm } from "../actions/types";
const initialState = {
  rightForm: RightForm.Register,
  leftForm: LeftForm.Login,
};

const mainReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Main) return { ...state, ...payload };

  return state;
};

export default mainReducer;
