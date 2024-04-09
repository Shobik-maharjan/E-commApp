import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductDetail } from "../../redux/actions/productAction";
import ImageComponent from "../../components/firebase/ImageComponent";
import { addToCart, getCartData } from "../../redux/actions/cartAction";
import { toast } from "react-toastify";
import AddSubBtn from "../../components/user/AddSubBtn";
import Recommendation from "../../components/user/Recommendation";

const SinglePage = () => {
  const id = useParams();

  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.productList);
  const { getCart } = useSelector((state) => state.cartList);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    dispatch(getSingleProductDetail(id.product_id));
  }, [dispatch, id]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(singleProduct?.productPrice * newQuantity);
  };

  const addToCarts = () => {
    if (localStorage.getItem("user")) {
      dispatch(
        addToCart({
          id: id.product_id,
          productName: singleProduct.productName,
          productImage: singleProduct.productImage,
          productPrice: singleProduct.productPrice,
          totalQuantity: quantity,
          productQuantity: singleProduct.productQuantity,
        })
      );
    } else {
      toast.error("Login to add to cart");
    }
  };

  useEffect(() => {
    if (singleProduct) {
      setTotalPrice(singleProduct?.productPrice);
    }
  }, [singleProduct]);

  return (
    <>
      {singleProduct && (
        <div className="w-2/3 mx-auto my-20 grid grid-cols-2 gap-4 p-4">
          <div className="image w-full">
            <ImageComponent
              imageName={singleProduct?.productImage}
              width={"w-full"}
              height={"h-full"}
            />
          </div>
          <div className="flex flex-col  gap-4 mx-2 w-full items-start justify-center">
            <h2 className="font-semibold text-2xl">
              {singleProduct?.productName}
            </h2>
            <p>{singleProduct?.productDescription}</p>
            <span>Rs.{totalPrice}</span>
            <AddSubBtn
              btnSize={"text-2xl"}
              productQuantity={singleProduct?.productQuantity}
              onChange={handleQuantityChange}
            />
            <div className="cart">
              {getCart && getCart.find((item) => item.id === id.product_id) ? (
                <button className="bg-green-600 hover:bg-green-600/90 px-3 py-2 rounded-md text-white text-lg cursor-not-allowed">
                  Already in cart
                </button>
              ) : (
                <button
                  className="bg-green-600 hover:bg-green-600/90 px-3 py-2 rounded-md text-white text-lg"
                  onClick={addToCarts}
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Recommendation />
    </>
  );
};

export default SinglePage;
