import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="min-w-48 max-w-48">
        <ul className="sidebar-container bg-slate-50 p-5">
          <li>
            <Link to={"/"}>
              <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
                Dashboard
              </button>
            </Link>
          </li>
          <li>
            <Link to={"/addProduct"}>
              <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
                Add Product
              </button>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
                List Product
              </button>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
                Category
              </button>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
                Setting
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
