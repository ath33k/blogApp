import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { redirect } from "react-router-dom";

export const Login = ({ setLoggedUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const response = await axios.post("/api/v1/users/login", {
        email: email,
        password: password,
      });
      const responseData = response.data.data;
      console.log(response);
      setLoggedUser(responseData.user);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      window.location.href = "http://localhost:5173";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center m-4">
      <form action="" onSubmit={handleFormSubmission}>
        <h2>LOGIN</h2>
        <div className="flex flex-col gap-4 py-2">
          <TextField
            required
            id="outlined-required"
            label="email"
            defaultValue=""
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            label="password"
            type="password"
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
