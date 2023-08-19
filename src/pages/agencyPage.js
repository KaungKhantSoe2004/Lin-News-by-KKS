import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { apiCall } from "../utilities/apiCall";
import { ResultCard } from "../components/resultCard";
import { getId, getName, getToken } from "../utilities/localStorage";
export const AgencyPage = () => {
  const { agency } = useParams();
  const [agencyArray, setAgencyArray] = useState([]);
  const navigate = useNavigate();
  const getAgency = async () => {
    const data = await apiCall(
      `https://newsapi.org/v2/top-headlines?sources=${agency}&apiKey=42ecbc14d8ba45b4b80536c1ccfb7acb`,
      "get"
    );
    setAgencyArray(data.data.articles);
    console.log(data.data.articles);
  };
  useEffect(() => {
    const name = getName();
    const id = getId();
    const password = getToken();
    if (name === null || id === null || password === null) {
      navigate("/");
    }
    getAgency();
  }, []);

  console.log(agency);

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
        News Agency : {agency}
      </h2>
      {agencyArray.length === 0 ? (
        <div className="text-white fs-5  me-4 text-center text-capitalize noArray">
          There is no news at {agency} currently.
        </div>
      ) : (
        <div className="resultContaier col-12  mt-3">
          {agencyArray?.map((eachResult, index) => (
            <ResultCard
              eachResult={eachResult}
              key={index}
              time={eachResult.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};
