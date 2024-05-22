import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "src/redux/actions/userAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  console.log("🚀 ~ ForgotPassword ~ error:", error);
  const dispatch = useDispatch();

  const resetUserPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email, setError));
  };
  return (
    <>
      <form action="">
        <div className="flex flex-col gap-4 text-center items-center h-[85vh] justify-center mx-auto">
          <h2 className="font-bold text-xl">Forgot Passowrd ?</h2>
          <p>Enter your email address to reset your password</p>

          <div className="flex flex-col gap-4 w-80">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="border border-black p-2  rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-600/90 text-white py-2 rounded-md"
              onClick={resetUserPassword}
            >
              Submit
            </button>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
