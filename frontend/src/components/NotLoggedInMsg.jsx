import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotLoggedInMsg = () => {
  return (
    <div className="flex justify-center items-center h-3/6">
      <div className=" rounded-lg p-16 bg-red-100">
        <div className="text-lg md:text-xl mb-2 font-semibold ">
          Oops you are not logged in! Please login to access this page
        </div>
        <Link to={"../login"}>
          <Button variant="contained">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotLoggedInMsg;
