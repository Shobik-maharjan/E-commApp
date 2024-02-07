import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./components/admin/content/Content";
import Navbar from "./components/admin/navbar/Navbar";
import Sidebar from "./components/admin/sidebar/Sidebar";
import AddProduct from "./components/admin/addProduct/AddProduct";
import "./app.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
