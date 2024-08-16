import React from "react";
import { LogInForm } from "../components/LogInForm";
import { GuestNavBar } from "../components/GuestNavBar";
import { FooterComponent } from "../components/Footer";

export const LogIn = () => {
  return (
    <div className="h-dvh">
      <div className="w-11/12 md:w-5/6 lg:w-4/6 mx-auto h-auto md:h-[calc(100vh-67px)] mb-3 md:mb-0">
        <GuestNavBar />
        <LogInForm />
      </div>
      <FooterComponent />
    </div>
  );
};
