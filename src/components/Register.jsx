import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "src/redux/actions/userAction";
import { useFormik } from "formik";
import { registerSchema } from "src/schemas";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        dispatch(
          registerUser({
            email: values.email,
            password: values.password,
            username: values.username,
            navigate,
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
          <div className="bg-gray-200 rounded-md uppercase shadow-[6px_6px_14px_1px] px-8 py-10">
            <h2 className="text-center text-2xl">Register</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="mx-0">
                <label htmlFor="email" className="required">
                  Email
                </label>
                <input
                  value={values.email}
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="on"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email@gmail.com"
                  className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="username" className="required">
                  Username
                </label>
                <input
                  value={values.username}
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username"
                  className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                />
                <div className="text-red-500">
                  {errors.username && touched.username ? errors.username : null}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="password" className="required">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                  />
                  {values.password.length > 0 && (
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  )}
                </div>
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="confirmPassword" className="required">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    value={values.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                    className="w-full my-2.5 mx-auto p-2.5 rounded-md outline-none"
                  />
                  {values.confirmPassword.length > 0 && (
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  )}
                </div>
                <div className="text-red-500">
                  {errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : null}
                </div>
              </div>
              <button
                type="submit"
                id="form-login"
                className="py-2.5 px-5 bg-green-600 text-white rounded-md text-xl uppercase mb-2.5 w-full hover:bg-green-600/80"
              >
                Register
              </button>
            </div>

            <div className="text-red-500 capitalize">{error}</div>

            <div className="text-right text-xl flex justify-between py-2.5 px-0">
              <Link className="hover:text-green-600" to={"/login"}>
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
