import {
  GET_PRODUCT,
  GET_SINGLE_PRODUCT,
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_SUCCESS,
  SEARCH_PRODUCT,
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
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        searchProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
