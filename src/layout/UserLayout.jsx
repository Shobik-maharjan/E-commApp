import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/user/navbar/Navbar";

const UserLayout = () => {
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");

  useEffect(() => {
    if (getUser === null) {
      navigate("/login");
    }
  }, [getUser, navigate]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
