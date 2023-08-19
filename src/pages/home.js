import {
  FaBusinessTime,
  FaClinicMedical,
  FaFlask,
  FaFlushed,
  FaMicroscope,
  FaNewspaper,
  FaSearch,
  FaSearchDollar,
  FaSimCard,
  FaVideo,
  FaVolleyballBall,
} from "react-icons/fa";
import { CiDark, CiSearch } from "react-icons/ci";
import { NewsCard } from "../components/NewsCard";
import axios from "axios";
import { apiCall } from "../utilities/apiCall";
import { useEffect, useState } from "react";
import { ResultCard } from "../components/resultCard";
import { apiKeys } from "../utilities/apiKeys";
import { UkrainCard } from "../components/ukraineCard";
import { NavLink, useNavigate } from "react-router-dom";
import { getId, getName, getToken } from "../utilities/localStorage";
import store from "../store";
import { useSelector } from "react-redux";
export const Home = ({ setMarginLeft, name }) => {
  const navigate = useNavigate("");

  console.log(window.location.href);
  // const navigate = useNavigate();
  const [resultArr, setResultArr] = useState([]);
  const [inputedValue, setInputedValue] = useState("");
  const [searchHeader, setSearchHeader] = useState();
  const [api, setApi] = useState("be6573e6b1384446a1c54dce334fb40d");
  const [ukraineArray, setUkraineArray] = useState([]);
  const [agenciesArray, setAgenciesArray] = useState([]);
  const getNewsAgency = async () => {
    const agencies = await axios
      .get(
        "https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=42ecbc14d8ba45b4b80536c1ccfb7acb"
      )
      .then((res) => {
        setAgenciesArray(res.data.sources);
      });
  };
  const getUkraine = async () => {
    const response = await apiCall(
      `https://newsapi.org/v2/top-headlines?q=ukraine&sortBy=publishedAt&pageSize=3&apiKey=065a3c46791643aa8294d835a37cb372`,
      "get"
    );

    setUkraineArray(response.data.articles);
    console.log(response.data.articles, "is ukraine arry");
  };
  const getResult = async (key) => {
    try {
      const result = await apiCall(
        `https://newsapi.org/v2/top-headlines?country=us&category=general&sortBy=publishedAt&apiKey=${key}`,
        "get"
      );
      // console.log(result.data.articles);
      setResultArr(result.data.articles);
    } catch (error) {
      if (
        "You have made too many requests" ===
        error.response.data.message.slice(0, 31)
      ) {
        console.log("this is reload");
        getResult("065a3c46791643aa8294d835a37cb372");
      }
    }
  };
  useEffect(() => {
    getResult("be6573e6b1384446a1c54dce334fb40d");
    getUkraine();
    getNewsAgency();
    setMarginLeft(0);
    const name = getName();
    const id = getId();
    const password = getToken();
    if (name === null || id === null || password === null) {
      navigate("login");
    }
  }, []);
  const searchFunction = async (key) => {
    if (inputedValue === "") {
      return;
    }
    try {
      const result = await apiCall(
        `https://newsapi.org/v2/everything?q=${inputedValue}&sortBy=publishedAt&relevancy&apiKey=${key}`,
        "get"
      );
      setResultArr(result.data.articles);
      setSearchHeader(inputedValue);
    } catch (error) {
      if (
        "You have made too many requests" ===
        error.response.data.message.slice(0, 31)
      ) {
        console.log("this is search");

        searchFunction("7d412c2e21ac4aeca0dac58752dd32d2");
      }
    }
  };
  const { theme } = useSelector((state) => state.theme);

  // store.dispatch({
  //   type: "bye",
  //   payload: "My love Htet Htet Khaning",
  // });
  // console.log(store.getState());

  // ${!theme && "themeLight"}
  return (
    <div className="home">
      {/* ukraine Session Start */}
      <div className="ukraineNewsSession col-12 d-flex flex-column justify-content-center align-items-center">
        <div className={`ukraineText fs-5 ${!theme && "themeLight"} `}>
          Latest Ukraine News
        </div>
        {/* <NewsCard /> */}
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div class="carousel-inner">
            {
              //  {ukraineArray?.map((eachObj, index) => (
              // <UkrainCard
              //   key={index}
              //   eachObj={eachObj}
              //   date={eachObj.publishedAt}
              // />
              // ))}
              ukraineArray?.map((eachObj, index) => (
                <UkrainCard
                  key={index}
                  baka={index}
                  eachObj={eachObj}
                  date={eachObj.publishedAt}
                />
              ))
            }
          </div>

          {/* {ukraineArray.length !== 0 && (
            <div class="carousel-inner"> */}

          {/* <div
                class="carousel-item active"
                onClick={() => {
                  window.location.assign(ukraineArray[0].url);
                }}
              >
                <img
                  src={ukraineArray[0].urlToImage}
                  class="d-block w-100 h-75"
                  alt="..."
                />
                <div class="carousel-caption d-block ukraineCardText d-md-block">
                  <h5 className="uCardText">
                    Date : {ukraineArray[0].publishedAt.slice(0, 10)}
                  </h5>
                  <p className="uCardText">
                    Description : {ukraineArray[0].description}
                  </p>
                </div>
              </div>
              <div
                class="carousel-item "
                onClick={() => {
                  window.location.assign(ukraineArray[1].url);
                }}
              >
                <img
                  src={ukraineArray[1].urlToImage}
                  class="d-block w-100 h-75"
                  alt="..."
                />
                <div class="carousel-caption d-block ukraineCardText d-md-block">
                  <h5 className="uCardText">
                    Date : {ukraineArray[1].publishedAt.slice(0, 10)}
                  </h5>
                  <p className="uCardText">
                    Description : {ukraineArray[1].description}
                  </p>
                </div>
              </div>
              <div
                class="carousel-item "
                onClick={() => {
                  window.location.assign(ukraineArray[2].url);
                }}
              >
                <img
                  src={ukraineArray[1].urlToImage}
                  class="d-block w-100 h-75"
                  alt="..."
                />
                <div class="carousel-caption d-block ukraineCardText d-md-block">
                  <h5 className="uCardText">
                    Date : {ukraineArray[2].publishedAt.slice(0, 10)}
                  </h5>
                  <p className="uCardText">
                    Description : {ukraineArray[2].description}
                  </p>
                </div>
              </div>{" "} */}
          {/* </div>
          )} */}

          {/* {ukraineArray.map((eachObj, index) => (
              <UkrainCard
                key={index}
                eachObj={eachObj}
                date={eachObj.publishedAt}
              />
            ))} */}
          {/* <div
              class="carousel-item active"
              onClick={() => {
                window.location.assign(ukraineArray[0].url);
              }}
            >
              <img
                src={ukraineArray[0].urlToImage}
                class="d-block w-100 h-75"
                alt="..."
              />
              <div class="carousel-caption d-block ukraineCardText d-md-block">
                <h5 className="uCardText">
                  Date : {ukraineArray[0].publishedAt.slice(0, 10)}
                </h5>
                <p className="uCardText">
                  Description : {ukraineArray[0].description}
                </p>
              </div>
            </div>

            <div
              class="carousel-item "
              onClick={() => {
                window.location.assign(ukraineArray[0].url);
              }}
            >
              <img
                src={ukraineArray[0].urlToImage}
                class="d-block w-100 h-75"
                alt="..."
              />
              <div class="carousel-caption d-block ukraineCardText d-md-block">
                <h5 className="uCardText">
                  Date : {ukraineArray[0].publishedAt.slice(0, 10)}
                </h5>
                <p className="uCardText">
                  Description : {ukraineArray[0].description}
                </p>
              </div>
            </div>

            <div
              class="carousel-item "
              onClick={() => {
                window.location.assign(ukraineArray[0].url);
              }}
            >
              <img
                src={ukraineArray[0].urlToImage}
                class="d-block w-100 h-75"
                alt="..."
              />
              <div class="carousel-caption d-block ukraineCardText d-md-block">
                <h5 className="uCardText">
                  Date : {ukraineArray[0].publishedAt.slice(0, 10)}
                </h5>
                <p className="uCardText">
                  Description : {ukraineArray[0].description}
                </p>
              </div>
            </div> */}
          {/* </div>} */}
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        {/* <img
          src="https://img.static-rmg.be/a/view/q75/w1600/h836/5362116/gettyimages-1555673532-jpg.jpg"
          className=" col-12 img-fluid img-thumbnail"
        /> */}
      </div>
      {/* ukraine Session end */}
      {/* category Session start */}
      <div className="categoryContainer col-12  mt-5">
        <div
          className={`categoryHeader  text-center fs-5 ${
            !theme && "themeLight"
          } `}
        >
          Categories
        </div>
        <div className="col-12 d-flex justify-content-center">
          <ul class="list-group list-group-flush mt-4 col-md-6 col-11 categoryLi ">
            <li class="list-group-item">
              <NavLink to="categories/health" className="text-decoration-none">
                <FaClinicMedical className="userIcon fs-3 text-danger text-decoration-none" />
                <span className=" ms-3 text-danger pt-5  text-decoration-none">
                  Health News
                </span>
              </NavLink>
            </li>
            <li class="list-group-item">
              <NavLink
                to="categories/business"
                className="text-decoration-none"
              >
                <FaBusinessTime className="userIcon fs-3 text-danger text-decoration-none" />
                <span className=" ms-3 text-danger pt-5 text-decoration-none">
                  Business News
                </span>
              </NavLink>
            </li>
            <li class="list-group-item">
              <NavLink to="categories/science" className="text-decoration-none">
                <FaMicroscope className="userIcon fs-3 text-danger  text-decoration-none" />
                <span className=" ms-3 text-danger pt-5  text-decoration-none">
                  Science News
                </span>
              </NavLink>
            </li>
            <li class="list-group-item">
              <NavLink to="categories/sports" className="text-decoration-none">
                <FaVolleyballBall className="userIcon fs-3 text-danger  text-decoration-none" />
                <span className=" ms-3 text-danger pt-5  text-decoration-none">
                  Sports News
                </span>
              </NavLink>
            </li>
            <li class="list-group-item">
              <NavLink
                to="categories/entertainment"
                className="text-decoration-none"
              >
                <FaVideo className="userIcon fs-3 text-danger  text-decoration-none" />
                <span className=" ms-3 text-danger pt-5  text-decoration-none">
                  Entertainment News
                </span>
              </NavLink>
            </li>
            <li class="list-group-item">
              <NavLink
                to="categories/technology"
                className="text-decoration-none"
              >
                <FaSimCard className="userIcon fs-3 text-danger  text-decoration-none" />
                <span className=" ms-3 text-danger pt-5  text-decoration-none">
                  Technological News
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* category session end */}

      {/* search Session start */}
      <div className="searchSessionContainer">
        <div className=" d-flex justify-content-center mt-4">
          <div className={`userName fs-5 ${!theme && "themeLight"}`}>
            {" "}
            User Name : {name}
          </div>
        </div>
        <div className="searchContainer  d-flex justify-content-center mt-2 ">
          <input
            className="search  rounded-1 col-md-6 p-1 col-8 d-block"
            placeholder="Search News...."
            value={inputedValue}
            onChange={(e) => {
              setInputedValue(e.target.value);
              console.log(e.target.value);
              if (e.target.value === "") {
                getResult();
                setInputedValue("");
                setSearchHeader("");
              }
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                searchFunction("065a3c46791643aa8294d835a37cb372");
                // setInputedValue("");
              }
            }}
          />
          <button
            type="button"
            className="searchButton  ms-2"
            onClick={(e) => {
              searchFunction(api);
              // setInputedValue("");
            }}
          >
            <CiSearch className=" pb-1 searchIcon" />
          </button>
        </div>
      </div>
      <div className="resultSessionContainer mt-4">
        <div
          className={`resultSessionHeader text-center fs-5 ${
            !theme && "themeLight"
          }`}
        >
          {searchHeader
            ? `News for Searching" ${searchHeader}"`
            : "General News For Today"}
        </div>
        <div className="resultContaier col-12  mt-3">
          {resultArr?.map((eachResult, index) => (
            <ResultCard
              eachResult={eachResult}
              key={index}
              time={eachResult.publishedAt}
            />
          ))}
        </div>
      </div>
      {/* search Session End */}

      {/* news Agency Session start */}
      <div className=" col-12 text-danger newsAgencyContainer mt-5">
        <h6
          className={`col-12 d-flex justify-content-center   d-flex justify-content-center ${
            !theme && "themeLight"
          }`}
        >
          You can also read news from popular News agency
        </h6>
        <h4 className=" d-flex justify-content-center text-capitalize ">
          Here is , Some popular News agencies !
        </h4>
        <div className="smallAgenciesContainer">
          {agenciesArray?.map((eachAgency, index) => (
            <div
              className="eachAgency"
              key={index}
              onClick={() => {
                navigate(`agencies/${eachAgency.id}`);
              }}
            >
              {eachAgency.name}
            </div>
          ))}
        </div>
      </div>
      {/* news Agency Session End */}
    </div>
  );
};
