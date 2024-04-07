import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/navbar/Navbar";
import Footer from "../components/user/footer/Footer";

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
