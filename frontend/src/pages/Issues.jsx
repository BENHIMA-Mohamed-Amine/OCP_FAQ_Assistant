import React from "react";
import NavBar from "../components/NavBar";
import { FooterComponent } from "../components/Footer";
import { Stats } from "../components/Stats";
import { Table } from "../components/Table";

export const Issues = () => {
  return (
    <div className="h-screen">
      <div className="w-5/6 md:w-4/6 mx-auto min-h-[calc(100vh-97px)] md:min-h-[calc(100vh-67px)]">
        <NavBar role="admin" currentPage="issues" />
        <Stats />
        <Table />
      </div>
      <FooterComponent />
    </div>
  );
};
