import React from "react";
import { Route, Routes } from "react-router-dom";
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
