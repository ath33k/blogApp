import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handlePasswordChange = () => {};
  return (
    <div>
      <form action="" onSubmit={handlePasswordChange}>
        <h3>Change Password</h3>
        <div className="flex flex-col gap-4 py-2">
          <TextField
            required
            id="outlined-required"
            label="Current Password"
            type="password"
            defaultValue=""
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
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

export default ChangePassword;
