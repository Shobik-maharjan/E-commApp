import React, { useState } from "react";
import "./addProduct.scss";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
const AddProduct = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      productName,
      productPrice,
      category,
      productQuantity,
      productDescription,
    } = data;
    const dataBase = addDoc(collection(db, "products"), {
      productName,
      productPrice,
      category,
      productQuantity,
      productDescription,
    });

    console.log("doc written");
  };

  // for updating data
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const {
  //     productName,
  //     productPrice,
  //     category,
  //     productQuantity,
  //     productDescription,
  //   } = data;
  //   setDoc(doc(db, "products", "KL6EL202v6GvUYApZ9b4"), {
  //     productName,
  //     productPrice,
  //     category,
  //     productQuantity,
  //     productDescription,
  //   });
  // const querySnapshot = await getDocs(collection(db, "products"));

  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id}`);
  //   const docId = doc.id;
  // });
  // };
  // fetchData();
  return (
    <>
      <div className="w-full bg-gray-200  product-container overflow-y-scroll">
        <div className="container p-4 ">
          <h2 className="text-3xl mb-4">Add new product</h2>

          <div className="flex gap-5">
            {/* left side form inputs */}
            <div className="flex flex-col w-full">
              <div className="mb-4 flex flex-col">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="border border-black rounded-md p-2"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  className="border border-black rounded-md p-2"
                  value={data.category || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="mobile">Mobile</option>
                  <option value="laptop">Laptop</option>
                  <option value="monitor">Monitor</option>
                </select>
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="productName">Product Description</label>
                <textarea
                  type="number"
                  cols="30"
                  rows="5"
                  id="productDescription"
                  name="productDescription"
                  className="border border-black rounded-md p-2"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* right side form inputs */}
            <div className="flex flex-col w-full">
              <div className="mb-4 flex flex-col">
                <label htmlFor="productName">Product Price</label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  min={0}
                  className="border border-black rounded-md p-2 remove-arrow"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="productName">Product Quantity</label>
                <input
                  type="number"
                  id="productQuantity"
                  name="productQuantity"
                  min={0}
                  className="border border-black rounded-md p-2 remove-arrow"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="productName">Product Image</label>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  accept="image/*"
                  className="border border-black rounded-md p-2 bg-white cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-emerald-500 px-5 py-2 rounded-md text-white hover:bg-emerald-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
