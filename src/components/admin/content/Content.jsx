import React from "react";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <>
      <div className="w-full mt-4 mx-4 ">
        <div className="flex justify-between">
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Sales
          </div>
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Order
          </div>
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Customers
          </div>
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Products
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
