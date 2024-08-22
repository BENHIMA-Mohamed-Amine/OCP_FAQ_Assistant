import React from "react";
import { OrComponent } from "./OrComponent";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="w-10/12 md:w-4/6 lg:w-3/6 mx-auto">
      <div className="pl-4 mb-[18px] text-main text-[22px] md:text[30px] font-thin">
        <h1>Create an Account</h1>
      </div>
      <div className="flex w-ful">
        <button className="w-full px-4 py-2 border items-center flex gap-2 border-white rounded-lg text-main hover:border-custom-green hover:shadow transition duration-150">
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span className="flex w-full justify-center text-sm">
            Sign In with Google
          </span>
        </button>
      </div>
      <div>
        <OrComponent />
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
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-green focus:border-custom-green w-full p-2.5 "
          placeholder="john.doe@company.com"
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
          Register
        </button>
      </div>
      <div className="py-[5px] text-center text-sm text-main">
        <p>
          Already have an Account{" "}
          <span>
            {" "}
            <Link className="text-blue">Log In</Link>{" "}
          </span>
        </p>
      </div>
    </div>
  );
};
