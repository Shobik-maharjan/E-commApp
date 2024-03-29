import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import "./navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleAvatarClick = () => {
    setShowLogout(!showLogout);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-slate-50">
        <ul className="flex items-center h-20 mx-auto">
          <li className="logo ml-7 font-bold text-2xl">
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
          <li className="mr-7 text-3xl">
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
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
