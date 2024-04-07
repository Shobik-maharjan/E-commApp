import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* <div> */}
      <ul className="min-w-48 max-w-48 bg-slate-50 sidebar-container p-5">
        <li>
          <Link to={"/admin"}>
            <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
              Dashboard
            </button>
          </Link>
        </li>
        <li>
          <Link to={"products/add"}>
            <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
              Add Product
            </button>
          </Link>
        </li>
        <li>
          <Link to={"products"}>
            <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
              List Product
            </button>
          </Link>
        </li>
        <li>
          <Link>
            <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
              Category
            </button>
          </Link>
        </li>
        <li>
          <Link>
            <button className="p-2.5 my-2 hover:bg-emerald-500 hover:text-white rounded-lg w-full text-left">
              Setting
            </button>
          </Link>
        </li>
      </ul>
      {/* </div> */}
    </>
  );
};

export default Sidebar;
