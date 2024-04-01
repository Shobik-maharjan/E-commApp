import { db } from "../../config/firebase";
import {
  GET_PRODUCT,
  GET_PRODUCT_ID,
  GET_SINGLE_PRODUCT,
} from "../constants/productConstant";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export const getProductDetail = () => async (dispatch) => {
  const querySnapshot = await getDocs(collection(db, "products"));
  // console.log(querySnapshot.docs);
  const productData = [];
  const productId = [];
  querySnapshot.docs.forEach((doc) => {
    productData.push(doc.data());
    productId.push(doc.id);
  });
  dispatch({
    type: GET_PRODUCT,
    payload: productData,
  });
  dispatch({
    type: GET_PRODUCT_ID,
    payload: productId,
  });
};

export const getSingleProductDetail = (id) => async (dispatch) => {
  const querySnapshot = await getDoc(doc(db, "products", id));
  const singleProduct = querySnapshot.data();
  // console.log(querySnapshot.data());
  dispatch({
    type: GET_SINGLE_PRODUCT,
    payload: singleProduct,
  });
};
