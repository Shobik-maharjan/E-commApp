import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "src/config/firebase";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
const EditProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productPrice: 0,
    category: "",
    productQuantity: 0,
    productDescription: "",
  });
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [oldImageName, setOldImageName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const time = Date.now();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productData = [];
    querySnapshot.docs.forEach((doc) => {
      productData.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    let selectedProduct = [];
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id === product_id) {
        selectedProduct = productData[i];
      }
    }
    if (selectedProduct) {
      setProduct(selectedProduct.data);
      setOldImageName(selectedProduct?.data?.productImage);
    }
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
      productImage,
    } = product;

    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];

    if (file) {
      if (oldImageName) {
        const oldImageRef = ref(storage, `productsImage/${oldImageName}`);
        await deleteObject(oldImageRef);
      }

      const imageName = `${time}${file.name}`;

      const storageRef = ref(storage, `productsImage/${imageName}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        productImage;
        // console.log("file uploaded");
      });

      setProduct({
        ...product,
        productImage: imageName,
      });

      await updateDoc(doc(db, "products", product_id), {
        productName,
        productPrice,
        category,
        productQuantity,
        productDescription,
        productImage: `${imageName}`,
      });
    } else {
      await updateDoc(doc(db, "products", product_id), {
        productName,
        productPrice,
        category,
        productQuantity,
        productDescription,
      });
    }
    navigate("/admin/products");
    toast.success("Product edited successfully");
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
                  value={product.productName}
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
                  value={product.category || ""}
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
                  value={product.productDescription}
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
                  value={product.productPrice}
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
                  value={product.productQuantity}
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
              className="bg-emerald-500 px-5 py-2 mr-4 rounded-md text-white hover:bg-emerald-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="submit"
              className="bg-red-500 px-5 py-2 rounded-md text-white hover:bg-red-600"
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
