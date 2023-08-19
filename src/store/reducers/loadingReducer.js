import { init } from "@emailjs/browser";

const initialState = {
  isLoading: true,
};
export const loading = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { loading: action.payload };
    // case "NIGHT":
    //   return action.payload
    default:
      return state;
  }
};
