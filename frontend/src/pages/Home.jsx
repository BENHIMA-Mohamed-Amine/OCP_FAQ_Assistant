import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Chat } from "../components/Chat";
import AuthContext from "../context/AuthProvider";

export default function Home() {
  const auth = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { accessToken, tokenType } = location.state || {};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    const layoutElement = document.querySelector(".layout");
    if (window.innerWidth < 1280) {
      layoutElement.style.gridTemplateColumns = "200px 4fr";
      layoutElement.style.gridTemplateAreas = '"side main"';
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const layoutElement = document.querySelector(".layout");

    if (!isSidebarOpen) {
      layoutElement.style.gridTemplateColumns = "1fr";
      layoutElement.style.gridTemplateAreas = '"main"';
    } else {
      layoutElement.style.gridTemplateColumns = "200px 4fr";
      layoutElement.style.gridTemplateAreas = '"side main"';
    }
  }, [isSidebarOpen]);

  return (
    <div className="layout h-dvh">
      {isSidebarOpen && <SideBar toggleSidebar={toggleSidebar} />}
      <div className="flex-1 main">
        <NavBar
          role="admin"
          currentPage="assistant"
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <Chat />
      </div>
    </div>
  );
}
