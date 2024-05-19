import React, { useEffect } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "src/redux/actions/productAction";
import Loading from "src/components/Loading";
import ImageComponent from "src/components/firebase/ImageComponent";
import { db, storage } from "src/config/firebase";

const ListProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, searchProducts } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getProductDetail());
  }, []);

  const deleteProducts = async (pid) => {
    const querySnapshot = await getDoc(doc(db, "products", pid));
    const imageId = querySnapshot?.data().productImage;
    const imageRef = ref(storage, "productsImage/" + imageId);
    await deleteObject(imageRef);
    await deleteDoc(doc(db, "products", pid));
    dispatch(getProductDetail());
    toast.success("product deleted successfullt");
  };

  return (
    <>
      <div className="w-full p-4 overflow-y-scroll h-[calc(100vh-80px)] bg-gray-200">
        <h2 className="text-3xl mb-4">Products List</h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full text-left">
            <div className="border-b border-black">
              <div className=" grid grid-cols-8 gap-2 justify-between text-center">
                <div>Product Name</div>
                <div className="col-span-2">Product Description</div>
                <div>Price</div>
                <div>Category</div>
                <div>Image</div>
                <div className="grid-flow-col">Quantity</div>
              </div>
            </div>

            <div className="flex flex-col">
              {(searchProducts || products || []).map((list, i) => (
                <div
                  className="border-b grid grid-cols-8 gap-2 justify-between items-center border-black text-center"
                  key={i}
                >
                  <div className="py-4">{list.productName}</div>
                  <div className="py-4 col-span-2 text-left">
                    {list.productDescription}
                  </div>
                  <div className="py-4">{list.productPrice}</div>
                  <div className="py-4">{list.category}</div>
                  <div className="py-4">
                    <ImageComponent imageName={list.productImage} />
                  </div>
                  <div className="py-4 text-center">{list.productQuantity}</div>
                  <div className="col-span-1 text-center flex flex-col gap-4 w-fit">
                    <button
                      className="bg-emerald-500 h-fit py-1 px-4 rounded hover:bg-emerald-600 text-white"
                      onClick={() => {
                        navigate(list.pid);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 h-fit py-1 px-4 rounded hover:bg-red-600 text-white"
                      onClick={() => deleteProducts(list.pid)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ListProducts;
