import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../redux/actions/cartAction";
import { Link } from "react-router-dom";
import ImageComponent from "../../components/firebase/ImageComponent";
import Card from "../../components/Card";

const Cart = () => {
  const dispatch = useDispatch();
  const { getCart } = useSelector((state) => state.cartList);
  useEffect(() => {
    dispatch(getCartData());
  }, []);
  return (
    <div className="grid grid-cols-5 gap-4">
      {getCart &&
        getCart.map(
          (item) => (
            <div key={item.id}>
              <Card
                product_id={item.id}
                productImage={item.productImage}
                productName={item.productName}
                productPrice={item.productPrice}
              />
            </div>
          )
          // <div className="w-fit border-2 rounded-md p-2" key={item.id}>
          //   <Link to={`/product/${item.id}`}>
          //     <div className="image">
          //       <ImageComponent
          //         imageName={item.productImage}
          //         width={"w-48"}
          //         height={"h-40"}
          //       />
          //     </div>
          //     <div className="flex justify-between mx-2">
          //       <h2>{item.productName}</h2>
          //       <span>Rs.{item.productPrice}</span>
          //     </div>
          //   </Link>
          // </div>
        )}
    </div>
  );
};

export default Cart;
