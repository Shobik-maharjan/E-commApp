import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { REGISTER_USER, USER_DETAILS } from "../constants/userConstant";
import { REGISTER_FAIL } from "../constants/productConstant";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";

export const registerUser =
  ({ email, password, username }) =>
  async (dispatch) => {
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(users.user, {
        displayName: username,
      });
      const user = {
        email: users.user.email,
        username,
        password,
        uid: users.user.uid,
        role: "user",
      };
      setDoc(doc(db, "users", users.user.uid), { user });
      setTimeout(() => {
        dispatch({
          type: REGISTER_USER,
          payload: {
            email,
            username,
            password,
            uid: users.user.uid,
          },
        });
        toast.success("User registered successfully");
      }, 500);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error,
      });
      console.log(error);
    }
  };

export const currentUser = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const username = user?.displayName;
      dispatch({
        type: USER_DETAILS,
        payload: { username },
      });
    } else {
      dispatch({
        type: USER_DETAILS,
        payload: { username: null },
      });
    }
  });
};

export const logoutUser = () => () => {
  localStorage.clear();
  auth.signOut();
  window.location.href = "/login";
};
