import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { reducers } from "./reducers";
import thunk from "redux-thunk";

// import { theme } from "./reducers/themeReducer";
const initialState = [];
export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk)
);
