import { apiCall } from "../../utilities/apiCall";

export const getProducts = () => {
  return async (dispatch) => {
    const data = await apiCall(
      "https://newsapi.org/v2/top-headlines?sources=time&apiKey=42ecbc14d8ba45b4b80536c1ccfb7acb",
      "get"
    );
    console.log(data.data.articles, "is data");
    dispatch({
      type: "PROUDUCTS_ADD",
      payload: data.data.articles,
    });
  };
};
