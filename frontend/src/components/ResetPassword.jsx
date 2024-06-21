import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

const ResetPassword = ({ loggedUser, setResetModel, setResetData }) => {
  const fetchResetPassword = async () => {
    const response = await axios.post("/api/v1/users/forgotPassword", {
      email: loggedUser.email,
    });
    setResetModel(true);
    setResetData(response.data.resetData);
    console.log(response);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className=" text-red-500 text-sm  bg-red-100 p-2 rounded-md">
        NOTE: <br /> This functionality has to be working differently. after you
        click the reset button typically you would recieve email to reset page.{" "}
        <br /> BUT Due to some issues with email services, we will just send you
        the token through a pop up
      </div>
      <div className="border-2 rounded-md px-4 p-2 md:flex md:justify-between">
        <div>Do you want to reset your password?</div>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={fetchResetPassword}
        >
          Reset Now !
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
