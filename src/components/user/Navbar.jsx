import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutUser } from "../../redux/actions/userAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const { userList } = useSelector((state) => state.userList);

  const navLink = ["Home", "Products", "About", "Contact Us"];

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <>
      <nav className="bg-slate-50">
        <div className="flex items-center justify-between h-20">
          <div className="logo font-bold text-2xl transition duration-300 hover:scale-110">
            <Link to={"/"}>Shadow Shop</Link>
          </div>
          <div className="flex gap-8 text-lg">
            {navLink.map((item, i) => (
              <Link
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-green-800 hover:underline"
                key={i}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">
              <Link>
                <IoIosNotifications className="hover:text-green-800" />
              </Link>
            </div>
            <div className="text-3xl">
              <Link to={"/cart"}>
                <FiShoppingCart className="hover:text-green-800" />
              </Link>
            </div>

            <div className="px-2.5 relative">
              {localStorage.getItem("user") ? (
                <>
                  <RxAvatar
                    className="text-3xl cursor-pointer transition-opacity duration-500 ease-in-out hover:text-green-800 "
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
                          {userList?.username}
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
                </>
              ) : (
                <div
                  className="flex items-center cursor-pointer hover:underline text-xl"
                  onClick={() => navigate("/login")}
                >
                  Login
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
