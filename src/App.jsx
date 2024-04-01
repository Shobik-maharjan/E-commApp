import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Login from "./components/admin/login/Login";
import Register from "./components/user/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./layout/UserLayout";
import UserRoute from "./routes/UserRoute";
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";

// nested route
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="/*" element={<UserLayout />}>
            <Route path="*" element={<UserRoute />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/*" element={<AdminRoute />} />
            {/* <Route index element={<Content />} />
            <Route path="products">
              <Route index element={<ListProducts />} />
              <Route path="add" element={<AddProduct />} />
              <Route path=":product_id" element={<EditProduct />} />
            </Route> */}
          </Route>
          {/* </Route> */}
        </Routes>
        <ToastContainer closeOnClick />
      </BrowserRouter>
    </>
  );
};

export default App;
