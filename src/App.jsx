import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./components/Register";
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";
import UserLayout from "./layout/UserLayout";
import UserRoute from "./routes/UserRoute";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> */}

          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="*" element={<AdminRoute />} />
          </Route>

          <Route path="/*" element={<UserLayout />}>
            <Route path="*" element={<UserRoute />} />
          </Route>
        </Routes>
        <ToastContainer closeOnClick />
      </BrowserRouter>
    </>
  );
};

export default App;
