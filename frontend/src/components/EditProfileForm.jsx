import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const UPDATE_USER_URL = "/user/update";
const GET_USER_INFO_URL = "/user/";
const DELETE_USER_URL = "/user/delete/";

export const EditProfileForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(GET_USER_INFO_URL + id, {
        headers: {
          Authorization: `${auth.tokenType} ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setUser({ ...res.data, password: auth.password });
        setConfirmPassword(auth.password);
        setIsLoading(false);
        setMatchPwd(true);
      })
      .catch((err) => {
        if (err.status == 401) {
          // navigate("/login");
          console.log(err);
        }
        if (err.status == 404) {
          navigate("/notfound");
        }
      });
  }, [auth]);

  useEffect(() => {
    user.password === confirmPassword ? setMatchPwd(true) : setMatchPwd(false);
  }, [user.password, confirmPassword]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    axios
      .put(UPDATE_USER_URL, user, {
        headers: {
          Authorization: `${auth.tokenType} ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUser(res.data);
        setAuth({
          ...auth,
          email: res.data.email,
          password: confirmPassword,
          lastName: res.data.last_name,
          accessToken: res.data.access_token,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(DELETE_USER_URL + id, {
        headers: {
          Authorization: `${auth.tokenType} ${auth.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setAuth({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="w-10/12 md:w-4/6 lg:w-3/6 mx-auto">
      <div className="mb-[18px] text-main text-[22px] md:text[30px] font-thin">
        <h1>Edit your Account</h1>
      </div>
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
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
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
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
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
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
        <div className="relative">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green block w-full p-2.5 "
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
          >
            <svg
              className="shrink-0 size-3.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isPasswordVisible ? (
                // "Eye Off" Icon (Visible Password)
                <>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </>
              ) : (
                // "Eye" Icon (Hidden Password)
                <>
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line x1="2" x2="22" y1="2" y2="22"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            id="confirm_password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green block w-full p-2.5 "
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
          >
            <svg
              className="shrink-0 size-3.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isConfirmPasswordVisible ? (
                // "Eye Off" Icon (Visible Password)
                <>
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </>
              ) : (
                // "Eye" Icon (Hidden Password)
                <>
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line x1="2" x2="22" y1="2" y2="22"></line>
                </>
              )}
            </svg>
          </button>
        </div>
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
      <div className="w-full flex justify-between">
        <button
          onClick={handleEditProfile}
          className={`
            text-white 
              bg-custom-green
              border-custom-green 
              border-[2px]
              font-medium 
              rounded-lg 
              text-sm 
              px-5 
              py-2.5 
              text-center 
              ${!matchPwd ? "cursor-not-allowed" : "cursor-pointer"}
              hover:bg-[#f9f9f9]
              hover:text-main 
              focus:ring-custom-green
              focus:border-custom-green
            `}
          disabled={!matchPwd}
        >
          Edit Profile
        </button>
        <button
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteModal(true);
          }}
          className="
              text-white 
              bg-red
              border-red 
              border-[2px]
              font-medium 
              rounded-lg 
              text-sm   
              px-5 
              py-2.5 
              text-center 
              hover:bg-[#f9f9f9]
              hover:text-main 
              focus:ring-red
              focus:border-red
            "
        >
          Delete Profile
        </button>
        <div
          id="popup-modal"
          tabIndex="-1"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete your account?
                </h3>
                <button
                  onClick={handleDeleteUser}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-main focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
