import React from "react";
import { FaFaceMeh } from "react-icons/fa6";

const PageNotFound = () => {
  return (
    <div className="h-[70vh] flex flex-col gap-4 justify-center items-center">
      <h1 className="text-6xl font-semibold">404 !</h1>
      <h1 className="text-4xl">Page Not Found</h1>
      <FaFaceMeh className="text-8xl rounded-full" />
    </div>
  );
};

export default PageNotFound;
