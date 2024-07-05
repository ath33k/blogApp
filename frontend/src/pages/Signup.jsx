import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signup`,
        {
          name: name,
          email: email,
          password: password,
          passwordConfirm: confirmPassword,
        },
        { withCredentials: true }
      );
      const responseData = response.data.data;
      // setLoggedUser(responseData.user);

      location.assign("/");
      // localStorage.setItem("user", JSON.stringify(responseData.user));
      console.log(responseData.user);
    } catch (err) {
      console.log("err");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[90vh] ">
      <div className="flex justify-center flex-col  items-center rounded-xl w-[80%] h-[85%] sm:w-[60%] lg:w-[40%] bg-orange-200 drop-shadow-lg border-2">
        <form
          action=""
          onSubmit={handleFormSubmission}
          className="flex flex-col items-center gap-2"
        >
          <h2>SIGN UP</h2>
          <div className="flex flex-col gap-4 py-2">
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue=""
              onChange={(e) => setName(e.target.value)}
            />

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

            <TextField
              required
              id="outlined-required"
              label="confirmPassword"
              type="password"
              defaultValue=""
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        <Link to={"/login"}>
          <span className="text-xs">Already have an account?</span>
        </Link>
      </div>
    </div>
  );
};
