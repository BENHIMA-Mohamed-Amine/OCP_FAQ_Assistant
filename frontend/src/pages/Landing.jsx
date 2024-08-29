import React from "react";
import { GuestNavBar } from "../components/GuestNavBar";
import { Main } from "../components/Main";
import { FooterComponent } from "../components/Footer";
import { About } from "../components/About";

export const Landing = () => {
  return (
    <div>
      <div className="p-4 md:p-0 w-full md:w-4/6  mx-auto">
        <GuestNavBar currentPage={"landing"} />
        <Main />
        <About />
      </div>
      <FooterComponent />
    </div>
  );
};
