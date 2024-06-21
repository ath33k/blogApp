import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handlePasswordChangeSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`/api/v1/users/resetPassword/${id}`, {
        newPassword: newPassword,
        newPasswordConfirm: confirmPassword,
      });
      location.assign("/");
      console.log();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handlePasswordChangeSubmission}>
        <h3>Reset Password</h3>
        <div className="flex flex-col gap-4 py-2">
          <TextField
            required
            id="outlined-required"
            label="New Password"
            type="password"
            defaultValue=""
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            type="password"
            defaultValue=""
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
