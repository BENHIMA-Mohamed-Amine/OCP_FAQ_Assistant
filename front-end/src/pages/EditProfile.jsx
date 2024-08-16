import React from "react";
import { GuestNavBar } from "../components/GuestNavBar";
import { EditProfileForm } from "../components/EditProfileForm";
import { FooterComponent } from "../components/Footer";

export const EditProfile = () => {
  return (
    <div className="h-screen">
      <div className="w-11/12 md:w-5/6 lg:w-4/6 overflow-auto mx-auto h-[calc(100dvh-97px)] md:h-[calc(100dvh-67px)] mb-3 md:mb-0">
        <GuestNavBar />
        <EditProfileForm />
      </div>
      <FooterComponent />
    </div>
  );
};
