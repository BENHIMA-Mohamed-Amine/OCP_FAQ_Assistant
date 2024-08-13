import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function NavBar(props) {
  const { role, currentPage, toggleSidebar, isSidebarOpen } = props;

  const isActive = (page) =>
    currentPage === page ? "text-custom-green" : "text-main";

  return (
    <nav className="flex items-center justify-between px-3 py-[17px] text-sm">
      <div className="flex items-center space-x-1">
        {!isSidebarOpen && (
          <img
            src="./src/assets/sidebar.svg"
            alt="hide side bar"
            className="hover:cursor-pointer x-[20px] h-[20px]"
            onClick={toggleSidebar}
          />
        )}
        <Link to="/">
          <img
            src="./src/assets/OCP_logo.svg"
            alt="OCP Groupe Assistant"
            className="h-8"
          />
        </Link>
      </div>
      <ul className="hidden space-x-6 md:flex">
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
                to="/"
                className={`hover:text-custom-green ${isActive("issues")}`}
              >
                Issues
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`hover:text-custom-green ${isActive("users")}`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/"
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
                to="/assistant"
                className={`hover:text-custom-green ${isActive("assistant")}`}
              >
                Assistant
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`hover:text-custom-green ${isActive("profile")}`}
              >
                Profile
              </Link>
            </li>
          </>
        )}
      </ul>
      <span className="hidden md:inline-block border-custom-green border-[2px] bg-custom-green text-white px-4 py-[10px] rounded-lg text-center hover:bg-[#F6F6F6] hover:text-main">
        Welcome, Benhima
      </span>
      <button
        data-collapse-toggle="navbar-default"
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
