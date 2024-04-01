import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SinglePage from "../pages/singlePage/SinglePage";
import Cart from "../pages/cart/Cart";

const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:product_id" element={<SinglePage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
