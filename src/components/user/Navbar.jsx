import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutUser } from "src/redux/actions/userAction";
import { getCartData } from "src/redux/actions/cartAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const { userList } = useSelector((state) => state.userList);
  const { getCart } = useSelector((state) => state.cartList);
  const [showMenu, setShowMenu] = useState(false);

  const navLink = ["Home", "Products", "About", "Contact Us"];

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShowMenu(false);
    }
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getCartData());
  }, []);

  return (
    <>
      <nav className="bg-slate-50">
        <div className="flex items-center justify-between h-20 w-10/12 mx-auto">
          <div className="logo font-bold text-2xl transition duration-300 hover:scale-110">
            <Link to={"/"}>Shadow Shop</Link>
          </div>
          <div className="md:hidden">
            <RxHamburgerMenu onClick={showMenuToggle} />
          </div>
          {showMenu ? (
            <div className="absolute md:hidden h-screen top-[80px] right-0 bg-white pl-10 text-black w-5/12 sm:w-4/12">
              <div className={`flex flex-col m-4 gap-8 text-lg`}>
                {navLink.map((item, i) => (
                  <Link
                    to={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="hover:text-green-800 hover:underline"
                    key={i}
                    onClick={() => setShowMenu(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col m-4 gap-4">
                <div className="text-3xl">
                  <Link>
                    <IoIosNotifications
                      className="hover:text-green-800"
                      onClick={() => setShowMenu(false)}
                    />
                  </Link>
                </div>
                <div className="text-3xl relative">
                  <Link to={"/cart"}>
                    <FiShoppingCart
                      className="hover:text-green-800"
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="text-sm inline-flex items-center text-center justify-center absolute -top-2 left-5 w-5 h-5 font-medium rounded-full bg-green-500">
                      {getCart ? getCart?.length : 0}
                    </div>
                  </Link>
                </div>

                <div className="relative">
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
          ) : (
            <>
              <div className={`hidden md:flex gap-8 lg-text-lg`}>
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
              <div className="hidden md:flex gap-4">
                <div className="text-3xl">
                  <Link>
                    <IoIosNotifications className="hover:text-green-800" />
                  </Link>
                </div>
                <div className="text-3xl relative">
                  <Link to={"/cart"}>
                    <FiShoppingCart className="hover:text-green-800" />
                    <div className="text-sm inline-flex items-center text-center justify-center absolute -top-2 -end-2 w-5 h-5 font-medium rounded-full bg-green-500">
                      {getCart ? getCart?.length : 0}
                    </div>
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
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
