import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "src/redux/actions/userAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const resetUserPassword = (e) => {
    e.preventDefault();
    if (email === null || email === "") {
      setError("Please enter your email");
      return;
    } else {
      dispatch(resetPassword(email, setError));
    }
  };
  return (
    <>
      <form action="" className="w-96 mx-auto flex my-10">
        <div className="flex flex-col gap-4 text-center bg-gray-200 px-8 py-10 rounded-md shadow-[6px_6px_14px_1px]">
          <h2 className="font-bold text-xl">Forgot Passowrd ?</h2>
          <p>Enter your email address to reset your password</p>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Example@gmail.com"
              className="border border-black p-2 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-600/90 text-white py-2.5 px-5 rounded-md"
              onClick={resetUserPassword}
            >
              Submit
            </button>
            {error && <div className="text-red-500 text-left">{error}</div>}
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
