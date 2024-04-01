import React, { useEffect } from "react";
import Navbar from "../components/admin/navbar/Navbar";
import Sidebar from "../components/admin/sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const getUser = localStorage.getItem("admin");

  useEffect(() => {
    if (getUser === null) {
      navigate("/login");
    }
  }, [getUser, navigate]);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
