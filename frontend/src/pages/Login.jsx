import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [backDropOpen, setBackDropOpen] = useState(false);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    console.log("clicked");
    setBackDropOpen(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      const responseData = response.data.data;
      console.log(response);
      // setLoggedUser(responseData.user);
      // localStorage.setItem("user", JSON.stringify(responseData.user));
      console.log(responseData);
      setBackDropOpen(false);

      location.assign("/");
    } catch (err) {
      setBackDropOpen(false);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[80vh] ">
      <BackDrop backDropOpen={backDropOpen} />
      <div className="flex flex-col justify-center items-center rounded-xl w-[80%] h-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] bg-orange-200 drop-shadow-lg border-2">
        <form
          action=""
          onSubmit={handleFormSubmission}
          className="flex flex-col items-center gap-2"
        >
          <h2>Sign in</h2>
          <div className="flex flex-col gap-4 py-2 ">
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

            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        <Link to={"/signup"}>
          <span className="text-xs">Don't have an account?</span>
        </Link>
      </div>
    </div>
  );
};

const BackDrop = ({ backDropOpen, setBackDropOpen }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
