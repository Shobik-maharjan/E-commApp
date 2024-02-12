import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
const EditProduct = () => {
  const { product_id } = useParams();
  console.log(product_id);
  const [products, setProducts] = useState([]);
  const [pid, setPid] = useState();

  //   console.log(products.product_id);
  const [data, setData] = useState({
    productName: "",
    productPrice: 0,
    category: "",
    productQuantity: 0,
    productDescription: "",
    productImage: "",
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  //   const fileInput = fileInputRef.current;
  //   const file = fileInput.files[0];
  const time = Date.now();
  console.log(products);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productData = [];
    querySnapshot.docs.forEach((doc) => {
      productData.push(doc.id);
      setPid(productData[pid]);
    });
    // querySnapshot.docs.forEach((doc) => {
    //   imageData.push(doc.data());
    //   console.log(imageData);
    // });
    console.log(productData[pid]);
  };

  // for updating data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      productName,
      productPrice,
      category,
      productQuantity,
      productDescription,
      //   productImage,
    } = data;
    await updateDoc(doc(db, "products", products), {
      productName,
      productPrice,
      category,
      productQuantity,
      productDescription,
      //   productImage: `${time}${file.name}`,
    });
    console.log("Product edited successfully");
    // const querySnapshot = await getDocs(collection(db, "products"));

    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id}`);
    //   const docId = doc.id;
    // });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full bg-gray-200  product-container overflow-y-scroll">
        <div className="p-4 ">
          <h2 className="text-3xl mb-4">Edit product</h2>

          <div className="flex gap-5">
            {/* left side form inputs */}
            <div className="flex flex-col w-full">
              <div className="mb-4 flex flex-col">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={products.productName}
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
                  value={data.productDescription}
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
                  onChange={handleChange}
                  ref={fileInputRef}
                />
              </div>

              <div className="error text-red-500">{error}</div>
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
      <ToastContainer />
    </>
  );
};

export default EditProduct;
