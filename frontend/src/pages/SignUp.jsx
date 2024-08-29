import React from "react";
import { GuestNavBar } from "../components/GuestNavBar";
import { FooterComponent } from "../components/Footer";
import { Register } from "../components/Register";

export const SignUp = () => {
  return (
    <div>
      <div className="w-11/12 md:w-5/6 lg:w-4/6 mx-auto mb-3 md:mb-0">
        <GuestNavBar currentPage={"signup"} />
        <Register />
      </div>
      <FooterComponent />
    </div>
  );
};
