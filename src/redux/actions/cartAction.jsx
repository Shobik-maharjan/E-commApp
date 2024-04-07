import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ADD_TO_MY_CART,
  CART_REQUEST,
  CART_REQUEST_FAIL,
  CART_REQUEST_SUCCESS,
  GET_CART,
} from "../constants/cartConstant";
import { toast } from "react-toastify";

export const addToCart =
  ({
    id,
    productName,
    productImage,
    productPrice,
    totalQuantity,
    productQuantity,
  }) =>
  (dispatch) => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = user.uid;
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          const myCart = docSnap?.data()?.myCart;

          const isDuplicateData = myCart?.some((item) => item.id == id);
          if (!isDuplicateData) {
            await updateDoc(docRef, {
              myCart: arrayUnion({
                id,
                productName,
                productImage,
                productPrice,
                totalQuantity,
                productQuantity,
              }),
            });
            dispatch({
              type: ADD_TO_MY_CART,
              payload: {
                id,
                productName,
                productImage,
                productPrice,
                totalQuantity,
              },
            });
            toast.success("Item added to list");
          } else {
            toast.error("Already added to my list");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getCartData = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_REQUEST,
    });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const querySnapshot = await getDoc(doc(db, "users", userId));
        const data = querySnapshot.data()?.myCart;
        dispatch({
          type: GET_CART,
          payload: data,
        });
        dispatch({
          type: CART_REQUEST_SUCCESS,
        });
      }
      dispatch({
        type: CART_REQUEST_FAIL,
      });
    });
  } catch (error) {
    dispatch({
      type: CART_REQUEST_FAIL,
    });
    console.log(error);
  }
};

export const deleteCardData = (index) => async (dispatch) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        await updateDoc(doc(db, "users", userId), {
          myCart: arrayRemove(index),
        });
        toast.success("Removed from my list");
        dispatch(getCartData());
      }
    });
  } catch (error) {
    console.log(error);
  }
};
