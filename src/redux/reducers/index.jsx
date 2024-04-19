import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  productList: productReducer,
  userList: userReducer,
  cartList: cartReducer,
  categoryList: categoryReducer,
});

export default rootReducer;
