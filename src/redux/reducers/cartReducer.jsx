import {
  ADD_TO_MY_CART,
  CART_REQUEST,
  GET_CART,
} from "../constants/cartConstant";

const initialData = {
  cart: [],
};

const cartReducer = (state = initialData, action) => {
  switch (action.type) {
    case ADD_TO_MY_CART:
      return {
        ...state,
        products: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        getCart: action.payload,
      };
    // case CART_REQUEST:
    //   return {
    //     ...state,
    //     getProduct: action.payload,
    //   };
    default:
      return state;
  }
};

export default cartReducer;
