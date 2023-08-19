import { useEffect, useReducer, useState } from "react";
import { getId, getName, getToken } from "../utilities/localStorage";
import { useNavigate } from "react-router";
import { apiCall } from "../utilities/apiCall";
import { RemoveCard } from "../components/removeCard";
import store from "../store";
import { useSelector } from "react-redux";
export const Favorites = ({ name, setMarginLeft }) => {
  const [favArr, setFavArr] = useState([]);
  const navigate = useNavigate("");
  const getFavArr = async (id) => {
    const res = await apiCall(
      `https://jsonserverforlinnews.onrender.com/user/${id}?_embed=favorites`,
      "get"
    );
    setFavArr(res.data.favorites);
  };
  // store.dispatch({
  //   type: "my lovely baby",
  //   payload: "a yan chx tl a kyonk ty pyaw ml",
  // });
  // console.log(store.getState());
  useEffect(() => {
    setMarginLeft(3);
    const namae = getName();
    const id = getId();
    const password = getToken();
    if (namae === null || id === null || password === null) {
      navigate("/");
    }
    getFavArr(id);
  }, []);
  const { theme } = useSelector((state) => state.theme);
  // console.log(theme, "is theme");
  // ${!theme && "themeLight"}
  return (
    <div className="favorites text-white">
      <h3
        className={` text-center mt-4 ${!theme && "themeLight"}`}
      >{`${name}'s Favorite News`}</h3>
      {favArr.length === 0 && (
        <h5
          className={`text-danger fw-light text-center col-12  mt-5 ${
            !theme && "themeLight"
          }`}
        >
          Currently, You don't have any favorite news.
        </h5>
      )}
      <div className="resultContaier col-12  mt-3">
        {favArr?.map((eachResult, index) => (
          <RemoveCard
            eachResult={eachResult}
            key={index}
            time={eachResult.time}
            removeId={eachResult.id}
            getFun={getFavArr}
          />
        ))}
      </div>
    </div>
  );
};
