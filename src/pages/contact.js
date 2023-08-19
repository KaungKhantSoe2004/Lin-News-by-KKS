import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useEffect, useRef } from "react";
import {
  FaAddressBook,
  FaAddressCard,
  FaFacebook,
  FaFileArchive,
  FaMailBulk,
  FaPhone,
  FaPhoneAlt,
  FaPhoneSlash,
  FaSearchLocation,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { getId, getName, getToken } from "../utilities/localStorage";
import { CiPhone } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export const Contact = ({ setMarginLeft }) => {
  const form = useRef();
  const navigate = useNavigate("");
  useEffect(() => {
    setMarginLeft(9);
    const name = getName();
    const id = getId();
    const password = getToken();
    if (name === null || id === null || password === null) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  let name = watch("name");
  let email = watch("email");
  let message = watch("message");
  const { theme } = useSelector((state) => state.theme);
  const submit = (data) => {
    console.log(data);
    console.log(form);
    emailjs
      .sendForm(
        "service_kow2nt9",
        "template_cb400bp",
        form.current,
        "taWHxGleX6BjcDvid"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  //${ !theme && "themeLight"}
  return (
    <div className="contact text-white">
      <h3 className={` text-center contactHeader  ${!theme && "themeLight"}`}>
        Contact Us
      </h3>
      <h4 className={` text-center help ${!theme && "themeLight"}`}>
        We'd love to Help!
      </h4>
      <div className="inputandlogoContainer col-12 row mt-6">
        <div className="col-md-6 col-12 logoContactContainer">
          <div className="ms-5 mt-3">
            <div className="phoneContainer d-flex ms-2 mt-3">
              <FaPhoneAlt className=" text-danger fs-md-1 fs-1 pt-md-1 mt-2" />
              <div className="textPhoneContainer ms-3 ">
                <div
                  className={`phone  fs-md-4 fs-6 ${!theme && "themeLight"}`}
                >
                  Phone
                </div>
                <div className={`number ${!theme && "themeLight"}`}>
                  09796788834
                </div>
              </div>
            </div>

            <div className="phoneContainer d-flex ms-2 mt-3">
              <FaMailBulk className=" text-danger fs-md-1 fs-1 pt-md-1 mt-2" />
              <div className="textPhoneContainer ms-3">
                <div
                  className={`phone  fs-md-4 fs-6 ${!theme && "themeLight"}`}
                >
                  Email
                </div>
                <div className={`number ${!theme && "themeLight"}`}>
                  kaungkhants892@gmail.com
                </div>
              </div>
            </div>

            <div className="phoneContainer d-flex ms-2 mt-3">
              <FaSearchLocation className=" text-danger fs-md-1 fs-1 pt-md-1 mt-2" />
              <div className="textPhoneContainer ms-3">
                <div
                  className={`phone  fs-md-4 fs-6 ${!theme && "themeLight"}`}
                >
                  Address
                </div>
                <div className={`number ${!theme && "themeLight"}`}>
                  Myingyan
                </div>
              </div>
            </div>
          </div>
          <div className="socialMedia ms-5 mt-4 mb-5">
            <a href="https://twitter.com/kaungkhants892">
              <FaTwitter className=" fs-3 mx-3 socialMedia" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100050827651170">
              <FaFacebook className=" fs-3 mx-3 socialMedia" />
            </a>
            <a href="https://t.me/Kaungkhant9koji">
              <FaTelegram className=" fs-3 mx-3 socialMedia" />
            </a>
          </div>
        </div>
        <div className="inputContactContainer col-md-6 col-12 ">
          <form onSubmit={handleSubmit(submit)} ref={form}>
            <input
              type="name"
              placeholder="Your Name"
              className="input col-10"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="errorInput text-danger">
                Please fill your name
              </div>
            )}
            <input
              type="email"
              placeholder="Your Email"
              className="input col-10"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="errorInput text-danger">
                Please fill your email
              </div>
            )}
            <textarea
              type="text"
              placeholder="Message"
              className="input col-10"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <div className="errorInput text-danger">
                Please fill your Message Box
              </div>
            )}
            <br></br>
            <button className=" btn btn-primary ms-3  mt-3"> Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
<div className="phoneContainer d-flex">
  <FaPhone className=" text-danger fs-2" />
  <div className="textPhoneContainer">
    <div className="phone text-white">Phone</div>
    <div className="number text-white">09796788834</div>
  </div>
</div>;
