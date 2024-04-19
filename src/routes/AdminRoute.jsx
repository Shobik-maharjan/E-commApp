import React from "react";
import { Route, Routes } from "react-router-dom";
import ListProducts from "../pages/admin/listProducts/ListProducts";
import Category from "../components/admin/Category";
import EditProduct from "../pages/admin/editProduct/EditProduct";
import Content from "src/components/admin/content/Content";
import AddProduct from "src/pages/admin/addProduct/AddProduct";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="products">
        <Route index element={<ListProducts />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="category" element={<Category />} />
        <Route path=":product_id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
