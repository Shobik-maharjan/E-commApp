import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Card from "components/Card";
import {
  getProductDetail,
  getSearchProduct,
} from "src/redux/actions/productAction";
import Select from "react-select";
const Product = () => {
  const dispatch = useDispatch();
  const { products, searchProducts } = useSelector(
    (state) => state.productList
  );

  const [productToShow, setProductToShow] = useState(8);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getProductDetail());
  }, []);

  const handleLoadMore = () => {
    setProductToShow(productToShow + 4);
  };

  const handleSearch = (e) => {
    let searchQuery = e.target.value;
    setSearch(searchQuery);
    setProductToShow(8);
    setTimeout(() => {
      dispatch(getSearchProduct({ prodName: searchQuery }));
    }, 1000);
  };
  const handleCategoryChange = (selectedOption) => {
    console.log("🚀 ~ handleCategoryChange ~ selectedOption:", selectedOption);
    const category = selectedOption.value;
    setSelectedCategory(category);
    setProductToShow(8);
    dispatch(getSearchProduct({ prodName: search, category }));
  };

  const options = [
    { value: "", label: "Select a category" },
    { value: "Mobile", label: "Mobile" },
    { value: "Laptop", label: "Laptop" },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "8rem",
      maxWidth: "fit-content",
      border: state.isFocused ? "2px solid green" : "2px solid #ced1d7",
      padding: "2px 4px",
      borderColor: "green",
      boxShadow: null,
      "&:hover": {
        borderColor: "green",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "green" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "green" : "rgba(26, 180, 9, 0.637)",
      },
      color: state.isSelected ? "white" : "black",
      "&:active": {
        backgroundColor: "green",
        color: "white",
      },
    }),
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="title flex items-center gap-4">
        <h2 className="font-bold text-xl">All&nbsp;Products</h2>
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          placeholder="search"
          className="px-4 py-2 w-1/3 rounded-md border-2 border-slate-300 hover:border-green-700"
          onChange={(e) => handleSearch(e)}
        />
        <Select
          styles={customStyles}
          className="min-w-32 max-w-fit"
          onChange={handleCategoryChange}
          options={options}
          value={options.find((option) => option.value === selectedCategory)}
        />
      </div>

      <div className="mb-10 flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-6">
          {(searchProducts ? searchProducts : products) &&
            (searchProducts ? searchProducts : products)
              .slice(0, productToShow)
              .map((item, i) => (
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
        {productToShow < (searchProducts?.length || products?.length) && (
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
