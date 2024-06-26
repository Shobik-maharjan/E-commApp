import React, { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "src/config/firebase";
const AddProduct = () => {
  const [data, setData] = useState({
    productName: "",
    productPrice: "",
    category: "",
    productQuantity: "",
    productDescription: "",
    productImage: "",
  });
  const category = ["Mobile", "Monitor", "Laptop", , "Keyboard", "Mouse"];
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      productName,
      productPrice,
      category,
      productQuantity,
      productDescription,
      productImage,
    } = data;

    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];

    if (
      productName === "" ||
      productName === null ||
      productPrice === "" ||
      productPrice === null ||
      category === "" ||
      category === null ||
      productQuantity === "" ||
      productQuantity === null ||
      productDescription === "" ||
      productDescription === null
    ) {
      setError("All fields are required");
      // console.log("All field are required");
      return;
    }

    if (!file) {
      setError("Please select an image");
      return;
    }
    const time = Date.now();
    await addDoc(collection(db, "products"), {
      productName,
      productPrice,
      category,
      productQuantity,
      productDescription,
      productImage: `${time}${file.name}`,
    });

    const storageRef = ref(storage, `productsImage/${time}${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      productImage;
      // console.log("file uploaded");
    });
    setError("");
    setData({
      productName: "",
      productPrice: "",
      category: "",
      productQuantity: "",
      productDescription: "",
      productImage: "",
    });
    fileInputRef.current.value = "";
    toast.success("Product added successfully");
  };

  return (
    <div className="w-full bg-gray-200 product-container overflow-y-scroll">
      <div className="p-4 ">
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
                value={data.productName}
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
                {category.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
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
                value={data.productDescription}
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
                value={data.productPrice}
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
                value={data.productQuantity}
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
  );
};

export default AddProduct;
