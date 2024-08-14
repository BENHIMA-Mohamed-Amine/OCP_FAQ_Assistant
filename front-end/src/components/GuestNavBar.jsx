import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export const GuestNavBar = () => {
  return (
    <nav className="flex items-center justify-between px-3 py-[17px] text-sm">
      <div className="flex items-center space-x-1">
        <Link to="/" className="px-4 py-[10px]">
          <img
            src="./src/assets/OCP_logo.svg"
            alt="OCP Groupe Assistant"
            className="h-19"
          />
        </Link>
      </div>
      <ul className="hidden space-x-6 md:flex">
        <li>
          <Link to="/" className={`hover:text-custom-green px-4 py-[10px]`}>
            Main
          </Link>
        </li>
        <li>
          <Link to="/" className={`hover:text-custom-green px-4 py-[10px]`}>
            About
          </Link>
        </li>
        <li>
          <Link to="/" className={`hover:text-custom-green `}>
            Contact Us
          </Link>
        </li>
      </ul>
      <div className="hidden md:flex justify-between space-x-2">
        <span className="text-main px-4 py-[10px] text-center hover:text-custom-green hover:cursor-pointer">
          Log In
        </span>
        <Button content="Register" />
      </div>
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
};
