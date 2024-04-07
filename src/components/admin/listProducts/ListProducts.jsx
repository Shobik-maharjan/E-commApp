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
import Loading from "../../Loading";

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
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full text-left">
            <div className="border-b border-black">
              <div className=" grid grid-cols-9 gap-2 justify-between text-center">
                <div>Product Name</div>
                <div className="col-span-2">Product Description</div>
                <div>Price</div>
                <div>Category</div>
                <div>Image</div>
                <div className="grid-flow-col">Quantity</div>
              </div>
            </div>

            <div className="flex flex-col">
              {products.map((list, i) => (
                <div
                  className="border-b grid grid-cols-9 gap-2 justify-between items-center border-black text-center"
                  key={i}
                >
                  <div className="py-4">{list.productName}</div>
                  <div className="py-4 col-span-2">
                    {list.productDescription}
                  </div>
                  <div className="py-4">{list.productPrice}</div>
                  <div className="py-4">{list.category}</div>
                  <div className="py-4">
                    <ImageComponent imageName={list.productImage} />
                  </div>
                  <div className="py-4 text-center">{list.productQuantity}</div>
                  <div className="col-span-2 text-center flex gap-4 w-fit">
                    <button
                      className="bg-red-500 h-fit py-1 px-4 rounded hover:bg-red-600 text-white"
                      onClick={() => deleteProducts(i)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-emerald-500 h-fit py-1 px-4 rounded hover:bg-emerald-600 text-white"
                      onClick={() => {
                        navigate(`${productId[i]}`);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
      <Outlet />
    </>
  );
};

export default ListProducts;
