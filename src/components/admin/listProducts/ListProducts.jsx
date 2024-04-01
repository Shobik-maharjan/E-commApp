import React, { useEffect, useState } from "react";
import { db, storage } from "../../../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { Outlet, useNavigate } from "react-router-dom";
import ImageComponent from "../../firebase/ImageComponent";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

const ListProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);
  const [imageId, setImageId] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "products"));
    const productData = [];
    const prodId = [];
    const imageData = [];
    querySnapshot.docs.forEach((doc) => {
      productData.push(doc.data());
      setProducts(productData);
    });
    querySnapshot.docs.forEach((doc) => {
      prodId.push(doc.id);
      setProductId(prodId);
    });
    querySnapshot.docs.forEach((doc) => {
      imageData.push(doc.data());
    });
    setLoading(false);
  };

  const deleteProducts = async (pid) => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const prodId = querySnapshot.docs[pid].id;
    const imageId = querySnapshot.docs[pid].data().productImage;
    await deleteDoc(doc(db, "products", prodId));

    const imageRef = ref(storage, "productsImage/" + imageId);
    await deleteObject(imageRef);
    // setTimeout(() => {
    fetchData();
    toast.success("product deleted successfullt");
    // console.log("product deleted successfully");
    // }, 2000);
  };
  //

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full p-4 overflow-y-scroll h-[calc(100vh-80px)] bg-gray-200">
        <h2 className="text-3xl mb-4">Products List</h2>
        <div id="loading" className={loading ? "display" : ""}></div>
        {loading ? (
          ""
        ) : (
          <table className="w-full table-auto text-left">
            <thead className="border-b border-black">
              <tr className="text-center">
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {products.map((list, i) => (
                <tr className="border-b border-black text-center" key={i}>
                  <td className="py-4 w-2/12">{list.productName}</td>
                  <td className="py-4">{list.productDescription}</td>
                  <td className="py-4">{list.productPrice}</td>
                  <td className="py-4">{list.category}</td>
                  <td className="py-4 w-28">
                    <ImageComponent imageName={list.productImage} />
                  </td>
                  <td className="py-4 text-center">{list.productQuantity}</td>
                  <td className="text-center w-fit py-4">
                    <button
                      className="bg-red-500 py-1 px-4 rounded mr-4 hover:bg-red-600 text-white"
                      onClick={() => deleteProducts(i)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-emerald-500 py-1 px-4 rounded hover:bg-emerald-600 text-white"
                      onClick={() => {
                        navigate(`${productId[i]}`);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* <ToastContainer /> */}
      <Outlet />
    </>
  );
};

export default ListProducts;
