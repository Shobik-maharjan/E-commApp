import {
  GET_PRODUCT,
  GET_PRODUCT_ID,
  GET_SINGLE_PRODUCT,
} from "../constants/productConstant";

const initialData = {
  product: [],
};

const productReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_ID:
      return {
        ...state,
        productId: action.payload,
      };
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
