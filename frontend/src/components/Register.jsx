import React, { useEffect, useState } from "react";
import { OrComponent } from "./OrComponent";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const REGISTER_URL = "/user/register";

export const Register = () => {
  const { setAuth } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const navigate = useNavigate("/");

  useEffect(() => {
    password === confirmPassword ? setMatchPwd(true) : setMatchPwd(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    setIsError(false);
    setErrMsg("");
  }, [email]);

  const hansleSubmitForm = (e) => {
    e.preventDefault();
    if (!matchPwd) {
      return;
    }
    axios
      .post(
        REGISTER_URL,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role: "user",
        },
        {
          "Content-type": "application/json",
        }
      )
      .then((res) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsSucces(true);
        setAuth({
          email,
          password,
          lastName: res.data.last_name,
          accessToken: res.data.access_token,
          tokenType: res.data.token_type,
          role: res.data.role,
          userId: res.data.user_id,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log("err" + err);
        setIsError(true);
        if (err.response.status == 409) {
          setErrMsg("User already exists.");
        } else {
          setErrMsg("Something went wrong.");
        }
      });
  };
  return (
    <div className="w-10/12 md:w-4/6 lg:w-3/6 mx-auto">
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
            <span className="font-medium text-green-800">Registred!</span> You
            will be directed to the soon.
          </div>
        </div>
      )}
      <div className="mb-8 text-main text-[22px] md:text[30px] font-thin">
        <h1>Create an Account</h1>
      </div>
      <form onSubmit={hansleSubmitForm}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green block w-full p-2.5 "
              placeholder="John"
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green block w-full p-2.5 "
              placeholder="Doe"
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>
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
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green block w-full p-2.5 "
            placeholder="•••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <li
            className={`flex items-center mt-2 ${
              confirmPassword == false ? "hidden" : "block"
            }`}
          >
            {" "}
            <div
              className={`w-fit rounded-full ${
                matchPwd ? "bg-green-200 text-green-700" : "bg-red-200 text-red"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {matchPwd ? (
                  <path
                    className="text-green-700"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    className="text-red"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </div>
            {matchPwd ? (
              <span className="font-medium text-sm ml-3 text-green-700">
                Passwords Match
              </span>
            ) : (
              <span className="font-medium text-sm ml-3 text-red">
                Passwords Not Match
              </span>
            )}
          </li>
        </div>
        <div className="w-full">
          <button
            className="
          mb-6
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
            Register
          </button>
        </div>
      </form>
      <div className="mb-6 text-center text-sm text-main">
        <p>
          Already have an Account{" "}
          <span>
            {" "}
            <Link to="/login" className="text-blue">
              Log In
            </Link>{" "}
          </span>
        </p>
      </div>
    </div>
  );
};
