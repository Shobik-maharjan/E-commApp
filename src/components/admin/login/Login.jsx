import React, { useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const expireDate = new Date().setDate(new Date().getDate() + 1);

  // console.log(expireDate);
  // const milliseconds = 1707902283340;
  // const dateObject = new Date(milliseconds);
  // const formattedDate = dateObject.toUTCString();
  // console.log(formattedDate);

  const handleSubmit = async (e) => {
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
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // .then((userCredential) => {
        const user = userCredential.user;

        const querySnapshot = await getDoc(doc(db, "users", user.uid));
        if (querySnapshot) {
          const userData = querySnapshot.data();
          localStorage.clear();

          if (userData.user.role === "admin") {
            localStorage.setItem(
              "admin",
              JSON.stringify({
                value: user.accessToken,
                expireDate: expireDate,
              })
            );
            navigate("/admin");
          } else {
            localStorage.setItem("user", user.accessToken);
            navigate("/");
          }
          toast.success("Login successful");
        } else {
          console.log("User document not found in Firestore.");
        }
      } catch (err) {
        const errorMessage = err.message;
        setError(errorMessage);
        setPassword("");
        setLoading(false);
      }
    } else {
      setError("email and password is required");
    }
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
      <div className="w-full flex h-screen justify-center items-center">
        <form action="" onSubmit={handleSubmit}>
          <div className="bg-gray-200 px-8 py-10 rounded-md uppercase shadow-[6px_6px_14px_1px]">
            <h2 className="text-center text-2xl">Login</h2>
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
                className="w-full my-2 mx-auto p-2.5 rounded-md outline-none"
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

            <div className="text-right text-xl flex gap-20 py-2.5 px-0">
              <Link className="hover:text-emerald-600" to={"/register"}>
                Register
              </Link>
              <Link className="hover:text-emerald-600" to="/forgetPassword">
                forget password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
