import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/actions/productAction";
import ImageComponent from "../../components/firebase/ImageComponent";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

const Home = () => {
  const dispatch = useDispatch();
  const { products, productId } = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(getProductDetail());
  }, []);
  return (
    <div className="grid grid-cols-4 xl:grid-cols-6 lg:grid-cols-5 gap-2 p-8 items-start">
      {products &&
        products.map((item, i) => (
          <div key={i}>
            <Card
              product_id={productId[i]}
              productImage={item.productImage}
              productName={item.productName}
              productPrice={item.productPrice}
            />
          </div>
          // <div className="w-fit border-2 rounded-md p-2" key={i}>
          //   <Link to={`/product/${productId[i]}`}>
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
        ))}
    </div>
  );
};

export default Home;
