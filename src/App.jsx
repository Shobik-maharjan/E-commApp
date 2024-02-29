import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./components/admin/content/Content";
import Navbar from "./components/admin/navbar/Navbar";
import Sidebar from "./components/admin/sidebar/Sidebar";
import AddProduct from "./components/admin/addProduct/AddProduct";
import "./app.css";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ListProducts from "./components/admin/listProducts/ListProducts";
import EditProduct from "./components/admin/editProduct/EditProduct";
import Login from "./components/admin/login/Login";
import ProtectedRoutes from "./components/admin/routes/ProtectedRoutes";
import Home from "./components/user/home/Home";
import Register from "./components/user/register/Register";

// nested route
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="/" element={<ProtectedRoutes />} /> */}
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Content />} />
            <Route path="products">
              <Route index element={<ListProducts />} />
              <Route path="add" element={<AddProduct />} />
              <Route path=":product_id" element={<EditProduct />} />
            </Route>
          </Route>
          <Route path="/" element={<Home />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
