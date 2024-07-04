import "./App.css";
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
import { useLoggedUser } from "./context/UserProvider";
// import { UserProvider } from "./context/UserProvider";

function App() {
  const { loggedUser, setLoggedUser, isAuthenticated, isLoading } =
    useLoggedUser();
  // const [loggedUser, setLoggedUser] = useState();
  // const [isAuthenticated, setAuthenticated] = useState(undefined);
  // const [isLoading, setLoading] = useState(true);
  const [selectedId, setselectedId] = useState();

  return (
    <>
      {/* <UserProvider> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage setselectedId={setselectedId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={`/post/:id`} element={<PostPage />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/profile/resetPassword/:id" element={<ResetPassword />} />
      </Routes>
      {/* </UserProvider> */}
    </>
  );
}

export default App;
