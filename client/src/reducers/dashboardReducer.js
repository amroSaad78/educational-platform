import { Change } from "../actions/types";
const initialState = {
  imageURL: "images/user.png",
  userRole: "",
  routePath: "",
  busy: false,
};

const dashboardReducer = (state = initialState, action) => {
  const payload = action.payload;
  if (action.type === Change.Dashboard) return { ...state, ...payload };

  return state;
};

export default dashboardReducer;
