import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/userAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      <nav className="bg-slate-50">
        <ul className="flex items-center justify-between h-20 mx-8">
          <li className="logo font-bold text-2xl">
            <Link to={"/"}>Shadow Shop</Link>
          </li>
          <ul className="flex gap-4  text-xl font-medium">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
          <ul className="flex gap-4">
            <li className="text-3xl">
              <Link>
                <IoIosNotifications />
              </Link>
            </li>
            <li className="text-3xl">
              <Link to={"/cart"}>
                <FiShoppingCart />
              </Link>
            </li>

            <li className="px-2.5 relative">
              <RxAvatar
                className="text-3xl cursor-pointer transition-opacity duration-500 ease-in-out"
                onMouseEnter={() => setShowLogout(true)}
              />
              {showLogout && (
                <div
                  className={`absolute right-0 overflow-hidden w-fit bg-black/80 p-4 mt-6 min-w-32 cursor-pointer transition-opacity duration-500 ease-in-out opacity-0 ${
                    showLogout ? "opacity-100" : ""
                  }`}
                  onMouseEnter={() => setShowLogout(true)}
                  onMouseLeave={() => setShowLogout(false)}
                >
                  <div className="text-white">
                    <div className="flex mb-2 items-center hover:underline">
                      <FaUserTie className="mr-2" />
                      {/* {user?.displayName} */}
                      username
                    </div>

                    <div
                      className="flex items-center cursor-pointer hover:underline"
                      onClick={() => dispatch(logoutUser())}
                    >
                      <IoLogOutOutline className="mr-2" />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
