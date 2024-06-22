import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import axios from "axios";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [loggedUser, setLoggedUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [selectedId, setselectedId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/auth`
        );

        setLoggedUser(response.data.user);
        setAuthenticated(true);
        console.log(response.data);
      } catch (err) {
        setLoading(false);
        setAuthenticated(false);
        console.log(err);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <>
      <NavBar
        loggedUser={loggedUser}
        isLoading={isLoading}
        setLoading={setLoading}
        isAuthenticated={isAuthenticated}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              isLoading={isLoading}
              setLoading={setLoading}
              setselectedId={setselectedId}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup setLoggedUser={setLoggedUser} />}
        />
        <Route
          path="/login"
          element={<Login setLoggedUser={setLoggedUser} />}
        />
        <Route path="/profile" element={<Profile loggedUser={loggedUser} />} />
        <Route
          path={`/post/:id`}
          element={
            <PostPage setLoggedUser={setLoggedUser} loggedUser={loggedUser} />
          }
        />
        <Route
          path="/createPost"
          element={<CreatePost loggedUser={loggedUser} />}
        />
        <Route
          path="/profile/resetPassword/:id"
          element={<ResetPassword loggedUser={loggedUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
