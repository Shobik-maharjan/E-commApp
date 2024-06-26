import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductDetail } from "src/redux/actions/productAction";
import Card from "src/components/Card";
import Loading from "src/components/Loading";
import Delivery from "src/components/user/Delivery";
import TopPart from "src/components/user/TopPart";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, productId, loading } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(getProductDetail());
  }, []);
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="top-part">
          <TopPart />
        </div>
        <h2 className="font-bold text-xl">All Products</h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="All product flex flex-col gap-4">
            <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8">
              {products &&
                products.slice(0, 8).map((item, i) => (
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
            <button
              className="border hover:border-green-600 mt-5 hover:bg-green-600 text-lg hover:text-white rounded-md px-4 py-2 w-fit mx-auto font-semibold"
              onClick={() => navigate("/products")}
            >
              Explore more
            </button>
          </div>
        )}
        <Delivery />
      </div>
    </>
  );
};

export default Home;
