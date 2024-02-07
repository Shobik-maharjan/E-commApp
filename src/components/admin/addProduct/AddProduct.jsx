import React from "react";

const AddProduct = () => {
  return (
    <>
      <div className="w-full bg-gray-200 p-4">
        <div className="container">
          <h2 className="text-3xl">Add new product</h2>
          <div className="mb-4">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="pr-3 text-center">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="w-1/3 border border-black rounded-md p-2"
            >
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="monitor">Monitor</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="productName">Product Price</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              className="w-full border border-black rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
