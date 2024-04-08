import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SinglePage from "../pages/singlePage/SinglePage";
import Cart from "../pages/cart/Cart";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Product from "../pages/product/Product";

const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:product_id" element={<SinglePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
