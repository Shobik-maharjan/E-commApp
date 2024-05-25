import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "src/components/ForgotPassword";
import Login from "src/components/Login";
import PageNotFound from "src/components/PageNotFound";
import Register from "src/components/Register";
import About from "src/pages/user/about/About";
import Cart from "src/pages/user/cart/Cart";
import Contact from "src/pages/user/contact/Contact";
import Home from "src/pages/user/home/Home";
import Product from "src/pages/user/product/Product";
import SinglePage from "src/pages/user/singlePage/SinglePage";

const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:product_id" element={<SinglePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
