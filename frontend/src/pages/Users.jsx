import React from "react";
import { UsersTable } from "../components/UsersTable";
import NavBar from "../components/NavBar";
import { Stats } from "../components/Stats";
import { FooterComponent } from "../components/Footer";

export const Users = () => {
  return (
    <div className="h-screen">
      <div className="w-5/6 md:w-4/6 mx-auto min-h-[calc(100vh-97px)] md:min-h-[calc(100vh-67px)]">
        <NavBar role="admin" currentPage="users" />
        <Stats />
        <UsersTable />
      </div>
      <FooterComponent />
    </div>
  );
};
