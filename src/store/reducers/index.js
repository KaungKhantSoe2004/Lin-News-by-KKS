import { combineReducers } from "redux";
import { theme } from "./themeReducer";
import { products } from "./productReducer";
import { loading } from "./loadingReducer";

export const reducers = combineReducers({
  theme: theme,
  products: products,
  loading: loading,
});
