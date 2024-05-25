import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCategory, getCategory } from "src/redux/actions/categoryAction";

const Category = () => {
  const dispatch = useDispatch();
  const [categorys, setCategory] = useState("");

  const { category } = useSelector((state) => state.categoryList);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(categorys));
    setCategory("");
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <div>
      <form action="">
        <label htmlFor="category">Add Category </label>
        <input
          type="text"
          name="category"
          id="category"
          value={categorys}
          className="border p-4"
          onChange={handleCategory}
        />
        <button
          type="submit"
          className="p-4 bg-green-600 rounded-md"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>

      {category &&
        category.map((item) => (
          <>
            <h2>{item.category}</h2>
          </>
        ))}
    </div>
  );
};

export default Category;
