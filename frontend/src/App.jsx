import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  const [loggedUser, setLoggedUser] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setLoggedUser(foundUser);
    }
  }, []);
  return (
    <>
      <NavBar loggedUser={loggedUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={<Signup setLoggedUser={setLoggedUser} />}
        />
        <Route
          path="/login"
          element={<Login setLoggedUser={setLoggedUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
