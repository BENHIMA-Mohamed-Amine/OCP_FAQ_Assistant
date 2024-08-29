import React from "react";
// import { Link } from "react-scroll";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export const GuestNavBar = ({ currentPage }) => {
  return (
    <nav className="flex items-center justify-between md:px-3 md:py-[17px] text-sm h-[101px]">
      <div className="flex items-center space-x-1">
        <Link to="/" className="md:px-4 md:py-[10px] hover:cursor-pointer">
          <img
            src="./src/assets/OCP_logo.svg"
            alt="OCP Groupe Assistant"
            className="h-19"
          />
        </Link>
      </div>
      <ul className="hidden space-x-6 md:flex">
        <li>
          <Link
            to={currentPage === "landing" ? "#main" : "/landing#main"}
            // smooth={true}
            // duration={500}
            className={`hover:text-custom-green px-4 py-[10px] hover:cursor-pointer`}
          >
            Main
          </Link>
        </li>
        <li>
          <Link
            to={currentPage === "landing" ? "#about" : "/landing#about"}
            // smooth={true}
            // duration={500}
            className={`hover:text-custom-green px-4 py-[10px] hover:cursor-pointer`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to={currentPage === "landing" ? "#contact" : "/landing#contact"}
            // smooth={true}
            // duration={500}
            className={`hover:text-custom-green hover:cursor-pointer`}
          >
            Contact Us
          </Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center justify-between space-x-4">
        <Link
          to="/login"
          className="text-main hover:text-custom-green hover:cursor-pointer"
        >
          Log In
        </Link>
        <Button content="Register" />
      </div>
      <button
        // data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-main rounded-lg md:hidden hover:bg-custom-green focus:outline-none focus:ring-2 focus:ring-gray-200"
        // aria-controls="navbar-default"
        // aria-expanded="false"
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
