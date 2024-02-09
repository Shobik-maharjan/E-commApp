import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./components/admin/content/Content";
import Navbar from "./components/admin/navbar/Navbar";
import Sidebar from "./components/admin/sidebar/Sidebar";
import AddProduct from "./components/admin/addProduct/AddProduct";
import "./app.css";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ListProducts from "./components/admin/listProducts/ListProducts";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Content />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="listProduct" element={<ListProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
