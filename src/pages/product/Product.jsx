import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { getProductDetail } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
const Product = () => {
  const dispatch = useDispatch();
  const { products, productId } = useSelector((state) => state.productList);

  const [productToShow, setProductToShow] = useState(8);

  useEffect(() => {
    dispatch(getProductDetail());
  }, []);

  const handleLoadMore = () => {
    setProductToShow(productToShow + 4);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="title">
        <h2 className="font-bold text-xl">All Products</h2>
      </div>
      <div className="mb-10 flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-6">
          {products &&
            products.slice(0, productToShow).map((item, i) => (
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
        {productToShow < products?.length && (
          <button
            onClick={handleLoadMore}
            className="border hover:border-green-600 mt-5 hover:bg-green-600 text-lg hover:text-white rounded-md px-4 py-2 w-fit mx-auto font-semibold"
          >
            Load More ...
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
