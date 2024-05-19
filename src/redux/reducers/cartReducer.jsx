import {
  ADD_TO_MY_CART,
  CART_REQUEST,
  CART_REQUEST_FAIL,
  CART_REQUEST_SUCCESS,
  GET_CART,
  UPDATE_CART,
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
    case UPDATE_CART:
      return {
        ...state,
        updatedCart: action.payload,
      };
    case CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CART_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CART_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
