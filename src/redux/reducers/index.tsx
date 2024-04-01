import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  productList: productReducer,
  userList: userReducer,
  cartList: cartReducer,
});

export default rootReducer;
