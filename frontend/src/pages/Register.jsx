import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { regiserRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSumbit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(regiserRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error("password should be greater than 7 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#131324] gap-[1rem]">
        <form
          className="flex flex-col gap-[2rem] bg-[#00000076] rounded-[2rem] px-[5rem] py-[2rem]"
          onSubmit={(event) => handleSumbit(event)}
        >
          <div className="flex items-center gap-[1rem] justify-center">
            <img className="h-[5rem]" src={Logo} alt="" />
            <h1 className="text-white uppercase">snapper chat</h1>
          </div>
          <input
            className={inputBoxCSS}
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            className={inputBoxCSS}
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className={inputBoxCSS}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className={inputBoxCSS}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="bg-[#997af0] uppercase font-bold text-white px-[2rem] py-[1rem] border-none cursor-pointer rounded-[0.4rem] text-[1rem] transition ease-in-out duration-500
            hover:bg-[#4e0eff]
            "
            type="submit"
          >
            Create User
          </button>
          <span
            className="text-white uppercase
          "
          >
            Already have an account ?{" "}
            <Link to="/login" className="text-[#4e0eff] lowercase font-bold">
              Login
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

const inputBoxCSS = `p-[1rem] text-[1rem] bg-transparent border-[0.1rem] text-white rounded-[0.4rem] w-full border-[#4e0eff] border-solid
focus:border-[#997af0]
focus:outline-none
`;

export default Register;
