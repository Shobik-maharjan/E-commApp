import { push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/actions/userAction";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const role = "user";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, username }));

    // if (email === auth) {
    //   console.log("email same");
    //   return;
    // }

    // if (loading) {
    //   return;
    // }
    // if (
    //   email !== "" &&
    //   email !== null &&
    //   password !== "" &&
    //   password !== null
    // ) {
    //   if (password === confirmPassword) {
    //     setLoading(true);
    //     createUserWithEmailAndPassword(auth, email, password)
    //       .then((userCredential) => {
    //         const user = userCredential.user;
    //         toast.success("User registered successfully");
    //         // setTimeout(() => {
    //         //   navigate("/protedted");
    //         // }, 2000);
    //         setLoading(false);

    //         addDoc(collection(db, "users"), {
    //           email: user.email,
    //           password,
    //           role,
    //           userId: user.uid,
    //         });
    //       })
    //       .catch((err) => {
    //         const errorMessage = err.message;
    //         console.log(err);
    //         setError(errorMessage);
    //         setLoading(false);
    //       });
    //   } else {
    //     setError("password and confirmation password do not match.");
    //   }
    // } else {
    //   setError("All field are required");
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
    if (localStorage.getItem("admin")) {
      navigate("/admin");
    }
  }, []);
  return (
    <>
      <div className=" w-full flex h-screen justify-center items-center ">
        <form action="" onSubmit={handleSubmit}>
          <div className="bg-gray-200 rounded-md uppercase shadow-[6px_6px_14px_1px] px-8 py-10">
            <h2 className="text-center text-2xl">Register</h2>
            <div className="my-5 mx-0">
              <label htmlFor="email" className="required">
                Email :
              </label>
              <input
                value={email}
                type="text"
                name="email"
                id="email"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
              />
            </div>
            <div className="input-container">
              <label htmlFor="username" className="required">
                Username :
              </label>
              <input
                value={username}
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="required">
                Password :
              </label>
              <input
                value={password}
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
              />
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword" className="required">
                Confirm Password :
              </label>
              <input
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="password"
                className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
              />
            </div>
            <button
              type="submit"
              id="form-login"
              className="py-2.5 px-5 bg-emerald-500 text-white rounded-md text-xl uppercase mb-2.5 w-full hover:bg-emerald-600"
            >
              Register
            </button>

            <div className="text-red-500 capitalize">{error}</div>

            <div className="text-right text-xl flex justify-between py-2.5 px-0">
              <Link className="hover:text-emerald-600" to={"/login"}>
                Login Here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
