import { db } from "../../config/firebase";
import {
  GET_PRODUCT,
  GET_SINGLE_PRODUCT,
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_SUCCESS,
  SEARCH_PRODUCT,
} from "../constants/productConstant";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getProductDetail = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    });
    const querySnapshot = await getDocs(collection(db, "products"));
    const productDetails = querySnapshot.docs.map((doc) => ({
      pid: doc.id,
      ...doc.data(),
    }));
    dispatch({
      type: GET_PRODUCT,
      payload: productDetails,
    });
    dispatch({
      type: SEARCH_PRODUCT,
      payload: "",
    });
    dispatch({
      type: PRODUCT_REQUEST_SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
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

export const getSearchProduct =
  ({ prodName }) =>
  async (dispatch) => {
    try {
      const productRef = collection(db, "products");
      const querySnapshot = await getDocs(productRef);

      const products = querySnapshot.docs
        .map((doc) => ({
          pid: doc.id, // Include the document ID in the product data
          ...doc.data(),
        }))
        .filter((product) =>
          product.productName.toLowerCase().includes(prodName.toLowerCase())
        );

      dispatch({
        type: SEARCH_PRODUCT,
        payload: products,
      });
    } catch (e) {
      console.log(e);
    }
  };
