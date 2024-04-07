import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddSubBtn = ({ btnSize, productQuantity, onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    if (quantity < productQuantity) {
      setQuantity(quantity + 1);
      onChange(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= productQuantity) {
      setQuantity(value);
      onChange(value);
    }
  };
  return (
    <div className="quantity flex items-center justify-around gap-4 w-1/2">
      <FaMinus
        onClick={decreaseQuantity}
        className={`${btnSize} cursor-pointer`}
      />
      <input
        type="text"
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        className={`text-center font-bold w-1/4 p-2 ${btnSize}`}
      />
      {/* <span className="text-2xl">{quantity}</span> */}
      <FaPlus onClick={addQuantity} className={`${btnSize} cursor-pointer`} />
    </div>
  );
};

export default AddSubBtn;
