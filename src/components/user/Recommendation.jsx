import React, { useEffect } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/productAction";

const Recommendation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, productId } = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(getProductDetail());
  }, []);
  return (
    <div className="flex flex-col gap-4 mb-10">
      <h2 className="font-bold text-xl">Recommendation</h2>
      <div className="grid grid-cols-4 gap-4">
        {products &&
          products.slice(0, 4).map((item, i) => (
            <div key={i}>
              <Card
                product_id={item.pid}
                productImage={item.productImage}
                productName={item.productName}
                productPrice={item.productPrice}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recommendation;
