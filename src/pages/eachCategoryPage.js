import { useNavigate, useParams } from "react-router";
import { apiCall } from "../utilities/apiCall";
import { useEffect, useState } from "react";
import { ResultCard } from "../components/resultCard";
import { getId, getName, getToken } from "../utilities/localStorage";
export const EachCategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [categoryArray, setCategoryArray] = useState([]);
  const getCategories = async (key) => {
    try {
      const response = await apiCall(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`,
        "get"
      );
      setCategoryArray(response.data.articles);
    } catch (error) {
      if (
        "You have made too many requests" ===
        error.response.data.message.slice(0, 31)
      ) {
        // console.log("this is reload");
        getCategories("be6573e6b1384446a1c54dce334fb40d");
      }
    }
  };
  useEffect(() => {
    const name = getName();
    const id = getId();
    const password = getToken();
    if (name === null || id === null || password === null) {
      navigate("/");
    }
    getCategories("7d412c2e21ac4aeca0dac58752dd32d2");
  }, []);
  return (
    <div className="eachCategoryPage">
      <button
        className="  ms-4  mt-4 rounded-2  back"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
      <h2 className=" text-white text-center mt-4 text-capitalize">
        {category} News
      </h2>
      <div className="resultContaier col-12  mt-3">
        {categoryArray?.map((eachResult, index) => (
          <ResultCard
            eachResult={eachResult}
            key={index}
            time={eachResult.publishedAt}
          />
        ))}
      </div>
    </div>
  );
};
