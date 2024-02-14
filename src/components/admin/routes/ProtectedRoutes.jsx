import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  //   const token = localStorage.getItem("user");
  const auth = localStorage.getItem("admin");
  return <>{auth ? <Outlet /> : <Navigate to={"admin/login"} />}</>;
};

export default ProtectedRoutes;
