const initialState = {
  product: [],
};
export const products = (state = initialState, action) => {
  switch (action.type) {
    case "PROUDUCTS_ADD":
      return { ...state, products: action.payload };
      break;
    default:
      return state;
  }
};
