import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productData = [];
    querySnapshot.docs.forEach((doc) => {
      productData.push(doc.data());
      setProducts(productData);
    });
    // console.log(productData);
  };

  const deleteProducts = async (pid) => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const prodId = querySnapshot.docs[pid].id;
    // console.log(pid);
    await deleteDoc(doc(db, "products", prodId));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full p-4">
        <h2>Products List</h2>
        <table className="w-full table-auto text-left">
          <thead className="border-b border-black">
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products.map((list, i) => (
              <tr className="border-b border-black" key={i}>
                <td className="py-4 w-4/12">{list.productName}</td>
                <td className="py-4">{list.productPrice}</td>
                <td className="py-4">{list.category}</td>
                <td className="py-4">Image</td>
                <td className="py-4">{list.productQuantity}</td>
                <td className="text-center w-fit py-4">
                  <button
                    className="bg-red-500 py-1 px-4 rounded mr-4 hover:bg-red-600 hover:text-white"
                    onClick={() => deleteProducts(i)}
                  >
                    Del
                  </button>
                  <button className="bg-emerald-500 py-1 px-4 rounded hover:bg-emerald-600 hover:text-white">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListProducts;
