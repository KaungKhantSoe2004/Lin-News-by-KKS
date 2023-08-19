import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiCall } from "../utilities/apiCall";
import axios from "axios";
import { useNavigate } from "react-router";
import { setId, setName, setToken } from "../utilities/localStorage";

export const Login = () => {
  const navigate = useNavigate("");
  const [existingUsers, setExistingUsers] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const rePassword = watch("rePassword");
  const getU = async () => {
    const res = await apiCall(
      `https://jsonserverforlinnews.onrender.com/user`,
      "get"
    );
    setExistingUsers(res.data);
  };
  const apiBackend = async (newUser) => {
    // const res = await apiCall(`https://jsonserverforlinnews.onrender.com/users`, "get");
    let resp = await axios.post(
      `https://jsonserverforlinnews.onrender.com/user`,
      newUser
    );
    navigate("/");
  };
  useEffect(() => {
    // const res = apiCall(`https://jsonserverforlinnews.onrender.com/user`, "get");
    // setExistingUsers(res.data);
    getU();
    console.log("ok");
  }, []);
  const submitFun = async (data) => {
    if (password === rePassword) {
      // logIn function start
      if (isLogin) {
        console.log("this is login");
        for (let i = 0; i < existingUsers.length; i++) {
          if (
            existingUsers[i].name === name &&
            existingUsers[i].email === email &&
            existingUsers[i].password === password
          ) {
            setName(existingUsers[i].name);
            setId(existingUsers[i].id);
            setToken(existingUsers[i].password);
            navigate("/");
            return;
          }
        }
        return;
      }
      // logIn function end

      // register start
      for (let i = 0; i < existingUsers.length; i++) {
        if (
          existingUsers[i].name === name ||
          existingUsers[i].email === email
        ) {
          alert("The email or name you inputed already exists.Please Log in");
          return;
        }
      }
      console.log("this is register");
      const newUser = {
        name: name,
        email: email,
        password: password,
        // userId: existingUsers.length + 1,
      };
      setName(name);
      setId(existingUsers.length + 1);
      setToken(password);
      apiBackend(newUser);
      // register end
    } else {
      alert("Please make sure your passwords are the same");
      return;
    }
  };

  return (
    <div className="login col-12">
      <div className="ms-12 bg-white row  ">
        <div className="col-md-6  col-12">
          <img
            // src="https://img.freepik.com/free-vector/naive-news-politics-stickers_52683-70367.jpg?size=626&ext=jpg&ga=GA1.2.591895098.1687192658&semt=ais"
            src="https://img.freepik.com/free-vector/cartoon-news-source-collection_52683-75863.jpg?w=740&t=st=1692034756~exp=1692035356~hmac=eefb24c3319a3795532a43596fe8215781004cc9603d1193b67fa69620aa8d43"
            className="logInImg w-100  "
          />
        </div>
        <div className="col-md-6 col-12">
          <div className="welcome fs-3 text-danger text-center mt-4 fst-bolder fw-bold">
            Welcome to LIN NEWS!
          </div>
          <div className="slogan fs-md-5 fs-6 mt-5 text-center text-danger ">
            The news never sleeps, and neither do we.
          </div>
          <div className="loginText  text-center fs-4 p-2 ">
            {isLogin ? "Log In" : "Register"}
          </div>
          <div className="inputContainer d-flex justify-content-center ">
            <form
              className="logInForm col-8 bg-white"
              onSubmit={handleSubmit(submitFun)}
            >
              <input
                className="nameLogIn mt-3 col-8 w-100"
                placeholder="Please fill Your Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <div className=" text-danger fs-6">Please enter your name</div>
              )}
              {/* {errors.name.type === "minLength" && (
                <div className="text-danger fs-6">
                  Your name must at least contain 11 letters.
                </div>
              )} */}
              <input
                type="email"
                className="emailLogIn mt-3 col-8 w-100"
                placeholder="Please fill Your Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <div className=" text-danger fs-6">Please enter your email</div>
              )}
              <input
                type="password"
                className="emailLogIn mt-3 col-8 w-100"
                placeholder="Please fill Your Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <div className=" text-danger fs-6">
                  Please enter your password
                </div>
              )}

              <input
                type="password"
                className="emailLogIn mt-3 col-8 w-100"
                placeholder="Configure Your Password"
                {...register("rePassword", { required: true })}
              />

              {errors.rePassword && (
                <div className=" text-danger fs-6">
                  Please Reenter your password!
                </div>
              )}
              <br></br>
              <button className="logInBtn mt-3 w-75 ms-5">
                {isLogin ? "Log In" : "Register"}
              </button>
              <div
                className=" mt-2 fs-6  makeAcc text-danger  text-center"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin
                  ? " Don't have an account, please make one."
                  : "ALready have an account, Log in"}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
