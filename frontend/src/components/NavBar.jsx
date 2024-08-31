import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function NavBar(props) {
  const { role, currentPage, toggleSidebar, isSidebarOpen } = props;
  const { auth, logout } = useAuth();

  const isActive = (page) =>
    currentPage === page ? "text-custom-green" : "text-main";

  return (
    <nav className="flex items-center justify-between px-3 py-[17px] text-sm h-[80px]">
      <div className="flex items-center space-x-1">
        {!isSidebarOpen && currentPage == "assistant" && (
          <>
            <button className="flex justify-center items-center hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-md h-[30px] w-[30px]">
              <img
                src="./src/assets/sidebar.svg"
                alt="hide side bar"
                className="hover:cursor-pointer x-[20px] h-[20px]"
                onClick={toggleSidebar}
              />
            </button>
          </>
        )}
        <Link to="/">
          <img
            src="/src/assets/OCP_logo.svg"
            alt="OCP Groupe Assistant"
            className="h-8"
          />
        </Link>
      </div>
      <ul className="hidden space-x-5 lg:space-x-20 md:flex">
        {role === "admin" ? (
          <>
            <li>
              <Link
                to="/"
                className={`hover:text-custom-green ${isActive("assistant")}`}
              >
                Assistant
              </Link>
            </li>
            <li>
              <Link
                to="/issues"
                className={`hover:text-custom-green ${isActive("issues")}`}
              >
                Issues
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className={`hover:text-custom-green ${isActive("users")}`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to={`/edit-profile/${auth.userId}`}
                className={`hover:text-custom-green ${isActive("profile")}`}
              >
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/"
                className={`hover:text-custom-green ${isActive("assistant")}`}
              >
                Assistant
              </Link>
            </li>
            <li>
              <Link
                to={`/edit-profile/${auth.userId}`}
                className={`hover:text-custom-green ${isActive("profile")}`}
              >
                Profile
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="flex items-center space-x-4">
        <button
          data-modal-toggle="logout-modal"
          data-modal-target="logout-modal"
          className="max-h-[20px] hover:text-custom-green"
        >
          Log out
        </button>

        <span className="hidden md:inline-block border-custom-green border-[2px] bg-custom-green text-white px-4 py-[10px] rounded-lg text-center hover:bg-[#F6F6F6] hover:text-main">
          Welcome, {auth.lastName}
        </span>
      </div>
      <div
        id="logout-modal"
        tabIndex="-1"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="logout-modal"
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
                Are you sure you want to log out from the app?
              </h3>
              <button
                onClick={logout}
                data-modal-hide="logout-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="logout-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-main focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        // data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-main rounded-lg md:hidden hover:bg-custom-green focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </nav>
  );
}
