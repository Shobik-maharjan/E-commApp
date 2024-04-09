import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FaUserTie } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
import { getSearchProduct } from "../../redux/actions/productAction";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    let searchQuery = e.target.value;
    setSearch(searchQuery);
    setTimeout(() => {
      dispatch(getSearchProduct({ prodName: searchQuery }));
    }, 1000);
  };

  useEffect(() => {
    setSearch("");
  }, [navigate]);

  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <nav className="bg-slate-50">
        <div className="flex items-center h-20 mx-8">
          <div className="logo font-bold text-2xl">
            <Link to={"/admin"}>Shadow Shop</Link>
          </div>
          <div className="m-auto w-1/2">
            <input
              className="p-3 w-full rounded-md border"
              type="search"
              name="search"
              id="search"
              value={search}
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="mx-3 text-3xl">
            <Link>
              <IoIosNotifications />
            </Link>
          </div>
          <div className="px-2.5 relative">
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
