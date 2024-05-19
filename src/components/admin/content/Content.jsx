import React from "react";

const Content = () => {
  return (
    <>
      <div className="w-full bg-gray-200 ">
        <div className="flex justify-between mt-4 mx-4">
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Sales
            <h3>1000</h3>
          </div>
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Order
            <h3>1000</h3>
          </div>
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Customers
            <h3>100</h3>
          </div>
          <div className="border bg-white border-black w-fit h-fit p-2.5">
            Total Products
            <h3>500</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
