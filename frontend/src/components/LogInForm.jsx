import React, { useEffect, useState } from "react";
import { OrComponent } from "./OrComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/user/login ";

export const LogInForm = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate("/");
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSucces, setIsSucces] = useState(false);

  useEffect(() => {
    setIsError(false);
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        LOGIN_URL,
        { username: email, password },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setAuth({
          email,
          password,
          lastName: res.data.last_name,
          accessToken: res.data.access_token,
          tokenType: res.data.token_type,
          role: res.data.role,
          userId: res.data.user_id,
        });
        setIsSucces(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setIsError(true);
        if (err.response.status === 401) {
          setErrMsg("Invalid Credentials");
        } else {
          setErrMsg("Something went wrong");
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-10/12 md:w-4/6 lg:w-3/6 mx-auto flex flex-col justify-center h-[calc(100vh-97px-101px)] md:h-[calc(100vh-67px-101px)]"
    >
      {isError && (
        <div
          className={`flex items-center p-4 mb-4 rounded-lg bg-[#ffd9d5]`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 text-[#a82215]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              className="text-[#a82215]"
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span className="sr-only">Info</span>
          <div className="text-[#a82215]">
            <span className="font-medium text-[#a82215]">Error !</span> {errMsg}
          </div>
        </div>
      )}
      {isSucces && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 text-green-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              className="text-green-800"
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span className="sr-only">Info</span>
          <div className="text-green-800">
            <span className="font-medium text-green-800">Loged In!</span> You
            will be directed to the soon.
          </div>
        </div>
      )}
      <div className="mb-8 text-main text-[22px] md:text[38px] font-medium">
        <h1>Log In</h1>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green w-full p-2.5 "
          placeholder="john.doe@company.com"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green block w-full p-2.5 "
          placeholder="•••••••••"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="
              text-white 
              bg-custom-green
              border-custom-green 
              border-[2px]
              font-medium 
              rounded-lg 
              text-sm 
              w-full 
              px-5 
              py-2.5 
              text-center 
              hover:bg-[#f9f9f9]
              hover:text-main 
              focus:ring-custom-green
              focus:border-custom-green
            "
        >
          Log In
        </button>
      </div>
      <div className="my-6 text-center text-sm text-main">
        <p>
          You don't have an Account{" "}
          <span>
            {" "}
            <Link to={"/register"} className="text-blue">
              Register
            </Link>{" "}
          </span>
        </p>
      </div>
    </form>
  );
};
