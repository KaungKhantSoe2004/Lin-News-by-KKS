import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getId } from "../utilities/localStorage";
import { apiCall } from "../utilities/apiCall";
import axios from "axios";
import { parse } from "@fortawesome/fontawesome-svg-core";

export const RemoveCard = ({ eachResult, time, removeId, getFun }) => {
  const id = parseInt(getId());
  //   const dataPost = async (data) => {
  //     let resp = await axios.post(`http://localhost:3003/favorites`, data);
  //   };
  const removePost = async () => {
    let resp = await apiCall(
      `http://localhost:3003/favorites/${removeId}`,
      "delete"
    );
    getFun(getId());
  };
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate("");
  // console.log(time[]);
  // let [date, setDate] = useState('')
  // for(let i=0; i<10 ;i++){

  // }
  // // if (eachResult.urlToImage === null) {
  //   setImgUrl(`https://kor.ill.in.ua/m/1260x900/2873185.jpg`);
  // } else {
  //   setImgUrl(eachResult.urlToImage);
  // }
  if (eachResult.urlToImage === null || eachResult.description === null) {
    return (
      <div className="resultCard col-md-11 col-12 me-1 mt-3 d-flex justify-content-center align-items-center text-danger border border-white d-none errorCard">
        Sorry , We can't proceed this news for Connection Error.
      </div>
    );
  }
  return (
    <div
      to="singleNews"
      className="resultCard col-md-11 col-12 me-1 mt-4"
      onClick={() => {
        // console.log(eachResult);
      }}
    >
      {" "}
      <img
        src={eachResult.img}
        className=" col-12 h-100 resultImg"
        onClick={() => {}}
      />
      {/* <button className="favBtn">Add to Fav</button> */}
      <div
        className="resultCartText "
        onClick={() => {
          window.location.assign(eachResult.url);
        }}
      >
        <div>
          <h3 className=" d-block dateResultCard">Date : {time}</h3>
          <div className="resultCardPara fs-6">Title : {eachResult.title}</div>
          {/* <button className="btn btn-danger mt-3 p-2">Remove from Fav</button> */}
        </div>
      </div>
      <button
        className="btn btn-danger favBtn"
        onClick={() => {
          removePost();
        }}
        // onClick={() => {
        //   const data = {
        //     userId: id,
        //     title: eachResult.title,
        //     time: time.slice(0, 10),
        //     img: eachResult.urlToImage,
        //     url: eachResult.url,
        //   };
        //   dataPost(data);
        //   console.log(data);
        // }}
      >
        Remove from Fav
      </button>
    </div>
  );
};
