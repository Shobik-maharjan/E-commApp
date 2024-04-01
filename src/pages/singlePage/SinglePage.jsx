import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductDetail } from "../../redux/actions/productAction";
import ImageComponent from "../../components/firebase/ImageComponent";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { addToCart } from "../../redux/actions/cartAction";

const SinglePage = () => {
  const id = useParams();

  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.productList);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getSingleProductDetail(id.product_id));
  }, [dispatch, id]);

  const addQuantity = () => {
    if (quantity < singleProduct.productQuantity) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= singleProduct.productQuantity) {
      setQuantity(value);
    }
  };

  return (
    <>
      {singleProduct && (
        <div className="w-2/3 mx-auto mt-[10%] flex justify-between p-4">
          <div className="image w-2/4">
            <ImageComponent
              imageName={singleProduct.productImage}
              width={"w-full"}
              height={"h-full"}
            />
          </div>
          <div className="flex flex-col gap-4 mx-2 w-1/3 items-start justify-center">
            <h2 className="font-semibold text-2xl">
              {singleProduct.productName}
            </h2>
            <p>{singleProduct.productDescription}</p>
            <span>Rs.{singleProduct.productPrice * quantity}</span>
            <div className="quantity flex items-center gap-4">
              <FaMinus onClick={decreaseQuantity} className="text-2xl" />
              <input
                type="text"
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="text-center w-1/4 p-2 text-2xl"
              />
              {/* <span className="text-2xl">{quantity}</span> */}
              <FaPlus onClick={addQuantity} className="text-2xl" />
            </div>
            <div className="cart">
              <button
                className="bg-green-600 hover:bg-green-600/90 px-3 py-2 rounded-md text-white text-lg"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: id.product_id,
                      productName: singleProduct.productName,
                      productImage: singleProduct.productImage,
                      productPrice: singleProduct.productPrice,
                      totalQuantity: quantity,
                    })
                  )
                }
              >
                Add to cart
              </button>
            </div>
            {/* <h3>Quantity: {singleProduct.productQuantity}</h3> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePage;
