import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { REGISTER_USER, USER_DETAILS } from "../constants/userConstant";
import { REGISTER_FAIL } from "../constants/productConstant";
import { auth, db } from "src/config/firebase";
import { toast } from "react-toastify";

export const registerUser =
  ({ email, password, username, navigate, setError }) =>
  async (dispatch) => {
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(users.user, {
        displayName: username,
      });
      const user = {
        email: users.user.email,
        username,
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
        navigate("/login");
      }, 2000);
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });
      setError(error.message);
      console.log(error);
    }
  };

export const loginUser =
  ({ email, password, navigate, setError }) =>
  async (dispatch) => {
    try {
      const userCrediental = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCrediental.user;
      const querySnapshot = await getDoc(doc(db, "users", user.uid));
      if (querySnapshot) {
        const userData = querySnapshot.data();
        localStorage.clear();

        if (userData.user.role === "admin") {
          localStorage.setItem("admin", user.accessToken);
          navigate("/admin");
        } else {
          localStorage.setItem("user", user.accessToken);
          navigate("/");
        }
        toast.success("Login successful");
      }
    } catch (error) {
      setError("Invalid-Credential");
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

export const resetPassword = (email, setError) => async () => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent successfully!");
    setError("");
  } catch (error) {
    setError("Invalid Email Address");
    console.log(error.message);
  }
};

export const logoutUser = () => () => {
  localStorage.clear();
  auth.signOut();
  window.location.href = "/login";
};
