import { Children, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FaGoogle, FaPray, FaRegSun, FaUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import {
  getId,
  getName,
  getToken,
  removeId,
  removeName,
  removeToken,
} from "./utilities/localStorage";
import { store } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/actions/product";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
export const NavBar = ({ setMarginLeft, marginLeft }) => {
  const dispatch = useDispatch();
  const navHandle = (margin) => {
    setMarginLeft(margin);
  };
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { isLoading } = useSelector((state) => state.loading);
  console.log(isLoading, "is loading");
  console.log("theme is ", theme);
  // store.dispatch({ type: "hello", payload: "Kaung Kaung" });
  // console.log(store.getState());
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const themeFunction = () => {
    dispatch({
      type: "DAY",
      payload: !theme,
    });
  };
  return (
    <div
      className={` col-12 container border  border-black holdOn ${
        !theme && "themeLight"
      }`}
    >
      <div
        className={`col-12 position-sticky top-0 navContainer  ${
          !theme && "themeLight"
        }`}
      >
        <div className={`header col-12  row ${!theme && "themeLight"}`}>
          <div className="logo col-md-4 col-6 p-md-2 pt-2 ps-4">
            <img
              src="https://th.bing.com/th/id/OIP.OK9pwXPkqDj4b0QakH-BdwAAAA?w=203&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="logoImg ms-md-5 "
            />
          </div>
          <div
            className={`saying d-md-inline col-5 d-none mt-3 fs-5 fw-light ${
              !theme && "colorBright"
            }`}
          >
            A good newspaper is a nation talking to itself !!
          </div>
          <div className="logo col-md-3 col-6 d-flex gap-4 justify-content-end align-items-center ">
            <div className="d-flex gap-md-5 gap-3 float-end pe-md-5 ">
              <div className="topNav  text-center mt-2">
                {/* profile start */}

                {/* <FaUser className="userIcon " /> */}
                <button
                  className="logoutBtn btn btn-danger btn-sm"
                  onClick={() => {
                    removeId();
                    removeName();
                    removeToken();
                    navigate("login");
                  }}
                >
                  Log Out
                </button>
                {/* profile end */}
              </div>
              <div className="topNav ">
                {/* switch start */}
                <div class="form-check form-switch mt-2">
                  <input
                    class="form-check-input fs-6 "
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    onClick={() => {
                      themeFunction();
                    }}
                  />
                  <label
                    class={`form-check-label label ${!theme && "themeLight"}`}
                    for="flexSwitchCheckChecked"
                  >
                    Light
                  </label>
                </div>
                {/* switch end */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="navBarContainer col-12 d-flex pt-md-2 pt-0
      "
        >
          <NavLink
            to="/"
            className={`col-3 text-center   fs-5  eachNav p-2 fw-light ${
              !theme && "themeLight"
            }`}
            onClick={() => {
              navHandle(0);
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="favorites"
            className={`col-3 text-center   fs-5  eachNav p-2 fw-light ${
              !theme && "themeLight"
            }`}
            onClick={() => {
              navHandle(3);
            }}
          >
            Favorites
          </NavLink>
          <NavLink
            to="about"
            className={`col-3 text-center   fs-5  eachNav p-2 fw-light ${
              !theme && "themeLight"
            }`}
            onClick={() => {
              navHandle(6);
            }}
          >
            About
          </NavLink>
          <NavLink
            to="contact"
            className={`col-3 text-center  fs-5 eachNav p-2 fw-light ${
              !theme && "themeLight"
            }`}
            onClick={() => {
              navHandle(9);
            }}
          >
            Contact
          </NavLink>
        </div>
        <div className={` slider col-3 offset-${marginLeft}`}>-</div>
      </div>
      <Outlet />
    </div>
  );
};
