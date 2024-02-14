import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // const navigate = useNavigate();
  // const [expDate, setExpDate] = useState();

  // const localStorageData = () => {
  //   const expiDate = localStorage.getItem("user");

  //   if (expiDate) {
  //     const userData = JSON.parse(expiDate);
  //     setExpDate(userData.expireDate);
  //   } else {
  //     navigate("/admin/login");
  //   }
  // };

  // const nowDate = new Date().getTime();
  // console.log(nowDate);

  // useEffect(() => {
  //   localStorageData();
  //   const checkExpiration = () => {
  //     if (nowDate >= expDate) {
  //       localStorage.removeItem("user");
  //       navigate("/admin/login");
  //     } else {
  //       // Schedule the next check after a delay
  //       setTimeout(checkExpiration, 1000); // You can adjust the delay as needed
  //     }
  //   };
  //   checkExpiration();

  //   return () => {
  //     // Cleanup function to clear any remaining timeouts if the component unmounts
  //     clearTimeout(checkExpiration);
  //   };
  // }, [nowDate, expDate, navigate]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
