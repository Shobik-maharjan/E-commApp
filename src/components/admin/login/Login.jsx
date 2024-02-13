import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./database/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (
      email !== "" &&
      email !== null &&
      password !== "" &&
      password !== null
    ) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("authenticated", user.uid);
          toast.success("logged in successfully");
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          const errorMessage = err.message;
          setError(errorMessage);
          setPassword("");
          setLoading(false);
        });
    } else {
      setError("email and password is required");
    }
  };
  return (
    <>
      <div className="bg-gray-200 m-auto max-w-md mt-28 px-8 py-10 rounded-md uppercase shadow-[6px_6px_14px_1px]">
        <h2 className="text-center text-2xl">Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5 mx-0">
            <label htmlFor="email">Email : </label>
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
          <div className="my-5 mx-0">
            <label htmlFor="password">Password : </label>
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full my-2 mx-auto p-2.5 rounded-md"
            />
          </div>
          <button
            type="submit"
            id="form-login"
            className="py-2.5 px-5 bg-emerald-500 text-white rounded-md text-xl uppercase mb-2.5 w-full hover:bg-emerald-600"
          >
            Login
          </button>

          <div className="text-red-500 capitalize">{error}</div>

          <div className="text-right text-xl flex justify-between py-2.5 px-0">
            <Link className="hover:text-emerald-600" to={"/register"}>
              Register
            </Link>
            <Link className="hover:text-emerald-600" to="/forgetPassword">
              forget password?
            </Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default Login;
