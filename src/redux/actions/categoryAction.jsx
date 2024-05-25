import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ADD_CATEGORY, GET_CATEGORY } from "../constants/CategoryConstant";
import { db } from "src/config/firebase";

export const addCategory = (category) => async (dispatch) => {
  try {
    await addDoc(collection(db, "category"), { category });
    dispatch({
      type: ADD_CATEGORY,
      payload: category,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    const data = await getDocs(collection(db, "category"));
    const category = data.docs.map((doc) => ({
      category_id: doc.id,
      ...doc.data(),
    }));
    dispatch({
      type: GET_CATEGORY,
      payload: category,
    });
  } catch (error) {
    console.log(error);
  }
};
