import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSumbit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log(data);
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.userCheckLogin)
        );
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
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("password is required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("username is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

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
            min="4"
          />

          <input
            className={inputBoxCSS}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button
            className="bg-[#997af0] uppercase font-bold text-white px-[2rem] py-[1rem] border-none cursor-pointer rounded-[0.4rem] text-[1rem] transition ease-in-out duration-500
            hover:bg-[#4e0eff]
            "
            type="submit"
          >
            Login
          </button>
          <span
            className="text-white uppercase
          "
          >
            Don't have an account ?{" "}
            <Link to="/register" className="text-[#4e0eff] lowercase font-bold">
              Register
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

export default Login;
