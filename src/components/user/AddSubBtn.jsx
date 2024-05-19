import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddSubBtn = ({ btnSize, productQuantity, quantity = 1, onChange }) => {
  const [changeQuantity, setChangeQuantity] = useState(1);

  useEffect(() => {
    setChangeQuantity(quantity);
  }, [productQuantity]);

  const addQuantity = () => {
    if (changeQuantity < productQuantity) {
      setChangeQuantity(changeQuantity + 1);
      onChange(changeQuantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (changeQuantity > 1) {
      setChangeQuantity(changeQuantity - 1);
      onChange(changeQuantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= productQuantity) {
      setChangeQuantity(value);
      onChange(value);
    }
  };
  return (
    <div className="quantity flex items-center justify-around gap-4 sm:w-2/4 md:w-3/4">
      <FaMinus
        onClick={decreaseQuantity}
        className={`${btnSize} cursor-pointer`}
      />
      <input
        type="text"
        name="quantity"
        id="quantity"
        value={changeQuantity}
        onChange={handleQuantityChange}
        className={`text-center font-bold w-3/4 p-2 ${btnSize}`}
      />
      {/* <span className="text-2xl">{quantity}</span> */}
      <FaPlus onClick={addQuantity} className={`${btnSize} cursor-pointer`} />
    </div>
  );
};

export default AddSubBtn;
