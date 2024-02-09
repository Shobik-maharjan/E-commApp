import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";
import AddProduct from "../addProduct/AddProduct";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

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
