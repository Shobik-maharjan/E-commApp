import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/user/Footer";
import Navbar from "src/components/user/Navbar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="w-10/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
