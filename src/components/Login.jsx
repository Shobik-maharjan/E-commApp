import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "src/schemas";
import { useDispatch } from "react-redux";
import { loginUser } from "src/redux/actions/userAction";
import Navbar from "./user/Navbar";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const expireDate = new Date().setDate(new Date().getDate() + 1);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        dispatch(
          loginUser({
            email: values.email,
            password: values.password,
            navigate: navigate,
            setError: setError,
          })
        );
        action.resetForm();
      },
    });

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
      <div className="flex my-10 justify-center items-center">
        <form action="" onSubmit={handleSubmit} className="w-96">
          <div className="bg-gray-200 px-8 py-10 rounded-md uppercase shadow-[6px_6px_14px_1px]">
            <h2 className="text-center text-2xl">Login</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  className="w-full p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <button
                type="submit"
                id="form-login"
                className="py-2.5 px-5 bg-green-600 text-white rounded-md text-xl uppercase mb-2.5 w-full hover:bg-green-600/80"
              >
                Login
              </button>
            </div>

            <div className="text-red-500">{error}</div>

            <div className="text-right text-xl flex gap-10 py-2.5 px-0">
              <Link className="hover:text-green-600" to={"/register"}>
                Register
              </Link>
              <Link to="/forgot-password" className="hover:text-green-600">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
