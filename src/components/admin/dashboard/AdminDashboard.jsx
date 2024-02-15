import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
