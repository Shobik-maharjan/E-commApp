import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";

const UserLayout = () => {
  return (
    <>
      <div className="w-10/12 mx-auto">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
