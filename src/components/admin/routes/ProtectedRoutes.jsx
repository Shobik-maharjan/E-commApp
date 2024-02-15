import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoutes = () => {
  const authData = JSON.parse(localStorage.getItem("admin"));
  const [userRole, setUserRole] = useState();
  const [allUserId, setAllUserId] = useState();
  const [userId, setUserId] = useState();
  const [userDataa, setUserDataa] = useState([]);

  const fetchData = async () => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      console.log(userId);
    }
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.docs.map((doc) => {
      // console.log(doc.ref.firestore._authCredentials);
      const nowId = doc.ref.firestore._authCredentials.currentUser.uid;
      if (nowId === userId) {
        setAllUserId(doc.ref.id);
        console.log(doc.ref.id);
      }
      // console.log(userId);
    });
    const userData = await getDoc(doc(db, "users", allUserId));
    const singleUserData = [];
    console.log(userData.data());
    // userData.docs.forEach((doc) => {
    //   singleUserData.push(doc.data());
    //   console.log(doc.data());
    // });

    // const role = userData.length > 0 ? userData[0].role : null;
    // setUserRole(role);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {userRole === "admin" ? (
        <Outlet />
      ) : userRole === "user" ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoutes;
