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

// nested route
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Content />} />

            <Route path="products">
              <Route index element={<ListProducts />} />
              <Route path="add" element={<AddProduct />} />
              {/* <Route path=":product_id" element={<ListProducts />} /> */}
              <Route path=":product_id" element={<EditProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
