import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from "./firebase/ImageComponent";

const Card = ({ product_id, productImage, productName, productPrice }) => {
  return (
    <div className="min-w-fit border-2 flex flex-col gap-2 rounded-md p-2">
      <Link to={`/product/${product_id}`}>
        <div className="image">
          <ImageComponent
            imageName={productImage}
            width={"w-64"}
            height={"h-40"}
          />
        </div>
      </Link>
      <div className="flex justify-between mx-6 h-12">
        <h2 className="font-semibold">{productName}</h2>
        <span>Rs.{productPrice}</span>
      </div>
    </div>
  );
};

export default Card;
