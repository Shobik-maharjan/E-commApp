import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCardData,
  getCartData,
  updateCartData,
} from "src/redux/actions/cartAction";
import Loading from "components/Loading";
import { RiDeleteBinFill } from "react-icons/ri";
import AddSubBtn from "components/user/AddSubBtn";
import { getProductDetail } from "src/redux/actions/productAction";
import { FaArrowRightLong } from "react-icons/fa6";
import ImageComponent from "components/firebase/ImageComponent";

const Cart = () => {
  const dispatch = useDispatch();
  const { getCart, loading } = useSelector((state) => state.cartList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    dispatch(getProductDetail());
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [updatedQuantity, setUpdatedQuantity] = useState();

  useEffect(() => {
    // Calculate total price and quantity whenever cart items change
    if (getCart) {
      let total = 0;
      let quantity = 0;
      getCart.forEach((item) => {
        total += item.productPrice * item.totalQuantity;
        quantity += item.totalQuantity;
      });
      setTotalPrice(total);
      setCartItems(getCart);
      setQuantity(quantity);
    }
  }, [getCart]);

  const deleteCart = (id) => {
    dispatch(deleteCardData(id));
  };

  const handleQuantityChange = (newQuantity, itemId) => {
    setUpdatedQuantity(newQuantity);
    // Find the item in cartItems and update its quantity
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          totalQuantity: newQuantity,
        };
        // item.totalQuantity = newQuantity;
      }
      return item;
    });
    setCartItems(updatedCartItems);

    // Recalculate total price
    let total = 0;
    let quantity = 0;
    updatedCartItems.forEach((item) => {
      total += item.productPrice * item.totalQuantity;
      quantity += item.totalQuantity;
    });
    setQuantity(quantity);
    setTotalPrice(total);
  };

  const updateCart = (id) => {
    dispatch(updateCartData(id, updatedQuantity));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="font-bold text-2xl my-4">My Cart</h2>
          {getCart && getCart?.length !== 0 ? (
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="flex flex-col md:col-span-2 gap-4 border p-4 rounded-md h-fit">
                {getCart &&
                  getCart.map((item, index) => (
                    <div key={item.id} className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 w-full">
                        <Link to={`/product/${item.id}`}>
                          <ImageComponent
                            imageName={item.productImage}
                            width={"w-48"}
                            height={"h-32"}
                          />
                        </Link>
                        <div className="flex justify-between gap-4 w-full">
                          <Link to={`/product/${item.id}`}>
                            <div>
                              <h2 className="font-bold">{item.productName}</h2>
                              <span>Rs.{item.productPrice}</span>
                            </div>
                          </Link>
                          <div className="flex flex-col items-center justify-start gap-1">
                            <RiDeleteBinFill
                              onClick={() => deleteCart(item)}
                              className="text-red-600 text-2xl hover:cursor-pointer"
                            />
                            <div className="p-1 items-center flex w-full justify-center ml-auto">
                              <AddSubBtn
                                btnSize={"text-base"}
                                productQuantity={item.productQuantity}
                                quantity={item.totalQuantity}
                                onChange={(quantity) =>
                                  handleQuantityChange(quantity, item.id)
                                }
                              />
                            </div>
                            <button
                              onClick={() => updateCart({ id: item.id })}
                              className="px-3 py-1.5 bg-green-600 rounded-md text-white"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                      {index !== getCart.length - 1 && (
                        <hr className="border" />
                      )}
                    </div>
                  ))}
              </div>
              <div className="summary flex flex-col gap-4 border rounded-md p-4 h-fit">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold">Order Summary</h2>
                  <div className="flex justify-between">
                    <p>Quantity</p>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Total</p>
                    <span className="font-semibold">Rs.{totalPrice}</span>
                  </div>
                  <hr />
                </div>
                <button className="px-2 py-2 flex items-center gap-4 text-white justify-center bg-green-600 rounded-md hover:bg-green-600/90 ">
                  Checkout
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 items-center mb-10">
                <h2 className="font-bold text-2xl">Your Cart is empty</h2>
                <button
                  className="border px-4 py-2 w-fit rounded-md bg-green-600 text-white"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
