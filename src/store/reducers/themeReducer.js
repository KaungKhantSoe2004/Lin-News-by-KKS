import { act } from "react-dom/test-utils";
const initialState = {
  theme: true,
};
export const theme = (state = initialState, action) => {
  switch (action.type) {
    case "DAY":
      return { theme: action.payload };
    // case "NIGHT":
    //   return action.payload
    default:
      return state;
  }
};
