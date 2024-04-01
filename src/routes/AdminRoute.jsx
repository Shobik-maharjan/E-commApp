import React from "react";
import { Route, Routes } from "react-router-dom";
import ListProducts from "../components/admin/listProducts/ListProducts";
import AddProduct from "../components/admin/addProduct/AddProduct";
import EditProduct from "../components/admin/editProduct/EditProduct";
import Content from "../components/admin/content/Content";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Content />} />
        <Route path="products">
          <Route index element={<ListProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":product_id" element={<EditProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRoute;
