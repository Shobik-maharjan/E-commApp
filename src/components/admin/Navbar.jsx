import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";

const Navbar = () => {
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <nav className="bg-slate-50">
        <ul className="flex items-center h-20 mx-8">
          <li className="logo font-bold text-2xl">
            <Link to={"/admin"}>Shadow Shop</Link>
          </li>
          <li className="m-auto w-1/2	">
            <Link>
              <input
                className="p-3 w-full rounded-md"
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
            </Link>
          </li>
          <li className="mx-3 text-3xl">
            <Link>
              <IoIosNotifications />
            </Link>
          </li>
          {/* <li className="mr-7 text-3xl">
            <Link onClick={handleAvatarClick}>
              <RxAvatar />
            </Link>
            {showLogout && (
              <div className="absolute right-0 m-2 bg-white px-6 py-2">
                <button
                  className="text-lg bg-emerald-500 hover:bg-emerald-600 p-2 rounded text-white"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </li> */}
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
      </nav>
    </>
  );
};

export default Navbar;
